import React, { Component } from 'react';
import classes from './profile.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Profile Picture
import profilePicture from '../../images/profilePicture.jpg';
    
export default class Profile extends Component {
    state = {
        profilePic: profilePicture,
        username: '',
        bio: '',
        langs: [],
        posts: [],
        editMode: false,
        editData: {
            username: this.state.username,
            bio: this.state.username,
            langs: this.state.username,
            //posts: this.state.username
        }
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_PROXY + '/profile/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username : res.data.user.username,
                    bio: res.data.bio,
                    langs: res.data.lang ? res.data.lang : ['none'],
                })
            })
            .catch(err => console.log(err));
    }

    handleChange(e){
        this.setState({
            editData:{
                ...this.state.editData,
                [e.target.name] : e.target.value
            }
        })
    }
    componentWillUnmount(){
        //reduce chance of memory leak here by unsubscribing to unnessacery data
    }

    onEditClick = () => {
        //render edit component

    }
    
    //Render recent discussions 
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
                <div className={classes.profileHeader}>
                    <div className={ classes.imgContainer }>
                        <img src={this.state.profilePic}  className={classes.img} alt="Profile Picture"/>
                        { this.state.editMode ? <button>Upload</button> : null }
                        { this.state.editMode ? <button>Resize</button> : null }
                    </div>
                    <div className={classes.profileDesc}>
                        { this.state.editMode ? 
                        <input type="text" 
                        value={this.state.username}/> : 
                        <h1 className={classes.username}>{this.state.username}</h1> }

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <h5>Bio</h5>
                                { this.state.editMode ? 
                                <textarea 
                                value={this.state.bio} 
                                onChange={(e)=>this.handleChange(e)}/> : 
                                <p>{this.state.bio} </p> }
                            </div>
                            
                            <div>
                                <h5>Fluent languages:</h5>
                                <ul>
                                    {this.languages()}
                                </ul>
                            </div>
                            <div>
                                <button onClick={()=>this.setState({editMode: !this.state.editMode})}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Recent Converstations / Questions */}
                <h1>Recent Discussions:</h1>
                {/* This will be a forEach loop going over every post user has made */}
                <div className={classes.recentPosts}>
                    {this.state.posts > 1 ? 
                    this.recentPosts() : 
                    <h1>No recent contribution yet</h1>}
                </div>
                {/* Link user and profile via user_id*/}
            </div>
        )
        
    }
    
}
