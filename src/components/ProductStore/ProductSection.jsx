import React from 'react';
import ProductCard from './ProductCard';

const ProductSection = () => {
    return (
        <div className='flex w-full flex-wrap bg-slate-200 p-2'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        </div>
    );
}

export default ProductSection;