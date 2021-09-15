import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Autocomplete from "./Autocomplete";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [displaySearchInput, setDisplaySearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [navbarSolid, setNavbarSolid] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", navbarState);
  }, []);

  const navbarState = (e) => {
    if (window.scrollY > 350) setNavbarSolid(true);
    if (window.scrollY < 350) setNavbarSolid(false);
  };

  const navbarClass = `${styles.navbar} ${
    displaySearchInput ? styles.display_search_input : ""
  }`;

  function toggleDisplaySearchInput(e, state) {
    e.stopPropagation();

    if (searchInputValue.trim() !== "") return;

    setDisplaySearchInput(state);
  }

  return (
    <div
      className={
        navbarSolid ? `${navbarClass} ${styles.navbar_solid}` : navbarClass
      }
      onClick={(e) => toggleDisplaySearchInput(e, false)}
    >
      <div className={styles.navbar_container}>
        <div className={styles.header}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            <h2>Movie-Tube</h2>
          </Link>
        </div>
        <div className={styles.search_icon}>
          <i
            className="fas fa-search"
            onClick={(e) => toggleDisplaySearchInput(e, true)}
          ></i>
        </div>
        <div
          className={styles.search_input}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.search_input_icon}>
            <i className="fas fa-search"></i>
          </div>
          <input
            type="text"
            placeholder="Search Movies and TV Shows"
            value={searchInputValue}
            autoFocus
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <Autocomplete
            searchInputValue={searchInputValue}
            setSearchInputValue={setSearchInputValue}
            setDisplaySearchInput={setDisplaySearchInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
