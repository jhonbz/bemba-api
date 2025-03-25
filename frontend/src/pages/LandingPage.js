import React, { useEffect, useState } from "react";

const LandingPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error("Error cargando sesiones:", err));
  }, []);

  // Función para convertir la URL normal a una URL de embebido
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Extrae el ID del video
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div>
      <h1>BEMBA Sessions</h1>
      <div>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session.id} style={{ marginBottom: "20px" }}>
              <h2>{session.titulo}</h2>
              <p>{session.descripcion}</p>
              <iframe
                width="560"
                height="315"
                src={getEmbedUrl(session.url_youtube)}
                title={session.titulo}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No hay sesiones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
