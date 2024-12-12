import { useContext, useState } from 'react'
import './login.css'
import { Context } from '../../../store/store-context'
import {observer} from "mobx-react-lite";

function Login(){
    const { store } = useContext(Context)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('ky')
        const res = await store.login(login, password)
        console.log(res)
        if(res){
            store.setIsOpenAuth(false)
        }
    }

    return (
        <>
            <h2 className='auth-headers'>Login</h2>
            <div>
                <label htmlFor="login-input">Login</label>
                <input 
                    type="text" 
                    placeholder='Enter login' 
                    id='login-login-input' 
                    className="auth-inputs"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="login-password-input">Password</label>
                <input 
                    type="password" 
                    placeholder='Enter password' 
                    id='login-password-input' 
                    className="auth-inputs"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
            </div>
            <button onClick={() => handleLogin()}>Login</button>
            <p className='auth-links' onClick={() => store.setCurrentAuthOption(false)}>Dont have account yet? Registration</p>
        </>
    )
}

export default observer(Login)