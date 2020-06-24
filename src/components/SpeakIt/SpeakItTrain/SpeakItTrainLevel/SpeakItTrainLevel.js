import React from 'react';

import './SpeakItTrainLevel.scss';

const levels = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

let currentTrainLevel = 1;

const SpeakItTrainLevel = () => {
  const handleCheck = (event) => {
    const clickedElement = event.target;

    if (currentTrainLevel === event.target.id) {
      return;
    }

    if (event.target.tagName === 'LI') {
      const trainLevelElements = [
        ...document.querySelectorAll('.train-levels__level'),
      ];
      trainLevelElements.forEach((el) =>
        el.classList.remove('train-levels__level--active')
      );
  
      clickedElement.classList.add('train-levels__level--active');
  
      currentTrainLevel = event.target.id;
    }
    console.log('currentTrainLevel ', currentTrainLevel);
  };

  const createItem = () => {
    return levels.map((item, index) => {
      return (
        <li
          key={item.id}
          onClick={handleCheck}
          role="presentation"
          className={`${
            index === 0
              ? 'train-levels__level train-levels__level--active'
              : 'train-levels__level'
          }`}
          id={item.id}
        />
      );
    });
  };

  return (
    <div className="train-page  container">
      <ul className="train-levels">{createItem()}</ul>
    </div>
  );
};

export default SpeakItTrainLevel;
