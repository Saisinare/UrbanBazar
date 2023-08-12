import React from 'react';
import Categories from './Categories';
import BestOfSection from './BestOfSection';
import Footer from './Footer';
import OfferBanner from './OfferSlider';
import ProductCard from './../ProductStore/ProductCard'
const Home = () => {
    return (
        <div className='px-5'>
        <Categories/>
        <OfferBanner/>
        <BestOfSection/>
        <Footer/>
        </div>

    );
}
export default Home;