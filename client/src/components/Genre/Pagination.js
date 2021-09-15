import React, { useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
    },
  },
  [theme.breakpoints.up("sm")]: {
    root: {
      marginTop: theme.spacing(6),
    },
  },
}));

function PaginationButtons({ setPage, currentPage, totalPages }) {
  const classes = useStyles();
  const [screenWidth, setScreenWidth] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);

    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className={classes.root}>
      <Pagination
        page={currentPage}
        count={totalPages}
        color="primary"
        siblingCount={1}
        showFirstButton
        showLastButton
        size={screenWidth > 550 ? "medium" : "small"}
        onChange={setPage}
      />
    </div>
  );
}

PaginationButtons.propTypes = {
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationButtons;
