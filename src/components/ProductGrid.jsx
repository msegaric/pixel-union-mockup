import { useContext, useState } from 'react';
import ProductCard from './ProductCard';
import CartContext from '../context/CartContext';
//import JeansProductShot from '../assets/jeans-product-shot.jpg';


function ProductGrid() {
  const {
    cartState, 
    productsState
  } = useContext(CartContext)

  return (
    <div className='grid-container'>
      <span className='cart-total'>
        Total: ${cartState.totalPrice.toFixed(2)}
      </span>
      <div className='product-grid'>
        {productsState.map((singleProduct, i) => 
        <ProductCard product={singleProduct} key={i} />
        )}
      </div>
    </div>
  )
}
export default ProductGrid