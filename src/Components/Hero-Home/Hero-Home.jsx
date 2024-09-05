import HeroBackground from "../Hero-Background/Hero-Background";
import "./Hero-Home.css";
import { useNavigate } from "react-router-dom";

const HeroHome = () => {
  const navigate = useNavigate();

  const onSubmissionClick = () => {
    navigate("/form");
  };
  return (
    <HeroBackground>
      <div className="hero-home__container" >
        <div className="hero-rectangle"/>
        <h1 className="hero-home__title">Accelerate Innovation<br/>With Global AI Challenges </h1>
        <p className="hero-home__text">
        Accelerate Innovation with Global AI Challenges
AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.
Create Challenge
        </p>
        <button className="hero-home__button" onClick={onSubmissionClick}>
          Create Challenge
        </button>
        <div className="hero-home__img" />
      </div>
    </HeroBackground>
  );
};
export default HeroHome;
