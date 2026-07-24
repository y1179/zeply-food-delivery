// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Search, MapPin, ChevronDown, ShoppingBag, User, Menu, X, Percent } from "lucide-react";
// import "./Navbar.css";
// import { menu_list, assets } from "../../assets/assets";

// export default function Navbar({ setShowLogin, cartItems }) {
//   const [locationOpen, setLocationOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [menu , setMenu] = useState("home");
//   const [address, setAddress] = useState("Bandra West, Mumbai");
//   const locRef = useRef(null);

//   const cartCount = Object.values(cartItems || {}).reduce((a, b) => a + b, 0);

//   useEffect(() => {
//     function handleClick(e) {
//       if (locRef.current && !locRef.current.contains(e.target)) {
//         setLocationOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const addresses = [
//     "Bandra West, Mumbai",
//     "Andheri East, Mumbai",
//     "Powai, Mumbai",
//     "Use current location",
//   ];

//   return (
//     <div>
//       <div className="promo-strip">
//         <Percent size={12} strokeWidth={2.5} />
//         Free delivery on orders above ₹149 · Ends midnight
//       </div>

//       <header className="navbar">
//         <div className="app-container navbar-inner">
//           <img src={assets.logo} alt="Swiggy" className="navbar-logo" >
//             <div className="navbar-logo-badge">
//               <ShoppingBag size={18} color="#fff9f2" strokeWidth={2.5} />
//             </div>
//             <span className="navbar-logo-text">Swiggy</span>
//           </img>

//           <div className="navbar-location" ref={locRef}>
//             <button className="location-btn" onClick={() => setLocationOpen((o) => !o)}>
//               <span className="pulse-dot">
//                 <span className="pulse-ping" />
//                 <span className="pulse-core" />
//               </span>
//               <div className="location-text">
//                 <div className="location-label">Delivering to</div>
//                 <div className="location-value">
//                   {address}
//                   <ChevronDown size={14} className={locationOpen ? "chevron open" : "chevron"} />
//                 </div>
//               </div>
//             </button>

//             {locationOpen && (
//               <div className="location-dropdown">
//                 {addresses.map((a, i) => (
//                   <button
//                     key={a}
//                     className={i === addresses.length - 1 ? "location-option location-option-cta" : "location-option"}
//                     onClick={() => {
//                       setAddress(a);
//                       setLocationOpen(false);
//                     }}
//                   >
//                     <MapPin size={15} />
//                     {a}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="navbar-search">
//             <img src={assets.search_icon} alt="Search" size={17} className="muted-icon" />
//             <input type="text" placeholder="Search for restaurants or dishes" />
//           </div>

//           <nav className="navbar-links">
//             <a href="/" onClick={() => setMenu("home")} className={menu === "home" ? "nav-link active" : "nav-link"}>Food</a>
//             <a href="#" onClick={() => setMenu("menu")} className={menu === "menu" ? "nav-link active" : "nav-link"}>Menu</a>
//             <a href="#" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "nav-link active" : "nav-link"}>Mobile-App</a>
//             <a href="#" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "nav-link active" : "nav-link"}>Contact Us</a>
//           </nav>

//           <div className="navbar-actions">
//             <button className="login-btn" onClick={() => setShowLogin(true)}>
//               <User size={17} />
//               <span>Log in</span>
//             </button>
//             <Link to="/cart" className="cart-btn">
//               <ShoppingBag size={16} />
//               Cart
//               {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//             </Link>
//           </div>

//           <button className="mobile-toggle" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
//             {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>

