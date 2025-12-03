import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {loadByProductCategory, loadProducts, productSearch} from "../redux/productListSlice.ts";



const Pagination = () => {
    const {total, limit, selectedCategory, query, page} = useSelector((state: RootState) => state.products)
    const dispatch: AppDispatch = useDispatch()

    const pageCount = Math.ceil(total / limit) || 1

    const handleChange = (nextPage) => {
        if (nextPage < 1 || nextPage > pageCount) {
            return
        }
        if (selectedCategory) {
            dispatch(loadByProductCategory({category: selectedCategory, page: nextPage, limit}))
            console.log(pageCount)
            return;
        }
        if (query){
            dispatch(productSearch({query, page: nextPage, limit}))
            console.log(pageCount)
            return;
        }

        dispatch(loadProducts({page: nextPage, limit}))
    }


    return (
        <div>
            {Array.from({length: pageCount}).map((_, item) => {
                const myKey = item + 1
                return (
                    <button onClick={() => handleChange(myKey)} key={myKey}>{myKey}</button>
                )
            })}

        </div>
    );
};

export default Pagination;