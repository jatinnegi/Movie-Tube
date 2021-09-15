import { useEffect, useState } from "react";
import Banner from "./Banner";
import PropTypes from "prop-types";
import Meta from "./Meta";
import CastList from "./CastList";
import RecommendedList from "./RecommendedList";
import * as api from "../../api";

import styles from "./MediaDetails.module.css";
import LatestSeason from "./LatestSeason";

const MediaDetail = ({ match }) => {
  const { mediaType, mediaId } = match.params;

  const [banner, setBanner] = useState({
    isLoading: true,
    data: null,
  });
  const [cast, setCast] = useState({
    isLoading: true,
    data: null,
  });
  const [meta, setMeta] = useState({
    isLoading: true,
    data: null,
  });
  const [recommendedList, setRecommendedList] = useState({
    isLoading: true,
    data: null,
  });
  const [latestSeason, setLatestSeason] = useState({
    isLoading: true,
    data: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function getMediaDetails() {
      try {
        document.title = "Movie-Tube";
        setBanner((prevState) => ({
          ...prevState,
          isLoading: true,
          data: null,
        }));
        setCast((prevState) => ({
          ...prevState,
          isLoading: true,
          data: null,
        }));
        setMeta((prevState) => ({
          ...prevState,
          isLoading: true,
          data: null,
        }));
        setRecommendedList((prevState) => ({
          ...prevState,
          isLoading: true,
          data: null,
        }));
        setLatestSeason((prevState) => ({
          ...prevState,
          isLoading: true,
          data: null,
        }));

        const { data } = await api.getMediaDetails(mediaType, mediaId);

        document.title = data.banner.title;

        setBanner((prevState) => ({
          ...prevState,
          isLoading: false,
          data: data.banner,
        }));
        setCast((prevState) => ({
          ...prevState,
          isLoading: false,
          data: data.cast,
        }));
        setMeta((prevState) => ({
          ...prevState,
          isLoading: false,
          data: data.meta_data,
        }));
        setLatestSeason((prevState) => ({
          ...prevState,
          isLoading: false,
          data: data.latest_season,
        }));
        setRecommendedList((prevState) => ({
          ...prevState,
          isLoading: false,
          data: data.recommended,
        }));
        setErrorMessage(null);
      } catch (error) {
        if (error.response.data.errno) {
          const { errno } = error.response.data;

          if (errno === "ECONNRESET") setTimeout(() => getMediaDetails(), 2000);
        } else {
          setErrorMessage("No data found.");
          setBanner((prevState) => ({
            ...prevState,
            isLoading: false,
            data: [],
          }));
          setCast((prevState) => ({
            ...prevState,
            isLoading: false,
            data: [],
          }));
          setMeta((prevState) => ({
            ...prevState,
            isLoading: false,
            data: [],
          }));
          setLatestSeason((prevState) => ({
            ...prevState,
            isLoading: false,
            data: [],
          }));
          setRecommendedList((prevState) => ({
            ...prevState,
            isLoading: false,
            data: [],
          }));
        }
      }
    }
    getMediaDetails();
  }, [mediaType, mediaId]);

  return errorMessage ? (
    <div
      style={{
        height: "500px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{errorMessage}</h1>
    </div>
  ) : (
    <>
      <Banner data={banner} />
      <div className={styles.other_info}>
        <CastList data={cast} />
        <Meta mediaType={mediaType} data={meta} />
      </div>
      {mediaType === "tv" && (
        <LatestSeason mediaId={+mediaId} data={latestSeason} />
      )}
      <RecommendedList data={recommendedList} />
    </>
  );
};

MediaDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MediaDetail;
