import styles from "./SeasonDetail.module.css";
import PropTypes from "prop-types";

Episode.propTypes = {
  stillPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  airDate: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  writtenBy: PropTypes.string.isRequired,
  directedBy: PropTypes.string.isRequired,
  guestStars: PropTypes.array.isRequired,
};

export default function Episode({
  stillPath,
  title,
  episodeNumber,
  airDate,
  rating,
  overview,
  writtenBy,
  directedBy,
  guestStars,
}) {
  return (
    <div className={styles.episode}>
      <img src={stillPath} alt="" />
      <div className={styles.details}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <p>Episode {episodeNumber}</p>
          <p>{airDate}</p>
          <p>
            {rating ? (
              <>
                <i className="fas fa-star"></i> {rating}
              </>
            ) : (
              "No ratings yet"
            )}
          </p>
        </div>
        <p className={styles.overview}>{overview}</p>
        <div className={styles.crew}>
          <p>
            <span style={{ fontWeight: "bold" }}>Written By</span>: {writtenBy}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Directed By</span>:{" "}
            {directedBy}
          </p>
        </div>
        <div className={styles.guest_stars}>
          <h4>Guest Stars</h4>
          <div className={styles.guest_stars_list}>
            {guestStars.length > 0
              ? guestStars.map((guest, index) => (
                  <div key={index} className={styles.guest_star}>
                    <img src={guest.profile_path} alt="profile" />
                    <div className={styles.names}>
                      <p className={styles.real_name}>{guest.name}</p>
                      <p className={styles.character}>{guest.character}</p>
                    </div>
                  </div>
                ))
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
