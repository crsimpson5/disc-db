import React from "react";
import "./DiscCardContainer.scss";

import DiscCard from "../components/DiscCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default class DiscCardContainer extends React.Component {
  renderDiscPage() {
    return (
      <div className="disc-container">
        {this.props.discData.map(disc => {
          return (
            <DiscCard className="disc-card"
              key={disc.name}
              disc={disc}
            />
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.props.showLoadingSpinner ? (
            <LoadingSpinner />
          ) : (
            Array.isArray(this.props.discData) && this.props.discData.length ? (
              this.renderDiscPage()
            ) : (
              <p>No results found.</p>
            )
          )
        }
      </div>
    );
  }
};
