import { useSelector } from 'react-redux';
import Cart from '../../components/Cart/Cart';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return <Cart cartItems={cartItems} />;
};

export default CartScreen;
