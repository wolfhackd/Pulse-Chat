import { useEffect, useState } from "react"
import { useParams } from "react-router"

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { socket } from "~/config/socket/socket"

const onlineUsers = [
  { name: "Ana", status: "Editando slides", online: true },
  { name: "Carlos", status: "Preparando a pauta", online: true },
  { name: "João", status: "Aguardando", online: true },
  { name: "Mariana", status: "Só participando", online: false },
]

const initialMessages = [
  { id: 1, user: "Ana", text: "Boa tarde, pessoal!", time: "14:05" },
  { id: 2, user: "Carlos", text: "Vamos revisar a agenda da sala.", time: "14:06" },
  { id: 3, user: "João", text: "Estou pronto para o chat.", time: "14:07" },
]

type ChatMessage = {
  id: number
  user: string
  text: string
  time: string
}


// --------------------------------------------------------------------------------------------------------------------
//  Join Room
//  Online/Offline Users
//  Digitando no chat
//
//
//  Corpo de Mensagem
//  Preciso de: 
//  Nome da sala
//  Nome do usuário
//  Texto da mensagem
//  Data da mensagem
//  Hora da mensagem
//
//
//
//
//
// --------------------------------------------------------------------------------------------------------------------

export function RoomPage() {
  const params = useParams()
  const roomName = params.roomId
    ? decodeURIComponent(params.roomId).replace(/-/g, " ")
    : "Sala de Bate-Papo"

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  function handleSend(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) return

    // setMessages((current) => [
    //   ...current,
    //   {
    //     id: current.length + 1,
    //     user: "Você",
    //     text: trimmed,
    //     time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    //   },
    // ])
    socket.emit("send_message", {
      room: roomName,
      message: trimmed
    })

    setMessage("")
  }

  //Join Room
  useEffect(() =>{
    socket.emit("join_room", roomName)

  //    return () => {
  //   socket.emit("leave_room", roomName);
  // };
  }, [roomName])

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      setMessages((current) => [
        ...current,
        {
        id: Date.now(),
        user: data.username,
        text: data.message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ])
    })

    return () => {
      socket.off("receive_message");
    };
  },[])

  return (
    <main className="min-h-screen bg-muted p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Card className="bg-background p-6">
          <CardHeader className="gap-2">
            <CardTitle className="text-3xl">{roomName}</CardTitle>
            <CardDescription>
              {/* Descrição da sala */}
              Esta sala mostra as pessoas online e oferece um chat rápido.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="rounded-3xl bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Usuários conectados agora: {onlineUsers.filter((user) => user.online).length}
              </p>
            </div>
            <div className="rounded-3xl bg-muted p-4">
              <p className="text-sm text-muted-foreground">Conversa em tempo real entre membros.</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Pessoas online</CardTitle>
              <CardDescription>Participantes desta sala</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {onlineUsers.map((user) => (
                <div
                  key={user.name}
                  className="flex items-center justify-between rounded-[28px] border border-border bg-background p-4"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.status}</p>
                  </div>
                  <span
                    className={`h-3.5 w-3.5 rounded-full ${
                      user.online ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex min-h-[580px] flex-col">
            <CardHeader className="flex-col gap-2">
              <CardTitle>Chat da sala</CardTitle>
              <CardDescription>Digite uma mensagem para conversar com o grupo.</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden">
              <div className="flex h-full flex-col gap-4 overflow-y-auto pr-2">
                {messages.map((item) => (
                  <div key={item.id} className="rounded-3xl bg-muted p-4">
                    <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{item.user}</span>
                      <span>{item.time}</span>
                    </div>
                    <p className="mt-2 text-base leading-6 text-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <form onSubmit={handleSend} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Digite uma mensagem..."
                  className="flex-1"
                />
                <Button type="submit" className="shrink-0">
                  Enviar
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">Pressione Enter ou clique em Enviar.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
