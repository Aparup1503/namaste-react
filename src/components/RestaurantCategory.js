import ItemList from './ItemList';
const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };
  return (
    <div>
      {/*Header */}
      <div className="w-6/12 mx-auto my-5 bg-gray-50 shadow-lg p-4 ">
        {/* Clicking the category header opens or collapses the accordion */}
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold">
            {data.title} ({data.itemCards.length})
          </span>
          {/* Display the appropriate arrow based on the accordion state */}
          <span>{showItems ? '🔼' : '🔽'}</span>
        </div>
        {/* Render menu items only when this category is expanded */}
        {showItems && <ItemList items={data.itemCards} />}
      </div>

      {/*Accordian Body*/}
    </div>
  );
};

export default RestaurantCategory;
