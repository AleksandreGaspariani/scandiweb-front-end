import React from 'react'
import '../style/container.css'
import cart from '../logos/cart.png'

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment, decrement, addItem } from '../redux/globalReducer';

const ContainerItem = (product) => {

    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const prodData = product['product'];

    // const handleAddToCart = (data) =>{
    //     dispatch(addItem(data));
    // }

    const handleAddToCart = () => {
        // Create a product object with default attribute values
        const defaultAttributes = prodData.attributes.map(attr => ({
          id: attr.id,
          selectedValue: attr.items[0].id, // Choose the first item as the default value
        }));
    
        const productToAdd = {
          ...prodData,
          selectedAttributes: defaultAttributes,
          quantity: 1,
        };
    
        // Dispatch action to add product to cart
        dispatch(increment());
        dispatch(addItem(productToAdd));
      };

  return (
    <div className='relative overflow-hidden containerItems p-3 bg-white hover:bg-gray-200 rounded' 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {isHovered && (
            <div className='absolute right-4 bottom-12 bg-green-500 rounded-full hover:bg-green-400' 
                style={{display: 'flex', width: '40px', height: '40px', justifyContent: 'center', cursor: 'pointer'}}
                onClick ={handleAddToCart}>
                
                <div className='flex overflow-hidden' style={{justifyContent: 'center', alignItems: 'center'}}>
                    <img src='https://img.icons8.com/?size=100&id=15893&format=png&color=FFFFFF' style={{height: '26px', width: '26px'}} />
                </div>
            </div>
        )} 
        {/* Check if product is inStock by true, false values */}
        <img src={prodData.gallery[0]} className='object-contain rounded'></img>
        <div>
            <p className='raleway mt-2'>{prodData.name}</p>
            <small className='raleway font-bold'>{prodData.prices[0]?.currency.symbol}{prodData.prices[0]?.amount}</small>
        </div>
    </div>
  )
}

export default ContainerItem