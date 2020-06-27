import React from 'react';
import './Form.css';
import "react-awesome-button/dist/styles.css";
import TextField from "@material-ui/core/TextField"
import Button from '@material-ui/core/Button'
const axios = require('axios')

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url:'',customurl:''};
  }
  onSubmit = (event) => {
    event.preventDefault();
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
    console.log("You are submitting the form with:" + this.state.url + ", " + this.state.customurl);
    axios.post("http://localhost:5000/", this.state, headers).then((response) => {
      console.log(response.data["message"]);
      var customUrl = response.data["message"];
      alert("Your custom URL ins: " + customUrl);
    }, (error) => {
      console.log(error);
    })
  }
  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render () {
    return (
      <>
      <div className="content">
      <header className="App-header">
          <h1>
              URL-Shortener
          </h1>
      </header>
  <body className="App-body">
    <form id="send_shortened_url" onSubmit={ this.onSubmit }>
      <div className="Url-Input">
          <TextField required variant='outlined' name='url' label="Full URL" onChange={this.onChange} /> <br/><br/>
      </div>
      <div>
          <TextField variant='outlined' name='customurl' label="Custom URL" onChange={this.onChange} /> <br/><br/>
      </div>
      <div>
          <Button type ='submit' variant='contained' color="primary">Shorten!</Button>
        </div>
      </form>
  </body>
  </div>
  </>
    );
  }
}

export default Form;
