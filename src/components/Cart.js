import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../utils/cartSlice';
import ItemList from './ItemList';
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log('Cart Items:', cartItems);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    // Dispatch the clearCart action to clear the cart items
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <button
        className="bg-black text-white px-4 py-2 rounded-lg m-4"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="w-6/12 m-auto">
          <ItemList items={cartItems} />
        </div>
      )}
    </div>
  );
};

export default Cart;
