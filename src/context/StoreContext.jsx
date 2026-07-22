
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


// import { createContext, useState, useEffect } from "react";
// import { food_list } from "../assets/assets";

// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState("");
//   // Add item
//   const addToCart = (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({
//         ...prev,
//         [itemId]: 1,
//       }));
//     } else {
//       setCartItems((prev) => ({
//         ...prev,
//         [itemId]: prev[itemId] + 1,
//       }));
//     }
//   };

//   // Remove item
//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] - 1,
//     }));
//   };

//   // Calculate total cart amount
//   const getTotalCartAmount = () => {
//     let totalAmount = 0;

//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         const itemInfo = food_list.find(
//           (product) => product._id === item
//         );

//         if (itemInfo) {
//           totalAmount += itemInfo.price * cartItems[item];
//         }
//       }
//     }

//     return totalAmount;
//   };

//   useEffect(() => {
//   const savedToken = localStorage.getItem("token");

//   if (savedToken) {
//     setToken(savedToken);
//   }
// }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;

import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets"; // you can remove this once food comes from backend

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]); // will hold food from backend

 
  const url = import.meta.env.VITE_API_URL;

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // sync to backend if logged in
    if (token) {
      await fetch(`${url}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ itemId }),
      });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await fetch(`${url}/api/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ itemId }),
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // fetch live food list from your backend instead of the static file
  const fetchFoodList = async () => {
    const response = await fetch(`${url}/api/food/list`);
    const data = await response.json();
    setFoodList(data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,        
    food_list: foodList,
    cartItems,
    setCartItems,
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