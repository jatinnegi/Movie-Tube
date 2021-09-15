import { useEffect, useState } from "react";
import * as api from "../../api";

import MediaItem from "../Media/MediaItem";
import MediaItemLoading from "../Media/MediaItemLoading";

const PopularMovies = () => {
  const [movies, setMovies] = useState({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    async function getPopularMovies() {
      try {
        const { data } = await api.getPopularMovies(20);
        setMovies((prevState) => ({
          ...prevState,
          isLoading: false,
          data,
        }));
      } catch (error) {
        if (error.response.data.errno) {
          const { errno } = error.response.data;

          if (errno === "ECONNRESET")
            setTimeout(() => getPopularMovies(), 4000);
        }
      }
    }
    getPopularMovies();
  }, []);

  const totalItems = [];
  for (let i = 0; i < 20; i++) totalItems.push(i);

  return movies.isLoading
    ? totalItems.map((item) => (
        <div key={item} style={{ height: "350px" }}>
          <MediaItemLoading />
        </div>
      ))
    : movies.data.map((movie) => (
        <MediaItem
          key={movie.id}
          id={movie.id}
          media_type={movie.media_type}
          title={movie.title}
          rating={movie.rating}
          release_date={movie.release_date}
          poster_path={movie.poster_path}
        />
      ));
};

export default PopularMovies;
