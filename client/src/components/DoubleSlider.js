import React from "react";
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'

import "./DoubleSlider.scss";

function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      className="handle"
      style={{ left: `${percent}%` }}
      {...getHandleProps(id)}
    >
    </div>
  )
}

function Track({ source, target, getTrackProps, className }) {
  return (
    <div
      className={`track ${className}`}
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

export default function DoubleSlider(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.optionName}><strong>{props.optionName}</strong></label>
      <div className="flex-box" name={props.optionName}>
        <p>{props.values[0]} &#8212; {props.values[1]}</p>
        <Slider
          className="slider"
          domain={props.domain}
          step={1}
          mode={2}
          values={props.values}
          onUpdate={(values) => props.onUpdate(values, props.stateKey)}
          onChange={(values) => props.onChange(values, props.stateKey)}
        >
          <Rail>
            {({ getRailProps }) => (
              <div className="rail" {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    className={props.optionName.toLowerCase()}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    </React.Fragment>
  );
}
