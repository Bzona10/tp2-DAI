"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [usuario, setUsuario] = useState("");
  const [sala, setSala] = useState("");

  const router = useRouter();

  const manejarCambioUsuario = (event) => {
    setUsuario(event.target.value);
  };

  const manejarCambioSala = (event) => {
    setSala(event.target.value);
  };

  function entrarAlChat() {
    router.push(`/chat?sala=${sala}&usuario=${usuario}`);
  }

  return (
    <>
      <h1>PIO Socket</h1>

      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={manejarCambioUsuario}
          placeholder="Ingresá tu usuario"
        />
      </div>

      <div>
        <label>Sala:</label>
        <input
          type="text"
          value={sala}
          onChange={manejarCambioSala}
          placeholder="Ingresá la sala"
        />
      </div>

      {(usuario === "" || sala === "") && (
        <p>Por favor, completá el usuario y la sala.</p>
      )}

      <button
        onClick={entrarAlChat}
        disabled={usuario === "" || sala === ""}
      >
        Entrar al chat
      </button>

      <br />

      <Link href="/socket">Ir a Socket</Link>
    </>
  );
}
