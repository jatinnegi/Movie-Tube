import styles from "./Carousel.module.css";
import Rating from "../Rating";
import PropTypes from "prop-types";

const OVERLAY = `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75))`;

const Frame = ({ id, media_type, title, overview, rating, backdrop_path }) => {
  return (
    <div
      className={styles.frame}
      style={{
        backgroundImage: `${OVERLAY}, url("${backdrop_path}")`,
      }}
    >
      <div className={styles.details}>
        <div className={styles.main}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.overview}>{overview}</p>
        </div>
        <div className={styles.rating}>
          <Rating rating={rating} size={80} />
        </div>
      </div>
    </div>
  );
};

Frame.propTypes = {
  id: PropTypes.number.isRequired,
  media_type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  backdrop_path: PropTypes.string.isRequired,
};

export default Frame;
