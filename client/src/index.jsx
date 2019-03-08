import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }
  componentDidMount() {

  }
  get() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: (data) => {
        console.log('this is data from gt server', data);
        // might need to call setState();
        this.setState({
          repos : data.slice()
        })
      },
      error: (err) => {
        console.log('this is error from server', err);
      }
    });
  }
  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: term,
      contentType: 'text/plain',
      success: () => {
        this.get();
      },
      error: (err) => {
        console.log('this is error from server', err);
      }
    });
    // make ajax get request to server
    // call setState with the data from res of server, not sure
  }

  render () {
    console.log('********repostsate', this.state.repos)
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));