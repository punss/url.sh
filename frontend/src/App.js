import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Form from './Form';
import Reroute from './Reroute';

class App extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Form} />
                    <Route path="*" component={Reroute} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;