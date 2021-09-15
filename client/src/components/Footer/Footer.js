import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as api from "../../api";
import styles from "./Footer.module.css";

const Footer = () => {
  const history = useHistory();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    api
      .getGenresList()
      .then((response) => {
        const { data } = response;

        setGenres([...data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e, genreName) => {
    e.preventDefault();
    const genre = genreName.toLowerCase().replace(/ /g, "-");

    history.push(`/genre/${genre}`);
  };

  return (
    <div className={styles.footer}>
      <h1>Genres</h1>
      <div className={styles.container}>
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={styles.genre}
            onClick={(e) => handleClick(e, genre.name)}
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
