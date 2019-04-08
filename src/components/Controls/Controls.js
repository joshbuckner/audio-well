import React from 'react';
import './Controls.css';

const Controls = (props) => {
  let classNames;
  if (props.isPlaying === 'pause') {
    classNames = 'fa fa-fw fa-pause';
  } else {
    classNames = 'fa fa-fw fa-play';
  }
  
  return (
    <div className="Controls">
      <div onClick={props.onClick} className="Button">
        <i className={classNames}></i>
      </div>
    </div>
  )
}

export default Controls;