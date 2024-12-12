import { observer } from "mobx-react-lite";
import DefaultLayout from "../default-layout/default-layout";
import './news.css'
import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/store-context";


function News(){
    const { store } = useContext(Context)
    const [news, setNews] = useState([])
    const [isOpenCreate, setIsOpenCreate] = useState(false)

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        const getProducts = async () => {
            const news = await store.getNews()
            if(news){
                setNews(news)
                // console.log(store.user)
            }
        }

        getProducts()
    }, [store, ])
    return(
        <>
            <DefaultLayout>
                {isOpenCreate && (
                    <>
                        <div id='product-modal-wrapper' onClick={() => setIsOpenCreate(false)}>
                            <div id='product-modal-form' onClick={(event) => {
                                event.stopPropagation()
                            }}>
                                <h2>Create</h2>
                                <input 
                                    type="text"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                                <textarea 
                                    type="text"
                                    id='product-modal-area'
                                    value={text} 
                                    onChange={(event) => setText(event.target.value)}
                                />
                                <button onClick={ async () => {
                                    await store.createNews(store.user.login ? store.user.login : store.googleUser, text, title)
                                    setIsOpenCreate(false)
                                    }}>Create</button>
                            </div>
                        </div>            
                    </>
                )}
                {news && (
                    <>
                        <ul>
                            {news.map((n, index) => {
                                return (
                                    <>
                                        <li key={`${n}-${index}`}>
                                            <h3>{n.author}</h3>
                                            <p>{n.title}</p>
                                            <p>{n.text}</p>
                                        </li>
                                    </>
                                )
                            })}
                        </ul>
                    </>
                )}
                {store.isAuth && store.user.role === 'admin' ? (
                <>
                <button
                    onClick={async () => {
                        setIsOpenCreate(true)
                    }}>
                    Create
                </button>
                </>
                ) : ""}
            </DefaultLayout>
        </>
    )
}

export default observer(News)