//         {mobileOpen && (
//           <div className="mobile-panel">
//             <div className="mobile-location">
//               <MapPin size={16} />
//               <span>{address}</span>
//               <ChevronDown size={14} />
//             </div>
//             <div className="mobile-search">
//               <Search size={16} className="muted-icon" />
//               <input type="text" placeholder="Search restaurants or dishes" />
//             </div>
//             <div className="mobile-links">
//               <Link to="/" className="nav-link active">Food</Link>
//               <a href="#" className="nav-link">Instamart</a>
//               <a href="#" className="nav-link">Dineout</a>
//               <a href="#" className="nav-link">Genie</a>
//             </div>
//             <div className="mobile-buttons">
//               <button className="login-btn outline" onClick={() => setShowLogin(true)}>
//                 <User size={16} /> Log in
//               </button>
//               <Link to="/cart" className="cart-btn full">
//                 <ShoppingBag size={16} /> Cart {cartCount > 0 ? `· ${cartCount}` : ""}
//               </Link>
//             </div>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Search,
//   MapPin,
//   ChevronDown,
//   ShoppingBag,
//   User,
//   Menu,
//   X,
//   Percent,
// } from "lucide-react";

// import "./Navbar.css";
// import { assets } from "../../assets/assets";
// import { useContext } from "react";
// import { StoreContext } from "../../context/StoreContext";

// export default function Navbar({ setShowLogin }) {
//   const [locationOpen, setLocationOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [menu, setMenu] = useState("home");
//   const [address, setAddress] = useState("Bandra West, Mumbai");
//   const { token, setToken, cartItems } = useContext(StoreContext);
//   const locRef = useRef(null);
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//   };
//   const cartCount = Object.values(cartItems).reduce(
//     (a, b) => a + b,
//     0
//   );

//   useEffect(() => {
//     function handleClick(e) {
//       if (locRef.current && !locRef.current.contains(e.target)) {
//         setLocationOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClick);

//     return () =>
//       document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const addresses = [
//     "Bandra West, Mumbai",
//     "Andheri East, Mumbai",
//     "Powai, Mumbai",
//     "Use current location",
//   ];

//   return (
//     <>
//       <div className="promo-strip">
//         <Percent size={14} />
//         Free Delivery on Orders Above ₹149
//       </div>

//       <header className="navbar">
//         <div className="app-container navbar-inner">

//           {/* Logo */}
//           <Link to="/" className="navbar-brand">
//             <img
//               src={assets.logo}
//               alt="Zeply Logo"
//               className="navbar-logo"
//             />

//             <div>
//               <h2 className="navbar-logo-text">Zeply</h2>
//               <p className="navbar-logo-subtitle">
//                 Food Delivery
//               </p>
//             </div>
//           </Link>

//           {/* Location */}

//           <div
//             className="navbar-location"
//             ref={locRef}
//           >
//             <button
//               className="location-btn"
//               onClick={() =>
//                 setLocationOpen(!locationOpen)
//               }
//             >
//               <MapPin
//                 size={18}
//                 color="#ff5200"
//               />

//               <div className="location-text">
//                 <span className="location-label">
//                   Delivering To
//                 </span>

//                 <div className="location-value">
//                   {address}

//                   <ChevronDown
//                     size={15}
//                     className={
//                       locationOpen ? "rotate" : ""
//                     }
//                   />
//                 </div>
//               </div>
//             </button>

//             {locationOpen && (
//               <div className="location-dropdown">
//                 {addresses.map((item) => (
//                   <button
//                     key={item}
//                     className="location-option"
//                     onClick={() => {
//                       setAddress(item);
//                       setLocationOpen(false);
//                     }}
//                   >
//                     <MapPin size={16} />
//                     {item}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Search */}

//           <div className="navbar-search">
//             <Search
//               size={18}
//               className="muted-icon"
//             />

//             <input
//               type="text"
//               placeholder="Search restaurants..."
//             />
//           </div>

//           {/* Navigation */}

//           {/* <nav className="navbar-links">
//             <a
//               href="#"
//               onClick={() =>
//                 setMenu("home")
//               }
//               className={
//                 menu === "home"
//                   ? "nav-link active"
//                   : "nav-link"
//               }
//             >
//               Home
//             </a>

//             <a
//               href="#explore-menu"
//               onClick={() =>
//                 setMenu("menu")
//               }
//               className={
//                 menu === "menu"
//                   ? "nav-link active"
//                   : "nav-link"
//               }
//             >
//               Menu
//             </a>

