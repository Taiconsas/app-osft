import React, { useState } from "react";
import './huggingfacechat.css';
import { API_BASE } from "../../api";

function HuggingFaceChat({ onError }) {
  const [texto, setTexto] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse([]);

    try {
      const res = await fetch(`${API_BASE}/huggingface/text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: texto, instrucciones: instrucciones }),
      });

      if (!res.ok) throw new Error("Error en la API de Hugging Face");

      const data = await res.json();

      if (Array.isArray(data.generated_text)) {
        setResponse(data.generated_text);
      } else if (typeof data.generated_text === "string") {
        const items = data.generated_text
          .split(/\n|•|-/)
          .map(i => i.trim())
          .filter(Boolean);
        setResponse(items);
      } else {
        setResponse(["Sin respuesta"]);
      }

    } catch (err) {
      setResponse(["Error: " + err.message]);
      if (onError) onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="huggingface-chat-container">
      <h2>Generador de Macrocompetencias Académicas</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe el texto académico aquí..."
          rows={5}
        />
        <input
          type="text"
          value={instrucciones}
          onChange={(e) => setInstrucciones(e.target.value)}
          placeholder="Opcional: instrucciones adicionales"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generando..." : "Generar Macrocompetencia"}
        </button>
      </form>

      {response.length > 0 && (
        <div className="response-container">
          <h3>Macrocompetencia Generada:</h3>
          <ol>
            {response.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
}

export default HuggingFaceChat;
