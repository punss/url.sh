import React from "react"

const axios = require('axios');

class Reroute extends React.Component {

constructor(props){
    super(props);
    this.checkPath();
}
    changePath = false;
    redirectUrl = "";

    checkPath() {
        var postUrl = "http://localhost:5000/" + this.props.location.pathname.substring(1)
        axios.post(postUrl).then((response)=> {
            if (response.data["redirect"] === "false") {
                console.log("redirect_home")
                window.location.replace("/")
            } else {
                console.log("redirect_page");
                console.log(response.data['url']);
                if (response.data["url"].startsWith("http")) {
                    window.location.replace(response.data["url"])
                } else {
                window.location.replace("http://" + response.data["url"]);
                }
            }
        })
    }

    render() {
        return (
            <>
            Redirecting. Please wait.
            </>
        )
    }
}


export default Reroute;