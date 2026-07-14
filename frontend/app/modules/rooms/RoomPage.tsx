import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { v4 as uuidv4 } from "uuid";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { socket } from "~/config/socket/socket";
import { findRoomById, type ChatMessage } from "~/modules/rooms/roomApi";
import type { RoomData } from "~/shared/types/types";


//isso é mais avançado, pois não tenho esse estado de online
const usersList = [
  // { name: "Ana", status: "Editando slides", online: true },
  // { name: "Carlos", status: "Preparando a pauta", online: true },
  // { name: "João", status: "Aguardando", online: true },
  // { name: "Mariana", status: "Só participando", online: false },
  { id: "1", username: "Ana", status: "Editando slides", online: true },
  { id: "2", username: "Carlos", status: "Preparando a pauta", online: true },
  { id: "3", username: "João", status: "Aguardando", online: true },
  { id: "4", username: "Mariana", status: "Só participando", online: false },
]

// const initialMessages = [
//   { id: "1", username: "Ana", text: "Boa tarde, pessoal!", time: "14:05" },
//   { id: "2", username: "Carlos", text: "Vamos revisar a agenda da sala.", time: "14:06" },
//   { id: "3", username: "João", text: "Estou pronto para o chat.", time: "14:07" },
// ]

type OnlineUser = {
  id: string;
  username: string;
  // status: string;
  // online: boolean;
}

type UserList = {
  id: string;
  username: string;
  status: string;
  online: boolean;
}

let typingTimeout: NodeJS.Timeout;


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
// --------------------------------------------------------------------------------------------------------------------

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId!;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [offRoom, setOffRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState<RoomData | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [typingUsers, setTypingUsers] = useState<String[]>([]);

  //Join Room
  useEffect(() => {
    const joinRoom = () => {
      socket.emit("join_room", roomId);
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [roomId]);

  function handleSend(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = message.trim()

    if (!trimmed) return

    socket.emit("send_message", {
      roomId,
      message: trimmed
    })

    setMessage("")
  }

   useEffect(() => {
    async function loadRoom() {
      try {
        setIsLoading(true)
        const roomData = await findRoomById(roomId)
        
        if (!roomData) {
          setOffRoom(true)
          return
        }
        
        setRoom(roomData)
      } catch (error) {
        console.error("Erro ao buscar sala:", error)
        setOffRoom(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadRoom()
  }, [roomId])

  useEffect(() => {
    const handleJoinError = (errorMessage: string) => {
      alert(errorMessage || "Erro ao entrar na sala");
      setOffRoom(true);
    };

    socket.on("join_room_error", handleJoinError);

    return () => {
      socket.off("join_room_error", handleJoinError);
    };
  }, []);

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      setMessages((current) => [
        ...current,
        {
        id: uuidv4(),
        username: data.username,
        text: data.text,
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

  useEffect(() =>{
    socket.on("user_joined", (data) =>{
      setMessages((current) => [
        ...current,
        {
        id: uuidv4(),
        username: data.username,
        text: data.message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ])
    })
  })

  useEffect(() =>{
    socket.on("room:onlineUsers", (data) =>{
      setOnlineUsers(data)
    })

    return () => {
      socket.off("room:onlineUsers");
    };
  })

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setMessage(e.target.value);

  socket.emit("typing:start", roomId);

  clearTimeout(typingTimeout);

  typingTimeout = setTimeout(() => {
    socket.emit("typing:stop", roomId);
  }, 2000);
};

useEffect(() => {
  socket.on("typing:start", (username: string) => {
    setTypingUsers((current) => {
      if (current.includes(username)) return current;
      return [...current, username];
    });
  });

  socket.on("typing:stop", (data: { username: string }) => {
    setTypingUsers((current) => 
      current.filter((name) => name !== data.username)
    );
  });

  return () => {
    socket.off("typing:start");
    socket.off("typing:stop");
  };
}, []);

  if (isLoading) {
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center p-6">
      <p className="text-muted-foreground animate-pulse text-lg">Carregando informações da sala...</p>
    </main>
  )
  }

  return (
    
    <main className="min-h-screen bg-muted p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Card className="bg-background p-6">
          <CardHeader className="gap-2">
            {/* Tenho que buscar o nome da sala aqui */}
            <CardTitle className="text-3xl">{room?.roomName}</CardTitle>
            <CardDescription>
              {/* Descrição da sala */}
              Esta sala mostra as pessoas online e oferece um chat rápido.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="rounded-3xl bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Usuários conectados agora: {onlineUsers.length}
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
                  key={user.id + user.username}
                  className="flex items-center justify-between rounded-[28px] border border-border bg-background p-4"
                >
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                  <span
                  //Se estiver afk fica laranja, se estiver online fica verde
                    className={`h-3.5 w-3.5 rounded-full bg-emerald-500`}
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
                  <div key={item.id} className="rounded-3xl bg-muted p-3">
                    <p className="font-semibold text-xs">{item.username}</p>
                    <p className="text-sm">{item.text}</p>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                ))}

                {/* INDICADOR DE DIGITANDO */}
                {typingUsers.length > 0 && (
                  <div className="text-sm text-muted-foreground italic animate-pulse p-2 bg-muted/50 rounded-xl max-w-fit">
                    {typingUsers.length === 1
                      ? `${typingUsers[0]} está digitando...`
                      : `${typingUsers.join(", ")} estão digitando...`}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <form onSubmit={handleSend} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={message}
                  onChange={handleChange}
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
