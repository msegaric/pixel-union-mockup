import {CartProvider} from '././context/CartContext';
import ProductGrid from '././components/ProductGrid';
import ProductCard from '././components/ProductCard';

function App() {

  return (
    <CartProvider>
      <ProductGrid />
    </CartProvider>

  )
}

export default App
