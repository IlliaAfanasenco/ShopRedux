import {useState} from "react";
import {productSearch} from "../redux/productListSlice.ts";
import type {AppDispatch} from "../redux/store.ts";
import {useDispatch} from "react-redux";


const SearchBar = () => {
    const [query, setQuery] = useState('')
    const dispatch: AppDispatch = useDispatch()

    function handleSumbmit(e) {
        e.preventDefault()
        dispatch(productSearch({query, page:1, limit: 10}))
    }

    function handleChange(e) {
        setQuery(e.target.value)
    }

    return (
        <form onSubmit={handleSumbmit}>
            <input value={query} onChange={handleChange} type="text" name="q" id=""/>
            <button>search</button>
        </form>
    );
};

export default SearchBar;