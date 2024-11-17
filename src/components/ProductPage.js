import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import data from '../data/data.json'
import ContainerItem from './ContainerItem';
import '../style/container.css'
import Header from './Header';
import Cart from './Cart/Cart';
import { useParams } from 'react-router-dom';

const ProductPage = () => {

    const dispatch = useDispatch();
    const { activeCart, labelNav, activeNav } = useSelector((state) => state.global)
    const parsedData = JSON.parse(localStorage.getItem('data'));
    const products = parsedData['data']['products'];
    const {productId} = useParams();
    const product = products.find(p => p.id === productId); // Find product by ID
    console.log(product);
    

  return (
    <div className={`relative w-full h-full`}>
      <h1>{productId}</h1>
    </div>
  )
}

export default ProductPage