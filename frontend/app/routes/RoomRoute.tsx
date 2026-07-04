import { Navigate } from "react-router";
import RoomPage from "~/modules/rooms/RoomPage";
import { useAuth } from "~/shared/hooks/useAuth";
import type { Route } from "../+types/root";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rooms - Pulse Chat" },
    { name: "description", content: "Entre em uma sala" },
  ];
}

export default function RoomRoute() {
  const auth = useAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return <RoomPage />;
}
