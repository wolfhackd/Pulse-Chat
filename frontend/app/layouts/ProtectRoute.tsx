import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/shared/hooks/useAuth";




export default function ProtectRoute() {
    const {token, loading} = useAuth();

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Outlet />
    );
}