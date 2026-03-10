
import Blogs from "../components/Blogs/Blogs";
import BookNow from "../components/BookNow/BookNow";
import Categories from "../components/Categories/Categories";
import Destinations from "../components/Destinations/Destinations";
import FeaturedProperties from "../components/FeaturedProperties/FeaturedProperties";
import Hero from "../components/Hero/Hero";
import HostExperience from "../components/HostExperience/HostExperience";
import Partners from "../components/Partners/Partners";



function Home() {
  return (
    <>
      <Hero />
      <Categories/>
      <FeaturedProperties />
      <BookNow />
      <Destinations />
      <Blogs />
      <HostExperience />
      <Partners />
    </>
  );
}

export default Home;