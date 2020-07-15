import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/js/src/collapse';
import 'jquery';
import {
  MAIN_GAME_PLAY_URL,
  BASE_URL,
  STATISTICS_URL,
  VOCABULARY_URL,
  MINI_GAMES_URL,
  PROMO_URL,
  TEAM_URL,
} from '../../constants/urlConstants';
import AuthContext from '../../contexts/auth.context';
import './Header.scss';

const Header = () => {
  const auth = useContext(AuthContext);
  const isAuth = !!auth.token;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <NavLink className="navbar-brand" to={BASE_URL}>
        RS Lang
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {isAuth && (
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to={BASE_URL}>
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={STATISTICS_URL}>
                Statistics
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={VOCABULARY_URL}>
                Vocabulary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={MINI_GAMES_URL}>
                Mini-Games
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink exact className="nav-link" to={PROMO_URL}>
                Promo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink exact className="nav-link" to={TEAM_URL}>
                About Team
              </NavLink>
            </li>
          </ul>
          <button
            className="btn btn-secondary my-2 my-sm-0"
            type="submit"
            onClick={auth.logOut}
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
   </header>  
  );
};

export default Header;
