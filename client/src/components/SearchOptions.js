import React from "react";
import "./SearchOptions.scss";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';
import OptionField from "./OptionField";
import DoubleSlider from "./DoubleSlider";

import checkboxOptions from "../utils/checkboxOptions";
import sliderOptions from "../utils/sliderOptions";

export default class SearchOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = initalizeState();

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSliderRelease = this.handleSliderRelease.bind(this);
  }
  
  handleCheckboxChange(event) {
    const name = event.target.name;
    const optionName = event.target.getAttribute("data-option-name");
    const value = event.target.checked;

    this.setState(prevState => ({
      ...prevState,
      checkboxes: {
        ...prevState.checkboxes,
        [optionName]: {
          ...prevState.checkboxes[optionName],
          [name]: value
        }
      }
    }), () => {
      const query = formatQuery(this.state);
      this.props.handleSearchOptionChange(query);
    });
  }

  handleSliderChange(values, key) {
    this.setState(prevState => ({
      ...prevState,
      sliders: {
        ...prevState.sliders,
        [key]: values
      }
    }));
  }

  handleSliderRelease(values, key) {
    this.setState(prevState => ({
      ...prevState,
      sliders: {
        ...prevState.sliders,
        [key]: values
      }
    }), () => {
      const query = formatQuery(this.state);
      this.props.handleSearchOptionChange(query);
    });
  }
  render() {
    const props = {
      checkboxes: this.state.checkboxes,
      sliders: this.state.sliders,
      handleCheckboxChange: this.handleCheckboxChange,
      handleSliderChange: this.handleSliderChange,
      handleSliderRelease: this.handleSliderRelease
    };

    return (
      <div className="search-options">
        <Hidden mdUp>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Filter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Form {...props} />
            </AccordionDetails>
          </Accordion>
        </Hidden>
        <Hidden smDown>
          <Form {...props} />
        </Hidden>
      </div>
    );
  }
}

function Form(props) {
  return (
    <form className="box" style={{ width: "100%" }}>
      {
        Object.keys(checkboxOptions).map(key => {
          return (
            <OptionField
              key={key}
              optionKey={key}
              option={checkboxOptions[key]}
              isChecked={props.checkboxes[key]}
              handleChange={props.handleCheckboxChange}
            />
          ) 
        })
      }
      <br></br>
      {
        Object.keys(sliderOptions).map(key => {
          return (
            <DoubleSlider 
              key={key}
              domain={sliderOptions[key].domain}
              values={props.sliders[key]}
              onUpdate={props.handleSliderChange}
              onChange={props.handleSliderRelease}
              optionName={sliderOptions[key].name}
              stateKey={key}
            />
          );
        })
      }
    </form>
  );
}

function initalizeState() {
  const initialState = {
    checkboxes: {},
    sliders: {}
  };

  for (const key in checkboxOptions) {
    initialState.checkboxes[key] = {};

    checkboxOptions[key].arr.forEach(value => initialState.checkboxes[key][value] = false);
  }

  for (const key in sliderOptions) {
    initialState.sliders[key] = sliderOptions[key].domain;
  }

  return initialState;
}

function formatQuery(state) {
  let queries = [];

  // checkboxes
  for (const key in state.checkboxes) {
    const object = state.checkboxes[key]
    const arr = [];

    for (const property in object) { 
      if (object[property] === true) {
        arr.push(property.toUpperCase().split(" ").join("%20"))
      }
    }
    if (arr.length) {
      queries.push(`${checkboxOptions[key].queryParam}=${arr.join(",")}`)
    }
  }

  // sliders
  for (const key in state.sliders) {
    if (state.sliders[key][0] !== sliderOptions[key].domain[0] ||
        state.sliders[key][1] !== sliderOptions[key].domain[1]) {
      const min = `min${sliderOptions[key].name}=${state.sliders[key][0]}`;
      const max = `max${sliderOptions[key].name}=${state.sliders[key][1]}`;
      queries.push(`${min}&${max}`);
    }
  }

  return queries.join("&");
}
