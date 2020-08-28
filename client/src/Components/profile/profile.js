import React, { Component } from 'react';
import classes from './profile.module.css';
import axios from 'axios';

//Profile Picture
import profilePicture from '../../images/profilePicture.jpg';
    
export default class Profile extends Component {
    state = {
        username: '',
        bio: '',
        langs: [],
        posts: [0,1,2,3,4]
    }

    componentDidMount(){
        console.log(this.props.match.params);
        axios.get('/profile/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username : res.data.user.username,
                    bio: res.data.bio,
                    langs: res.data.lang ? res.data.lang : ['none'],
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

    languages(){
        return this.state.langs.map(lang => (
            <li>{lang}</li>
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
                    
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <h5>Bio</h5>
                                <p style={{paddingRight: '15px'}}>{this.state.bio}</p>
                            </div>
                            <div>
                                <h5>Fluent languages:</h5>
                                <ul>
                                    {this.languages()}
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
