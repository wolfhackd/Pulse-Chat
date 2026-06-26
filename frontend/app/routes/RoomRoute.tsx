import { Navigate } from "react-router";
import { useAuth } from "~/shared/hooks/useAuth";
import { RoomPage } from "~/rooms/RoomPage";

export default function RoomRoute() {
  const auth = useAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return <RoomPage />;
}
