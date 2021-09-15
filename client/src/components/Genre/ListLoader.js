import React from "react";
import styles from "./Genre.module.css";
import PropTypes from "prop-types";

const ListLoader = ({ maxWidth }) => {
  return (
    <div
      className={styles.media}
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : "" }}
    >
      <div className="media-loading-poster">
        <div className="media-loading"></div>
      </div>
      <div className={styles.media_detail} style={{ width: "88%" }}>
        <div className="title-loading">
          <div className="title">
            <div className="media-loading"></div>
          </div>
          <div className="release-date">
            <div className="media-loading"></div>
          </div>
        </div>
        <div className="genre-loading">
          <div className="media-loading"></div>
        </div>
        <div className="overview-loading">
          <div className="media-loading"></div>
        </div>
      </div>
    </div>
  );
};

ListLoader.propTypes = {
  maxWidth: PropTypes.number,
};

export default ListLoader;
