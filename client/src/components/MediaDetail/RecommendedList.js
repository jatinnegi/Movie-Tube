import MediaItem from "../Media/MediaItem";
import MediaItemLoading from "../Media/MediaItemLoading";
import styles from "./MediaDetails.module.css";
import PropTypes from "prop-types";

RecommendedList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function RecommendedList({ data: { isLoading, data } }) {
  let items = [];
  for (let i = 0; i < 5; i++) items.push(i);

  return (
    <div className={styles.recommended_container}>
      <h2>Also Recommended</h2>
      <div className={styles.recommended_list}>
        {isLoading
          ? items.map((item) => (
              <div key={item} style={{ height: "350px" }}>
                <MediaItemLoading />
              </div>
            ))
          : data.map((media) => (
              <MediaItem
                key={media.id}
                id={media.id}
                media_type={media.media_type}
                rating={media.rating}
                title={media.title}
                release_date={media.release_date}
                first_air_date={media.first_air_date}
                poster_path={media.poster_path}
              />
            ))}
      </div>
      {!isLoading && data.length === 0 && (
        <p style={{ fontWeight: "bold" }}>No data found</p>
      )}
    </div>
  );
}
