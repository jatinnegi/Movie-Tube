import Rating from "../Rating";
import { useHistory } from "react-router-dom";
import styles from "./MediaItem.module.css";
import PropTypes from "prop-types";

const OVERLAY = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.75))`;

const MediaItem = ({
  id,
  media_type,
  title,
  rating,
  release_date,
  first_air_date,
  poster_path,
}) => {
  const history = useHistory();

  return (
    <div
      className={styles.media}
      onClick={() => history.push(`/${media_type}/${id}`)}
    >
      <div
        className={styles.poster}
        style={{
          backgroundImage: `${OVERLAY}, url("${poster_path}")`,
        }}
      >
        <div className={styles.rating_container}>
          <Rating rating={rating} size={75} />
        </div>
      </div>
      <div className={styles.details}>
        <h3>{title}</h3>
        <p>
          {media_type === "movie" ? `${release_date}` : `${first_air_date}`}
        </p>
      </div>
    </div>
  );
};

MediaItem.propTypes = {
  id: PropTypes.number.isRequired,
  media_type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  release_date: PropTypes.string,
  first_air_date: PropTypes.string,
  poster_path: PropTypes.string.isRequired,
};

export default MediaItem;
