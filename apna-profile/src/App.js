import React, {Component} from 'react';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      users : [],
      loading : false
    };
  }

  getUsers(){
    this.setState({loading : true})
    axios('https://api.randomuser.me/?nat=US&result=5')
    .then(response => this.setState({
      users : response.data.results,
      loading : false
    }));
  }

  componentWillMount(){
    this.getUsers();
  }
  
  render(){
    return <div className="App">{!this.state.loading ? 
      this.state.users.map(user => <div>{user.cell}</div>)
      :'Loading'
    }</div>;
  }

}

export default App;




