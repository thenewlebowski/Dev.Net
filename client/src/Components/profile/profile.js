import React, { Component } from 'react';
import classes from './profile.module.css';
import axios from 'axios';

//Profile Picture
import profilePicture from '../../images/profilePicture.jpg';
    
export default class Profile extends Component {
    state = {
        username: '',
        bio: '',
        lang: '',
        posts: [0,1,2,3,4]
    }

    componentDidMount(){
        console.log(this.props.match.params);
        axios.get('/profile/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username : res.data.username,
                    bio: res.data.bio,
                    lang: res.data.lang,
                })
            })
    }
    
    recentPosts(){
        return this.state.posts.map( post => (
            <div>
                <div className={classes.post}>
                    <h3>Post Title</h3>
                    <div className={classes.contributerContainer}>
                        <h4 >Contributors</h4>
                        <div className={classes.contributer} />
                        <div className={classes.contributer} />
                        <div className={classes.contributer} />
                    </div>
                </div>
                <p>
                    Consequat pariatur magna cillum aliquip sunt ex esse sunt ex cillum aliqua irure. 
                    Consequat pariatur magna cillum aliquip sunt ex esse sunt ex cillum aliqua irure.
                </p>
            </div>
        ))
    }



    render(){
        return (
            <div className='container'>
                {/* Layout Profile design */}
                {/* Profile Picture */}
                <div className={classes.profileHeader}>
                    <div className={ classes.imgContainer }>
                        <img src={profilePicture}  className={classes.img} alt="Profile Picture"/>
                    </div>
    
                    {/* Description for user */}
                    <div className={classes.profileDesc}>
                        {/* Username */}
                        <h1 className={classes.username}>{this.state.username}</h1>
                    
                        <div style={{display: 'flex'}}>
                            <div>
                                <h5>Bio</h5>
                                <p style={{paddingRight: '15px'}}>Cillum irure veniam elit reprehenderit amet veniam laboris sint id aliqua reprehenderit pariatur. Excepteur eu eu Lorem mollit. Laboris laborum incididunt dolor enim sunt officia occaecat qui dolore quis qui adipisicing. Sit incididunt elit pariatur in pariatur non fugiat cillum sit ullamco aute dolor commodo consectetur. Esse laboris aute aute ad eu. Ut ex consectetur ad et aliqua pariatur laboris proident esse. Elit non labore occaecat tempor cupidatat cupidatat aute Lorem voluptate reprehenderit magna commodo do.</p>
                            </div>
                            <div>
                                <h5>Fluent languages:</h5>
                                <ul>
                                    <li>C#</li>
                                    <li>Javascript</li>
                                    <li>Java</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Recent Converstations / Questions */}
                <h1>Recent Discussions:</h1>
                {/* This will be a forEach loop going over every post user has made */}
                <div>
                    {this.recentPosts()}

                </div>
                {/* Link user and profile via user_id*/}
            </div>
        )
        
    }
    
}
