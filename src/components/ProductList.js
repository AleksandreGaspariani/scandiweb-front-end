import React from 'react'
import { useSelector } from 'react-redux';
import ContainerItem from './ContainerItem';


const ProductList = () => {

    const { labelNav, activeNav } = useSelector((state) => state.global);
    const productCategory = labelNav[activeNav].toLowerCase();

    const parsedData = JSON.parse(localStorage.getItem('data'));
    const products = parsedData['data']['products'];

    const filteredProducts = products.filter(product => 
        productCategory === 'all' || product.category === productCategory
    );


  return (
    <div>
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

        {filteredProducts.map((singleProduct) => (
            <ContainerItem key={singleProduct.id} product={singleProduct}/>
        ))}

        </div>

    </div>
  )
}

export default ProductList