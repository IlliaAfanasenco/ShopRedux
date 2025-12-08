import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadProducts} from "../redux/productListSlice.ts";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {Link} from "react-router-dom";
import Pagination from "./Pagination.tsx";
import {addProductToCart} from "../redux/cartSlice.ts";

const ProductList = () => {
    const {products, loading, error, page, limit} = useSelector((state: RootState) => state.products)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProducts({page, limit}))
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
                            <button
                                onClick={() => dispatch(addProductToCart({productId: product.id, quantity: 1}))}>add
                            </button>
                        </div>

                    ))}
                </div>
            )}
            {error && <p>error: {error}</p>}
            <Pagination/>
        </div>
    );
};

export default ProductList;