import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import data from '../data/data.json'
import ContainerItem from './ContainerItem';
import '../style/container.css'
import Header from './Header';
import Cart from './Cart/Cart';

const Container = () => {
  
  localStorage.setItem('data',JSON.stringify(data));

  const dispatch = useDispatch();
  const { activeCart, labelNav, activeNav } = useSelector((state) => state.global)
  const parsedData = JSON.parse(localStorage.getItem('data'));
  const products = parsedData['data']['products'];

  return (
    <div className={`relative w-full h-full`}>
      <Header />
      <Cart />
      <div className={`relative w-full h-full ${activeCart ? 'overflow-y-hidden' : 'overflow-y-scroll'}`}>
        <div id='disabled-screen' className={`absolute top-0 left-0 w-full h-full ${activeCart ? 'block bg-gray-300 opacity-40' : 'hidden'}`} style={{zIndex: 1}}></div>

        <div id='content' className='px-28 py-10 w-full'>

          <h1 className='py-4 font-semibold text-3xl raleway'>{labelNav[activeNav]}</h1>

          <div className='w-full items-wrapper'>
            {/* (id, img, name, price, isInStock) */}

            {/* TODO
                - **In-stock products**
                    - Have to be clickable and lead to the Product Details Page (PDP)
                - **Out-of-Stock Products**
                    - The Product Image have to be greyed out
                    - an Out of Stock message have to be visible on the Product Image
                    - The Quick Shop button (The green cart button) must not be visible
                    - Product card have to be clickable and lead to the product's main page. However, add-to-cart functionality must not be possible
            */}

            {products.map((singleProduct) => (
              <ContainerItem key={singleProduct.id} product={singleProduct}/>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Container