import Banner from "./Banner";
import FeaturedServices from "./FeaturedServices";
import Partners from "./Partners";
import PlatformStats from "./PlatformStats";
import CallToAction from "./CallToAction";
import WhyChooseUs from "./WhyChooseUs";
import BlogSection from "./BlogSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedServices />
      <Partners />
      <WhyChooseUs />
      <BlogSection />
      <PlatformStats />
      <CallToAction />
    </div>
  );
};

export default Home;
