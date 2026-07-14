// import React from 'react'

// const Footer = () => {
//   return (
//   <div className='footer' id='footer'>
//     <div className='footer-content'>
//       <div className='footer-content-left'>
//         <img src={assets.logo} alt="" />
//         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</p>
//         <div className='footer-social-icons'>
//           <img src={assets.facebook_icon} alt="" />
//           <img src={assets.twitter_icon} alt="" />
//           <img src={assets.linkedin_icon} alt="" />
//         </div>
//       </div>
//       <div className='footer-content-center'>
//         <h2>Company</h2>
//         <ul>
//           <li>Home</li>
//           <li>About Us</li>
//           <li>Delivary</li>
//           <li>Privacy Policy </li>
//         </ul>
//       </div>
//       <div className='footer-content-right'>
//         <h2>Get in Touch</h2>
//         <ul>
//           <li>+1 (555) 123-4567</li>
//           <li>contact@swiggy.com</li>
//         </ul>
//       </div>
//     </div>
//     <hr/>
//     <p className='footer-bottom'>© 2023 Swiggy. All rights reserved.</p>
//   </div>
// )
  
// }

// export default Footer


import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">

        <div className="footer-content-left">
          <img
            src={assets.logo}
            alt="Food Delivery Logo"
            className="footer-logo"
          />

          <p>
            Fast, fresh and reliable food delivery at your doorstep.
            Order your favourite meals from top restaurants and enjoy
            delicious food anytime, anywhere.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>

          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get In Touch</h2>

          <ul>
            <li>+91 98765 43210</li>
            <li>support@zeply.com</li>
          </ul>
        </div>

      </div>

      <hr />

      <p className="footer-bottom">
        © 2026 Zeply. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;