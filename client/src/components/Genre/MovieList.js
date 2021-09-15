import { useEffect, useState } from "react";
import Item from "./Item";
import * as api from "../../api";
import PropTypes from "prop-types";
import ListLoader from "./ListLoader";
import styles from "./Genre.module.css";
import Pagination from "./Pagination";
import { useHistory } from "react-router-dom";

const TOTAL = 20;

const MovieList = ({ genreName, sortBy, page }) => {
  const history = useHistory();
  const [movies, setMovies] = useState({
    isLoading: true,
    total_pages: 0,
    data: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        setMovies((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        setMessage("");

        const { data } = await api.getGenreMedia(
          genreName,
          "movie",
          sortBy || "popularity",
          page
        );

        setMovies((prevState) => ({
          ...prevState,
          isLoading: false,
          total_pages: data.total_pages,
          data: data.data,
        }));
      } catch (error) {
        if (error.response.data.errno) {
          const { errno } = error.response.data;

          if (errno === "ECONNRESET") setTimeout(() => getMovies(), 4000);
        } else {
          setMovies((prevState) => ({
            ...prevState,
            isLoading: false,
            total_pages: 0,
            data: [],
          }));
          setMessage(error.response.data.msg);
        }
      }
    }
    if (genreName.trim() !== "") getMovies();

    return () =>
      setMovies({
        isLoading: true,
        total_pages: 0,
        data: [],
      });
  }, [genreName, sortBy, page]);

  let items = [];
  for (let i = 0; i < TOTAL; i++) items.push(i);

  function setPage(_, value) {
    history.push(
      `/genre/${genreName}?${sortBy ? `sort_by=${sortBy}&` : ``}page=${value}`
    );
  }

  return (
    <>
      <h1 className={styles.msg}>{message}</h1>
      {movies.isLoading
        ? items.map((item) => <ListLoader key={item} />)
        : movies.data.map((movie) => (
            <Item
              key={movie.id}
              id={movie.id}
              media_type={movie.media_type}
              title={movie.title}
              release_date={movie.release_date}
              genres={movie.genres}
              overview={movie.overview}
              rating={movie.rating}
              poster_path={movie.poster_path}
            />
          ))}
      <Pagination
        setPage={setPage}
        currentPage={page}
        totalPages={movies.total_pages}
      />
    </>
  );
};

MovieList.propTypes = {
  genreName: PropTypes.string.isRequired,
  sortBy: PropTypes.string,
  page: PropTypes.number,
};

export default MovieList;
