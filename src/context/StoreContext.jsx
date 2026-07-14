
// import { createContext } from "react";
// import {food_list} from "../assets/assets";
// import { RouterContextProvider } from "react-router-dom";

// export const StoreContext = createContext(null);


// const  StoreContextProvider = ({ children }) => {

//      const [cardItems, setCardItems] = useState({});

     
//      const addToCart = (itemId) => {
//         if(!cardItems[itemId]){
//             setCardItems(prev => ({...prev, [itemId]: 1}))
//         }else{
//             setCardItems(prev => ({...prev, [itemId]: prev[itemId] + 1}))
//         }
//      }

//      const removeFromCart = (itemId) => {
//        setCardItems((prev) =>({...prev, [itemId]: prev[itemId] - 1}))
//      }


//      useEffect(() =>{
//         console.log(cardItems)
//      }, [cardItems])
//      const contextValue = {
//          food_list,
//          cardItems,
//          addToCart,
//          removeFromCart
//      }

//      return(
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//      )
// }


// import { createContext, useState, useEffect } from "react";
// import { food_list } from "../assets/assets";

// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});

//   const addToCart = (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({
//         ...prev,
//         [itemId]: prev[itemId] + 1,
//       }));
//     }
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] - 1,
//     }));
//   };

//   useEffect(() => {
//     console.log(cartItems);
//   }, [cartItems]);

//   const contextValue = {
//     food_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;


import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  // Add item
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
  };

  // Remove item
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === item
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  useEffect(() => {
  const savedToken = localStorage.getItem("token");

  if (savedToken) {
    setToken(savedToken);
  }
}, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;