import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import {
  BASE_URL,
  STATISTICS_URL,
  VOCABULARY_URL,
  LEARNED_URL,
  COMPLICATED_URL,
  DELETED_URL,
  MINI_GAMES_URL,
  SPEAKIT_URL,
  PUZZLE_URL,
  SAVANNAH_URL,
  AUDIOCALL_URL,
  SPRINT_URL,
  PROMO_URL,
  TEAM_URL,
  AUTH_URL,
  ERROR,
} from '../../constants/urlConstants';
import Authorization from '../Authorization/Authorization';
import AuthContext from '../../contexts/auth.context';
import useAuth from '../../hooks/auth.hook';
import Team from '../Team/Team';
import Header from '../Header/Header';
import Settings from '../Settings/Settings';
import Puzzle from '../EnglishPuzzle/Puzzle';
import PuzzleWelcomePage from '../EnglishPuzzle/PuzzleWelcomePage';
import Sprint from '../Sprint/Sprint';
import MiniGames from '../MiniGames/MiniGames';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import SpeakItWelcome from '../SpeakIt/SpeakItWelcome/SpeakItWelcome';
import Footer from '../Footer/Footer';

import Statistic from '../Statistic/Statistic';
import MiniGamesStatistics from '../Statistic/Components/MiniGamesStatistics';

import SpeakItTrain from '../SpeakIt/SpeakItTrain/SpeakItTrain';
import Vocabulary from "../Vocabulary/Vocabulary";

import MainGame from '../MainGame/MainGame';

import { PATH_SPEAKIT_TRAIN } from '../SpeakIt/SpeakItTrain/constants/speakItConstants';
import StartPageAudioChallenge from '../AudioChallenge/StartPageAudioChallenge';

import './App.scss';

const App = () => {
  const { token, userId, logIn, logOut } = useAuth();
  const isAuth = !!token;
  return (
    <Router>
      <ErrorBoundary>
        <AuthContext.Provider value={{ token, userId, logIn, logOut, useAuth }}>
          <Header />
          {isAuth && (
            <>
              <Settings />
              <Switch>
                <Route exact path={BASE_URL}>
                  <div>Hello Group 46 !</div>
                  <MainGame />
                </Route>
                <Route exact path={STATISTICS_URL}>
                  <Statistic />
                </Route>
                <Route exact path={STATISTICS_URL + MINI_GAMES_URL}>
                  <MiniGamesStatistics />
                </Route>
                <Route exact path={VOCABULARY_URL + COMPLICATED_URL}>
                  <Vocabulary path={COMPLICATED_URL} />
                </Route>
                <Route exact path={VOCABULARY_URL + DELETED_URL}>
                  <Vocabulary path={DELETED_URL} />
                </Route>
                <Route path={VOCABULARY_URL}>
                  <Vocabulary path={LEARNED_URL} />
                </Route>
                <Route exact path={MINI_GAMES_URL}>
                  <MiniGames />
                </Route>
                <Route exact path={MINI_GAMES_URL + SPEAKIT_URL}>
                  <SpeakItWelcome />
                </Route>
                <Route exact path={MINI_GAMES_URL + SPEAKIT_URL + PATH_SPEAKIT_TRAIN}>
                  <SpeakItTrain />
                </Route>
                <Route exact path={MINI_GAMES_URL + PUZZLE_URL}>
                  <PuzzleWelcomePage />
                </Route>
                <Route exact path={MINI_GAMES_URL + PUZZLE_URL + PLAY_URL}>
                  <Puzzle />
                </Route>
                <Route exact path={MINI_GAMES_URL + SAVANNAH_URL}>
                <div>Savannah</div>
                </Route>
                <Route exact path={MINI_GAMES_URL + AUDIOCALL_URL}>
                  <StartPageAudioChallenge />
                </Route>
                <Route path={MINI_GAMES_URL + SPRINT_URL}>
                  <Sprint />
                </Route>
                <Route exact path={PROMO_URL}>
                  <div>promo</div>
                </Route>
                <Route exact path={TEAM_URL}>
                  <Team />
                </Route>
                <Route path={ERROR}>
                  <ErrorIndicator />
                </Route>
                <Redirect to={BASE_URL} />
              </Switch>
            </>
          )}
          <Footer />
          {!isAuth && (
            <Switch>
              <Route exact path={AUTH_URL}>
                <Authorization />
              </Route>
              <Redirect to={AUTH_URL} />
            </Switch>
          )}
        </AuthContext.Provider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
