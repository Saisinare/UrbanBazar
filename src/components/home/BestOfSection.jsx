import React from 'react';
import BestOfCard from './BestOfCard';

const BestOfSection = () => {
    return (
        <div class="w-100 h-auto p-2 flex flex-col  bg-gray-100 shadow ">
        <BestOfCard title={"Electronics"} />
        <BestOfCard title={"Appliances"} even={true}/>
        <BestOfCard title={"Fashion"}/>
    </div>
    );
}


export default BestOfSection;