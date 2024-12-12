import { useContext, useEffect, useState } from 'react'
import './feedbacks.css'
import { Context } from '../../store/store-context'
import DefaultLayout from '../default-layout/default-layout'
import { observer } from 'mobx-react-lite'
import { number } from 'prop-types'

function Feedbacks(){
    const { store } = useContext(Context)
    const [feedbacks, setFeedbacks] = useState(null)

    const [userLogin, setUserLogin] = useState(store.user.userLogin)
    const [text, setText] = useState('')
    const [rate, setRate] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

    const [isOpenCreate, setIsOpenCreate] = useState(false)

    const localOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    };

    useEffect(() => {
        const getProducts = async () => {
            const feedbacks = await store.getFeedbacks()
            if(feedbacks){
                setFeedbacks(feedbacks)
                setFilteredFeedbacks(feedbacks)
                // console.log(store.user)
            }
        }

        getProducts()
    }, [store, ])

    const cancelSearch = () => {
        setSearchValue('');
        setFilteredFeedbacks(feedbacks);
    };

    const search = () => {
        if (searchValue.trim() === '') {
            setFilteredFeedbacks(feedbacks);
        } else {
            const lowerSearchValue = searchValue.toLowerCase();
            const filtered = feedbacks.filter((r) => r.feedbackText.toLowerCase().includes(lowerSearchValue));
            setFilteredFeedbacks(filtered);
        }
    };

    const handleFilter = () => {
        const sorted = [...feedbacks].sort((a, b) => a.feedbackText.localeCompare(b.feedbackText));
        setFilteredFeedbacks(sorted);
    };

    const handleFilterR = () => {
        const sorted = [...feedbacks].sort((a, b) => b.feedbackText.localeCompare(a.feedbackText));
        setFilteredFeedbacks(sorted);
    };

    return (
        <>
            <DefaultLayout>
                {store.isAuth && (
                <>
                    <input
                        value={searchValue}
                        type='text'
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search reviews...'
                    />
                    <button onClick={search}>
                        Search
                    </button>
                    <button onClick={cancelSearch}>
                        Cancel
                    </button>
                    <button onClick={handleFilter}>
                        A-Z
                    </button>
                    <button onClick={handleFilterR}>
                        Z-A
                    </button>
                </>
                )}
                {isOpenCreate && (
                    <>
                        <div id='product-modal-wrapper' onClick={() => setIsOpenCreate(false)}>
                            <div id='product-modal-form' onClick={(event) => {
                                event.stopPropagation()
                            }}>
                                <h2>Create</h2>
                                <input 
                                    type="number"
                                    value={rate}
                                    max={5}
                                    min={1} 
                                    onChange={(event) => setRate(event.target.value)}
                                />
                                <textarea 
                                    type="text"
                                    id='product-modal-area'
                                    value={text} 
                                    onChange={(event) => setText(event.target.value)}
                                />
                                <button onClick={ async () => {
                                    await store.createFeedback(store.user.login ? store.user.login : store.googleUser, text, rate)
                                    setIsOpenCreate(false)
                                    }}>Create</button>
                            </div>
                        </div>            
                    </>
                )}
                {filteredFeedbacks && (
                    <>
                        <ul>
                            {filteredFeedbacks.map((feedback, index) => {
                                return (
                                    <>
                                        <li key={`${feedback}-${index}`}>
                                            <h3>{feedback.userLogin}</h3>
                                            <p>{feedback.feedbackText}</p>
                                            <p>{feedback.rate}/5</p>
                                            <p>{feedback.createdAt}</p>
                                        </li>
                                    </>
                                )
                            })}
                        </ul>
                    </>
                )}
                {store.isAuth && (
                    <>
                        <button
                            onClick={async () => {
                                setIsOpenCreate(true)
                            }}>
                            Create
                        </button>
                    </>
                )}
            </DefaultLayout>
        </>
    )
}

export default observer(Feedbacks)