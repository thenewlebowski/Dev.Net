import React, { Component } from 'react';

//=======COMPONENTS========//
import Hero from './hero/Hero';
import Desc from './desc/Desc';

export default class Homepage extends Component {
    render() {
        return (
            <div>
                <Hero />
                <Desc />
            </div>
        )
    }
}
