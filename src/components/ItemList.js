import { CDN_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

const ItemList = ({ items }) => {
  // Provides access to the Redux store's dispatch function,
  // allowing this component to trigger state updates through actions.
  const dispatch = useDispatch();

  /**
   * Handles adding a product to the shopping cart.
   *
   * @param {Object} item - The product object to be added to the cart.
   */
  const handleAddItem = (item) => {
    console.log('Item Added:', item);

    // Dispatches the addItem action with the product as its payload.
    // Redux processes this action through the cart reducer,
    // which updates the cart's items collection.
    dispatch(addItem(item));
  };
  return (
    <div data-testid="foodItems">
      {items.map((item, index) => (
        <div
          key={`${item?.card?.info?.id}-${index}`}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              {' '}
              <span>{item?.card?.info?.name}</span>
              <span>
                - ₹
                {item?.card?.info?.price
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100}
              </span>
            </div>
            <div className="text-xs">{item?.card?.info?.description}</div>
          </div>

          <div className="w-3/12 p-4 ">
            <div className="absolute">
              <button
                className="p-2 mx-16 rounded-lg bg-blue-900 text-white shadow-lg absolute m-auto"
                onClick={() => handleAddItem(item)}
              >
                +Add
              </button>
            </div>

            <img src={CDN_URL + item.card.info.imageId} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
