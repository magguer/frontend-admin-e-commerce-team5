//Dependencies
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../redux/productsReducer";
import { addBrands } from "../redux/brandsReducer";
import { addCategories } from "../redux/categoriesReducer";
//CSS
import "../animation/Animations.css";
//Components
import ModalAddProduct from "../components/modals/ModalAddProduct";
import Spinner from "../components/partials/Spinner";
import ProductTableBody from "../components/partials/ProductTableBody";

function Products() {
  document.title = ` LuxeHarmony | Products `;
  const dispatch = useDispatch();
  const [filterSelected, setFilterSelected] = useState("brands");
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [brandFilter, setBrandFilter] = useState(null);
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);
  const handleCloseModalProduct = () => setShowModal(false);
  const handleShowModalProduct = () => setShowModal(true);
  const [inputValue, setInpuValue] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const searchValue = inputValue;
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products/search`,
        data: { searchValue },
        method: "post",
      });
      dispatch(addProducts(response.data));
    };
    getProducts();
  }, [inputValue]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/categories`
      );
      dispatch(addCategories(response.data));
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getBrands = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/brands`
      );
      dispatch(addBrands(response.data));
    };
    getBrands();
  }, []);

  const handleSearch = (value) => {
    setInpuValue(value);
  };

  //////////////////// PASAR FILTROS A REDUX
  useEffect(() => {
    const getProducts = async () => {
      const brand = brandFilter;
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products/filter`,
        data: { brand },
        method: "post",
      });
      dispatch(addProducts(response.data));
    };
    getProducts();
  }, [brandFilter]);

  /////////////////////
  useEffect(() => {
    const getProducts = async () => {
      const category = categoryFilter;
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products/filter`,
        data: { category },
        method: "post",
      });
      dispatch(addProducts(response.data));
    };
    getProducts();
  }, [categoryFilter]);

  return (
    <>
      {showModal && (
        <ModalAddProduct handleCloseModalProduct={handleCloseModalProduct} />
      )}
      <div className="p-5 fade-in">
        <div className="grid tablet:flex w-full justify-center tablet:justify-between items-center gap-3 tablet:px-10">
          <h3 className="font-bold text-2xl">Products</h3>
          {/*           Searcher */}
          <div className="flex gap-3 items-center">
            {/*             Searcher */}
            <div className="bg-bgPrimaryColor px-2 py-1 rounded flex items-center">
              <input
                className="rounded w-30 mobilXS:w-52 laptop:w-72 tablet:mr-2 py-1 px-1"
                type="text"
                name="searcher"
                id="searcher"
                placeholder="Search products"
                onChange={(event) => handleSearch(event.target.value)}
              />
              <button>
                <img className="w-4" src="search-icon.png" alt="" />
              </button>
            </div>
            <button
              onClick={handleShowModalProduct}
              className="bg-bgSecondaryColor text-textPrimary px-3 h-8 rounded text-lg font-semibold"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-white font-semibold flex justify-center tablet:justify-start gap-2 tablet:ml-8 mt-5">
          <button
            onClick={() => setFilterSelected("brands")}
            className={`${
              filterSelected === "brands" &&
              "bg-bgSecondaryColor text-textPrimary rounded"
            } && border-b-2 pb-1 hover:bg-gray-700 px-4 m-0 transition-all duration-200`}
          >
            Brands
          </button>
          <button
            onClick={() => setFilterSelected("categories")}
            className={`${
              filterSelected === "categories" &&
              "bg-bgSecondaryColor text-textPrimary rounded"
            } && border-b-2 pb-1  px-4  m-0 transition-all duration-200`}
          >
            Categories
          </button>

          {/*         Borrar filtro */}
          {categoryFilter || brandFilter ? (
            <div className="hidden tablet:flex ">
              <div className="flex">
                <h2 className="mx-3">⦾</h2>
                <button
                  onClick={() => {
                    setCategoryFilter(null);
                    setBrandFilter(null);
                    setInpuValue(inputValue);
                  }}
                  className={`ml-2 border-b-2 pb-1 border-gray-800 hover:bg-gray-700 px-4 transition-all duration-200`}
                >
                  Borrar filtro
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/*        Filtro Categorias */}
        {filterSelected === "categories" && (
          <div className="px-5 tablet:px-14 z-[0] relative my-5 fade-in grid">
            {!categories ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-2 laptop:grid-cols-4 gap-3 m-auto">
                {categories.map((category) => {
                  return (
                    <div
                      onClick={() => setCategoryFilter(category.name)}
                      key={category._id}
                      className={`${
                        category.name === categoryFilter &&
                        "bg-bgSecondaryColor text-textPrimary rounded"
                      } border-b-2 text-lg font-semibold hover:bg-gray-700 px-1 tablet:px-3 hover:z-0 cursor-pointer text-center transition-all duration-200`}
                    >
                      {category.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {/*        Filtro Marcas */}
        {filterSelected === "brands" && (
          <div className="px-5 tablet:px-14 z-[0] relative my-8 fade-in">
            {!brands ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="flex justify-center items-baseline gap-2 tablet:gap-4">
                {brands.map((brand) => {
                  return (
                    <div
                      onClick={() => setBrandFilter(brand.name)}
                      key={brand._id}
                      className={`${
                        brand.name === brandFilter &&
                        "bg-bgSecondaryColor text-textPrimary rounded"
                      } cursor-pointer text-center text-lg tablet:px-3 font-semibold transition-all duration-200`}
                    >
                      <img
                        className={`${
                          brand.name === brandFilter ? "invert" : ""
                        } w-10 tablet:w-24 my-1 object-contain`}
                        src={`${process.env.REACT_APP_SUPABASE_BUCKET}/${brand.logo2}`}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {products ? (
          <ul className="mt-3 grid gap-1 rounded-lg pb-4">
            {products.map((product, i) => {
              return <ProductTableBody key={i} product={product} />;
            })}
          </ul>
        ) : (
          <div className="w-full flex justify-center mt-24">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
