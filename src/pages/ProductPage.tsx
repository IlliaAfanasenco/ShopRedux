import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {useEffect} from "react";
import {loadProductById} from "../redux/productListSlice.ts";
import {useParams} from "react-router-dom";

const ProductPage = () => {
    const {id} = useParams<{id:string}>()
    const {selected, loading, error} = useSelector((state:RootState)=> state.products)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProductById(Number(id)))
    }, [dispatch]);

    if(loading) return <p>Loading...</p>
    if(error) return  <p>Error {error}</p>
    if(!selected) return <p>No item</p>

    return (
        <div>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <p>{selected.price}</p>
            <p>{selected.rating}</p>

        </div>
    );
};

export default ProductPage;