import { useState } from "react";
import { useHistory } from "react-router";
import FilterIcon from "./FilterIcon";
import styles from "./Genre.module.css";
import PropTypes from "prop-types";

const SortBy = ({ genre, sortBy }) => {
  const [filters, toggleFilters] = useState(false);
  const history = useHistory();

  return (
    <div className={styles.filter}>
      <div
        className={styles.filter_header}
        onClick={() => toggleFilters((prevState) => !prevState)}
      >
        <div className={styles.filter_icon}>
          <FilterIcon />
        </div>
        <span>SORT BY</span>
        <div
          className={filters ? `${styles.icon} ${styles.rotate}` : styles.icon}
        >
          <i className="fas fa-chevron-up"></i>
        </div>
      </div>
      <div
        className={
          filters
            ? `${styles.filter_body} ${styles.display_filter_body}`
            : styles.filter_body
        }
      >
        <div
          className={
            sortBy === "popularity"
              ? `${styles.filter_item} ${styles.selected}`
              : styles.filter_item
          }
          onClick={() => {
            toggleFilters(false);
            history.push(`/genre/${genre}?sort_by=popularity`);
          }}
        >
          Popularity
        </div>
        <div
          className={
            sortBy === "rating"
              ? `${styles.filter_item} ${styles.selected}`
              : styles.filter_item
          }
          onClick={() => {
            toggleFilters(false);
            history.push(`/genre/${genre}?sort_by=rating`);
          }}
        >
          Rating
        </div>
        <div
          className={
            sortBy === "latest"
              ? `${styles.filter_item} ${styles.selected}`
              : styles.filter_item
          }
          onClick={() => {
            toggleFilters(false);
            history.push(`/genre/${genre}?sort_by=latest`);
          }}
        >
          Latest
        </div>
        <div
          className={
            sortBy === "oldest"
              ? `${styles.filter_item} ${styles.selected}`
              : styles.filter_item
          }
          onClick={() => {
            toggleFilters(false);
            history.push(`/genre/${genre}?sort_by=oldest`);
          }}
        >
          Oldest
        </div>
      </div>
    </div>
  );
};

SortBy.propTypes = {
  sortBy: PropTypes.string,
  genre: PropTypes.string.isRequired,
};

export default SortBy;
