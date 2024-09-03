import { createContext, useState, useEffect } from 'react';
import MerinoTeePhotoNavy from '../assets/merino-wool-tee-navy.jpg';
import MerinoTeePhotoGrey from '../assets/merino-wool-tee-grey.jpg';
import MerinoTeePhotoOrange from '../assets/merino-wool-tee-orange.jpg';

const CartContext = createContext();

export const CartProvider = ({children}) => {


  const defaultProducts = [
    {
      id: 12345,
      title: "Ultrafine Merino T-Shirt",
      reviewStarRating: 3.63,
      selectedVariantIndex: 0,
      variants: [
        {
          title: "Blue",
          featureImageSource: MerinoTeePhotoNavy,
          swatch: "#333c5e",
          inventoryQuantity: 6,
          price: 80.00
        },
        {
          title: "Grey",
          featureImageSource: MerinoTeePhotoGrey,
          swatch: "#777777",
          inventoryQuantity: 4,
          price: 120.00
        },
        {
          title: "Orange",
          featureImageSource: MerinoTeePhotoOrange,
          swatch: "#9B5B13",
          inventoryQuantity: 3,
          price: 120.00
        }
      ]
    },
    {
      id: 45678,
      title: "Test secondary product",
      reviewStarRating: 5,
      featureImageSource: "",
      inventoryQuantity: 7,
      price: 120.00
    }
  ]
  const [productsState, updateProductsState] = useState(defaultProducts);

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
    console.log('updating from storage');
    const storedCart = JSON.parse(localStorage.getItem('storedCart'));
    if(storedCart && storedCart.items && storedCart.totalPrice) {
      updateCartState(storedCart);
    }
  },[])
  const cartMatch = (item, product) => {
    if(item.id === product.id){
      console.log('item: ',item);
      if(Object.hasOwn(item, 'selectedVariantIndex')){
        if(item.selectedVariantIndex === product.selectedVariantIndex){
          return item;
        }
      }else{
        return item;
      }
    }
  }
  const addToCart = (product, quantity = 1) => {

    let lineItem = {...product, quantity: quantity };
    if(Object.hasOwn(product, 'selectedVariantIndex')){
      lineItem = 
        { 
          ...lineItem, 
          quantity: quantity, 
          price: product.variants[product.selectedVariantIndex].price,
          title: product.title + ' - ' + product.variants[product.selectedVariantIndex].title 
        };
    }
    delete lineItem.inventoryQuantity;
    let cartItems = [...cartState.items];

    let existingIndex = cartItems.findIndex(item => cartMatch(item, product));
    if(cartItems[existingIndex]) {
      const updatedItem = {...cartItems[existingIndex], quantity: cartItems[existingIndex].quantity += 1};
      cartItems[existingIndex] = updatedItem;
    }else{
      cartItems = [...cartState.items, lineItem]; 
    }


    const newTotalPrice = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

    console.log(cartItems);
    updateCartState({
      ...cartState, 
      items: cartItems,
      totalPrice: newTotalPrice
    })

  }


  return <CartContext.Provider value={{
    cartState,
    updateCartState,
    addToCart,
    productsState,
    updateProductsState,
    cartMatch
  }}>
    {children}
  </CartContext.Provider>

}

export default CartContext