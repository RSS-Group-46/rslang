import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MiniGameComponent from './MiniGameComponent';
import { pullUserStatistic } from '../../../services/statistic.service';
import { USER_DATA_STORAGE_NAME } from '../../../constants/commonConstants';
import { STATISTICS_URL } from '../../../constants/urlConstants';
import './MiniGamesStatistics.scss';

class MiniGamesStatistics extends Component {
  static prepareMiniGameStatistics(statistics) {
    if (!statistics || !statistics.optional || !statistics.optional.miniGames) {
      return [];
    }
    const gameNames = Object.keys(statistics.optional.miniGames);
    return gameNames.map(name => ({ name, rounds: statistics.optional.miniGames[name]}));
  }

  constructor(props) {
    super(props);
    this.state = {
      miniGames: [],
      goBack: false
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
    const { miniGames, goBack } = this.state;
    if (goBack) {
      return <Redirect to={STATISTICS_URL} />
    }
    return (
      // TODO delete style when wrapper will be implemented
      <div className="statistics__mini-games" style={{ margin: "5rem" }}>
        <button 
          type="button" 
          className="statistics__mini-games_back-button btn btn-success" 
          onClick={() => this.setState({ goBack: true })}
        >
          Back
        </button>
        {miniGames.map((game) => <MiniGameComponent key={game.name} game={game} />)}
      </div>
    );
  }
}

export default MiniGamesStatistics;