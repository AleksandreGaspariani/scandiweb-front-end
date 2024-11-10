import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';

const groupCartItems = (items) => {
  const groupedItems = {};

  items.forEach((item) => {
      const key = item.id + JSON.stringify(item.selectedAttributes);
      
      if (groupedItems[key]) {
          groupedItems[key].quantity += 1;
      } else {
          groupedItems[key] = { ...item, quantity: 1 };
      }
  });

  return Object.values(groupedItems);
};

const Cart = () => {

  const dispatch = useDispatch();
  const cartItemsCount = localStorage.getItem('cart');
  const { activeCart, items } = useSelector((state) => state.global);

  const aggregatedItems = items.reduce((acc, item) => {
    const existingItem = acc.find(
        (i) => i.id === item.id && JSON.stringify(i.selectedAttributes) === JSON.stringify(item.selectedAttributes)
    );

    if (existingItem) {
        // Increment quantity if an identical item exists
        existingItem.quantity += item.quantity;
    } else {
        // Otherwise, add a new item
        acc.push({ ...item });
    }
    return acc;
  }, []);

  const totalAmount = () => {
    let priceSum = 0;
    
    items.forEach(itemPrice => {
      priceSum += Number(itemPrice.prices[0].amount);
    });
    return priceSum;
  };

  totalAmount();

  // TODO- custom width for the cart, cuz at this moment it have h-auto so, depent on how many items do u have there the cart starts grow and grow.

  return (
    <div className={`absolute right-10 bg-dark w-80 min-h-40 max-h-100 align-left ${ activeCart ? 'block' : 'hidden'}`} id='cart'>
        <div className='relative w-full h-full px-4 py-2 bg-white rounded-b-lg shadow-xl'>
          <div>
            <b className='w-full raleway'>My Bag: <span className='font-normal'>{cartItemsCount > 0 ? `${cartItemsCount}` : 'There is no '} items.</span></b>
          </div>
          <div>
            {aggregatedItems.map((item) => (
              <CartItem key={item.cartItemId} data={item} quantity={item.quantity}/>
            ))}
          </div>
          <div className='mt-8  w-full'>
            <div className='w-full flex justify-between'>
              <p style={{fontFamily: 'roboto'}}>Total: </p>
              <span className='raleway font-medium'>${totalAmount()}</span>
            </div>
            <div className='w-full mt-8'>
              <button className='btn w-full bg-green-400 font-light py-2 text-white'>
                Place Order
                {/* FIXME If a cart is empty the button shall be greyed out and disabled */}
              </button>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default Cart