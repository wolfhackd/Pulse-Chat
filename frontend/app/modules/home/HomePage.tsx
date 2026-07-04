import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getRooms } from "~/modules/rooms/roomApi";
import { useAuth } from "~/shared/hooks/useAuth";
import type { RoomData } from "~/shared/types/types";





export default function HomePage() {

    const auth = useAuth();
    const navigate = useNavigate();

    const [rooms, setRooms] = useState<RoomData[]>([]);

    useEffect(()=>{
      async function loadRooms() {
        try {
          const rooms = await getRooms();
          setRooms(rooms);
        } catch (error) {
          console.error("Erro ao buscar salas:", error);
        }
      }
      loadRooms()
    },[])


    return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="max-w-2xl rounded-3xl border border-border bg-background p-10 text-center shadow-lg">
        <h1 className="text-4xl font-semibold">Bem-vindo ao Pulse Chat</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Você está autenticado. Escolha uma sala para começar a conversar.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          {rooms.map((room)=>{
            return (
                <Button key={room.roomId} onClick={() => navigate(`/room/${room.roomId}`)}>Entrar na sala {room.roomName}</Button>
            )
          })}
          <Button variant="secondary" onClick={() => {
            auth.logout();
            navigate('/login');
          }}>
            Sair
          </Button>
        </div>
      </div>
    </main>
  );
}
