import { useContext, useState } from 'react';
import ProductCard from './ProductCard';
import CartContext from '../context/CartContext';
import MerinoTeePhoto from '../assets/merino-wool-tee-navy.jpg';
import JeansProductShot from '../assets/jeans-product-shot.jpg'


function ProductGrid() {
  const {cartState} = useContext(CartContext)
  const products = [
    {
      id: 12345,
      title: "Ultrafine Merino T - Shirt",
      price: 80.00,
      featureImageSource: MerinoTeePhoto,
      reviewStarRating: 4
    },
    {
      id: 45678,
      title: "Secondary test product",
      price: 45.00,
      featureImageSource: JeansProductShot,
      reviewStarRating: 2.7
    }
  ]
  return (
    <div className='product-grid'>
      {products.map((singleProduct, i) => 
      <ProductCard product={singleProduct} key={i} />
      )}
    </div>
  )
}
export default ProductGrid