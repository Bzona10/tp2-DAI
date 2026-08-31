"use client"

import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";

export default function SocketPage() {
    const { socket, isConnected } = useSocket();
    const [mensajes, setMensajes] = useState([]);
    const [contador, setContador] = useState(0);


    useEffect(() => {

        if (socket) {

            console.log("Socket disponible:", socket);


            socket.on("pingAll", (data) => {

                setMensajes((mensajesAnteriores) => [
                    ...mensajesAnteriores,
                    data
                ]);
            });



            socket.on("respuestaPersonalizada", (data) => {
                setContador(data.contador);
                console.log("Contador:", data.contador);
            });
            return () => {
                socket.off("pingAll");
                socket.off("respuestaPersonalizada");
            };
        }

    }, [socket]);


    function sendMessage() {

        if (socket) {

            socket.emit("pingAll", {
                msg: "Hola desde mi compu"
            });
        }
    }


    function contar() {
        if (socket) {
            socket.emit("eventoPersonalizado");
        }
    }


    return (
        <>

            {isConnected ? (
                <p>🟢 Conectado al servidor</p>
            ) : (
                <p>🔴 Desconectado</p>
            )}


            <button onClick={sendMessage}>
                Enviar ping a todos
            </button>

            <h2>Mensajes recibidos:</h2>
            <ul>
                {mensajes.map((mensaje, index) => (
                    <li key={index}>
                        {mensaje.message.msg}
                    </li>
                ))}
            </ul>



            <button onClick={contar}>
                Contar +1
            </button>
            <h2>Contador: {contador}</h2>

        </>
    );
}
