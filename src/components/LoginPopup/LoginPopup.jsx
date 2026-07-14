// import { X } from "lucide-react";
// import "./LoginPopup.css";

// // Placeholder for now — we'll build this out fully in the
// // "Sign in / Sign up" step, with real form state and validation.
// export default function LoginPopup({ setShowLogin }) {
//   return (
//     <div className="login-overlay" onClick={() => setShowLogin(false)}>
//       <div className="login-box" onClick={(e) => e.stopPropagation()}>
//         <div className="login-box-header">
//           <h2>Login</h2>
//           <X size={20} onClick={() => setShowLogin(false)} className="login-close" />
//         </div>
//         <p className="login-placeholder-note">
//           Sign in / Sign up form goes here — coming in the next step.
//         </p>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { X } from "lucide-react";
// import "./LoginPopup.css";

// const LoginPopup = ({ setShowLogin }) => {
//   const [currentState, setCurrentState] = useState("Login");

//   return (
//     <div
//       className="login-overlay"
//       onClick={() => setShowLogin(false)}
//     >
//       <div
//         className="login-box"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="login-box-header">
//           <h2>{currentState}</h2>

//           <X
//             size={22}
//             className="login-close"
//             onClick={() => setShowLogin(false)}
//           />
//         </div>

//         {/* Form */}
//         <form className="login-form">

//           {currentState === "Sign Up" && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               required
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             required
//           />

//           <button type="submit">
//             {currentState}
//           </button>

//         </form>

//         {/* Terms */}
//         <div className="login-checkbox">
//           <input type="checkbox" required />
//           <p>
//             I agree to the Terms & Conditions.
//           </p>
//         </div>

//         {/* Switch Login/Register */}
//         <div className="login-switch">

//           {currentState === "Login" ? (
//             <p>
//               New here?
//               <span onClick={() => setCurrentState("Sign Up")}>
//                 Create Account
//               </span>
//             </p>
//           ) : (
//             <p>
//               Already have an account?
//               <span onClick={() => setCurrentState("Login")}>
//                 Login
//               </span>
//             </p>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;


import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import "./LoginPopup.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const url = import.meta.env.VITE_API_URL; // Change if needed
  const { setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let endpoint = "/api/user/login";

      if (currentState === "Sign Up") {
        endpoint = "/api/user/register";
      }

      const response = await axios.post(url + endpoint, data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        if (response.data.success) {

          if (currentState === "Login") {

            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setShowLogin(false);

            alert("Login Successful");

          } else {

            alert("Registration Successful! Please login.");

            setCurrentState("Login");

            setData({
              name: "",
              email: "",
              password: "",
            });

          }

        }
        alert(
          currentState === "Login"
            ? "Login Successful"
            : "Registration Successful"
        );

        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  const switchMode = () => {
    setCurrentState((prev) =>
      prev === "Login" ? "Sign Up" : "Login"
    );

    setData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div
      className="login-overlay"
      onClick={() => setShowLogin(false)}
    >
      <div
        className="login-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="login-box-header">
          <h2>{currentState}</h2>

          <X
            className="login-close"
            size={22}
            onClick={() => setShowLogin(false)}
          />
        </div>

        <form
          className="login-form"
          onSubmit={onSubmitHandler}
        >
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />

          <button type="submit">
            {currentState === "Login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {currentState === "Sign Up" && (
          <div className="login-checkbox">
            <input type="checkbox" required />
            <p>I agree to the Terms & Conditions.</p>
          </div>
        )}

        <div className="login-switch">
          {currentState === "Login" ? (
            <p>
              New here?
              <span onClick={switchMode}>
                {" "}Create Account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={switchMode}>
                {" "}Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;