import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routing/routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes />
      <Footer />
    </Router>
  );
};

export default App;
