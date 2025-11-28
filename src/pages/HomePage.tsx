import ProductList from "../components/ProductList.tsx";
import SearchBar from "../components/SearchBar.tsx";


const HomePage = () => {
    return (
        <div>
            <SearchBar/>
<ProductList/>
        </div>
    );
};

export default HomePage;