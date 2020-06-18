import React, { useState, createRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardsSettings from './Cards/CardsSettings';
import './Settings.scss';
import { changeWordsPerDayAmount, changeOptions } from '../../redux/actions/settings.actions';
import { pushUserSettings, pullUserSettings, prepareSettingsForApp } from '../../services/settings.service';
import { USER_DATA_STORAGE_NAME } from '../../constants/commonConstants';
import { WORDS_PER_DAY_DEFAULT_VALUE, SETTINS_INITIAL_STATE } from '../../constants/settingsConstants';

const gearSize = 40;
const headerPadding = 10;
const containerWidth = 400;

const getSettingsBodyClassNames = (showSettings) => `card-body ${showSettings ? '' : 'hide'}`;
const getSettingsShift = (showSettings) => showSettings ? 0 : containerWidth - (gearSize + headerPadding * 2);
const getIsSettingsChanged = (settings) => JSON.stringify(settings) !== JSON.stringify(SETTINS_INITIAL_STATE);

const Settings = () => {
  const [updateWordsAmount, setUpdateWordsAmount] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const formInput = createRef();
  const userData = localStorage.getItem(USER_DATA_STORAGE_NAME);

  useEffect(() => {
    if (userData) {
      pullUserSettings(JSON.parse(userData))
        .then(data => {
          if (data) {
            const prepared = prepareSettingsForApp(data);
            dispatch(changeOptions(prepared))
          }
        })
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (userData && getIsSettingsChanged(settings)) {
      pushUserSettings(settings, JSON.parse(userData))
    }
  }, [settings, userData]);

  const handleUpdateWordAmount = () => {
    dispatch(changeWordsPerDayAmount(Number(formInput.current.value) || WORDS_PER_DAY_DEFAULT_VALUE));
    setUpdateWordsAmount(false);
  }

  const handleGearClick = () => {
    setShowSettings(!showSettings);
  }

  const toLearn = (
    <button 
      type="button"
      className="badge badge-pill badge-success"
      onClick={() => setUpdateWordsAmount(true)}
    >
      {settings.wordsPerDay}
    </button>
  );

  const wordsAmountForm = (
    <div className="to-learn_set-form row">
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          id="wordsAmountForm"
          aria-describedby="wordsAmountForm"
          placeholder="1"
          defaultValue={settings.wordsPerDay}
          ref={formInput}
        />
        <button
          className="btn btn-primary input-group-append"
          type="button"
          onClick={handleUpdateWordAmount}
        >
          OK!
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="card mb-3 settings" style={{ left: `-${getSettingsShift(showSettings)}px`, maxWidth: `${containerWidth}px` }}>
        <div className="card-header" style={{ padding: `${headerPadding}px` }}>
          <div>Settings</div>
          <div 
            className="header_gear-logo"
            role="button"
            tabIndex={0}
            style={{ height: `${gearSize}px`, width: `${gearSize}px` }}
            onClick={handleGearClick}
            onKeyDown={handleGearClick}
          />
        </div>
        <div className={getSettingsBodyClassNames(showSettings)}>
          <form>
            <h2 className="settings_to-learn"><div>To learn per day: </div>{updateWordsAmount ? wordsAmountForm : toLearn}</h2>
            <CardsSettings />
          </form>
        </div>
      </div>
    </>
  )
}

export default Settings;