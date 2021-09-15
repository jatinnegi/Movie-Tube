import styles from "./Toggler.module.css";
import PropTypes from "prop-types";

const Toggler = ({ movie, toggleMovie }) => {
  return (
    <div className={styles.toggler}>
      <span
        onClick={() => toggleMovie(true)}
        style={{ color: movie ? "#fff" : "#000" }}
      >
        Movie
      </span>
      <span
        onClick={() => toggleMovie(false)}
        style={{ color: !movie ? "#fff" : "#000" }}
      >
        TV
      </span>
      <div
        className={`${styles.active} ${movie ? styles.movie : styles.tv}`}
      ></div>
    </div>
  );
};

Toggler.propTypes = {
  movie: PropTypes.bool.isRequired,
  toggleMovie: PropTypes.func.isRequired,
};

export default Toggler;
