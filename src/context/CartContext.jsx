import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {

    const emptyCart = {
      items: [],
      totalPrice: 0
    }

  const [cartState, updateCartState] = useState(emptyCart);

  const updateStoredCart = (updatedCart) => {
    localStorage.setItem('storedCart', JSON.stringify(updatedCart));
  }

  useEffect(() => {
    if(cartState.items.length > 0 && JSON.stringify(cartState) !== localStorage.getItem('storedCart')){
       updateStoredCart(cartState);
    }
  },[cartState])

  useEffect(() => {
    try{
      JSON.parse(localStorage.getItem('storedCart'));
    } catch{
      return console.warn('The value we have stored for the cart isnt valid');
    }
    const storedCart = JSON.parse(localStorage.getItem('storedCart'));
    if(storedCart && storedCart.items && storedCart.totalPrice) {
      updateCartState(storedCart);
    }
  },[])
  
  const addToCart = (product, quantity = 1) => {
    const lineItem = product;
    lineItem.quantity = quantity;
    let cartItems = [...cartState.items];
    const existingLine = cartItems.find(item => item.id === product.id);
    if(existingLine){
      existingLine.quantity = existingLine.quantity + quantity;
    }else{
      cartItems = [...cartState.items, lineItem];
    }
    const newTotalPrice = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    
    updateCartState({
      items: cartItems,
      totalPrice: newTotalPrice
    })
  }


  return <CartContext.Provider value={{
    cartState,
    updateCartState,
    addToCart
  }}>
    {children}
  </CartContext.Provider>

}

export default CartContext