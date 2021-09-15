import styles from "./Genre.module.css";
import Rating from "../Rating";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const OVERLAY = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1))`;

const Item = ({
  id,
  media_type,
  title,
  genres,
  release_date,
  first_air_date,
  overview,
  rating,
  poster_path,
}) => {
  const history = useHistory();

  return (
    <div
      className={styles.media}
      onClick={() => history.push(`/${media_type}/${id}`)}
    >
      <div className={styles.poster}>
        <div
          className={styles.poster_image}
          style={{
            backgroundImage: `${OVERLAY}, url("${poster_path}")`,
          }}
        ></div>
        <div className={styles.rating}>
          <Rating rating={rating} size={50} />
        </div>
      </div>
      <div className={styles.media_detail}>
        <div className={styles.title}>
          <h3>{title}</h3>
          <p>{media_type === "movie" ? release_date : first_air_date}</p>
        </div>
        <span className={styles.genre_list}>{genres}</span>
        <p className={styles.overview}>{overview}</p>
      </div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  media_type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  first_air_date: PropTypes.string,
};

export default Item;
