import React from 'react';
import dataTeam from '../../data/dataTeam';
import octocatImg from '../../assets/icons/octocat.png';
import linkedinImg from '../../assets/icons/linkedin.png';

import './Team.scss';

const Team = () => {
  return (
    <div>
      <h2>Team members</h2>
      <span>Best regards, development team!</span>
      <p>Some text about team</p>

      <ul>
        {dataTeam.map((info) => {
          return (
            <li key={info.id}>
              <div>
                <img src={info.avatarGit} alt="avatar" />
              </div>
              <span>Location: <span>{info.location}</span></span>
              <div>
                <a href={info.urlGitHub}>
                  <img src={octocatImg} alt="github" />
                </a>
                {info.urlLinked === '' ? null : (
                  <a href={info.urlLinked}>
                    <img src={linkedinImg} alt="linkedin" />
                  </a>
                )}
              </div>
              <div className="team-item__skills">
                <h5>{`${info.name} ${info.surname}`}</h5>
                <ul>
                  <li />
                  <li />
                  <li />
                  <li />
                  <li />
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Team;
