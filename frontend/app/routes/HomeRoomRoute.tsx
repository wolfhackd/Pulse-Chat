import type { Route } from "../+types/root";
import HomeRoomPage from "~/modules/homeRoom/HomeRoomPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pulse Chat" },
    { name: "description", content: "Bem-vindo ao Pulse Chat" },
  ];
}

export default function Home() {
  return <HomeRoomPage />;
}
