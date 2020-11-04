import React, { Component } from 'react';

//=======COMPONENTS========//
import Hero from './hero/Hero';
import Desc from './desc/Desc';
import Hero2 from './hero2/Hero2';
import Hero3 from './hero3/Hero3';

export default class Homepage extends Component {
    render() {
        return (
            <div>
                <Hero />
                <Desc />
                <Hero2 />
                <Desc2 />
            </div>
        )
    }
}
                <Hero3 />
