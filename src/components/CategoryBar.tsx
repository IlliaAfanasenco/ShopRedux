import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {useEffect} from "react";
import {loadCategory} from "../redux/productListSlice.ts";


const CategoryBar = () => {
    const {categories, loading, error} = useSelector((state: RootState) => state.products)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCategory())
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <select>
                    <option value={"all"}>
                        all categ
                    </option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            )}
            {error && <p>error: {error}</p>}
        </div>
    );
};

export default CategoryBar;