//             <a
//               href="#app-download"
//               onClick={() =>
//                 setMenu("app")
//               }
//               className={
//                 menu === "app"
//                   ? "nav-link active"
//                   : "nav-link"
//               }
//             >
//               Mobile App
//             </a>

//             <a
//               href="#footer"
//               onClick={() =>
//                 setMenu("contact")
//               }
//               className={
//                 menu === "contact"
//                   ? "nav-link active"
//                   : "nav-link"
//               }
//             >
//               Contact
//             </a>
//           </nav> */}
//           <nav className="navbar-links">
//             <Link
//               to="/"
//               onClick={() => setMenu("home")}
//               className={menu === "home" ? "nav-link active" : "nav-link"}
//             >
//               Home
//             </Link>

//             <Link
//               to="/#explore-menu"
//               onClick={() => setMenu("menu")}
//               className={menu === "menu" ? "nav-link active" : "nav-link"}
//             >
//               Menu
//             </Link>

//             <Link
//               to="/#app-download"
//               onClick={() => setMenu("app")}
//               className={menu === "app" ? "nav-link active" : "nav-link"}
//             >
//               Mobile App
//             </Link>

//             <Link
//               to="/#footer"
//               onClick={() => setMenu("contact")}
//               className={menu === "contact" ? "nav-link active" : "nav-link"}
//             >
//               Contact
//             </Link>
//           </nav>

//           {/* Buttons */}

//           <div className="navbar-actions">
//             <button
//               className="login-btn"
//               onClick={() =>
//                 setShowLogin(true)
//               }
//             >
//               <User size={17} />
//               Login
//             </button>

//             <Link
//               to="/cart"
//               className="cart-btn"
//             >
//               <ShoppingBag size={18} />

//               Cart

//               {cartCount > 0 && (
//                 <span className="cart-badge">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>

//           {/* Mobile Menu */}

//           <button
//             className="mobile-toggle"
//             onClick={() =>
//               setMobileOpen(!mobileOpen)
//             }
//           >
//             {mobileOpen ? (
//               <X size={22} />
//             ) : (
//               <Menu size={22} />
//             )}
//           </button>
//         </div>

//         {mobileOpen && (
//           <div className="mobile-panel">

//             <div className="mobile-search">
//               <Search size={18} />

//               <input
//                 placeholder="Search Food..."
//               />
//             </div>

//             <Link
//               to="/"
//               className="nav-link"
//             >
//               Home
//             </Link>

//             <Link
//               to="/cart"
//               className="nav-link"
//             >
//               Cart ({cartCount})
//             </Link>

//             {/* <button
//               className="login-btn"
//               onClick={() =>
//                 setShowLogin(true)
//               }
//             >
//               Login
//             </button> */

//               <div className="navbar-actions">
//                 {!token ? (
//                   <button
//                     className="login-btn"
//                     onClick={() => setShowLogin(true)}
//                   >
//                     <User size={17} />
//                     Login
//                   </button>
//                 ) : (
//                   <div className="navbar-profile">
//                     <img
//                       src={assets.profile_icon}
//                       alt="Profile"
//                     />

//                     <ul className="profile-dropdown">
//                       <li>
//                         <img
//                           src={assets.bag_icon}
//                           alt=""
//                         />
//                         Orders
//                       </li>

//                       <hr />

//                       <li onClick={logout}>
//                         <img
//                           src={assets.logout_icon}
//                           alt=""
//                         />
//                         Logout
//                       </li>
//                     </ul>
//                   </div>
//                 )}

//                 <Link
//                   to="/cart"
//                   className="cart-btn"
//                 >
//                   <ShoppingBag size={18} />
//                   Cart

//                   {cartCount > 0 && (
//                     <span className="cart-badge">
//                       {cartCount}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//             }

//           </div>
//         )}
//       </header>
//     </>
//   );
// }



import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  ChevronDown,
  ShoppingBag,
  User,
  Menu,
  X,
  Percent,
} from "lucide-react";

import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

