// import "./PlaceOrder.css";

// // Stub for now — we'll build the full delivery details form
// // and order summary in the "Create Place order page" step.
// export default function PlaceOrder() {
//   return (
//     <div className="app-container place-order-stub">
//       <h1>Delivery details</h1>
//       <p className="place-order-note">Full checkout form coming in the next step.</p>
//     </div>
//   );
// }


// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";

// const PlaceOrder = () => {
//   const {
//     food_list,
//     cartItems,
//     getTotalCartAmount,
//     url,
//     token,
//   } = useContext(StoreContext);

//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const placeOrder = async (e) => {
//     e.preventDefault();

//     if (getTotalCartAmount() === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     if (!token) {
//       alert("Please login to place an order");
//       navigate("/");
//       return;
//     }

//     try {
//       const orderItems = food_list
//         .filter((item) => cartItems[item._id] > 0)
//         .map((item) => ({
//           name: item.name,
//           price: item.price,
//           quantity: cartItems[item._id],
//         }));

//       const orderData = {
//         address: data,
//         items: orderItems,
//         amount: getTotalCartAmount() + 40, // delivery fee
//       };

//       const response = await axios.post(
//         `${url}/api/order/place`,
//         orderData,
//         { headers: { token } }
//       );

//       if (!response.data.success) {
//         alert("Failed to create order");
//         return;
//       }

//       if (!window.Razorpay) {
//         alert("Razorpay SDK not loaded");
//         return;
//       }

//       const { order, orderId, key } = response.data;

//       const options = {
//         key,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Zeply Food",
//         description: "Food Order Payment",
//         order_id: order.id,

//         handler: async function (paymentResponse) {
//           try {
//             const verifyRes = await axios.post(
//               `${url}/api/order/verify`,
//               {
//                 orderId,
//                 razorpay_order_id: paymentResponse.razorpay_order_id,
//                 razorpay_payment_id: paymentResponse.razorpay_payment_id,
//                 razorpay_signature: paymentResponse.razorpay_signature,
//               },
//               { headers: { token } }
//             );

//             if (verifyRes.data.success) {
//               navigate("/myorders");
//             } else {
//               alert("Payment verification failed");
//               navigate("/");
//             }
//           } catch (err) {
//             console.log(err);
//             alert("Error verifying payment");
//           }
//         },

//         prefill: {
//           name: `${data.firstName} ${data.lastName}`,
//           email: data.email,
//           contact: data.phone,
//         },

//         theme: {
//           color: "#ff5200",
//         },
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.on("payment.failed", function (response) {
//         console.log(response.error);
//         alert(response.error.description);
//       });

//       razorpay.open();
//     } catch (error) {
//       console.log(error);
//       if (error.response) {
//         console.log(error.response.data);
//       }
//       alert("Something went wrong placing your order");
//     }
//   };

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>

//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last name"
//           />
//         </div>

//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />

//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />

//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>

//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>

//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>

//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />

//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
//             </div>
//             <hr />

//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>
//                 ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}
//               </b>
//             </div>
//           </div>

//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;


import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { food_list, cartItems, getTotalCartAmount, url, token } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (getTotalCartAmount() === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!token) {
      alert("Please login to place an order");
      navigate("/");
      return;
    }

    try {
      const orderItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
        }));

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 40,
      };

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (!response.data.success) {
        alert("Failed to create order");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const { order, orderId, key } = response.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Zeply Food",
        description: "Food Order Payment",
        order_id: order.id,

        handler: async function (paymentResponse) {
          try {
            const verifyRes = await axios.post(
              `${url}/api/order/verify`,
              {
                orderId,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
              { headers: { token } }
            );

            if (verifyRes.data.success) {
              alert("Payment successful!");
              navigate("/myorders");
            } else {
              alert("Payment verification failed");
              navigate("/");
            }
          } catch (err) {
            console.log(err);
            alert("Error verifying payment");
          }
        },

        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },

        theme: { color: "#ff5200" },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log(response.error);
        alert(response.error.description);
      });

      razorpay.open();
    } catch (error) {
      console.log(error);
      if (error.response) console.log(error.response.data);
      alert("Something went wrong placing your order");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>

        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />

        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>

        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>

        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
            </div>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;