import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './main.css'

class Main extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <main id='main'>
                { this.props.children }
            </main>
        )
    }
}

Main.propTypes = {
    children: PropTypes.node,
  };

export default Main