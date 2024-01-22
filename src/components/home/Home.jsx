import React from 'react';
import Categories from './Categories';
import BestOfSection from './BestOfSection';

import OfferBanner from './OfferSlider';
import Footer from '../Footer';
const Home = () => {
    return (
        <div className='md:px-5 '>
        <Categories/>
        <OfferBanner/>
        <BestOfSection/>
        </div>

    );
}
export default Home;