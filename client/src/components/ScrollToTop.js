import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
}

ScrollToTop.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(ScrollToTop);
