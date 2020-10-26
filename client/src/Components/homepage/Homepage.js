import React, { Component } from 'react';

//=======COMPONENTS========//
import Hero from './hero/Hero';
import Intro from './intro/Intro';

export default class Homepage extends Component {
    render() {
        return (
            <div>
                <Hero />
                <Intro />
            </div>
        )
    }
}
