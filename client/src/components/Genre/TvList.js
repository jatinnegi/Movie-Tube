import { useEffect, useState } from "react";
import Item from "./Item";
import * as api from "../../api";
import PropTypes from "prop-types";
import ListLoader from "./ListLoader";
import Pagination from "./Pagination";
import styles from "./Genre.module.css";
import { useHistory } from "react-router-dom";

const TOTAL = 20;

const TvList = ({ genreName, sortBy, page }) => {
  const history = useHistory();
  const [tv, setTv] = useState({
    isLoading: true,
    total_pages: 0,
    data: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getTv() {
      try {
        setTv((prevState) => ({
          ...prevState,
          isLoading: true,
        }));

        setMessage("");

        const { data } = await api.getGenreMedia(genreName, "tv", sortBy, page);

        setTv((prevState) => ({
          ...prevState,
          isLoading: false,
          total_pages: data.total_pages,
          data: data.data,
        }));
      } catch (error) {
        if (error.response.data.errno) {
          const { errno } = error.response.data;

          if (errno === "ECONNRESET") setTimeout(() => getTv(), 4000);
        } else {
          setTv((prevState) => ({
            ...prevState,
            isLoading: false,
            total_pages: 0,
            data: [],
          }));
          setMessage(error.response.data.msg);
        }
      }
    }
    if (genreName.trim() !== "") getTv();

    return () =>
      setTv({
        isLoading: true,
        total_pages: 0,
        data: [],
      });
  }, [genreName, sortBy, page]);

  let items = [];
  for (let i = 0; i < TOTAL; i++) items.push(i);

  function setPage(_, value) {
    history.push(
      `/genre/${genreName}?${sortBy ? `sort_by=${sortBy}&` : ``}page=${value}`
    );
  }

  return (
    <>
      <h1 className={styles.msg}>{message}</h1>
      {tv.isLoading
        ? items.map((item) => <ListLoader key={item} />)
        : tv.data.map((movie) => (
            <Item
              key={movie.id}
              id={movie.id}
              media_type={movie.media_type}
              title={movie.title}
              first_air_date={movie.first_air_date}
              genres={movie.genres}
              overview={movie.overview}
              rating={movie.rating}
              poster_path={movie.poster_path}
            />
          ))}
      <Pagination
        setPage={setPage}
        currentPage={page}
        totalPages={tv.total_pages}
      />
    </>
  );
};

TvList.propTypes = {
  genreName: PropTypes.string.isRequired,
  sortBy: PropTypes.string,
  page: PropTypes.number,
};

export default TvList;
