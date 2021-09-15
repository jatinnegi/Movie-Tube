import MediaItemLoading from "../Media/MediaItemLoading";
import styles from "./MediaDetails.module.css";

export default function CastListLoading() {
  return (
    <div className={styles.cast_list_loading}>
      <div style={{ height: "280px" }}>
        <MediaItemLoading />
      </div>
      <div className={styles.second} style={{ height: "280px" }}>
        <MediaItemLoading />
      </div>
      <div className={styles.third} style={{ height: "280px" }}>
        <MediaItemLoading />
      </div>
      <div className={styles.fourth} style={{ height: "280px" }}>
        <MediaItemLoading />
      </div>
      <div className={styles.fifth} style={{ height: "280px" }}>
        <MediaItemLoading />
      </div>
    </div>
  );
}
