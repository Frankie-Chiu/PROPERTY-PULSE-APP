import Link from "next/link";
import Hero from "./properties/components/Hero";
import InfoBoxes from "./properties/components/InfoBoxes";
import HomeProperties from "./properties/components/HomeProperties";
import FeaturedProperties from "./properties/components/FeaturedProperties";

export const metadata = {
  title: "Property Pulse",
  keywords: "property, rental, real-estate",
  description: "find the perfect rental property",
};

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
};

export default HomePage;
