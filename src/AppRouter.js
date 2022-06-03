import Home from "./pages/Home/home";
import Game from "./pages/Game/game";
import Open from "./pages/Open/open";
import Final from "./pages/Final/final";
import { Switch, Route, Redirect} from "react-router-dom";

const AppRouter = () => {
  return (
    <div>
        <Switch>
          <Route path="/final/:study/:sleep/:hunger/:game" component={Final} />
          <Route path="/game/:id/:arr/:jurusan/:name" component={Game} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Open} />
          <Route path="/*" component={() => <Redirect to="/" />} />
        </Switch>
    </div>
  );
};

export default AppRouter;
