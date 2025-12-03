import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {useEffect} from "react";
import {loadByProductCategory, loadCategory, } from "../redux/productListSlice.ts";


const CategoryBar = () => {
    const {categories, selectedCategory} = useSelector((state: RootState) => state.products)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCategory())
    }, [dispatch]);


    const handleChange = (event)=>{
        const value = event.target.value
        dispatch(loadByProductCategory({category: value, page: 1, limit: 10}))
    }

    return (
        <div>

                <select value={selectedCategory ?? 'all'} onChange={handleChange}>
                    <option value={"all"}>
                        all categ
                    </option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

        </div>
    );
};

export default CategoryBar;