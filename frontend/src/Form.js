import React from 'react';
import './Form.css';

const axios = require('axios')

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url:'',customurl:''};
    this.customUrl = ""
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
      this.customUrl = response.data["message"];
      alert("Your custom URL ins: " + this.customUrl);
    }, (error) => {
      console.log(error);
    })
  }
  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render () {
    const cUrl = this.customUrl;
    if (cUrl === "") {
      // alert("Your custom URL is: " + this.customUrl);
    }
    return (
      <>
      <header className="App-header">
          <h1>
              URL-Shortener
          </h1>
      </header>
  <body className="App-body">
    <form action="send_shortened_url" onSubmit={this.onSubmit}>
      <div>
          <label for="url">Enter your URL</label><br></br>
          <input type="text" name="url" onChange={this.onChange}></input>
      </div>
      <div>
          <label for="custom">Enter your custom URL (Optional)</label><br></br>
          <input type="text" name="customurl" onChange={this.onChange}></input><br></br>
          <button type="submit">Submit</button>
        </div>
      </form>
  </body>
  </>
    );
  }
}

export default Form;
