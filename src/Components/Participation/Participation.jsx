import React from 'react';
import './Participation.css'
import Notebook from '../../Assets/icons/carbon_notebook-reference.svg'
import Vector from '../../Assets/icons/Vector (1).svg'
import Robot from '../../Assets/icons/Robot.svg'
import Id from '../../Assets/icons/IdentificationCard.svg'

const AIChallengesSection = () => {
    const challengeSection=[
        {
        title: "Prove your skills",
        description:"Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
        icon:Notebook
    },
    {
        title: "Learn from community",
        description:"One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
        icon:Vector
    },
    {
        title: "Challenge yourself",
        description:"There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
        icon:Robot
    },
    {
        title: "Earn recognition",
        description:"You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
        icon:Id
    },
]
    return (
        <div className="ai-challenges-section">
            <h2 className="section-title">Why Participate in <span>AI Challenges?</span></h2>
            <div className="cards-container">
                {
                    challengeSection.map((e,i)=>(
                        <div className="cards" key={i}>
                <img src={e.icon} alt={e.title} className='card-icon'/>
                <h3>{e.title}</h3>
                    <p>{e.description}</p>
                </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AIChallengesSection;

