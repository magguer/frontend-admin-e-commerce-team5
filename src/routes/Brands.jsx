import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/partials/Spinner";
import BrandTableBody from "../components/partials/BrandTableBody";
import "../animation/Animations.css";
import ModalCreateBrand from "../components/modals/ModalCreateBrand";
import { useSelector } from "react-redux";

function Brands() {
  document.title = ` LuxeHarmony | Brands `;
  const [searchBrand, setSearchBrand] = useState("");
  const [brands, setBrands] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModalBrand = () => setShowModal(false);
  const handleShowModalBrand = () => setShowModal(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getBrands = async () => {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${user.admin.token}`,
        },
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/brands/search`,
        data: { searchBrand },
      });
      setBrands(response.data);
    };
    getBrands();
  }, [searchBrand][brands]);

  return (
    <>
      {showModal && (
        <ModalCreateBrand
          handleCloseModalBrand={handleCloseModalBrand}
          setBrands={setBrands}
        />
      )}
      <div className="p-5 fade-in">
        <div className="flex w-full justify-between items-center gap-3 px-10">
          <h3 className="font-bold text-2xl">Brands</h3>
          <div className="flex gap-3 items-center">
            <div className="bg-bgPrimaryColor px-2 py-1 rounded flex items-center">
              <input
                className="rounded w-72 mr-2 py-1 px-1"
                type="text"
                name=""
                id=""
                placeholder="Search brands"
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
              />
              <button>
                <img className="w-4" src="search-icon.png" alt="" />
              </button>
            </div>
            <button
              onClick={handleShowModalBrand}
              className="bg-bgSecondaryColor text-textPrimary px-3 h-8 rounded text-lg font-semibold"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex font-semibold text-lg px-5 mt-5">
          <div className="w-8/12">Logo</div>
          <div className="w-full text-center">Name</div>
          <div className="w-full text-center">Products</div>
          <div className="w-full"></div>
        </div>
        {brands ? (
          <ul className="mt-3 grid gap-1 rounded-lg pb-4">
            {brands.map((brand, i) => {
              return (
                <BrandTableBody key={i} brand={brand} setBrands={setBrands} />
              );
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

export default Brands;
