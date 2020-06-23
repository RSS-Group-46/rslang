import React from 'react';
import { Link } from 'react-router-dom';
import speakItImg from '../../assets/icons/speakit.png';

import './MiniGames.scss';

const dataMiniGames = require('../../data/dataMiniGames.json');

const icons = {
  1: speakItImg,
  2: speakItImg,
  3: speakItImg,
  4: speakItImg,
  5: speakItImg,
  6: speakItImg,
};

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
