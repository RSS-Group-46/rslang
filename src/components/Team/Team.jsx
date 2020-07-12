import React from 'react';
import octocatImg from '../../assets/icons/octocat.png';
import linkedinImg from '../../assets/icons/linkedin.png';

import './Team.scss';

import dataTeam from '../../data/dataTeam';

const Team = () => {
  const { data, tasks } = dataTeam;
  const item = () => {
    return data.map((info, index) => {
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
              <a
                href={info.urlGitHub}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={octocatImg} alt="github" />
              </a>
              {info.urlLinked && (
                <a
                  href={info.urlLinked}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinImg} alt="linkedin" />
                </a>
              )}
            </div>
          </div>
          <div className="team-item__skills">
            <h5>{`${info.name} ${info.surname}`}</h5>
            <ul>
              {tasks[index].map((task) => {
                return <li>{task}</li>;
              })}
            </ul>
          </div>
        </article>
      );
    });
  };

  return (
    <div className="team  container">
      <h2 className="team__title">Team members</h2>
      <p className="team__greeting">Best regards, development team!</p>
      <section className="team__list">{item()}</section>
    </div>
  );
};

export default Team;
