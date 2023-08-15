import React from 'react';
import BestOfCard from './BestOfCard';

const BestOfSection = () => {
    return (
        <div class="w-100 h-auto p-2 flex flex-col  shadow ">
        <BestOfCard title={"Electronics"} />
        <BestOfCard title={"Appliances"} even={true}/>
        <BestOfCard title={"Fashion"}/>
    </div>
    );
}


export default BestOfSection;