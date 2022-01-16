
import React, { Component } from "react";
import {
    Jumbotron,
    Button
} from 'react-bootstrap';
export default class Home extends Component {
    constructor(props) {
        super(props);
    
    }
 
    render() {
        return (
            <Jumbotron>
                <h1>Hello!</h1>
                <p>
          Welcome to the home page, start login with below credentials:
          roning1.0@gmail.com, 12345
                </p>
                <p>
                    <Button bsStyle="primary">Read more</Button>
                </p>
            </Jumbotron>
        );
    }
}

