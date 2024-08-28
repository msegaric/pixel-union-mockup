import { useContext } from 'react';
import CartContext from '../context/CartContext';

function AddToCartButton({product}) {

  const {addToCart, cartState} = useContext(CartContext)



  return (
    <div className='product-card__form'>
      <button 
        className='product-card__button'
        onClick={() => {addToCart(product)}}>
        Add to cart 
      </button>
    </div>
  )
}
export default AddToCartButton