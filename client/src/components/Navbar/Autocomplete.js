import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../../api";
import styles from "./Navbar.module.css";
import PropTypes from "prop-types";

const Autocomplete = ({
  searchInputValue,
  setSearchInputValue,
  setDisplaySearchInput,
}) => {
  const history = useHistory();

  const [searchResults, setSearchResults] = useState({
    isLoading: false,
    data: [],
  });

  useEffect(() => {
    async function getAutocomplete() {
      try {
        const { data } = await api.getAutocomplete(searchInputValue);

        setSearchResults((prevState) => ({
          ...prevState,
          isLoading: false,
          data,
        }));
      } catch (error) {
        const { errno } = error.response.data;
        if (errno === "ECONNRESET") {
        } // setTimeout(() => {
        //   getAutocomplete();
        // }, 4000);
      }
    }
    if (searchInputValue.length > 3) {
      setSearchResults((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      getAutocomplete();
    }
    setSearchResults((prevState) => ({
      ...prevState,
      isLoading: false,
      data: [],
    }));
  }, [searchInputValue]);

  function handleClick(e, mediaType, mediaId) {
    e.preventDefault();
    setSearchInputValue("");
    setDisplaySearchInput(false);
    history.push(`/${mediaType}/${mediaId}`);
  }

  return (
    <ul className={styles.search_results}>
      {searchResults.isLoading ? (
        <></>
      ) : (
        searchResults.data.map((searchResult) => (
          <li
            key={searchResult.id}
            className={styles.search_result}
            onClick={(e) =>
              handleClick(e, searchResult.media_type, searchResult.id)
            }
          >
            <img
              src={searchResult.poster_path}
              alt={searchResult.title}
              className={styles.poster}
            />
            <h4 className={styles.title}>{searchResult.title}</h4>
          </li>
        ))
      )}
    </ul>
  );
};

Autocomplete.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
};

export default Autocomplete;
