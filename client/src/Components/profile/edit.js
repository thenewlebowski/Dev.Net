import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Profile Picture --here for format purposes only
import profilePicture from '../../images/profilePicture.jpg';

export default function Edit(props) {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [langs, setlangs] = useState('');
    const [picUrl, setPicUrl] = useState('');

    //======State======//
    /**
     * profile attributes
     * pic
     *  ->upload new profile image
     * bio
     * username *this should link to the username from the user
     * languages
     * ? remove recent contributions
     */

    useEffect(()=> {
        axios.get('/profile/' + props.match.params.id)
            .then(res => {
                setUsername(res.user.username);
                setBio(res.bio);
                setlangs(res.lang);
                setPicUrl('')
            })
    });
    return (
        <div>
            <form>
                <input type='text' />
                <input type='text' />
                <input type='text' />
                <input type='text' />
            </form>
        </div>
    )
}
