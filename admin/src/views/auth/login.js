import { loginUser } from '../../actions/authActions';
import Footer from '../../containers/Footer';
import { useDispatch, useSelector } from 'react-redux';
import classes from "./login.module.css";
import React, { useState, useEffect } from 'react';
import { 
    CContainer,
    CButton,
    CInput,
    CLabel,
    CFormGroup,
    CForm,
    CJumbotron,
} from '@coreui/react';
import { withRouter } from 'react-router-dom';

function Login(props) {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const submit = () => {
        let data = {
            email,
            password
        }
        dispatch(loginUser(data, props.history))
    } 

    useEffect(()=>{
        if(auth.isAuthenticated){
            props.history.push('/dashboard');
        }
    }, [])

    return (
        <CContainer className={classes.container} fluid>
            <CJumbotron className={classes.jumbotron}>
                <h1 className="display-3">Admin Login</h1>
                <p className="lead">Striving for a better networking future</p>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup>
                        <CLabel htmlFor="nf-email">Email</CLabel>
                        <CInput
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            autoComplete="email"
                            placeholder="Enter Email.."
                            onChange={e => setEmail(e.target.value)}
                            
                        />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="password">Password</CLabel>
                        <CInput
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            autoComplete="password"
                            placeholder="Enter password.."
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </CFormGroup>
                    <CFormGroup className={classes.btnContainer}>
                        <CButton
                            color="info"
                            onClick={() => submit()}
                        >
                            Login
                        </CButton>
                        <CButton
                            color="warning"
                            // onClick={}
                        >
                            Cryptnode
                        </CButton>
                    </CFormGroup>
                </CForm>
            </CJumbotron>

            <Footer fixed={true}/>

        </CContainer>
        
    )
}

export default withRouter(Login);