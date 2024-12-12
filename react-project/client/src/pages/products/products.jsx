import { observer } from 'mobx-react-lite'
import DefaultLayout from '../default-layout/default-layout'
import './products.css'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/store-context'
import ProductList from './product-list/product-list'

function Products(){
    const { store } = useContext(Context)
    const [products, setProducts] = useState([])
    const [windowOpen, setWindowOpen] = useState(false)
    const [windowOption, setWindowOption] = useState('Create')
    const [pName, setPName] = useState("");
    const [pDescription, setPDescription] = useState("");
    const [pImage, setPImage] = useState("");
    const [pPrice, setPPrice] = useState(0);
    const [pId, setPId] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            const products = await store.getProducts()
            if(products){
                setProducts(products)
            }
        }

        getProducts()
    }, [store, ])

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.replace(/^data:.+;base64,/, '');
                setPImage(base64String);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (product) => {
        await store.deleteProduct(product._id)
    }
    const handleEdit = async () => {
        const response = await store.editProduct(
            store.user._id,
            pId,
            pName,
            pDescription,
            pPrice,
            pImage
        )
        if(response) {
            setWindowOpen(false);
        }
        window.location.reload()
    }

    const setId = (product) => {
        setPId(product._id)
        const prd = products.filter((product) => product._id === product._id)[0]
        setPName(prd.productName)
        setPDescription(prd.description)
        setPPrice(prd.price)
        setPImage(prd.img)
        setWindowOpen(true)
        setEditOption()
    }

    const setCreateOption = () => {
        setWindowOption('Create')
    }

    const setEditOption = () => {
        setWindowOption('Edit')
    }

    return (
        <DefaultLayout>
            {windowOpen && (
                <>
                    <div id='product-modal-wrapper' onClick={() => setWindowOpen(false)}>
                        <div id='product-modal-form' onClick={(event) => {
                            event.stopPropagation()
                        }} style={{ height: windowOption === 'Create' ? "50%" : "70%" }}>
                            <h2>Create/Edit</h2>
                            <input 
                                type="text"
                                value={pName} 
                                onChange={(event) => setPName(event.target.value)}
                            />
                            <input 
                                type="number"
                                value={pPrice} 
                                onChange={(event) => setPPrice(event.target.value)}
                            />
                            <textarea 
                                type="text"
                                id='product-modal-area'
                                value={pDescription} 
                                onChange={(event) => setPDescription(event.target.value)}
                            />
                            <input 
                                type="file"
                                onChange={(event) => handleFileChange(event)}
                            />
                            {pImage && (
                                <img 
                                    src={`data:image/png;base64, ${pImage}`}
                                    alt="Uploaded" 
                                    style={{ maxWidth: '300px', maxHeight: '300px' }}
                                />
                            )}
                            <button onClick={() => {
                                if(windowOption === 'Create'){
                                    store.createProduct(store.user._id, pName, pDescription, pPrice, pImage)
                                }
                                else{
                                    handleEdit()
                                }
                                setWindowOpen(false)
                                }}>{windowOption}</button>
                        </div>
                    </div>            
                </>
            )}
            <ProductList data={products} handleDelete={handleDelete} handleEdit={handleEdit} setId={setId}/>

            {store.isAuth && store.user.role === 'admin' ? (
                <>
                <button className='createBtn' onClick={() => {
                    setWindowOpen(true)
                    setCreateOption()
                }
                }>
                    Create
                </button>
                </>
                ) : ""}
        </DefaultLayout>
    )
}

export default observer(Products)