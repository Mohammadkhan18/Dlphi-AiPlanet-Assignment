// src/ExploreChallenges.js
import React, { useState, useEffect } from 'react';
import caret from '../../Assets/icons/Caret.svg'
import caret1 from '../../Assets/icons/Caret (1).svg'
import card1 from '../../Assets/card1.png'
import card2 from '../../Assets/card2.png'
import card3 from '../../Assets/card3.png'
import card4 from '../../Assets/card4.png'
import card5 from '../../Assets/card5.png'
import card6 from '../../Assets/card6.png'
import cross from '../../Assets/icons/gridicons_cross-circle.svg'
import tick from '../../Assets/icons/charm_circle-tick.png'
import './Explore.css';
import { Link } from 'react-router-dom';

const ExploreChallenges = () => {
    useEffect(() => {
        const existingData = localStorage.getItem('hackathons');
        
        if (!existingData) {

    const hackathons = [
        {
            name: "Data Science Bootcamp - Graded Datathon",
            description:"A practical bootcamp focusing on data science challenges with graded projects",
            image: card1,
            startDate:"2024-09-15T06:00:00Z",
            endDate:"2024-09-16T08:00:00Z",
            level:'Easy',
        },
        {
            name: "Data Sprint 72 - Butterfly Identification",
            description:"Build a classification model to identify butterfly species using image data.",
            image: card2,
            startDate:"2024-09-15T06:00:00Z",
            endDate:"2024-09-08T08:00:00Z",
            level:'Medium',

        },
        {
            name: "Data Sprint 71 - Weather Recognition",
            description:"Develop a weather recognition model based on weather data and patterns",
            image: card3,
            startDate:"2024-09-04T16:00:00Z",
            endDate:"2024-09-10T08:00:00Z",
            level:'Easy',
        
        },
        {
            name: "Data Sprint 70-Airline Passenger Satisfaction",
            description:"Analyze airline passenger data to predict satisfaction and improve services",
            image: card4,
            startDate:"2024-09-04T06:00:00Z",
            endDate:"2024-09-15T08:00:00Z" ,
            level:'Hard',
       
        },
        {
            name: "Engineering Graduates Employment Outcomes",
            description:"Predict employment outcomes based on data from engineering graduates",
            image: card5,
            startDate:"2024-09-03T06:00:00Z",
            endDate:"2024-09-03T08:00:00Z",
            level:'Medium',        
        },
        {
            name: "Travel Insurance Claim Prediction",
            description:"Predict travel insurance claims using passenger data for risk assessment",
            image: card6,
            startDate:"2024-09-01T06:00:00Z",
            endDate:"2024-09-02T08:00:00Z",
            level:'Hard',        
        },

    ];
    
    localStorage.setItem('hackathons', JSON.stringify(hackathons));
}
}, []);


    function CountdownTimer({ startDate, endDate, onStatusChange }) {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
        function calculateTimeLeft() {
            const now = new Date();
            const start = new Date(startDate);
            const end = new Date(endDate);
            let status = '';
    
    
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                status = 'Invalid Date';
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    status: status
                };
            }
    
            if (now < start) {
                let difference = start - now;
                status = 'Upcoming';
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                    status: status
                };
            } else if (now >= start && now <= end) {
                let difference = end - now;
                status = 'Active';
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                    status: status
                };
            } else {
                status = 'Past';
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    status: status
                };
            }
        }
    
        useEffect(() => {
            const timer = setInterval(() => {
                const newTimeLeft = calculateTimeLeft();
                setTimeLeft(newTimeLeft);
                onStatusChange(newTimeLeft.status);
            }, 1000);
    
            return () => clearInterval(timer);
        }, [startDate, endDate, onStatusChange]);
    
        const date = new Date(endDate);
        const displayStatus = timeLeft.status === 'Active' ? 'Ends In' : timeLeft.status === 'Past' ? 'Ended On' : 'Starts In';
    
        return (
            <div className='time'>
                {timeLeft.status === 'Past' ? (
                    <div className='countdown-container'>
                        <span className='state'>{displayStatus}</span>
                        <div className='time-left mb-4'>{date.toDateString()}</div>
                    </div>
                ) : (
                    <div className="countdown-container">
                        <span className="state">{displayStatus}</span>
                        <div className="time-left">
                            {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} <br />
                            <div className="time-labels">
                                <span>Days</span>
                                <span>Hours</span>
                                <span>Mins</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    

    function HackathonCard({ hackathon }) {
        const [dynamicStatus, setDynamicStatus] = useState(hackathon.status);

        return (
            <Link to={`/details/${encodeURIComponent(hackathon.name)}`} className="explore-cards">
                <img src={hackathon.image} alt={hackathon.name} className="card-image" />
                <div className="explore-cards-content">
                    <span className={`status ${dynamicStatus?.toLowerCase()}`}>
                        {dynamicStatus}
                    </span>
                    <h3>{hackathon.name}</h3>
                    <CountdownTimer
                        startDate={hackathon.startDate}
                        endDate={hackathon.endDate}
                        onStatusChange={(status) => setDynamicStatus(status)}
                    />
                    <button className="participate-button"><img src={tick} alt='icon' />Participate Now</button>
                </div>
            </Link>
        );
    }


    const getStatus = (startDate, endDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        let status = '';
    
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return 'Invalid Date';
        }
    
        if (now < start) {
            return 'Upcoming';
        } else if (now >= start && now <= end) {
            return 'Active';
        } else {
            return 'Past';
        }
    };
    

const [hackathonsData, setHackathonsData] = useState([]);
const [filteredHackathons, setFilteredHackathons] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [filters, setFilters] = useState({ status: [], level: [] });
const [isFilterOpen, setIsFilterOpen] = useState(false)

const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

useEffect(() => {
    const data = JSON.parse(localStorage.getItem('hackathons')) || [];
    setHackathonsData(data);
    setFilteredHackathons(data); 
}, []);

useEffect(() => {
    const filterHackathons = () => {
        let filtered = hackathonsData;

        // Apply search filter
        if (searchTerm) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((hackathon) =>
                hackathon.name?.toLowerCase().includes(lowercasedSearchTerm)
            );
        }

        // Apply status and level filters
        filtered = filtered.filter((hackathon) => {
            const dynamicStatus = getStatus(hackathon.startDate, hackathon.endDate);
            const allSelected = filters.status.includes('All');
            const statusMatch = allSelected || filters.status.length === 0 || filters.status.includes(dynamicStatus);
            const levelMatch = allSelected || filters.level.length === 0 || filters.level.includes(hackathon.level);
            return statusMatch && levelMatch;
        })

        setFilteredHackathons(filtered);
    };

    filterHackathons();
}, [searchTerm, filters, hackathonsData]); 

const handleSearch = (event) => {
    const searchValue = event.target.value?.toLowerCase();
    setSearchTerm(searchValue);
};

const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
        let updatedValues;
        if (filterType === 'status' && value === 'All') {
            updatedValues = ['All']; // When 'All' is selected, show all products
        } else {
            const isAlreadySelected = prevFilters[filterType].includes(value);
            updatedValues = isAlreadySelected
                ? prevFilters[filterType].filter((item) => item !== value)
                : [...prevFilters[filterType], value];
            
            // Remove 'All' if any other status is selected
            if (filterType === 'status' && updatedValues.length > 0) {
                updatedValues = updatedValues.filter(item => item !== 'All');
            }
        }
        return {
            ...prevFilters,
            [filterType]: updatedValues,
        };
    });
};
const handleRemoveFilter = (filterType, value) => {
    setFilters((prevFilters) => {
      let updatedValues = prevFilters[filterType].filter((item) => item !== value);
    
      return {
        ...prevFilters,
        [filterType]: updatedValues,
      };
    });
  };
  


    return (
        <>
        <div className='explore-section'>
            <h2 className="explore-section-title">Explore Challenges</h2>
            <div className="search-filter-container">
                <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Search" 
                    value={searchTerm}
                    onChange={handleSearch} 
                />
                 <div className="dropdown my-auto filter-overlay">
          <button
            className={`filter-button ${isFilterOpen?'true':''}`}
            type="button"
            onClick={toggleFilterPanel}
            aria-expanded={isFilterOpen}
          >
            Filter <img src={isFilterOpen ? caret1 : caret} alt='icon' />
          </button>
          <ul className={`dropdown-menu ${isFilterOpen ? 'show' : ''}`}>
          
    <li>
        <div className="px-3 py-2">
            <h6>Status</h6>
            {['All', 'Active', 'Upcoming', 'Past'].map((status) => (
                <label key={status} className="d-block">
                    <input
                        type="checkbox"
                        className="me-2"
                        onChange={() => handleFilterChange('status', status)}
                        checked={filters.status.includes(status)}
                    />
                    {status}
                </label>
            ))}
            <h6 className="mt-3">Level</h6>
            {['Easy', 'Medium', 'Hard'].map((level) => (
                <label key={level} className="d-block">
                    <input
                        type="checkbox"
                        className="me-2"
                        onChange={() => handleFilterChange('level', level)}
                        checked={filters.level.includes(level)}
                    />
                    {level}
                </label>
            ))}
        </div>
    </li>
</ul>

        </div>
</div>
<div className="selected-filters">
        {Object.entries(filters).map(([filterType, selectedValues]) =>
          selectedValues.map((value) => (
            <span key={`${filterType}-${value}`} className="display-filters">
              {value}
              <img
              src={cross}
              alt='icon'
              className="filter-remove-icon"
              onClick={() => handleRemoveFilter(filterType, value)}
            />
            </span>
          ))
        )}
      </div>
         </div>
        <div className="challenges-section">
            <div className="explore-cards-container">
                {filteredHackathons.map((hackathon, index) => (
                    <HackathonCard key={index} hackathon={hackathon} />
                ))}
            </div>
        </div>
        </>
    );
};

export default ExploreChallenges;
