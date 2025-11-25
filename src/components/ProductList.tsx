import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadProducts} from "../redux/productListSlice.ts";
import type {AppDispatch, RootState} from "../redux/store.ts";

const ProductList = () => {
    const {products, loading, error} = useSelector((state: RootState)=> state.products)
    const  dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProducts())
    }, [dispatch]);

    return (
        <div>
            {products.map((product) => (
                <div>
                    <h2>{product.title}</h2>
                    <h3>{product.description}</h3>
                    <p>{product.price}</p>
                    <p>{product.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;