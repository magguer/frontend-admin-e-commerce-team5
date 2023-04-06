/* CSS */
import "../../animation/Animations.css";
/* Dependencias */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
/* Componentes */
import axios from "axios";

function ModalEditBrand({ handleCloseModalBrand, brand, setBrands }) {
  const user = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleGoOut = () => {
    handleCloseModalBrand();
  };
  const [name, setName] = useState(brand.name);
  const [logo, setLogo] = useState(brand.logo);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("name", name);

    const response = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.admin.token}`,
      },
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/brands/${brand._id}`,
      data: formData,
    });
    setBrands(response.data);
    handleCloseModalBrand();
  };

  const handleDelete = async () => {
    const response = await axios({
      headers: {
        Authorization: `Bearer ${user.admin.token}`,
      },
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/brands/${brand._id}`,
    });
    setBrands(response.data);
    handleCloseModalBrand();
    console.log(response.data);
  };

  return (
    <>
      <div className="fixed inset-0 bg-modal z-40">
        <div className="flex items-center justify-center min-h-screen text-center px-8 tablet:px-0">
          <div
            className="fixed inset-0 bg-[#0f0f0f7e] cursor-pointer fade-in-fast z-20"
            onClick={handleGoOut}
          ></div>

          <div className="inline-block bg-bgPrimaryColor rounded-lg shadow-lg transform transition-all fade-in-fast duration-300 modal z-30 mt-12">
            <button
              className="absolute right-[-5px] top-[-5px] h-6 w-6 flex border justify-center border-bgSecondaryColor bg-bgPrimaryColor hover:bg-bgSecondaryColor rounded-full text-sm translate-all duration-150 font-bold hover:text-bgPrimaryColor"
              onClick={handleGoOut}
            >
              X
            </button>
            {/*             Form Edit Brand */}

            <div className="flex flex-col py-3 px-5">
              <h2 className="font-bold text-lg">Edit Brand</h2>
              <div className="min-h-[250px] mt-3">
                <div className="fade-in">
                  {/*                    Page Edit of Brand */}
                  <div className="flex justify-center gap-3 items-center">
                    <img
                      className="w-12 h-10 z-0 object-contain "
                      src={`${process.env.REACT_APP_API_URL}/img/${brand.logo2}`}
                      alt="logo"
                    />
                    <h4 className="font-semibold">{brand.name}</h4>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      className="rounded bg-bgForthColor ml-3 py-1 px-1"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <label htmlFor="name">Logo</label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      className="rounded bg-bgForthColor ml-3 py-1 px-1"
                      onChange={(e) => {
                        setLogo(e.target.files[0]);
                      }}
                      multiple
                    />
                  </div>
                  <div className="flex mt-10 flex-col items-center">
                    <p className="mr-5">Do you want to delete this brand?</p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="bg-bgSecondaryColor w-[150px] text-textPrimary mt-2 rounded transition-all duration-200 hover:bg-bgPrimaryColor hover:text-textSecondary"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {showDeleteModal && (
                  <div className="flex justify-between mt-3 p-2 rounded bg-bgSoftRedColor">
                    <p className="mr-10 text-textSecondary ">Are you sure?</p>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="w-[17vh] bg-bgFiftyColor text-textSecondary rounded transition-all duration-200 hover:bg-bgBlueColor hover:text-textPrimary"
                    >
                      No, close modal
                    </button>{" "}
                    <button
                      onClick={handleDelete}
                      className="w-[17vh] ml-2 bg-bgFiftyColor text-textSecondary rounded transition-all duration-200 hover:bg-bgRedColor hover:text-textPrimary"
                    >
                      Yes, Im sure
                    </button>
                  </div>
                )}

                <div className="flex justify-center mt-5">
                  <button
                    className="mt-3 gap-2 flex items-center rounded p-2 pl-3 pr-4 hover:bg-bgSecondaryColor transition-all duration-200 hover:text-textPrimary"
                    onClick={handleEdit}
                  >
                    <img className="w-8" src="edit-icon.png" alt="" />
                    <h2 className="font-bold">Edit</h2>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalEditBrand;
