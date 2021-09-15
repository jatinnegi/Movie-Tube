import styles from "./MediaDetails.module.css";
import PropTypes from "prop-types";
import Spinner from "../../Spinner";

Meta.propTypes = {
  mediaType: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default function Meta({ mediaType, data: { isLoading, data } }) {
  return (
    <div className={styles.meta_data}>
      {isLoading ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div className={styles.meta_container}>
          <div className={styles.status}>
            <h3>Status</h3>
            <p>{data.status}</p>
          </div>{" "}
          <div className={styles.original_language}>
            <h3>Original Language</h3>
            <p>{data.original_language}</p>
          </div>
          {mediaType === "movie" ? (
            <>
              <div className={styles.type}>
                <h3>Budget</h3>
                <p>{data.budget}</p>
              </div>
              <div className={styles.type}>
                <h3>Revenue</h3>
                <p>{data.revenue}</p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.type}>
                <h3>Type</h3>
                <p>{data.type}</p>
              </div>
              <div className={styles.networks}>
                <h3>Networks</h3>
                {data.networks.length > 0
                  ? data.networks.map((network, index) => (
                      <div key={index} className={styles.network}>
                        <img
                          src={network}
                          alt={"Network poster"}
                          height="25px"
                        />
                      </div>
                    ))
                  : "-"}
              </div>
            </>
          )}
          <div className={styles.keywords}>
            <h3>Keywords</h3>
            {data.keywords.length > 0
              ? data.keywords.map((keyword, index) => (
                  <span key={index} className={styles.keyword}>
                    {keyword}
                  </span>
                ))
              : "-"}
          </div>
        </div>
      )}
    </div>
  );
}
