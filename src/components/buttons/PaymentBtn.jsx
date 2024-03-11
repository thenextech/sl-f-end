import React from 'react'
import { loadStripe } from '@stripe/stripe-js';

export default function PaymentBtn({ items, totalPrice, user }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  function getItemsProps() {
    return items.map( item => item.props );
  }

  const makePayment = async () => {


    const stripe = await loadStripe("pk_test_51OhgAhDUHA6lJOqpP2zPHAPP8BkJmu92bhtoL79t4uMSlJ8d060rZFoOAOGsPMDNM5ySDpygGER4sL1VX8kYyKBp00WVUOu3Vm");
    const headers = {
      "Content-Type": "application/json"
    };

    const userInfosResponse = await fetch(`${apiUrl}/clients/${user.userId}`, {
      method: "GET",
      headers: headers,
    });

    if (userInfosResponse.ok) {
      const userInfos = await userInfosResponse.json();

      console.log(userInfos);

      const orderBody = {
        isClickAndCollect: true,
        totalPrice: totalPrice,
        creationDate: new Date(),
        status: 'READY',
        userId: user.userId
      }
  
      const orderCreationResponse = await fetch(`${apiUrl}/orders/create`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(orderBody)
      });
  
      if (orderCreationResponse.ok) {
        const orderCreationResponseData = await orderCreationResponse.json();
  
        const orderItems = getItemsProps();

        const nameUser = `${userInfos.firstName} ${userInfos.lastName}`;
        console.log(nameUser);
  
        await Promise.all(orderItems.map(async (item) => {
  
          const orderLineItemBody = {
            orderId: orderCreationResponseData.orderId,
            productId: item.productId,
            productName: item.nom,
            quantity: item.quantity,
            unitPrice: item.price,
            merchantId: item.merchantId,
            clientName: nameUser
          };
        
          const lineItemResponse = await fetch(`${apiUrl}/orderlines/create`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(orderLineItemBody)
          });
        
          const lineItemResponseJson = await lineItemResponse.json();
          
          if (lineItemResponse.ok) {
            console.log('Line item created successfully!');
          } else {
            console.log(lineItemResponse);
          }
        
        }));
        
  
        const checkoutBody = {
          orderId: JSON.parse(`[{"orderId":${orderCreationResponseData.orderId}}]`),
          products: orderItems
        };
  
        const checkoutResponse = await fetch(`${apiUrl}/stripe/create-checkout-session`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(checkoutBody)
        });
  
        const session = await checkoutResponse.json();
  
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });
  
        console.log(result);
  
        if (result.error) {
            console.log(result.error);
        } else {
          console.log('checkout successful');
        }
      } else {
        console.log(orderCreationResponse.json());
      }
    }  
  }

  return (
    <div className="flex flex-col items-center" onClick={makePayment}>
        <button className="text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[5px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-[100%] mt-4 hover:cursor-pointer">Procéder au paiement</button>
    </div>
  )
}
