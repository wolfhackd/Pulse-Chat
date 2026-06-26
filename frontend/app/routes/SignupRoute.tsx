import { Navigate } from "react-router";
import SignupPage from "~/signup/SignupPage";
import type { Route } from "./+types/home";
import { useAuth } from "~/shared/hooks/useAuth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup - Pulse Chat" },
    { name: "description", content: "Crie uma conta para acessar o Pulse Chat!" },
  ];
}

export default function SignupRoute() {
  const auth = useAuth();

  if (auth?.token) {
    return <Navigate to="/room/1" replace />;
  }

  return <SignupPage />;
}
