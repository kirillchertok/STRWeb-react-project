import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from 'react';
import { Context } from './store/store-context';
import Products from './pages/products/products';
import Feedbacks from './pages/feedbacks/feedbacks';
import News from './pages/news/news';

function App() {
  const { store } = useContext(Context)

  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [store])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/feedbacks' element={<Feedbacks />} />
        <Route path='/news' element={<News />} />
      </Routes>
    </>
  )
}

export default observer(App)
