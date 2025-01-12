import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './DeliveryDetails.css';
import axios from "axios";

async function fetchDeliveryData(userId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/comms/your-next-delivery/${userId}`
    );
    return { data: response.data, error: null };
  } catch (error) {
    let errorMessage = 'Internal server error.';
    if (error.status === 404) {
      errorMessage = 'Invalid user';
    }
    return { data: null, error: `Unable to retrieve next delivery data. ${errorMessage}` };
  }
}

function DeliveryDetails() {
  const { userId } = useParams();
  const [deliveryData, setDeliveryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchDeliveryData(userId);
      if (response.error) {
        setError(response.error);
      } else {
        setDeliveryData(response.data);
      }
    }

    fetchData();

  }, [userId]);

  if (error) {
    return (
      <div className="error-message">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!deliveryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="delivery-details">
      <div className="delivery-header">
        <img
          src="/src/assets/simba.jpg"
          alt="cat meow"
          className="delivery-image"
        />
        {deliveryData.freeGift && <span className="free-gift">FREE GIFT</span>}
      </div>
      <div className="delivery-content">
        <h2>{deliveryData.title}</h2>
        <p>{deliveryData.message}</p>
        <div className="delivery-info">
          <p>Total price: £{deliveryData.totalPrice}</p>
        </div>
        <div className="delivery-buttons">
          <button className="btn btn-details">See Details</button>
          <button className="btn btn-edit">Edit Delivery</button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDetails;
