import React, { Component } from 'react';
import axios from 'axios';
import isEmpty from 'is-empty';

//=======COMPONENTS========//
import Hero from './hero/Hero';
import Desc from './desc/Desc';
import Hero2 from './hero2/Hero2';
import Hero3 from './hero3/Hero3';

//=======FONT AWESOME ICONS=======//
import { faBug, faNewspaper, faBomb, faChevronCircleRight, faTshirt, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';

export default class Homepage extends Component {
    state = {
        recentPost : {},
    }
    //========Component Render========//
    componentDidMount(){
        axios.get(process.env.REACT_APP_PROXY + '/homepage/recentpost')
            .then( res => {
                console.log(res.data)
                this.setState({recentPost: res.data})
            })
            .catch( err=>{
                this.setState({
                    //checks to see if react app is in production and give user friendly
                    recentPost: process.env.REACT_APP_ENVIRONMENT !== "production" ? 
                    {
                        header: "ERROR",
                        body: "err.data",
                        err: true
                    }
                    : 
                    {
                        //for now we handle errors on the client side. ===NOTE=== Look into implementing this on server side
                        header: "Whoops",
                        body: "Our developers have been notified and are trying to solve the solution right now. We may be implementing some new changes that will blow your socks off. Check back in awhile to see if anything has changed",
                        href: '/posts',
                        btnText: 'Take me to the other posts',
                        iconBug: faBug,
                        err: true
                    }
                })
            })
    }
    render() {
        return (
            <div>
                <Hero />
                
                <Desc
                    body ='Software development careers are estimated to grow 50 percent by the year 2025. Our goal is to educate future 
                    developers of up and coming technologies. In our efforts we hope to establish an ecosystem of thriving developers that 
                    continue to grow and keep our ideologies strong by educating their own peers. If you are interested in joining the Dev 
                    Army click the link below.'
                    iconBtn = { faChevronCircleRight }
                    iconHeader = { faConnectdevelop }
                    header ='Connect. Build. Succeed.'
                    textAlign ='left'
                    btnText ='Join Now'
                    href ='/signup'
                    zIndex ='999'
                />
                <Hero2 />
                
                <Desc 
                    body = 'We don’t agree with the idea of paying for education or entertainment. We do still need to pay for our team to 
                    collaborate and research to get you the best information you can get. So instead of supporting us directly from a patrion 
                    account or a donations. Please consider buying some of our merch. You’ll look good and you will be helping advertise what 
                    we do!'
                    header = 'Support the cause'
                    iconHeader = { faTshirt }
                    iconBtn = { faStoreAlt }
                    textAlign = 'right'
                    btnText = 'Shop'
                    href = '/shop'
                    zIndex = '1002'
                />
                <Hero3 />

                {!isEmpty(this.state.recentPost) ? 
                <span>
                    <Desc
                        iconHeader={ this.state.recentPost.err ?  faBug : faNewspaper }
                        iconBtn={ this.state.recentPost.err ? faBomb : faChevronCircleRight }
                        btnText={ this.state.recentPost.btnText }
                        header={ this.state.recentPost.header }
                        body={ this.state.recentPost.body }
                        href={ this.state.recentPost.href }
                        textAlign = 'left'
                        zIndex='1004'
                    />
                    <Hero3 />
                </span> : null}

            </div>
        )
    }
}
