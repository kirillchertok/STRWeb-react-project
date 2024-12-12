import { useContext } from "react";
import { Context } from "../../../store/store-context";
import { observer } from "mobx-react-lite";

function ProductList({data, handleDelete, setId, setEditOption}) {
    const {store} = useContext(Context);

    return (
        <ul className='products-list'>
            {data.map((product, index) => (
                <li key={`${product}-${index}`} className='productItem'>
                    <h3>{product.productName}</h3>
                    <p>{product.description}</p>
                    <img
                        style={{width: 200, height: 200, objectFit: "cover", borderRadius: 10}}
                        src={`data:image/png;base64, ${product.img}`}
                        alt="product_image"
                    />
                    <p>{product.price} $</p>
                    {store.user.role === 'admin' && (
                        <>
                            <button onClick={() => handleDelete(product)}>
                                Delete
                            </button>
                            <br />
                            <button onClick={() => setId(product)}>
                                Edit
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default observer(ProductList);