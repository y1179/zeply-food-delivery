// import React from "react";
// import { menu_list, assets } from "../../assets/assets";
// import "./ExploreMenu.css";

// export default function ExploreMenu({ category, setCategory }) {
//   return (
//     // <div className="explore-menu app-container">
//     //   <h2 className="explore-title">Explore our menu</h2>
//     //   <p className="explore-subtitle">
//     //     Pick a category to see what's cooking near you today.
//     //   </p>

//     //   <div className="explore-list">
//     //     <button
//     //       className={category === "All" ? "explore-item active" : "explore-item"}
//     //       onClick={() => setCategory("All")}
//     //     >
//     //       <span className="explore-emoji">🍽️</span>
//     //       All
//     //     </button>
//     //     {menu_list.map((item,index) => (
//     //       <button
//     //         key={index}
//     //         className={category === item.name ? "explore-item active" : "explore-item"}
//     //         onClick={() => setCategory(item.name)}
//     //       >
//     //         <span className="explore-emoji">{item.icon}</span>
//     //         {item.name}
//     //       </button>
//     //      ))}
//     //   </div>
//     //   <hr className="explore-divider" />
//     // </div>
//     <div className="explore-menu" id="explore-menu">
//       <h2 className="explore-title">Explore our menu</h2>
//       <p className="explore-subtitle">
//         Pick a category to see what's cooking near you today.
//       </p>
      
//       <div className="explore-menu-list">
//           {menu_list.map((item, index) => {
//             return(
//             <div  onClick={() => setCategory(prev=> prev === item.name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
//               <img className={category === item.name ? "explore-menu-list-item-icon active" : "explore-menu-list-item-icon  "} src={item.menu_image} alt={item.name} />
//               <p >{item.menu_name}</p>
//             </div>
//             )
//           })}
//       </div>
//       <hr className="explore-divider" />
//     </div>
//   );
// }

import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h2 className="explore-title">Explore Our Menu</h2>

      <p className="explore-subtitle">
        Pick a category to see what's cooking near you today.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="explore-menu-list-item"
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={
                category === item.menu_name
                  ? "explore-menu-list-item-icon active"
                  : "explore-menu-list-item-icon"
              }
            />

            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr className="explore-divider" />
    </div>
  );
};

export default ExploreMenu;