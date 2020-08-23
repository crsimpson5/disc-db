import React from "react";
import "./Pagination.scss";

import MuiPagination from "@material-ui/lab/Pagination";

export default function Pagination(props) {
  if (props.count > 0) {
    return (
      <div className="pagination">
        <p>
          {(props.page - 1) * 20 + 1}-{props.page * 20 > props.count ? (props.page * 20) - (props.page * 20 - props.count) : props.page * 20} of {props.count}
        </p>
        <MuiPagination 
          color="primary"
          shape="rounded"
          count={Math.ceil(props.count / 20)} 
          page={props.page}
          onChange={props.handlePageChange}
        />
      </div>
    );
  } else {
    return <React.Fragment />
  }
}
