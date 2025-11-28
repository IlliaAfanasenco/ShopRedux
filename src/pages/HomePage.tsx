import ProductList from "../components/ProductList.tsx";
import SearchBar from "../components/SearchBar.tsx";
import CategoryBar from "../components/CategoryBar.tsx";


const HomePage = () => {
    return (
        <div>
            <SearchBar/>
            <CategoryBar/>
            <ProductList/>
        </div>
    );
};

export default HomePage;