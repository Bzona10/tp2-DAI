"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

export default function SocketPage() {

    // Leer los datos de la URL
    const searchParams = useSearchParams();
    const router = useRouter();

    const { socket, isConnected } = useSocket();

    const sala = searchParams.get("sala");
    const usuario = searchParams.get("usuario");

    // Estados
    const [mensaje, setMensaje] = useState("");
    const [conversacion, setConversacion] = useState([]);
    const [nuevaSala, setNuevaSala] = useState("");

    // Unirse a la sala
    useEffect(() => {
        if (socket && sala) {
            socket.emit("joinRoom", {
                room: sala
            });
        }
    }, [socket, sala]);

    // Escuchar mensajes nuevos
    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (data) => {
                setConversacion((mensajesAnteriores) => [
                    ...mensajesAnteriores,
                    data
                ]);
            });

            return () => {
                socket.off("newMessage");
            };
        }
    }, [socket]);

    // Enviar mensaje
    function enviarMensaje() {
        if (socket && mensaje.trim() !== "") {
            socket.emit("sendMessage", {
                message: mensaje
            });

            setMensaje("");
        }
    }

    // Cambiar de sala
    function cambiarSala() {
        if (nuevaSala.trim() !== "") {
            setConversacion([]);
            router.replace(`/chat?sala=${nuevaSala}&usuario=${usuario}`);
            setNuevaSala("");
        }
    }

    return (
        <>
            {isConnected ? (
                <p>🟢 Conectado al servidor</p>
            ) : (
                <p>🔴 Desconectado</p>
            )}

            <h1>Chat</h1>

            <p>
                Usuario: <strong>{usuario}</strong>
            </p>

            <p>
                Sala: <strong>{sala}</strong>
            </p>

            <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribí un mensaje"
            />

            <button onClick={enviarMensaje}>
                Enviar
            </button>

            <h2>Conversación:</h2>

            <ul>
                {conversacion.map((data, index) => (
                    <li key={index}>
                        Sala: {data.room} - {data.message}
                    </li>
                ))}
            </ul>

            <h2>Cambiar de sala</h2>

            <input
                type="text"
                value={nuevaSala}
                onChange={(e) => setNuevaSala(e.target.value)}
                placeholder="Ingresá una nueva sala"
            />

            <button onClick={cambiarSala}>
                Cambiar de sala
            </button>
        </>
    );
}

