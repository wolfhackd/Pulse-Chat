import { Navigate } from "react-router";
import LoginPage from "~/login/LoginPage";
import { useAuth } from "~/shared/hooks/useAuth";

export default function LoginRoute() {
  const auth = useAuth();

  if (auth?.token) {
    return <Navigate to="/room/1" replace />;
  }

  return <LoginPage />;
}
