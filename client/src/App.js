import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.scss";
import "./styles/colors.scss";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import DiscCardContainer from "./containers/DiscCardContainer";
import SearchOptions from "./components/SearchOptions";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import InfoPage from "./components/InfoPage";

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
            <section>
              <Navbar />
              <Container>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2}>
                    <SearchOptions 
                      handleSearchOptionChange={this.handleSearchOptionChange}
                    />
                  </Grid>
                  <Grid item xs md={10}>
                    <DiscCardContainer 
                      discData={this.state.discs}
                      discCount={this.state.discCount}
                      page={this.state.page}
                      handlePageChange={this.handlePageChange}
                      showLoadingSpinner={this.state.showLoadingSpinner}
                    />
                  </Grid>
                </Grid>
                <Pagination 
                  count={this.state.discCount}
                  page={this.state.page}
                  handlePageChange={this.handlePageChange}
                />
              </Container>
            </section>
          </Route>
        </Switch>
      </Router>
    );
  }
}
