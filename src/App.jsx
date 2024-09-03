import {CartProvider} from '././context/CartContext';
import ProductGrid from '././components/ProductGrid';

function App() {

  return (
    <CartProvider>
      <ProductGrid />
    </CartProvider>

  )
}

export default App
