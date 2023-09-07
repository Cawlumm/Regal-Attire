
import { useEffect, useState } from "react";
import Button from "../button/button.component";
import { useNavigate } from "react-router-dom";
import Shoes from './Shoes.jpg';
import Hat from './Hat.jpg';
import Jackets from './Jackets.jpg';
import Jacket from './Jacket.jpg'
import Dress from './Dress.jpg'

import './welcome-banner.styles.scss'

const WelcomeBanner = () => {
    // Initailize variables
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate('shop');
    const [intervalId, setIntervalId] = useState(null);
    const slides = [Shoes, Hat, Jackets, Jacket, Dress];
    let slideIndex = 1;
 
    /**
     * Function to show the banner determined by the number n
     * @param int n 
     */
    const showBanner = (n) => {
        const slides = document.querySelectorAll('.slide');
        if(n > slides.length) slideIndex = 1;
        if(n < 1) slideIndex = slides.length;
        slides.forEach((slide) => (slide.style.display = 'none')); // Default none for all slides
        slides[slideIndex - 1].style.display = 'block'; // Set the chosen slide to block to be seen
    }

    const changeBanner = (n) => {
        showBanner((slideIndex += n))
    }

    // Mounts once, then only when the intervalId changes
    useEffect(() => {
        const slideshowContainer = document.querySelector('.slideshow');
        // Check if the container is empty
        if (slideshowContainer.childElementCount === 0) {
            // For each slide in slides component array
            slides.forEach((slide) => {
            let div = document.createElement('div'); // Create div
            div.className = 'slide'; // Set className
            div.style.backgroundImage = `url(${slide})`; // Set background image using CSS
            slideshowContainer.appendChild(div); // Append the slide to the container
            
            });

            // Start Interval when component mounts, calls the changeBanner function every x seconds
            const startInterval = () => {
                const newIntervalId = setInterval(() => {changeBanner(1)}, 15000);
                setIntervalId(newIntervalId); // Sets inverval in useState
              };
              
              // Will StartInterval if it has not already started
              if(!intervalId){
                  startInterval();
              }
        }

         // Cleanup function to clear the interval when the component unmounts
         return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    return (
        <div className="welcome-banner">
          <div className="slide-container"> 
            <div className="slideshow">
            </div>
          </div>
          <div className="welcome-content">
            <h1>Where Fashion Meets Function</h1>
            <p>Regal Attire</p>
            <Button className="see-more-button" onClick={onNavigateHandler} title='See More'/>
          </div>
        </div>
      );
}

export default WelcomeBanner