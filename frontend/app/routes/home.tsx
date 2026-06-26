import { Navigate, useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { useAuth } from "~/shared/hooks/useAuth";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pulse Chat" },
    { name: "description", content: "Bem-vindo ao Pulse Chat" },
  ];
}

export default function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="max-w-2xl rounded-3xl border border-border bg-background p-10 text-center shadow-lg">
        <h1 className="text-4xl font-semibold">Bem-vindo ao Pulse Chat</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Você está autenticado. Escolha uma sala para começar a conversar.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Button onClick={() => navigate('/room/1')}>Entrar na sala 1</Button>
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
