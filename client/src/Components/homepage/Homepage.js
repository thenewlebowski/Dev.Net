import React, { Component } from 'react';

//=======COMPONENTS========//
import Hero from './hero/Hero';
import Desc from './desc/Desc';
import Hero2 from './hero2/Hero2';
import Desc2 from './desc2/Desc2';

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
