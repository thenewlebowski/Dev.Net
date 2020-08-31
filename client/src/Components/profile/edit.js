import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './edit.module.css';

//Profile Picture --here for format purposes only
import profilePicture from '../../images/profilePicture.jpg';

export default function Edit(props) {
    const [username, setUsername] = useState('ColtonN');
    const [bio, setBio] = useState('Aute dolore labore pariatur velit dolore magna excepteur nulla nisi sunt ut laboris pariatur anim. Laboris nisi ea qui sunt irure anim elit aute. Nulla ipsum pariatur deserunt ut. Mollit sit cupidatat est ad amet. Qui fugiat cillum mollit reprehenderit occaecat aliqua laborum nulla duis sunt consequat cupidatat. Pariatur commodo ipsum anim culpa.');
    const [langs, setLangs] = useState(['C#', 'C++']);
    const [picUrl, setPicUrl] = useState(profilePicture);

    //======State======//
    /**
     * profile attributes x
     * pic x
     *  ->upload new profile image
     * bio x
     * username *this should link to the username from the user
     * languages
     * ? remove recent contributions
     */

    function mapLangs(){
        return langs.map((lang)=>{
            
        })
    }

    useEffect(()=> {
        // axios.get('/profile/' + props.match.params.id)
        //     .then(res => {
        //         setUsername(res.data.user.username);
        //         setBio(res.data.bio);
        //         setlangs(res.data.lang);
        //         setPicUrl({});
        //         console.log('[edit.js] Component mounted');
        //     })
    },[]);

    useEffect(()=>{

    },[langs])

    return (
        <div className='container'>
            <h1 style={{textAlign: 'center'}}>Edit Profile</h1>
            <div className={classes.profileHeader}>
                <div className={classes.imgContainer}>
                    <img src={picUrl} style={{width: '100%'}}/>
                    <button >Upload</button>
                    <button style={{margin: '0 10px'}}>Resize</button>
                </div>
                <form action='#' method='PUT' style={{ width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    
                    <div className={classes.formGroup}>
                        {/* Username */}
                        <label htmlFor='username'>Edit Username:</label>
                        <input
                        onChange={(e)=>setUsername(e.target.value)} 
                        name='username' 
                        className={classes.input} 
                        type='text' 
                        value={username}/>
                    </div>

                    <div className={classes.formGroup}>
                        {/* Bio */}
                        <label htmlFor='bio'>Edit simple autobiography:</label>
                        <textarea 
                        name='bio' 
                        className={classes.textareaInput}
                        onChange={(e)=>setBio(e.target.value)} 
                        value={bio}/>
                        <small><i>Min: 200 words</i></small>
                    </div>

                    <div className={classes.formGroup}>
                        {/* Lang */}
                        <label>Edit languages</label>
                        <input
                        className={classes.input} 
                        type='text'
                        onChange={(e)=> setLangs(e.target.value)}
                        value={langs}/>
                    </div>
                    <div className={classes.formGroup}>
                        <button style={{float: 'right'}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
