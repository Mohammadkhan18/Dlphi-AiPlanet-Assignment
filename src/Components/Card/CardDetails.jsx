import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CardDetails.css'; 
import clock from '../../Assets/icons/clock.png';
import skills from '../../Assets/icons/carbon_skill-level-basic.png';

const CardDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate(); // Hook to navigate between routes
    const hackathons = JSON.parse(localStorage.getItem('hackathons')) || [];
    const hackathon = hackathons.find(h => h.name === decodeURIComponent(name));
    const [activeTab, setActiveTab] = useState('overview');

    if (!hackathon) {
        return <div>Hackathon not found</div>;
    }

    const formattedStartDate = new Date(hackathon.startDate).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Kolkata',
        timeZoneName: 'short'
    });

    // Function to handle Edit button click
    const handleEdit = () => {
        navigate('/form', { state: { editItem: hackathon } }); // Navigate to /form with data to edit
    };

    // Function to handle Delete button click
    const handleDelete = () => {
        // Filter out the hackathon to delete
        const updatedHackathons = hackathons.filter(h => h.name !== decodeURIComponent(name));
        localStorage.setItem('hackathons', JSON.stringify(updatedHackathons));
        navigate('/'); // Navigate back to the homepage or another page after deletion
    };

    return (
        <div className="card-details-container">
            <div className="card-header">
                <div className="card-info">
                    <span className="start-date">
                        <img src={clock} alt='icon' /> 
                        Starts on {formattedStartDate}
                    </span>
                    <h1>{hackathon.name}</h1>
                    <p>{hackathon.description}</p>
                    <div className="difficulty">
                        <div className="level">
                            <img src={skills} alt='icon' />
                            <span>{hackathon.level}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tab-nav">
                <button 
                    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <div>
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            {activeTab === 'overview' && (
                <div className="overview-section">
                    <p>Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.</p>

                    <p>An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.</p>

                    <p>Your Task is to build an Image Classification Model using CNN that classifies to which class of weather each image belongs to.</p>
                </div>
            )}
        </div>
    );
};

export default CardDetails;
