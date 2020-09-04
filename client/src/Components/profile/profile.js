import React, { Component } from 'react';
import classes from './Profile.module.css';
import axios from 'axios';

//========COMPONENTS======//
import ProfileDesc from './ProfileDesc/ProfileDesc';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import ImgModOverlay from '../image/ImgModOverlay';
import Auxiliary from '../../hoc/Auxiliary';


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
        imgModVisible: false,
        editData: {
            username: '',
            bio: '',
            langs: [],
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
                    editData: {
                        username: res.data.user.username,
                        bio: res.data.bio,
                        langs: res.data.lang ? res.data.lang : ['none'],
                        //posts: this.state.username
                    }
                })
            })
            .catch(err => console.log(err));
    }

    handleImgModToggle = () =>{
       return this.setState({ imgModVisible: !this.state.imgModVisible });
    }

    handleChange = (e) =>{
        console.log(e.target.name);
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

    //editMode toggle
    handleEditModeToggle = () =>{
        return this.setState({editMode: !this.state.editMode})
    }

    languages(langs){
        return langs.map(lang => (
            <li>{lang}</li>
        ))
    }

    render(){
        return (
            <Auxiliary>
                <ImgModOverlay
                handleImgModToggle={this.handleImgModToggle}
                visible={this.state.imgModVisible}/>

                <div className='container'>
                    {/* Layout Profile design */}
                    <div className={classes.profileHeader}>
                        <div className={ classes.imgContainer }>
                            <img src={this.state.profilePic}  className={classes.img} alt="Profile Picture"/>
                            { this.state.editMode ? <button 
                                                    className={'btn btnPrimary'}
                                                    onClick={ this.handleImgModToggle }>Upload</button> : null }
                            { this.state.editMode ? <button 
                                                    className={'btn btnWarning'}
                                                    onClick={this.handleImgModToggle }>Resize</button> : null }
                        </div>

                        {this.state.editMode ? 
                        <ProfileEdit
                        editToggle={ this.handleEditModeToggle }
                        editMode={ this.state.editMode }
                        handleChange={ this.handleChange }
                        editData={ this.state.editData }
                        languages={ this.languages }
                        /> : 
                        <ProfileDesc
                        editToggle={ this.handleEditModeToggle}
                        username={ this.state.username }
                        editMode={ this.state.editMode }
                        languages={this.languages}
                        langs={ this.state.langs }
                        bio={ this.state.bio }
                        />}

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
            </Auxiliary>
        )
        
    }
    
}
