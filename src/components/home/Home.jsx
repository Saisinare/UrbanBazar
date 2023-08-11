import React from 'react';
import Categories from './Categories';
import OfferSlider from './OfferSlider';
import BestOfSection from './BestOfSection';
import Footer from './Footer';
const Home = () => {
    
    return (
        <div className='px-5'>
        <Categories/>
        <OfferSlider/>
        <BestOfSection/>
        <Footer/>
        </div>

    );
}
export default Home;