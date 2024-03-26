import Hero from "../Components/Hero";
import CategoryCard from "./CategoryCard";
// import Skinrevive from "../assets/Skinrevive.png";
const Home = () => {
  return (
    <div className="w-full overflow-hidden flex-column justify-center items-center">
      <Hero />
      <CategoryCard />
    </div>
  );
};

export default Home;
