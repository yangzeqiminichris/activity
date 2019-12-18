import React from "react";
import "./index.scss";

export default function FloorTitle(props) {
  return (
    <div className="ft-content">
      <span className="ft-ball big"></span>
      <span className="ft-ball middle"></span>
      <span className="ft-ball small"></span>
      <div className="ft-body">
        <div className={`ft-title`}>{props.title}</div>
        {props.label && <div className="ft-label">{props.label}</div>}
      </div>
      <span className="ft-ball small"></span>
      <span className="ft-ball middle"></span>
      <span className="ft-ball big"></span>
    </div>
  );
}
