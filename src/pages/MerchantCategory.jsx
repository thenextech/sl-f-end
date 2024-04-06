import React, {useState, useEffect} from 'react'
import MerchantDashNavbar from "../components/merchants/MerchantDashNavbar";
import { Navigate, useParams } from 'react-router-dom';
import Fog from '../components/Fog';
import { IoMdClose } from "react-icons/io";
import ProductCard from '../components/ProductCard';

export default function MerchantCategory() { 

    const API_URL = process.env.REACT_APP_API_URL;

  const [merchantData, setMerchantData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [addProductClicked, setAddProductClicked] = useState(false);
  const [modifyProductClicked, setModifyProductClicked] = useState(false);
  
  // Offer attributes
  const [fidelityAmount, setFidelityAmount] = useState(null);
  const [debutDate, setDebutDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [offerResponse, setOfferReponse] = useState(null);

  // Product attributs
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [qteStock, setQteStock] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(null);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [productResponse, setProductResponse] = useState(null);
  const [productToModify, setProductToModify] = useState([]);
  
  // Selected product
  const [selectedProduct, setSelectedProduct] = useState({});
  const { categoryId } = useParams();
  const [addToVfpClicked, setAddToVfpClicked] = useState(false);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/merchant/product/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
        console.log('Le produit a été supprimé avec succès.');
      } else {
        console.error('Erreur lors de la suppression du produit.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const isThereAnActiveSession = async () => {
    try {
      const response = await fetch(`${API_URL}/merchant/dashboard`, {
        credentials: 'include',
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setMerchantData(data.object);
        setIsAuthenticated(true);
        await fetchCategory(categoryId);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsAuthenticated(false);
    }
  };

  const fetchCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/merchant/category?id=${categoryId}`);

      if (response.ok) {
        const data = await response.json();

        setCategory(data);
      } else {
        console.log(`Aucune catégorie trouvée pour l\'id : ${ categoryId }`);
      }
    } catch (error) {
      console.log(`Erreur lors de la récupération de la catégorie d\'id ${categoryId}`);
    }
  }

  const fetchProductInfos = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/merchant/product/${productId}`, {
        method: 'GET'
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSelectedProduct(data);
      } else {
        console.log(`Aucun produit trouvé associé à l'id ${productId}`);
      }
    } catch (error) {
      console.log(`Erreur lors de la récupération du produit d'id ${productId}`);
      console.error(error);
    }
  }

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

  useEffect(() => {
    
    isThereAnActiveSession();
  }, []);

  useEffect(() => {
    fetchProductsByCategory(category.id);
  }, [category])

  console.log(merchantData);

  if (isAuthenticated === null) {
      return null; 
  }

  if (isAuthenticated) {
    function handlePrdctBtnClicked() {
      setAddProductClicked(!addProductClicked);
    }
    
    function handleAddToVfpClicked(productId) {
      setAddToVfpClicked(!addToVfpClicked);
      fetchProductInfos(productId);
    }

    async function handleModifyProductClicked(productId) {
      setModifyProductClicked(!modifyProductClicked);
      fetchProductInfos(productId);
    }

  
    const handleProductSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch(`${API_URL}/merchant/product/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            categoryProduct: category.id,
            name: name,
            price: price,
            qteStock: qteStock,
            description: description,
            status: status
          })
      });

      if (response.ok) {
        const data = await response.json();
        products.push(data);
        setProductResponse('Le produit a été créé avec succès');
      } else {
        setProductResponse('Erreur lors de la création du produit');
      }
    }

    const handleEditSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch(`${API_URL}/merchant/product/${productToModify}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            categoryProduct: category.categoryName,
            name: name,
            price: price,
            qteStock: qteStock,
            description: description,
            status: status
          })
      });

      if (response.ok) {
        setProductResponse('Le produit a été modifié avec succès');
      } else {
        setProductResponse('Erreur lors de la modification du produit');
      }
    }

    const handleAddProductToVfp = async (event) => {
      event.preventDefault();
      const response = await fetch(`${API_URL}/benefits/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            cost: fidelityAmount,
            typeBenefits: 'REMISE',
            dateCreation: debutDate,
            description: `${selectedProduct.name}*${merchantData.businessName}`,
            dateStart: debutDate,
            dateEnd: endDate,
            productId: selectedProduct.productId,
            userId: merchantData.userId
          })
      });

      if (response.ok) {
        setOfferReponse('L\'offre a été ajoutée avec succès');
      } else {
        setProductResponse('Erreur lors de la création de l\'offre');
      }
    }

    return (
      <>
          <Fog elementClicked={addProductClicked} handleElementClick={handlePrdctBtnClicked} />
          <Fog elementClicked={modifyProductClicked} handleElementClick={handleModifyProductClicked} />
          <Fog elementClicked={addToVfpClicked} handleElementClick={handleAddToVfpClicked} />
          <div className={addToVfpClicked ? "absolute w-full h-full z-40 flex justify-center items-center" : "hidden"} >
            <div className="relative w-[270px] h-[350px] bg-white shadow-my rounded-[10px]">
              <div className="absolute right-0">
                <IoMdClose className="text-[25px] hover:cursor-pointer" onClick={handleAddToVfpClicked}/>
              </div>
              <div className="w-[250px] flex flex-col h-full mx-auto justify-center">
                <form onSubmit={handleAddProductToVfp} className="p-1">
                  <div className="flex flex-col mb-2">
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Produit séléctionné
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="text"
                        value={selectedProduct.name}
                        className="bg-[#ECECEC] rounded-[50px] text-[13px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        disabled
                      />
                    </div>
                    <label className="font-semibold text-[13px] sm:text-[16px] ml-1">
                        Date de début
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                        <input
                          type="datetime-local"
                          name="dateStart"
                          value={debutDate}
                          onChange={(event) => setDebutDate(event.target.value)}
                          className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <label className="font-semibold text-[13px] sm:text-[16px] ml-1">
                      Date de fin
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                        <input
                          type="datetime-local"
                          name="dateEnd"
                          value={endDate}
                          onChange={(event) => setEndDate(event.target.value)}
                          className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Points de fidelité à assigner
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="double"
                        name="cost"
                        value={fidelityAmount}
                        onChange={(event) => setFidelityAmount(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
                    {offerResponse && (
                      <p className="ml-1 text-green-600 text-[13px]">{offerResponse}</p>
                      )}
                    <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[15px] w-[160px] sm:w-[190px] mt-2 hover:cursor-pointer shadow-md" >Ajouter au catalogue VFP</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={addProductClicked ? "absolute w-full h-full z-40 flex justify-center items-center" : "hidden"} >
            <div className="relative w-[320px] h-[370px] bg-white shadow-my rounded-[10px]">
              <div className="absolute right-0">
                <IoMdClose className="text-[25px] hover:cursor-pointer" onClick={handlePrdctBtnClicked}/>
              </div>
              <div className="w-[250px] flex flex-col h-full mx-auto justify-center">
                <form onSubmit={handleProductSubmit} className="p-1">
                  <div className="flex flex-col mb-2">
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Nom du produit
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Prix
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Quantité en stock
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="number"
                        name="qteStock"
                        value={qteStock}
                        onChange={(event) => setQteStock(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Description
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Status
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <select name="status" value={status} 
                      onChange={(event) => setStatus(event.target.value)}
                      required>
                        <option value="">Sélectionnez un status</option>
                        <option value="READY" className="text-[13px]">Disponible</option>
                        <option value="EN RUPTURE" className="text-[13px]">En rutpure</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
                    {productResponse && (
                      <p className="ml-1 text-black text-[13px]">{productResponse}</p>
                      )}
                    <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[16px] w-[160px] sm:w-[190px] mt-2 hover:cursor-pointer shadow-md" >Ajouter un produit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={modifyProductClicked ? "absolute w-full h-full z-40 flex justify-center items-center" : "hidden"} >
            <div className="relative w-[320px] h-[370px] bg-white shadow-my rounded-[10px]">
              <div className="absolute right-0">
                <IoMdClose className="text-[25px] hover:cursor-pointer" onClick={handleModifyProductClicked}/>
              </div>
              <div className="w-[250px] flex flex-col h-full mx-auto justify-center">
                <form onSubmit={handleEditSubmit} className="p-1">
                  <div className="flex flex-col mb-2">
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Nom du produit
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder={selectedProduct.name}
                        onChange={(event) => setName(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Prix
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        placeholder={selectedProduct.price}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Quantité en stock
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="number"
                        name="qteStock"
                        value={qteStock}
                        placeholder={selectedProduct.qteStock}
                        onChange={(event) => setQteStock(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Description
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <input
                        type="text"
                        name="description"
                        value={description}
                        placeholder={selectedProduct.description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                      Status
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                    <select name="status" value={status} 
                      onChange={(event) => setStatus(event.target.value)}
                      required>
                        <option value="">Sélectionnez un status</option>
                        <option value="READY" className="text-[13px]">Disponible</option>
                        <option value="EN RUPTURE" className="text-[13px]">En rutpure</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
                    {productResponse && (
                      <p className="ml-1 text-[#ff0000] text-[13px]">{productResponse}</p>
                      )}
                    <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[16px] w-[160px] sm:w-[190px] mt-2 hover:cursor-pointer shadow-md" >Modifier le produit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
         <MerchantDashNavbar businessName={merchantData.businessName}/> 
         <div className="flex justify-end w-[96%] items-center">
              <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[16px] md:text-[18px] w-[160px] sm:w-[190px] md:w-[230px] mt-2 hover:cursor-pointer shadow-md" onClick={handlePrdctBtnClicked}>Ajouter un produit</button>
         </div>
         <div className="flex w-[90%] mx-auto">
          {products.length === 0 ? 
          <div className="w-full flex items-center justify-center h-[500px]">
             <p className="opacity-[0.5]">Aucun produit à afficher</p>
          </div> :
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-8 sm:gap-6 flex-col mt-6 sm:mt-8">
              {products.map((product) => <ProductCard
                    key={product.productId}
                    name={product.name}
                    description={product.description}
                    category={category.categoryName}
                    status={product.status === 'READY' ? 'EN STOCK' : 'EN RUPTURE'}
                    stock={product.qteStock}
                    price={product.price}
                    productId={product.productId}
                    handleDeleteProduct={handleDeleteProduct}
                    commercant={true}
                    handleModifyProduct={handleModifyProductClicked}
                    merchantId={merchantData.id}
                    addToVfp={handleAddToVfpClicked}
                  />)}
            </div>
          }
         </div>
      </>
    )    
  }

  return <Navigate to="/merchant/login" replace={true} />
}