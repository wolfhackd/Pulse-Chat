import SignupPage from "~/modules/signup/SignupPage";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup - Pulse Chat" },
    { name: "description", content: "Crie uma conta para acessar o Pulse Chat!" },
  ];
}

export default function SignupRoute() {
  return <SignupPage />;
}
