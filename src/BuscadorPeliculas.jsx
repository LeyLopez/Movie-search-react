import React, { useState } from "react";

export const BuscadorPeliculas = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "fc102dcd1ab4c5fd3e57aab390180268";

  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPeliculas(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una pelicula"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      <div className="movie-list">
        {Array.isArray(peliculas) && peliculas.length > 0 ? (
          peliculas.map((pelicula) => (
            <div key={pelicula.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
              />
              <h3>{pelicula.title}</h3>
              <p>{pelicula.overview}</p>
            </div>
          ))
        ) : (
          <p>No hay películas para mostrar</p>
        )}
      </div>
    </div>
  );
};
