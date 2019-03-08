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

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: '/',
      method: 'POST',
      data: term,
      contentType: 'text/plain',
      success: (data) => {
        console.log('this is data from server', data);
        // might need to call setState();
      },
      error: (err) => {
        console.log('this is error from server', err);
      }
    });
    // make ajax get request to server
    // call setState with the data from res of server, not sure
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));