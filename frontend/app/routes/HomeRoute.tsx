import { Navigate, useNavigate } from "react-router";
import { useAuth } from "~/shared/hooks/useAuth";
import type { Route } from "../+types/root";
import HomePage from "~/modules/home/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pulse Chat" },
    { name: "description", content: "Bem-vindo ao Pulse Chat" },
  ];
}

export default function Home() {
  // const auth = useAuth();

  // if (!auth?.token) {
  //   return <Navigate to="/login" replace />;
  // }

  return <HomePage />;
}
