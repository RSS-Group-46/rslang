import React from 'react';
import { Link } from 'react-router-dom';
import speakIt from '../../assets/icons/speakit.jpg';
import puzzle from '../../assets/icons/puzzle.jpg';
import savannah from '../../assets/icons/savannah.jpg';
import audiocall from '../../assets/icons/audiocall.jpg';
import sprint from '../../assets/icons/sprint.jpg';
import dataMiniGames from '../../data/dataMiniGames.json';
import './MiniGames.scss';

const icons = {
  1: speakIt,
  2: puzzle,
  3: savannah,
  4: audiocall,
  5: sprint,
  6: speakIt,
};

const MiniGames = () => {
  return (
    <div className="games  container">
      <h2 className="games__title">Mini-Games</h2>
      <p className="games__text">
        Mini games age great to update your pronunciation, speaking and other English skills. Challenge yourself!
      </p>

      <section className="games__list">
        {dataMiniGames.map((info) => {
          return (
            <Link
              to={info.link}
              className="games__item border-primary"
              key={info.id}
            >
              <div className="games__image">
                <img src={icons[info.id]} alt="icon" />
              </div>
              <div className="games-item__skills">
                <h5>{info.title}</h5>
                <p>{info.description}</p>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default MiniGames;
