import React from "react";
import Toggler from "../Toggler/Toggler";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieList from "./MovieList";
import TvList from "./TvList";
import styles from "./Genre.module.css";
import PropTypes from "prop-types";
import SortBy from "./SortBy";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Genre = ({ match }) => {
  const query = useQuery();
  const [movie, toggleMovie] = useState(true);
  const [genreName, setGenreName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = `Movie-Tube | ${match.params.genreName}`;
    setGenreName(match.params.genreName);
    setSortBy(query.get("sort_by"));
    setPage(query.get("page") ? +query.get("page") : 1);
  }, [match.params.genreName, query]);

  const title = match.params.genreName
    .split("-")
    .map((word) => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className={styles.genre}>
      <h1>{title}</h1>
      <SortBy genre={genreName} sortBy={sortBy} />
      <Toggler movie={movie} toggleMovie={toggleMovie} />
      <div className={styles.media_list}>
        {movie ? (
          <MovieList genreName={genreName} sortBy={sortBy} page={page} />
        ) : (
          <TvList genreName={genreName} sortBy={sortBy} page={page} />
        )}
      </div>
    </div>
  );
};

Genre.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Genre;
