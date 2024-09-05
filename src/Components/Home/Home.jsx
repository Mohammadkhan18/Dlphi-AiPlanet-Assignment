import HeroHome from "../Hero-Home/Hero-Home";
import Stats from "../Stats/Stats";
import AIChallengesSection from "../Participation/Participation";
import ExploreChallenges from "../Explore/Explore";

const Home = () => {
  return (
    <>
      <HeroHome />
      <Stats/>
      <AIChallengesSection/>
      <ExploreChallenges/>
    </>
  );
};

export default Home;
