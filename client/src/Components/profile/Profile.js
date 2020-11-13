import React, { Component } from 'react';
import axios                from 'axios';

//==========STYLING========//
import { Spring }           from 'react-spring/renderprops'
import classes              from './Profile.module.css';

//========COMPONENTS======//
import ProfileDesc      from './ProfileDesc/ProfileDesc';
import ProfileEdit      from './ProfileEdit/ProfileEdit';
import Loader           from '../reusable/Loader/Loader';
import ImgModOverlay    from '../image/ImgModOverlay';
import Auxiliary        from '../../hoc/Auxiliary';


//Profile Picture
import profilePicture from '../../images/profilePicture.jpg';
    
export default class Profile extends Component {

    state = {
        username : this.props.match.params.username,//string
        profilePic : profilePicture,                //file
        imgModVisible : false,                      //boolean
        editMode : false,                           //boolean
        loading : true,                             //boolean
        profileId : '',                             //string
        timer : 3000,                               //string [timer for animation effect]
        langs : [],                                 //array
        posts : [],                                 //array
        bio : '',                                   //string
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_PROXY + '/p/' + this.props.match.params.username)
            .then(res => {
                setTimeout(() => {
                    console.log(res.data);
                    this.setState({
                        langs       : res.data.lang ? res.data.lang : [],
                        username    : this.props.match.params.username, //username that we searched for in the paramters
                        userId      : res.data.user.id, //id of the user that created the profile
                        bio         : res.data.bio,
                        loading     : false,
                    })    
                }, this.state.timer);
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

    handleUploadImg = (e)=>{
        let imgFormObj = new FormData();

        imgFormObj.append('imageName', 'multer-image-' + Date.now());
        imgFormObj.append('imageData', e.target.files[0]);
        return console.log(imgFormObj);
        this.setState({
            profilePic : URL.createObjectURL(e.target.files[0])
        });

        axios.post(process.env.REACT_APP_PROXY + '/image/uploadbase', imgFormObj)
            .then((data)=> {
                if(data.data.success){
                    alert('Image has been successfully uploaded')
                }
            })
            .catch(err => {
                alert('There was an error uploading your imaged')
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

    handleProfilePic = (profilePic) =>{
        return this.setState({profilePic : profilePic})
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
                visible={this.state.imgModVisible}
                handleUploadImg={this.handleUploadImg}/>

                {!this.state.loading ? //Checks to see if this.state.loading is set to true, if so don't render anything in yet
                <Spring
                    from={{ opacity:0 }}
                    to={{ opacity:1 }}
                >
                    {props =>

                    <div className='container' style={props} >
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
                                editToggle  = { this.handleEditModeToggle }
                                username    = { this.state.username }
                                languages   = { this.languages }
                                data        = { this.state }
                                /> 
                                :  
                                <ProfileDesc 
                                editToggle  = { this.handleEditModeToggle}
                                username    = { this.state.username }
                                editMode    = { this.state.editMode }
                                userId      = { this.state.userId }
                                langs       = { this.state.langs }
                                bio         = { this.state.bio }
                                languages   = { this.languages }
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
                    }
                </Spring>
                :   
                <Loader 
                timer={ this.state.timer }
                delay={ 200 }
                /> }

            </Auxiliary>
        )
        
    }
    
}
