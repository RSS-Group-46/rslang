import React from 'react';
import octocatImg from '../../assets/icons/octocat.png';
import linkedinImg from '../../assets/icons/linkedin.png';

import './Team.scss';

const dataTeam = require('../../data/dataTeam.json');

const Team = () => {
  return (
    <div className="team  container">
      <h2 className="team__title">Team members</h2>
      <p className="team__greeting">Best regards, development team!</p>
      <p className="team__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        nemo nulla praesentium unde alias vero omnis animi vel corporis totam
        harum iusto nesciunt, ipsa eveniet accusamus officia optio. Voluptate,
        accusantium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repudiandae nemo nulla praesentium unde alias vero omnis animi vel
        corporis totam harum iusto nesciunt, ipsa eveniet accusamus officia
        optio. Voluptate, accusantium.
      </p>

      <section className="team__list">
        {dataTeam.map((info) => {
          return (
            <article className="team__item border-primary" key={info.id}>
              <div className="team__icons">
                <img
                  className="team__icon team__icons--avatar"
                  src={info.avatarGit}
                  alt="avatar"
                />
                <span className="team__location">{info.location}</span>
                <div className="team__social">
                  <a href={info.urlGitHub}>
                    <img src={octocatImg} alt="github" />
                  </a>
                  {info.urlLinked && (
                    <a href={info.urlLinked}>
                      <img src={linkedinImg} alt="linkedin" />
                    </a>
                  )}
                </div>
              </div>
              <div className="team-item__skills">
                <h5>{`${info.name} ${info.surname}`}</h5>
                <ul>
                  <li />
                  - project
                  <li />
                  - project
                  <li />
                  - project
                  <li />
                  - project
                  <li />- project
                </ul>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Team;
