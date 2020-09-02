import React from "react";
import {
  Link
} from "react-router-dom";

import "./DiscCard.scss";
import imgSrc from "../utils/imgSrc";

export default function DiscCard(props) {
  const link = `/disc/${props.disc._id}`;

  return (
    <div className="disc-card">
      <Link to={link}>
        <div className="img-wrapper">
          <img
            src={`${imgSrc}${props.disc.imgSrc}`} 
            alt={`${props.disc.manufacturer} ${props.disc.name}`}
          />
        </div>
      </Link>
      <div className="card-text">
        <Link to={link}>
          <p>{props.disc.name}</p>
        </Link>
        <div>
          <span className="speed-lighter">{props.disc.speed}</span>
          <span className="glide-lighter">{props.disc.glide}</span>
          <span className="turn-lighter">{props.disc.turn}</span>
          <span className="fade-lighter">{props.disc.fade}</span>
        </div>
      </div>
    </div> 
  );
}
