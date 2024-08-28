import { useContext } from 'react';
import ProductCard from './ProductCard';
import CartContext from '../context/CartContext';
import MerinoTeePhoto from '../assets/merino-wool-tee-navy.jpg';
//import JeansProductShot from '../assets/jeans-product-shot.jpg';


function ProductGrid() {
  const {cartState} = useContext(CartContext)
  const products = [
    {
      id: 12345,
      title: "Ultrafine Merino T - Shirt",
      price: 80.00,
      featureImageSource: MerinoTeePhoto,
      reviewStarRating: 4
    }
  ]
  return (
    <div className='grid-container'>
      <span className='cart-total'>
        Total: ${cartState.totalPrice.toFixed(2)}
      </span>
      <div className='product-grid'>
        {products.map((singleProduct, i) => 
        <ProductCard product={singleProduct} key={i} />
        )}
      </div>
    </div>
  )
}
export default ProductGrid