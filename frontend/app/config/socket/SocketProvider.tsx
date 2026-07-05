import React, { useEffect } from "react";
import { useAuth } from "~/shared/hooks/useAuth";
import { socket } from "./socket";
import { Outlet } from "react-router";

type Props = {
    children: React.ReactNode;
};


export default function SocketProvider({children}: Props) {
    const {token} = useAuth();

    useEffect(() =>{
        if (!token) {
            socket.disconnect();
            return;
        }

        socket.auth = { token };
        socket.connect();

        return () => {
            socket.disconnect();
        }
    }, [token]);

    return <>{children}</>;
};