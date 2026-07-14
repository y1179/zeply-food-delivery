// import { Clock } from "lucide-react";
// import "./Header.css";

// export default function Header() {
//   return(
//     <div className="header">
//       <div className="app-container header-inner">
//         <div className="header-badge">
//           <Clock size={13} strokeWidth={2.5} />
//           Avg. delivery in your area: 24 min
//         </div>

//         <h1 className="header-title">
//           Whatever the craving,
//           <br />
//           <span>it's already on its way.</span>
//         </h1>

//         <p className="header-subtitle">
//           Order from 2,000+ restaurants near Bandra West. Track your food
//           from the kitchen to your door, live.
//         </p>

//         <button className="header-cta">View Menu</button>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Clock } from "lucide-react";
import { assets } from "../../assets/assets";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img
        src={assets.header_img}
        alt="Food Banner"
        className="header-image"
      />

      <div className="header-overlay"></div>

      <div className="header-content">
        <div className="header-badge">
          <Clock size={14} />
          <span>Average delivery in 24 minutes</span>
        </div>

        <h1>
          Delicious Food
          <br />
          Delivered to Your Door
        </h1>

        <p>
          Order from your favourite restaurants and enjoy fresh,
          delicious meals delivered quickly to your home.
        </p>

        <a href="#explore-menu">
          <button className="header-btn">
                 Explore Menu
           </button>
        </a>
      </div>
    </div>
  );
};

export default Header;