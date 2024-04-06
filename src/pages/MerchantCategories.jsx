import React, {useState, useEffect} from 'react'
import MerchantDashNavbar from '../components/merchants/MerchantDashNavbar'
import MerchantCategoryBox from '../components/merchants/MerchantCategoryBox'
import { Navigate } from 'react-router-dom';
import Fog from '../components/Fog';
import { IoMdClose } from "react-icons/io";
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

export default function MerchantCategories() {

  const API_URL = process.env.REACT_APP_API_URL;

  const [merchantData, setMerchantData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [addCategoryClicked, setAddCategodryClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryResponse, setCategoryResponse] = useState(null);

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/merchant/category?id=${categoryId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.ok) {
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  const fetchCategoriesAndProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/merchant/dashboard`, {
        credentials: 'include',
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setMerchantData(data.object);
        setIsAuthenticated(true);
        await fetchMerchantCategories(data.object.userId);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsAuthenticated(false);
    }
  };

  const fetchMerchantCategories = async (merchantId) => {
    try {
      const response = await fetch(
        `${API_URL}/merchant/category/merchant?idMerchant=${merchantId}`
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.log('Aucune catégorie trouvée');
      }
    } catch (error) {
      console.error('Erreur à la récupération des catégories :', error);
    }
  };

  useEffect(() => {
    
    fetchCategoriesAndProducts();
  }, []);

  console.log(categories);

  if (isAuthenticated === null) {
      return null; 
  }

  if (isAuthenticated) {
  
    function handleCategoryBtnClicked() {
      setAddCategodryClicked(!addCategoryClicked);
    }
  
    const handleCategorySubmit = async (event) => {
      event.preventDefault();
      const response = await fetch(`${API_URL}/merchant/category/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: merchantData.userId,
               categoryName: categoryName})
      });
      
      if (response.ok) {
        const data = await response.json();
        categories.push(data);
        setCategoryResponse('La catégorie a été créée avec succès');
      } else {
        setCategoryResponse('Erreur lors de la création de la catégorie');
      }
    }

    return (
      <>
          <Fog elementClicked={addCategoryClicked} handleElementClick={handleCategoryBtnClicked} />
          <div className={addCategoryClicked ? "absolute w-full h-full z-40 flex justify-center items-center" : "hidden"} >
            <div className="relative w-[270px] h-[190px] bg-white shadow-my rounded-[10px]">
              <div className="absolute right-0">
                <IoMdClose className="text-[25px] hover:cursor-pointer" onClick={handleCategoryBtnClicked}/>
              </div>
              <div className="w-[250px] flex flex-col h-full mx-auto justify-center">
                <form onSubmit={handleCategorySubmit} className="p-1">
                  <div className="flex flex-col mb-2">
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Nom de la catégorie
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="text"
                        name="categoryName"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
                    {categoryResponse && (
                      <p className="ml-1 text-green-500 text-[13px]">{categoryResponse}</p>
                      )}
                    <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[16px] w-[160px] sm:w-[190px] mt-2 hover:cursor-pointer shadow-md" >Ajouter la catégorie</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
         <MerchantDashNavbar businessName={merchantData.businessName}/> 
         <div className="flex justify-end w-[96%] items-center">
              <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[16px] md:text-[18px] w-[160px] sm:w-[190px] md:w-[230px] mt-2 hover:cursor-pointer shadow-md md:mr-4 mr-2"onClick={handleCategoryBtnClicked}>Ajouter une catégorie</button>      
         </div>
         <div className="flex w-[90%] mx-auto justify-center">
          {categories.length === 0 ? 
          <div className="w-full flex items-center justify-center h-[500px]">
             <p className="opacity-[0.5]">Aucune catégorie produit à afficher</p>
          </div> :
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-8 sm:gap-6 flex-col mt-6 sm:mt-12">
              {categories.map((category) => <CategoryCard
                categoryName={category.categoryName}
                categoryId={category.id}
                handleDeleteCategory={handleDeleteCategory}
              />)}
            </div>
          }
         </div>
      </>
    )    
  }

  return <Navigate to="/merchant/login" replace={true} />
}