import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MiniGameComponent from './MiniGameComponent';
import { pullUserStatistic } from '../../../services/statistic.service';
import { USER_DATA_STORAGE_NAME } from '../../../constants/commonConstants';
import { STATISTICS_URL, MINI_GAMES_URL } from '../../../constants/urlConstants';
import './MiniGamesStatistics.scss';

class MiniGamesStatistics extends Component {
  static prepareMiniGameStatistics(statistics) {
    if (!statistics || !statistics.optional || !statistics.optional.miniGames) {
      return [];
    }
    const gameNames = Object.keys(statistics.optional.miniGames);
    return gameNames.map(name => ({ name, rounds: statistics.optional.miniGames[name] }));
  }

  constructor(props) {
    super(props);
    this.state = {
      miniGames: [],
      goBack: false,
      goToMiniGames: false
    }
  }

  componentDidMount() {
    const userData = localStorage.getItem(USER_DATA_STORAGE_NAME);
    if (userData) {
      pullUserStatistic(JSON.parse(userData))
        .then(data => this.setState({ miniGames: MiniGamesStatistics.prepareMiniGameStatistics(data) }));
    }
  }

  render() {
    const { miniGames, goBack, goToMiniGames } = this.state;
    if (goBack) {
      return <Redirect to={STATISTICS_URL} />
    }
    if (goToMiniGames) {
      return <Redirect to={MINI_GAMES_URL} />
    }
    return (
      <div className="statistics__mini-games-wrapper">
        <div className="statistics__mini-games">
          <button
            type="button"
            className="statistics__mini-games_back-button btn btn-success"
            onClick={() => this.setState({ goBack: true })}
          >
            Back
        </button>
          {!miniGames.length &&
            <div className="alert alert-success">
              <div>Здесь пока ничего нет!</div>
              <button type="button" className="btn btn-info" onClick={() => this.setState({ goToMiniGames: true })}>Поиграть в мини-игры</button>
            </div>
          }
          {miniGames.map((game) => <MiniGameComponent key={game.name} game={game} />)}
        </div>
      </div>
    );
  }
}

export default MiniGamesStatistics;