import React from 'react';
import { Link } from 'react-router-dom';

import './MiniGames.scss';

const dataMiniGames = require('../../data/dataMiniGames.json');

const MiniGames = () => {
  return (
    <div className="games  container">
      <h2 className="games__title">Mini-Games</h2>
      <p className="games__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        nemo nulla praesentium unde alias vero omnis animi vel corporis totam
        harum iusto nesciunt, ipsa eveniet accusamus officia optio. Voluptate,
        accusantium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repudiandae nemo nulla praesentium unde alias vero omnis animi vel
        corporis totam harum iusto nesciunt, ipsa eveniet accusamus officia
        optio. Voluptate, accusantium.
      </p>

      <section className="games__list">
        {dataMiniGames.map((info) => {
          return (
            <Link to={info.link} className="games__item border-primary" key={info.id}>
              <div className="games__image">
                <img src={info.icon} alt="icon" />
              </div>
              <div className="games-item__skills">
                <h5>{`${info.title}`}</h5>
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
