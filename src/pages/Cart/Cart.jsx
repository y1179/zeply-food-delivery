// import "./Cart.css";

// // Stub for now — we'll build the full cart table, promo code box,
// // and totals breakdown in the "Create Cart Page" step.
// export default function Cart({ cartItems }) {
//   const hasItems = Object.values(cartItems || {}).some((qty) => qty > 0);

//   return (
//     <div className="app-container cart-stub">
//       <h1>Your cart</h1>
//       <p>{hasItems ? "Cart items will render here." : "Your cart is empty right now."}</p>
//       <p className="cart-stub-note">Full cart page coming in the next step.</p>
//     </div>
//   );
// }


import React, { useContext } from "react";
import axios from "axios";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const placeOrder = async () => {
    try {
      const amount =
        getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40;

      if (amount === 0) {
        alert("Your cart is empty");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/place`,
        {
          amount,
          items: food_list
            .filter((item) => cartItems[item._id] > 0)
            .map((item) => ({
              name: item.name,
              price: item.price,
              quantity: cartItems[item._id],
            })),
        }
      );

      console.log(response.data);

      if (!response.data.success) {
        alert("Failed to create order");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: response.data.key,
        amount: response.data.order.amount,
        currency: response.data.order.currency,
        name: "Zeply Food",
        description: "Food Order Payment",
        order_id: response.data.order.id,

        handler: function (payment) {
          console.log(payment);
          alert("Payment Successful");
        },

        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#ff5200",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log(response.error);
        alert(response.error.description);
      });

      razorpay.open();
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Payment Failed");
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-item">
                  <img src={item.image} alt={item.name} />

                  <p>{item.name}</p>

                  <p>₹{item.price}</p>

                  <div className="cart-qty">
                    <button
                      onClick={() => removeFromCart(item._id)}
                    >
                      -
                    </button>

                    <span>{cartItems[item._id]}</span>

                    <button
                      onClick={() => addToCart(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <p>
                    ₹{item.price * cartItems[item._id]}
                  </p>

                  <p
                    className="remove-item"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ×
                  </p>
                </div>

                <hr />
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Order Summary</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>

              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>

              <p>
                ₹{getTotalCartAmount() === 0 ? 0 : 40}
              </p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>

              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 40}
              </b>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={getTotalCartAmount() === 0}
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;