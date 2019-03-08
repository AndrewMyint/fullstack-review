import React from 'react';
import _ from 'lodash';
// console.log('this is uderscore', _);
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = _.debounce(this.onChange.bind(this), 1000, {leading: 'false', trailing: 'true'});
  }

  onChange(e) {
    //  e.persist();
    console.log('*********', e.target.value)
    this.setState({
      term: e.target.value
    });
  }

  search() {
    // console.log(this.state.term)
    this.props.onSearch(this.state.term);
  }

  generateName() {
    var arr = this.props.repos.map((repo) => {
      return <div><a href = {repo.url}>{repo.name}</a></div>
    })
    // arr.unshift("<div>This is a test<div>");
    return arr;
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={(e) => {e.persist();this.onChange(e)}}/>
      <button onClick={this.search.bind(this)}> Add Repos </button>
      <div>
        {this.generateName()}
      </div>
    </div>)
  }
}
//onChnage event inside the input textField might need to use debounce method.

export default Search;