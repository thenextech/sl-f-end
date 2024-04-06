import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function OrderPaid() {
    
    const { orderId } = useParams();

    const [order, setOrder] = useState({});
    const [orderLineItems, setOrderLineItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [clientData, setClientData] = useState({})


    const API_URL = process.env.REACT_APP_API_URL;

    const isThereAnActiveSession = async () => {
        try {
            const response = await fetch(`${API_URL}/client/dashboard`, {
                credentials: 'include',
                method: 'GET'
            });
    
            if (response.ok) {
                const data = await response.json();
                setClientData(data);
                setIsAuthenticated(true);
                
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false); 
        }
    }

    const addFidelityPoints = async (client) => {
        try {
            const response = await fetch(`${API_URL}/loyaltyCards/change-points`, {
                credentials: 'include',
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: client.object.userId,
                    points: order.totalPrice * 0.4
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log('Points de fidelité ajoutés avec succès');
            } else {
                const error = await response.json();
                console.log('error ', error);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false); 
        }
    }

    const fetchOrder = async () => {
        try {
            const response = await fetch(`${API_URL}/orders/${orderId.length === 101 ? orderId[50] : orderId[50] + orderId[51]}`, {
                credentials: 'include',
                method: 'GET',
            });
    
            if (response.ok) {
                const orderData = await response.json();
                setOrder(orderData);
    
                const responseLineItems = await fetch(`${API_URL}/orderlines?orderId=${orderData.orderId}`, {
                    credentials: 'include',
                    method: 'GET',
                });
    
                if (responseLineItems.ok) {
                    const lineItemsData = await responseLineItems.json();
                    const updatedOrderLineItems = await Promise.all(lineItemsData.map(async (item) => {
                        const productDetails = await fetchProductsDetailsById(item.productId);
                        return {
                            ...item,
                            productDetails: productDetails
                        };
                    }));
                    setOrderLineItems(updatedOrderLineItems);
                    updatedOrderLineItems.forEach(async (item) => {
                        await updateProductQuantity(item.productDetails.productId, item.quantity);
                    });
                } else {
                    console.log('error fetching order line items');
                }
            } else {
                console.log('error fetching order');
            }
        } catch (error) {
            console.log('Fetching order error: ', error);
        }
    }    

    const fetchProductsDetailsById = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/merchant/product/${productId}`, {
                credentials: 'include',
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.log('error fetching order');
            }
        } catch (error) {
            console.log('Fetching order error: ', error);
        }
    }

    const updateOrder = async () => {

        if (Object.keys(order).length > 0 > 0) {
            const updatedOrder = {
                ...order,
                status: 'PAID'
            };
    
            console.log(updatedOrder);
    
            try {
                const response = await fetch(`${API_URL}/orders/${orderId.length === 101 ? orderId[50] : orderId[50] + orderId[51]}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedOrder)
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setOrder(data);
                }
            } catch (error) {
                console.log('Update order error: ', error);
            }
        }
    }

    const updateProductQuantity = async (productId, orderLineQuantity) => {
        console.log(productId);
        console.log(orderLineQuantity);
        try {
            const response = await fetch(`${API_URL}/merchant/product/${productId}`, {
                credentials: 'include',
                method: 'GET',
            });
    
            if (response.ok) {
                const productData = await response.json();
    
                const updatedQuantity = productData.qteStock - orderLineQuantity;

                const updatedProduct = {
                    ...productData,
                    qteStock: updatedQuantity
                };
    
                const updateResponse = await fetch(`${API_URL}/merchant/product/${productId}`, {
                    credentials: 'include',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                });
    
                if (updateResponse.ok) {
                    console.log('Product quantity updated successfully');
                } else {
                    console.log('Failed to update product quantity');
                }
            } else {
                console.log('Error fetching product details');
            }
        } catch (error) {
            console.log('Error updating product quantity: ', error);
        }
    }

    useEffect(() => {
        const checkSession = async () => {
            await isThereAnActiveSession();
        };
    
        checkSession();
    }, []);

    useEffect(() => {
        const checker = async () => {
            if (orderId.length == 102 || orderId.length == 101) {
                setLoading(true);
                await fetchOrder();
                setLoading(false);
            }; 
        };
             
        checker();
    }, [])

    useEffect(() => {
        updateOrder(order)
        addFidelityPoints(clientData);
    }, [order, clientData]);


    if (orderId.length !== 102 && orderId.length !== 101) {
        return <Navigate to="/client/dashboard" replace={true} />;
    }

    if (order.status === 'PAID' && !loading) {
        return <Navigate to={`/client/orderOK/${orderId}/${1}`} replace={true} />;
    }
}