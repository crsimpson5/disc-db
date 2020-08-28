import React from "react";
import "./DiscCard.scss";

const src = process.env.IMG_SRC || "/images/";

export default function DiscCard(props) {
  return (
    <div className="disc-card">
      <div className="img-wrapper">
        <div className="placeholder"></div>
        <img
          src={`${src}${props.disc.imgSrc}`} 
          alt={`${props.disc.manufacturer} ${props.disc.name}`}
        />
      </div>
      <div className="card-text">
        <p>{props.disc.name}</p>
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
