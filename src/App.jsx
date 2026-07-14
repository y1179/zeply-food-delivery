// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar/Navbar.jsx";
// import Footer from "./components/Footer/Footer.jsx";
// import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";

// import Home from "./pages/Home/Home.jsx";
// import Cart from "./pages/Cart/Cart.jsx";
// import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";

// export default function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   // cartItems: { [foodId]: quantity }
//   const [cartItems, setCartItems] = useState({});

//   const addToCart = (id) => {
//     setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [id]: Math.max((prev[id] || 0) - 1, 0),
//     }));
//   };

//   return (
//     <>
//       {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
//       <Navbar setShowLogin={setShowLogin} cartItems={cartItems} />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Home
//               cartItems={cartItems}
//               addToCart={addToCart}
//               removeFromCart={removeFromCart}
//             />
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <Cart
//               cartItems={cartItems}
//               addToCart={addToCart}
//               removeFromCart={removeFromCart}
//             />
//           }
//         />
//         <Route path="/place-order" element={<PlaceOrder cartItems={cartItems} />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }


import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}

      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>

      <Footer />
    </>
  );
}