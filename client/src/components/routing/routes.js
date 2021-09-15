import { Route, Switch } from "react-router-dom";
import Genre from "../Genre/Genre";
import Home from "../Home/Home";
import MediaDetail from "../MediaDetail/MediaDetail";
import Seasons from "../Seasons/Seasons";
import SeasonDetail from "../SeasonDetail/SeasonDetail";
import Error404 from "../Error404";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/genre/:genreName" component={Genre} />
      <Route exact path="/:mediaType/:mediaId" component={MediaDetail} />
      <Route exact path="/tv/:mediaId/seasons" component={Seasons} />
      <Route
        exact
        path="/tv/:mediaId/seasons/:seasonNumber"
        component={SeasonDetail}
      />
      <Route exact component={Error404} />
    </Switch>
  );
};

export default Routes;
