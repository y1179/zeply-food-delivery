import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";
import AIRecommendation from "../../components/AiRecommendation/AiRecommendation";
export default function Home({ cartItems, addToCart, removeFromCart }) {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <AIRecommendation/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay
        category={category}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <AppDownload />
    </div>
  );
}
