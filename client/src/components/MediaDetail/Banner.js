import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./MediaDetails.module.css";
import Trailer from "./Trailer";
import Rating from "../Rating";
import Spinner from "../../Spinner";
import PropTypes from "prop-types";

const OVERLAY =
  "linear-gradient(to bottom right, rgba(1.96%, 3.53%, 4.71%, 1.00), rgba(1.96%, 3.53%, 4.71%, 0.84))";

const Banner = ({ data: { isLoading, data } }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [trailer, toggleTrailer] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!trailer) {
      document.body.style.overflowY = "scroll";
      let frame = document.getElementById("yt_frame");
      if (frame) {
        let iframeSrc = frame.src;
        frame.src = iframeSrc;
      }
    } else document.body.style.overflowY = "hidden";
  }, [trailer]);

  return (
    <div className={styles.banner}>
      {isLoading ? (
        <div
          className={styles.media}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <div
            className={styles.media}
            style={{
              backgroundImage: `${OVERLAY}, url("${data.backdrop_path}")`,
            }}
          >
            <div className={styles.container}>
              <img
                src={data.poster_path}
                alt={`${data.title}'s-poster'`}
                className={styles.poster}
              />
              <div className={styles.details}>
                <h1 className={styles.title}>{data.title}</h1>
                <div className={styles.secondary_detail}>
                  <p className={styles.date}>{data.date}</p>
                  <p className={styles.genre}>{data.genres}</p>
                  <p className={styles.runtime}>{data.runtime}</p>
                </div>
                <div className={styles.meta}>
                  <Rating
                    rating={data.rating}
                    size={screenWidth < 450 ? 45 : 75}
                  />
                  <button
                    className={styles.trailer}
                    onClick={() => toggleTrailer((prevState) => !prevState)}
                  >
                    <i
                      className="fas fa-play"
                      style={{ marginRight: "5px" }}
                    ></i>{" "}
                    Play Trailer
                  </button>
                </div>
                <p className={styles.tagline}>{data.tagline}</p>
                <div className={styles.overview}>
                  <h3>Overview</h3>
                  <p>{data.overview}</p>
                </div>
                <div className={styles.crew}>
                  <h3>
                    {data.media_type === "movie" ? "Director" : "Creator"}
                  </h3>
                  <p>
                    {data.media_type === "movie"
                      ? data.director_name
                      : data.creator_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Trailer
            trailer={data.trailer}
            displayTrailer={trailer}
            toggleTrailer={toggleTrailer}
          />
        </>
      )}
    </div>
  );
};

Banner.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Banner;
