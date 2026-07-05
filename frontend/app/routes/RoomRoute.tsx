import RoomPage from "~/modules/rooms/RoomPage";
import type { Route } from "../+types/root";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rooms - Pulse Chat" },
    { name: "description", content: "Entre em uma sala" },
  ];
}

export default function RoomRoute() {
  return <RoomPage />;
}
