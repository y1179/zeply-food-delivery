// import {useState,useContext} from "react";
// import axios from "axios";
// import {StoreContext} from "../../context/StoreContext";
// import FoodItem from "../FoodItem/FoodItem";
// import './AiRecommendation.css';

// const AIRecommendation=()=>{


// const [query,setQuery]=useState("");
// const [result,setResult]=useState([]);


// const {food_list}=useContext(StoreContext);



// const recommend=async()=>{


// const res=await axios.post(
// `${import.meta.env.VITE_API_URL}/api/ai/recommend`,
// {
// query
// }
// );


// setResult(res.data.recommendations);


// }



// const foods=food_list.filter(food=>
// result.includes(food.name)
// )



// return(

// <div>


// <h2>
// 🤖 AI Food Recommendation
// </h2>


// <input

// placeholder="What are you craving?"

// value={query}

// onChange={(e)=>setQuery(e.target.value)}

// />


// <button onClick={recommend}>
// Recommend
// </button>



// <div>

// {
// foods.map(food=>(

// <FoodItem

// key={food._id}

// id={food._id}

// name={food.name}

// price={food.price}

// description={food.description}

// image={food.image}

// />

// ))
// }

// </div>


// </div>


// )


// }


// export default AIRecommendation;


import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./AIRecommendation.css";


const AIRecommendation = () => {

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { food_list } = useContext(StoreContext);


  const recommend = async () => {

    if (!query.trim()) return;

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/recommend`,
        {
          query
        }
      );

      setResult(res.data.recommendations);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  const foods = food_list.filter(food =>
    result.includes(food.name)
  );


  const suggestions = [
    "Spicy food 🌶️",
    "Healthy food 🥗",
    "Dessert 🍰",
    "Under ₹200 💰",
    "High protein 🍗"
  ];


  return (

    <section className="ai-recommendation">


      <div className="ai-header">

        <h2>
            <span>Food Assistant</span>
        </h2>


        <p>
          Tell us your craving and get personalized food suggestions
        </p>


        <div className="ai-badge">
          ✨ Powered by Groq AI
        </div>

      </div>



      <div className="ai-search-box">

        <input

          type="text"

          placeholder="Example: I want spicy food under ₹200"

          value={query}

          onChange={(e)=>setQuery(e.target.value)}

          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              recommend();
            }
          }}

        />


        <button onClick={recommend}>

          {loading ? "Thinking..." : "Recommend"}

        </button>


      </div>




      <div className="ai-suggestions">

        {
          suggestions.map((item,index)=>(

            <button
              key={index}
              onClick={()=>setQuery(item)}
            >
              {item}
            </button>

          ))
        }

      </div>




      {
        loading && (

          <p className="ai-loading">
            🤖 Finding the best food for you...
          </p>

        )
      }




      {
        foods.length > 0 && (

          <div className="ai-result">

            <h3>
              Recommended For You ✨
            </h3>


            <div className="ai-food-grid">

              {
                foods.map(food=>(

                  <FoodItem

                    key={food._id}

                    id={food._id}

                    name={food.name}

                    price={food.price}

                    description={food.description}

                    image={food.image}

                  />

                ))
              }

            </div>


          </div>

        )
      }



    </section>

  );

};


export default AIRecommendation;