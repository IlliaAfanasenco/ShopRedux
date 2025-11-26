import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadProducts} from "../redux/productListSlice.ts";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {Link} from "react-router-dom";

const ProductList = () => {
    const {products, loading, error} = useSelector((state: RootState)=> state.products)
    const  dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProducts())
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {products.map((product) => (
                            <div key={product.id}>
                                <h2>{product.title}</h2>
                                <h3>{product.description}</h3>
                                <p>{product.price}</p>
                                <p>{product.rating}</p>
                                <Link to={`product/${product.id}`}>info</Link>
                            </div>
                        ))}
                </div>
            )}
            {error && <p>error: {error}</p>}
        </div>
    );
};

export default ProductList;