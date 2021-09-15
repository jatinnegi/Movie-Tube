import styles from "./MediaDetails.module.css";
import PropTypes from "prop-types";

Cast.propTypes = {
  profilePath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default function Cast({ profilePath, name, character }) {
  return (
    <div className={styles.cast_container}>
      <div className={styles.cast}>
        <div
          style={{
            height: "250px",
            width: "100%",
            background: `url("${profilePath}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
          }}
        ></div>
        <div style={{ padding: "10px 10px 0 10px" }}>
          <p className={styles.real_name} style={{ fontSize: "1rem" }}>
            {name}
          </p>
          <p style={{ fontSize: "0.8rem" }}>{character}</p>
        </div>
      </div>
    </div>
  );
}
