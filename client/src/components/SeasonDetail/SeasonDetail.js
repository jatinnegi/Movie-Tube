import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Episode from "./Episode";
import * as api from "../../api";

import styles from "./SeasonDetail.module.css";
import Spinner from "../../Spinner";

export default function SeasonDetail({ match }) {
  const history = useHistory();
  const { mediaId, seasonNumber } = match.params;
  const [firstSeason, setFirstSeason] = useState(null);
  const [lastSeason, setLastSeason] = useState(null);
  const [seriesPoster, setSeriesPoster] = useState(null);
  const [title, setTitle] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [episodes, setEpisodes] = useState({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    async function getTotalSeasons() {
      try {
        document.title = "Movie-Tube";

        const { data } = await api.getTotalSeasons(mediaId);

        setTitle(data.title);
        setFirstSeason(data.first_season_number);
        setLastSeason(data.last_season_number);
        setSeriesPoster(data.poster_path);
      } catch (error) {
        if (error.response.data.errno === "ECONNRESET")
          setTimeout(() => getTotalSeasons(), 4000);
        else {
          setTitle(null);
          setFirstSeason(null);
          setLastSeason(null);
          setSeriesPoster(null);
        }
      }
    }
    if (!isNaN(+mediaId)) getTotalSeasons();
    return () => {
      setFirstSeason(null);
      setLastSeason(null);
      setSeriesPoster(null);
    };
  }, [mediaId]);

  useEffect(() => {
    async function getEpisodesList() {
      setEpisodes((prevState) => ({
        ...prevState,
        isLoading: true,
        data: [],
      }));
      try {
        const { data } = await api.getEpisodesList(mediaId, seasonNumber);
        setEpisodes((prevState) => ({
          ...prevState,
          isLoading: false,
          data,
        }));
        setErrorMessage(null);
        document.title = `${title} | Season ${
          +seasonNumber === 0 ? "Specials" : seasonNumber
        }`;
      } catch (error) {
        if (error.response.data.errno === "ECONNRESET")
          setTimeout(() => getEpisodesList(), 4000);
        else {
          setEpisodes((prevState) => ({
            ...prevState,
            isLoading: false,
            data: [],
          }));
          setErrorMessage("No data found.");
        }
      }
    }
    if (!isNaN(+seasonNumber) && !isNaN(+mediaId)) getEpisodesList();
    else {
      setEpisodes((prevState) => ({
        ...prevState,
        isLoading: false,
        data: [],
      }));
      setErrorMessage("No data found.");
    }
  }, [mediaId, seasonNumber, title]);

  return (
    <div className={styles.season_detail}>
      <div className={styles.header}>
        {seriesPoster && <img src={seriesPoster} alt="poster" />}
        <div>
          <h3>Season {+seasonNumber === 0 ? "Specials" : seasonNumber}</h3>
          <p onClick={() => history.push(`/tv/${mediaId}/seasons`)}>
            <i className="fas fa-long-arrow-alt-left"></i> Back To Seasons List
          </p>
        </div>
      </div>
      <div className={styles.navigator}>
        {+seasonNumber > +firstSeason ? (
          <span
            onClick={() =>
              history.push(`/tv/${mediaId}/seasons/${+seasonNumber - 1}`)
            }
          >
            <i className="fas fa-long-arrow-alt-left"></i> Previous Season
          </span>
        ) : (
          <span style={{ visibility: "hidden" }}>
            <i className="fas fa-long-arrow-alt-left"></i> Previous Season
          </span>
        )}
        {+seasonNumber < +lastSeason ? (
          <span
            onClick={() =>
              history.push(`/tv/${mediaId}/seasons/${+seasonNumber + 1}`)
            }
          >
            Next Season <i className="fas fa-long-arrow-alt-right"></i>
          </span>
        ) : (
          <span style={{ visibility: "hidden" }}>
            Next Season <i className="fas fa-long-arrow-alt-right"></i>
          </span>
        )}
      </div>
      {episodes.isLoading ? (
        <div
          style={{
            height: "450px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : errorMessage ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 0",
          }}
        >
          <h2>{errorMessage}</h2>
        </div>
      ) : (
        <div className={styles.episodes_list}>
          <p className={styles.episodes_count}>
            Episodes {episodes.data.length}
          </p>
          {episodes.data.map((episode, index) => (
            <Episode
              key={index}
              stillPath={episode.still_path}
              title={episode.title}
              episodeNumber={episode.episode_number}
              airDate={episode.air_date}
              rating={episode.rating}
              writtenBy={episode.written_by}
              directedBy={episode.directed_by}
              overview={episode.overview}
              guestStars={episode.guest_stars}
            />
          ))}
        </div>
      )}
    </div>
  );
}
