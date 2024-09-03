import { useContext, useState } from 'react';
import CartContext from '../context/CartContext';

function VariantSwatch({product, variant}) {

  const {productsState, updateProductsState } = useContext(CartContext);
  const updateSelectedVariant = () => {
   product.variants.forEach((option) => {
    if(option === variant){
      product.selectedVariantIndex = product.variants.indexOf(option);
      console.log(product.selectedVariantIndex);
      return;
    }
   })
   const updatedProducts = [...productsState];
   updatedProducts[productsState.indexOf(product)] = product;
   updateProductsState(updatedProducts);
  }
  const classNames = product.variants[product.selectedVariantIndex] === variant ? "selected swatch " + variant.value : "swatch " + variant.value;
  return (
    <button 
    className={classNames}
    style={{ background: variant.swatch}}
    onClick={() => {updateSelectedVariant()}}>
    </button>
  )
}
export default VariantSwatch