import { useContext, useEffect, useState } from 'react'
import './header.css'
import { Context } from '../../store/store-context'
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

const Header = () => {
    const { store } = useContext(Context)

    const [ user, setUser ] = useState();
    const [ profile, setProfile ] = useState();
    const setData = (data) => {
        setUser(data);
        localStorage.setItem('googleToken', data.access_token)
    }
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setData(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(
        () => {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${localStorage.getItem('googleToken')}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('googleToken')}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        store.setGoogleUser(res.data.email);
                        store.setIsAuth(true)
                    })
                    .catch((err) => console.log(err));
        },
        [ user, store ]
    );
    const logOut = () => {
        store.setIsAuth(false)
        store.setGoogleUser('')
        googleLogout();
        localStorage.removeItem('googleToken');
        setProfile(null);
    };

    return (
        <header id="header">
            <nav id="header-navbar">
                <div id='left-nav-btns'>
                    <Link to='/'>
                    <button 
                        className='left-btns'
                        >
                        Home
                    </button>
                    </Link>
                    <Link to='/products'>
                    <button 
                        className='left-btns'
                        >
                        Products
                    </button>
                    </Link>
                    <Link to='/feedbacks'>
                    <button
                        className='left-btns'
                        >
                        Feedbacks
                    </button>
                    </Link>
                    <Link to='/news'>
                    <button 
                        className='left-btns'
                        >
                        News
                    </button>
                    </Link>
                </div>
                <div id='right-nav-btns'>
                    {store.isAuth ? (
                        <>
                            <div>
                                <button
                                    className='right-btns'
                                    onClick={() => {
                                        if (store.googleUser) {
                                            logOut()
                                            return
                                        }
                                        store.logout(store.user._id)
                                    }}
                                >
                                Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <button
                                    className='right-btns'
                                    onClick={() => store.setIsOpenAuth(true)}
                                >
                                Login
                                </button>
                            </div>
                            <div className='googleAuthContainer'>
                                    {profile ? (
                                        <div className='googleAuthContainer'>
                                            <p>Email: {profile.email}</p>
                                        </div>
                                    ) : (
                                        <button onClick={() => login()}>Sign in with Google</button>
                                    )}
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default observer(Header)