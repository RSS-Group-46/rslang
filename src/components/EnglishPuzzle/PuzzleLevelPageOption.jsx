import React from 'react';

const levels = [...Array(6).keys()];
const pages = [...Array(30).keys()];

const PuzzleLevelPageOption = (props) => {
  const { level, page, useUserWords, doChangeLevel, doChangePage, doCheckUseUserWords } = props;
  return (
    <form>
      <div className="form-group puzzle-options__element">
        <label htmlFor="puzzle-level element_label">level</label>
        <select className="form-control" id="puzzle-level" value={level} onChange={doChangeLevel}>
          {levels.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="form-group puzzle-options__element">
        <label htmlFor="puzzle-page element_label">page</label>
        <select className="form-control" id="puzzle-page" value={page} onChange={doChangePage}>
          {pages.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="form-group puzzle-options__element">
        <div className="custom-control custom-checkbox element_label">
          <input
            type="checkbox"
            className="custom-control-input"
            id="puzzle-user-words"
            checked={useUserWords}
            onChange={doCheckUseUserWords}
          />
          <label className="custom-control-label" htmlFor="puzzle-user-words" >use user words</label>
        </div>
      </div>
    </form>
  )
}

export default PuzzleLevelPageOption;