import {observer} from "mobx-react-lite";
import './registration.css'
import { useContext, useState } from "react";
import { Context } from "../../../store/store-context";

function Registration() {
    const { store } = useContext(Context)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('');
    const [secondPassword, setPasswordAgain] = useState('');

    const handleRegistration = async () => {
        console.log(login)
        console.log(password)
        console.log(secondPassword)
        if(password !== secondPassword) return
        const res = await store.registration(login, password, secondPassword)
        if (res){
            store.setIsOpenAuth(false)
        }
    }

    return (
        <>
            <h2 className='auth-headers'>Registration</h2>
            <div>
                <label htmlFor="login-input">Login</label>
                <input 
                    type="text" 
                    placeholder='Enter login' 
                    id='reg-login-input' 
                    className="auth-inputs"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="reg-password-input">Password</label>
                <input 
                    type="password" 
                    placeholder='Enter password' 
                    id='reg-password-input' 
                    className="auth-inputs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="reg-password-confirm-input">Password</label>
                <input 
                    type="password" 
                    placeholder='Enter password again' 
                    id='reg-password-confirm-input' 
                    className="auth-inputs"
                    value={secondPassword}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    />
            </div>
            <button onClick={() => handleRegistration()}>Registrate</button>
            <p className='auth-links' onClick={() => store.setCurrentAuthOption(true)}>Already have an account? Login</p>
        </>
    )
}

export default observer(Registration)