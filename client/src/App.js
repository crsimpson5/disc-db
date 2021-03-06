import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.scss";
import "./styles/colors.scss";

import InfoPage from "./components/InfoPage";
import Main from "./containers/Main";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discs: [],
      discCount: 0,
      page: 1,
      lastQuery: {},
      currentQuery: {},
      queryTimeout: false,
      showLoadingSpinner: true
    };

    this.handleSearchOptionChange = this.handleSearchOptionChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  
  getDiscData(options) {
    let urlToFetch = `/api?${options || ""}`;
    urlToFetch += `&page=${this.state.page}`;

    fetch(urlToFetch, {
      method: "GET"
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        discs: json.body,
        discCount: json.count,
        showLoadingSpinner: false
      });
    })
    .catch(err => console.error(err));
  }

  handleSearchOptionChange(options) {
    this.setState({
      currentQuery: options,
      showLoadingSpinner: true
    });

    if (!this.state.queryTimeout) {
      this.setState({
        page: 1
      }, () => {
        this.getDiscData(options);
      });
      
      this.setState({
        queryTimeout: true,
        lastQuery: options
      }, () => {
        setTimeout(() => {
          this.setState({
            queryTimeout: false,
            showLoadingSpinner: false
          });

          if(this.state.currentQuery !== this.state.lastQuery) {
            this.getDiscData(this.state.currentQuery);
          }
        }, 1000)
      });
    }
  }

  handlePageChange(e, value) {
    this.setState({
      page: value
    }, () => {
      this.getDiscData(this.state.currentQuery);
    });
  }

  componentDidMount() {
    this.getDiscData();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/disc/:id">
            <InfoPage />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    );
  }
}
