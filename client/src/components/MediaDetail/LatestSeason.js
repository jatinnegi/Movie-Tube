import { useHistory } from "react-router-dom";
import styles from "./MediaDetails.module.css";
import PropTypes from "prop-types";
import ListLoader from "../Genre/ListLoader";

LatestSeason.propTypes = {
  mediaId: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
};

export default function LatestSeason({ mediaId, data: { isLoading, data } }) {
  const history = useHistory();

  return (
    <div className={styles.latest_season}>
      <p
        style={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          marginBottom: "10px",
        }}
      >
        Latest Season
      </p>
      {isLoading ? (
        <ListLoader maxWidth={950} />
      ) : (
        <div className={styles.latest_season_container}>
          <img src={data.poster_path} alt={`${data.season_number}'s poster`} />
          <div className={styles.season_detail}>
            <h2 className={styles.season_number}>
              Season {data.season_number}
            </h2>
            <h4 style={{ color: "#3f3f3f", fontSize: "0.8rem" }}>
              {data.year} | {data.episode_count} episodes
            </h4>
            <p className={styles.latest_season_overview}>{data.overview}</p>
          </div>
        </div>
      )}
      <p
        className={styles.all_seasons_link}
        onClick={() => history.push(`/tv/${mediaId}/seasons`)}
      >
        View All Seasons
      </p>
    </div>
  );
}
