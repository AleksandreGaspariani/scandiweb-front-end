import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../style/container.css'
import { useParams } from 'react-router-dom';
import { addItem } from '../redux/globalReducer';
import CartAttribute from './Cart/CartAttribute';

const ProductPage = () => {

    const dispatch = useDispatch();
    const [pdpImage, setPdpImage] = useState(null);
    const parsedData = JSON.parse(localStorage.getItem('data'));
    const products = parsedData['data']['products'];
    const {productId} = useParams();
    const product = products.find(p => p.id === productId);
    const descriptionText = new DOMParser().parseFromString(product.description, 'text/html').body.textContent;

    console.log(product);
    
    useEffect(() => {
      setPdpImage(product.gallery[0]);
    }, []); // re-run the effect when productId or products change

    const [selectedAttributes, setSelectedAttributes] = useState(() =>
      product.attributes.map(attr => ({
          id: attr.id,
          selectedValue: attr.items[0].id, // Default to the first value
      }))
    );

    const handleAddToCart = () => {
      if (product.inStock) {
        const productToAdd = {
          ...product,
          selectedAttributes,
          quantity: 1,
          cartItemId: `${product.id}-${new Date().getTime()}`, // Unique ID for the cart item
        };
        dispatch(addItem(productToAdd));
      };
    };

    const handleAttributeChange = (attributeId, selectedValue) => {
      setSelectedAttributes(prev =>
          prev.map(attr =>
              attr.id === attributeId
                  ? { ...attr, selectedValue }
                  : attr
          )
      );
    };
  
  return (
    <div className={`relative flex flex-row justify-start w-full h-full`}>
      <div className='flex flex-row justify-between' style={{gap: '4rem'}}>
        <div className='flex flex-col'>
          {product.gallery.map((element) => (
            <div style={{cursor: 'pointer'}} className='m-1'>
              <img src={element} style={{height: '80px', width: '80px', objectFit: 'cover', outlineOffset: '2px'}} className={`${pdpImage === element ? 'rounded ring-2' : ''}`} onClick={() => setPdpImage(element)}></img>
            </div>
          ))}
        </div>
        <div className=''>
          <img src={pdpImage} style={{height: 'auto', width: '400px', objectFit: 'contain'}}></img>
        </div>
      </div>
      <div className='flex flex-col	w-auto ps-8' style={{width: '25%'}}>
        <h1 className='text-3xl raleway font-medium'>{product.name}</h1>
        {product.attributes.map(attr => (
            <CartAttribute
                key={attr.id}
                attribute={attr}
                selectedValue={
                    selectedAttributes.find(sa => sa.id === attr.id)?.selectedValue
                }
                onAttributeChange={handleAttributeChange}
                pdp = {true}
            />
        ))}
        <p className='raleway font-bold mt-2' style={{fontSize: '14px'}}>Price</p>
        <p className='raleway font-bold p-0 m-0 text-1xl my-2'>{product.prices[0]?.currency.symbol}{product.prices[0]?.amount}</p>
        <button onClick={handleAddToCart} className={`add-to-cart-btn raleway text-gray-100 font-bold py-3 px-4 rounded ${product.inStock ? 'bg-green-600 cursor-pointer hover:bg-green-400' : 'bg-gray-400 cursor-not-allowed'}`} style={{fontSize: '12px'}}>
          ADD TO CART
        </button>

        <div id='description' className='mt-4'>
          <p className='raleway' style={{fontSize: '12px'}}>{descriptionText}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage