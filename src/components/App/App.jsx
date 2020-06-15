import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  BASE_URL,
  STATISTICS_URL,
  VOLCABULARY_URL,
  MINI_GAMES_URL,
  PROMO_URL,
  TEAM_URL,
  SETTINGS_URL,
  AUTH_URL,
  LEARNED_URL,
  COMPICATED_URL,
  DELETED_URL,
  SPEAKIT_URL,
  PUZZLE_URL,
  SAVANNAH_URL,
  AUDIOCALL_URL,
  SPRINT_URL,
} from '../../constants/urlConstants';

import './App.scss';
import Authorization from '../Authorization/Authorization';

const App = () => {
  const isAuth = false;
  return (
    <Router>
      {/* <div>navbar</div> */}
      {isAuth && (
        <Switch>
          <Route exact path={BASE_URL}>
            <div>Hello Group 46 !</div>
          </Route>
          <Route exact path={STATISTICS_URL}>
            <div>statistics</div>
          </Route>
          <Route exact path={VOLCABULARY_URL + LEARNED_URL}>
            <div>learned</div>
          </Route>
          <Route exact path={VOLCABULARY_URL + COMPICATED_URL}>
            <div>complicated</div>
          </Route>
          <Route exact path={VOLCABULARY_URL + DELETED_URL}>
            <div>deleted</div>
          </Route>
          <Route exact path={MINI_GAMES_URL}>
            <div>mini-games</div>
          </Route>
          <Route exact path={MINI_GAMES_URL + SPEAKIT_URL}>
            <div>speakit</div>
          </Route>
          <Route exact path={MINI_GAMES_URL + PUZZLE_URL}>
            <div>puzzle</div>
          </Route>
          <Route exact path={MINI_GAMES_URL + SAVANNAH_URL}>
            <div>savannah</div>
          </Route>
          <Route exact path={MINI_GAMES_URL + AUDIOCALL_URL}>
            <div>audiocall</div>
          </Route>
          <Route exact path={MINI_GAMES_URL + SPRINT_URL}>
            <div>sprint</div>
          </Route>
          <Route exact path={PROMO_URL}>
            <div>promo</div>
          </Route>
          <Route exact path={TEAM_URL}>
            <div>team</div>
          </Route>
          <Route exact path={SETTINGS_URL}>
            <div>settings</div>
          </Route>
          <Redirect to={BASE_URL} />
        </Switch>
      )}
      {!isAuth && (
        <Switch>
          <Route exact path={AUTH_URL}>
            <Authorization />
          </Route>
          <Redirect to={AUTH_URL} />
        </Switch>
      )}
      {/* <div>footer</div> */}
    </Router>
  );
};

export default App;