export default function Navbar({ setShowLogin }) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  const [address, setAddress] = useState("Bandra West, Mumbai");

  const { token, setToken, cartItems } = useContext(StoreContext);

  const locRef = useRef(null);

  const cartCount = Object.values(cartItems).reduce(
    (total, qty) => total + qty,
    0
  );

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMobileOpen(false);
  };

  useEffect(() => {
    function handleClick(e) {
      if (locRef.current && !locRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  const addresses = [
    "Bandra West, Mumbai",
    "Andheri East, Mumbai",
    "Powai, Mumbai",
    "Use current location",
  ];

  return (
    <>
      <div className="promo-strip">
        <Percent size={14} />
        Free Delivery on Orders Above ₹149
      </div>

      <header className="navbar">
        <div className="app-container navbar-inner">
          {/* Logo */}

          <Link to="/" className="navbar-brand">
            <img
              src={assets.logo}
              alt="Logo"
              className="navbar-logo"
            />

            <div>
              <h2 className="navbar-logo-text">CraveOn</h2>
              <p className="navbar-logo-subtitle">
                Food Delivery
              </p>
            </div>
          </Link>

          {/* Location */}

          <div
            className="navbar-location"
            ref={locRef}
          >
            <button
              className="location-btn"
              onClick={() =>
                setLocationOpen(!locationOpen)
              }
            >
              <MapPin
                size={18}
                color="#ff5200"
              />

              <div className="location-text">
                <span className="location-label">
                  Delivering To
                </span>

                <div className="location-value">
                  {address}

                  <ChevronDown
                    size={15}
                    className={
                      locationOpen ? "rotate" : ""
                    }
                  />
                </div>
              </div>
            </button>

            {locationOpen && (
              <div className="location-dropdown">
                {addresses.map((item) => (
                  <button
                    key={item}
                    className="location-option"
                    onClick={() => {
                      setAddress(item);
                      setLocationOpen(false);
                    }}
                  >
                    <MapPin size={16} />
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}

          <div className="navbar-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search restaurants..."
            />
          </div>

          {/* Navigation */}

          <nav className="navbar-links">
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={
                menu === "home"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </Link>

            <Link
              to="/#explore-menu"
              onClick={() => setMenu("menu")}
              className={
                menu === "menu"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Menu
            </Link>
            <Link to="/myorders" className="navbar-myorders">
              <span>My Orders</span>
            </Link>
            <Link
              to="/#app-download"
              onClick={() => setMenu("app")}
              className={
                menu === "app"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Mobile App
            </Link>

            <Link
              to="/#footer"
              onClick={() => setMenu("contact")}
              className={
                menu === "contact"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}

          <div className="navbar-actions">
            {!token ? (
              <button
                className="login-btn"
                onClick={() => setShowLogin(true)}
              >
                <User size={17} />
                Login
              </button>
            ) : (
              <div className="navbar-profile">
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                />

                <ul className="profile-dropdown">
                  <li>
                    <img
                      src={assets.bag_icon}
                      alt=""
                    />
                    Orders
                  </li>

                  <hr />

                  <li onClick={logout}>
                    <img
                      src={assets.logout_icon}
                      alt=""
                    />
                    Logout
                  </li>
                </ul>
              </div>
            )}

            <Link
              to="/cart"
              className="cart-btn"
            >
              <ShoppingBag size={18} />
              Cart

              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}

          <button
            className="mobile-toggle"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
          >
            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}

        {mobileOpen && (
          <div className="mobile-panel">
            <div className="mobile-search">
              <Search size={18} />
              <input placeholder="Search Food..." />
            </div>

            <Link
              to="/"
              className="nav-link"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="nav-link"
            >
              Cart ({cartCount})
            </Link>

            {!token ? (
              <button
                className="login-btn"
                onClick={() => {
                  setShowLogin(true);
                  setMobileOpen(false);
                }}
              >
                Login
              </button>
            ) : (
              <>
                <button className="login-btn">
                  Orders
                </button>

                <button
                  className="login-btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
