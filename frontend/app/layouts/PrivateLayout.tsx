import { Navigate, Outlet } from "react-router";
import SocketProvider from "~/config/socket/SocketProvider";
import { useAuth } from "~/shared/hooks/useAuth";




export default function PrivateLayout() {
    const {token, loading} = useAuth();

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <SocketProvider>
            <Outlet />
        </SocketProvider>
    );
}