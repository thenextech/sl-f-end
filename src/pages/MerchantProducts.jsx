import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ClientNavbar from '../components/clients/ClientNavbar';
import ProductCard from '../components/ProductCard';
import AddToCart from '../components/buttons/AddToCart';
import { MdKeyboardBackspace } from "react-icons/md";

export default function MerchantProducts() {


    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const { idMerchant } = useParams();
    const { idClient } = useParams();
    const userData = {
      userId: idClient
    }
    const [products, setProducts] = useState([]);
    const [merchant, setMerchant] = useState([]);

    const fetchMerchantCategories = async (merchantId) => {
        try {

          const merchantResponse = await fetch(`${API_URL}/merchants/${merchantId}`)
          if (merchantResponse.ok) {
            const data = await merchantResponse.json();
            setMerchant(data);

            const response = await fetch(
              `${API_URL}/merchant/category/merchant?idMerchant=${merchantId}`
            );
            console.log( `${API_URL}/merchant/category/merchant?idMerchant=${merchantId}`);
            if (response.ok) {
              const data = await response.json();
              data.forEach((category) => {
                fetchProductsByCategory(category.id);
              });
            } else {
              console.log('Aucune catégorie trouvée');
            }
          } else {
            console.log('Aucun commerçant trouvé')
          }
        } catch (error) {
          console.error('Erreur à la récupération des catégories :', error);
        }
    };

    const fetchProductsByCategory = async (categoryId) => {
        try {
          const response = await fetch(
            `${API_URL}/merchant/product/category?categoryId=${categoryId}`
          );
    
          if (response.ok) {
            const data = await response.json();
            setProducts((prevProducts) => [...prevProducts, ...data]);
          } else {
            console.log(`Aucun produit trouvé pour la catégorie d'id : ${categoryId}`);
          }
        } catch (error) {
          console.error(`Erreur à la récupération des produits de la catégorie ${categoryId}:`, error);
        }
    };

    function goBackToDashboard() {
        navigate('/client/dashboard');
    }

    useEffect(() => {
        fetchMerchantCategories(idMerchant);
    }, []);
  
    return (
        <>
            <ClientNavbar user={userData} />
            <div className="w-[95%] mx-auto sm:mt-4 sm:w-[97%] flex justify-between items-center" onClick={goBackToDashboard}>
                <MdKeyboardBackspace className="text-[45px] sm:text-[55px] md:text-[65px] hover:cursor-pointer "/>
                <p className="text-[10px] sm:text-[13px] md:text-[16px] font-bold uppercase">{merchant.businessName}</p>
            </div>
            <div className="flex justify-center items-center">
                {products.length === 0 ? 
                    <div className="w-full flex items-center justify-center h-[500px]">
                        <p className="opacity-[0.5]">Ce commercant n'a pas encore ajouté de produits</p>
                    </div> :
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-8 sm:gap-6 flex flex-col mt-6 sm:mt-8">
                        {products.map((product) => <ProductCard
                        name={product.name}
                        description={product.description}
                        category={product.categoryProduct}
                        status={product.status}
                        stock={product.qteStock}
                        showDeleteIcon={false}
                        price={product.price}
                        productId={product.productId}
                        commercant={false}
                        businessName={merchant.businessName}
                        businessAdress={`${merchant.address}, ${merchant.postalCode}`}
                        idMerchant={idMerchant}
                    />)}
                    </div>
                }               
            </div>
        </>
        
    );
}
