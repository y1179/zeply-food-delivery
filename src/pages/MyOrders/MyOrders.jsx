import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="my-orders">
        <p>Please log in to see your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="my-orders">
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders
            .slice()
            .reverse() // show most recent first
            .map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-card-header">
                  <span className="order-id">Order #{order._id.slice(-6)}</span>
                  <span
                    className={`order-status ${
                      order.payment ? "paid" : "unpaid"
                    }`}
                  >
                    {order.payment ? "Payment Confirmed" : "Payment Pending"}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} × {item.quantity}
                      {index !== order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                <div className="order-card-footer">
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="order-amount">₹{order.amount}</span>
                  <span className="order-food-status">{order.status}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;