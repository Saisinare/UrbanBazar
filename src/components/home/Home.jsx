import React from 'react';
import Categories from './Categories';
import BestOfSection from './BestOfSection';

import OfferBanner from './OfferSlider';
import Footer from '../Footer';
const Home = () => {
    return (
        <div className='px-5 '>

        <Categories/>
        <OfferBanner/>
        <BestOfSection/>
        <Footer/>
        </div>

    );
}
export default Home;