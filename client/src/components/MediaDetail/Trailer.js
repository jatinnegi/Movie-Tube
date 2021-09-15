import styles from "./MediaDetails.module.css";
import PropTypes from "prop-types";

Trailer.propTypes = {
  trailer: PropTypes.string,
  displayTrailer: PropTypes.bool.isRequired,
  toggleTrailer: PropTypes.func.isRequired,
};

export default function Trailer({ trailer, displayTrailer, toggleTrailer }) {
  return (
    <div
      className={styles.trailer_container}
      style={{
        display: displayTrailer ? "block" : "none",
      }}
    >
      <div className={styles.trailer_holder}>
        <div className={styles.cross}>
          <p>Play Trailer</p>
          <i
            className="fas fa-times"
            onClick={() => toggleTrailer((prevState) => !prevState)}
          ></i>
        </div>
        {trailer ? (
          <iframe
            id="yt_frame"
            width="100%"
            height="100%"
            src={trailer}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        ) : (
          <div
            style={{
              background: "rgba(0,0,0,0.95)",
              color: "#fff",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Sorry this media has no trailer</h2>
          </div>
        )}
      </div>
    </div>
  );
}
