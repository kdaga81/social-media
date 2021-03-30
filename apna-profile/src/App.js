import React, {Component} from 'react';
import axios from 'axios';
import Loading from './Loading ';
class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      users : [],
      loading : false
    };

    //bind
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers(){
    this.setState({loading : true})
    axios('https://api.randomuser.me/?nat=US&result=5')
    .then(response => this.setState({
      users : [...this.state.users , ...response.data.results],
      loading : false
    }));
  }

  handleSubmit(e){
    e.preventDefault();
    this.getUsers();
    console.log("more users loaded!");
  }

  componentWillMount(){
    this.getUsers();
  }
  
  render(){
    return <div className="App">{!this.state.loading ? 
      this.state.users.map(user => 
      <div>
        <h3>{user.name.first}</h3>
        <p>{user.cell}</p>
        <hr/>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="load more.."/>
        </form>
      </div>
      )
      :
      (<Loading message="Loading..."/>)
    }</div>
  };

}

export default App;




