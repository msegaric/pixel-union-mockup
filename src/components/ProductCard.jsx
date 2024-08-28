import AddToCartButton from './AddToCartButton'
import StarRating from './StarRating'

function ProductCard({product}) {
  return (
    <div className='product-card'>
      <div className='product-card__image-container'>
        <img 
          src={product.featureImageSource !== "" ? product.featureImageSource : "/src/placeholder-image.jpg"} 
          className='product-card__image'
          alt='alt text placeholder...'
        />
        <AddToCartButton product={product}/>
      </div>
      <h3 className='product-card__title'>{product.title}</h3>
      <span className='product-card__price'>${product.price.toFixed(2)}</span>
      <StarRating rating={product.reviewStarRating}/>
    </div>
  )
}
export default ProductCard