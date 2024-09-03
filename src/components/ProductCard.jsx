import { useContext } from 'react';
import AddToCartButton from './AddToCartButton';
import StarRating from './StarRating';
import PlaceholderImage from '../assets/placeholder-image.jpg';
import SoldOutBadge from './SoldOutBadge';
import VariantSwatch from './VariantSwatch';
import CartContext from '../context/CartContext';

function ProductCard({product}) {

  const {cartState, cartMatch } = useContext(CartContext);
  let quantityInCart = 0;
  cartState.items.forEach((item) => {
    if(cartMatch(item, product)){
      return quantityInCart = item.quantity
    }
  })
  const selectedVariant = product.variants !== undefined ? product.variants[product.selectedVariantIndex] : product;

  return (
    <div className='product-card'>
      <div className='product-card__image-container'>
        <img 
          src={(selectedVariant.featureImageSource && selectedVariant.featureImageSource !== "") ? selectedVariant.featureImageSource : PlaceholderImage} 
          className='product-card__image'
          alt='alt text placeholder...'
        />
        {selectedVariant.inventoryQuantity > quantityInCart && <AddToCartButton product={product}/>}
        {selectedVariant.inventoryQuantity <= quantityInCart && < SoldOutBadge />}
      </div>
      <div className='swatch-container'>
      {product.variants !== undefined && product.variants.map((variant, i) => <VariantSwatch product={product} variant={variant} key={i}/>)}
      </div>
      <h3 className={selectedVariant.inventoryQuantity > quantityInCart ? 'product-card__title' : 'product-card__title sold-out'}>{product.title}</h3>
      <span className={selectedVariant.inventoryQuantity > quantityInCart ? 'product-card__price' : 'product-card__price sold-out'}>${selectedVariant.price.toFixed(2)}</span>
      <StarRating rating={product.reviewStarRating}/>
    </div>
  )
}
export default ProductCard