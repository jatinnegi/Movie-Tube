import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as api from "../../api";

import Spinner from "../../Spinner";
import styles from "./Seasons.module.css";
import PropTypes from "prop-types";

Seasons.propTypes = {
  match: PropTypes.object.isRequired,
};

export default function Seasons({ match }) {
  const { mediaId } = match.params;
  const history = useHistory();

  const [seasons, setSeasons] = useState({
    isLoading: true,
    poster: "",
    title: "",
    data: [],
  });

  useEffect(() => {
    async function getSeasonsList() {
      try {
        document.title = "Movie-Tube";
        const { data } = await api.getSeasonsList(mediaId);
        document.title = `${data.title} Seasons List`;
        setSeasons((prevState) => ({
          ...prevState,
          isLoading: false,
          poster: data.poster_path,
          title: data.title,
          data: data.data,
        }));
      } catch (error) {
        if (error.response.data.errno === "ECONNRESET")
          setTimeout(() => getSeasonsList(), 4000);
      }
    }

    getSeasonsList();

    return () => {
      setSeasons({
        isLoading: true,
        data: [],
      });
    };
  }, [mediaId]);

  return (
    <div className={styles.seasons}>
      <div className={styles.header}>
        {!seasons.isLoading && (
          <img src={seasons.poster} alt="breaking-bad-poster" />
        )}
        <div>
          <h3>{seasons.title}</h3>
          <p onClick={() => history.push(`/tv/${mediaId}`)}>
            <i className="fas fa-long-arrow-alt-left"></i> Back To Main
          </p>
        </div>
      </div>
      {seasons.isLoading ? (
        <div
          style={{
            height: "400px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div className={styles.seasons_list}>
          {seasons.data.map((season) => (
            <div key={season.id} className={styles.season}>
              <img
                src={season.poster_path}
                alt={`Season ${seasons.season_number} poster`}
              />
              <div className={styles.details}>
                <div
                  className={styles.head}
                  onClick={() =>
                    history.push(
                      `/tv/${mediaId}/seasons/${season.season_number}`
                    )
                  }
                >
                  <h3>
                    {season.name} ({season.year})
                  </h3>
                  <p>{season.episode_count} episodes</p>
                </div>
                <p className={styles.overview}>{season.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
