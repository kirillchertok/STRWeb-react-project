import { useContext, useEffect, useRef } from 'react'
import './auth-modal.css'
import { Context } from '../../store/store-context'
import Login from './login/login'
import Registration from './registration/registration'
import {observer} from "mobx-react-lite";

function AuthModal() {
    const { store } = useContext(Context)

    const ref = useRef()

    // useEffect(() => {
    //     const handelClick = (event) => {
    //         const {target} = event;
    //         if(target instanceof Node && !ref.current?.contains(target)){
    //             store.setIsOpenAuth(false)
    //             store.setCurrentAuthOption(true)
    //         }
    //     }

    //     window.addEventListener('click', handelClick)

    //     return () => {
    //         window.removeEventListener('click', handelClick)
    //     }
    // }, [ref])

    const handelClick = () => {
        store.setIsOpenAuth(false)
        store.setCurrentAuthOption(true)
    }

    return (
        <>
            <div id='auth-modal-wrapper' onClick={() => handelClick()}>
                <div ref={ref} id='auth-modal-form' style={{ height: store.currentAuthOption ? "40%" : "45%" }} onClick={(event) => {
                    event.stopPropagation()
                }}>
                    {store.currentAuthOption ? <Login /> : <Registration />}
                </div>
            </div>
        </>
    )
}

export default observer(AuthModal)