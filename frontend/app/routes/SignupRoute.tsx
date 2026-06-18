import SignupPage from "~/signup/SignupPage"
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup - Pulse Chat" },
    { name: "description", content: "Crie uma conta para acessar o Pulse Chat!" },
  ];
}

export default function SignupRoute() {
  return <SignupPage />
}
