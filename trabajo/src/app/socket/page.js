"use client"

import { useState } from "react";
export default function SocketPage() {
    const [isConnected, setIsConnected] = useState(false);}



    return(
        <>
        { isConnected ?(
            <p>🟢 Conectado al servidor</p>
        ) :(
            <p>🔴 Desconectado</p>
        )}
        
        
        </>
    )