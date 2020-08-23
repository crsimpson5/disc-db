import React from "react";
import "./OptionField.scss";

export default function OptionField(props) {
  const id = `option-${props.option.name.toLowerCase().split(" ").join("-")}`;

  return (
    <div className="field">
      <label htmlFor={id}><strong>{props.option.name}</strong></label>
      <div id={id}>
        {
          props.option.arr.map(value => {
            return (
              <div className="" key={value}>
                <label className="checkbox">
                  <input 
                    name={value}
                    data-option-name={props.optionKey}
                    type="checkbox"
                    checked={props.isChecked[value]}
                    onChange={props.handleChange}
                  />
                  {value}
                </label>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}