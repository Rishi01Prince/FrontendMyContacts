import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import './MyOrder.css';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myorderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetching successful");
        console.log(data);

        const sortedOrderData = data.orderData.order_data.sort((a, b) => {
          return new Date(b.order_date) - new Date(a.order_date);
        });

        setOrderData(sortedOrderData);
      } else {
        console.error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('An error occurred while fetching order data', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
        <div className='rishimyorder-heading'>Your  Orders : </div>
      <div className='rishicontainer' style={{paddingBottom : "100px"}}>
        <div className='rishirow'>
          {orderData.length > 0 ? (
            orderData.map((order, index) => (
              <div className='rishicol-12 col-md-6 col-lg-3' key={index}>
                {order.order_data.map((item, itemIndex) => (
                  <div className="rishiorder-card mt-3" key={itemIndex}>
                    <img src={item.img} alt="Product" />
                    <div className="rishiorder-details">
                      <h5 className="rishiorder-title">{item.name}</h5>
                      <div className='rishiorder-info'>
                        <div className="rishiorder-quantity">Quantity: {item.qty}</div>
                        <div className="rishiorder-span">Span: {item.span}</div>
                        <div className="rishiorder-date">Order Date: {order.order_date}</div>
                      </div>
                      <div className='rishiorder-price'> Price: ₹{item.price}/- </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="rishino-order-data">No order data available</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
