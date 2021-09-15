import { useState } from "react";
import styles from "./Popular.module.css";
import Toggler from "../Toggler/Toggler";

import PopularMovies from "./PopularMovies";
import PopularTv from "./PopularTv";

const Popular = () => {
  const [movie, toggleMovie] = useState(true);

  return (
    <div className="container">
      <div className={styles.header}>
        <h1>What's Popular?</h1>
        <Toggler movie={movie} toggleMovie={toggleMovie} />
      </div>
      <div className={styles.container}>
        {movie ? <PopularMovies /> : <PopularTv />}
      </div>
    </div>
  );
};

export default Popular;
