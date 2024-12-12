import { useContext } from "react"
import Header from "../../components/header/header"
import Main from "../../components/main/main"
import { Context } from "../../store/store-context"
import AuthModal from "../../components/auth-modal/auth-modal"
import { observer } from 'mobx-react-lite'

function DefaultLayout({ children }){
    const { store } = useContext(Context)

    return(
        <>
            { store.isOpenAuth && <AuthModal /> }
            <Header />
            <Main>
                { children }
            </Main>
        </>
    )
}

export default observer(DefaultLayout)