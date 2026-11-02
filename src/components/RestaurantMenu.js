import { useEffect, useState } from 'react';
import useRestaurantMenu from '../utils/useRestaurantMenu';

import { useParams } from 'react-router';
import Shimmer from './Shimmer';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId); // Custom Hooks

  //// Stores the index of the currently expanded category.
  //// `null` means all categories are collapsed.
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const cards = resInfo?.cards ?? [];

  ////Find restaurant information dynamically
  const restaurantInfo = cards.find(
    (entry) =>
      entry?.card?.card?.info?.name && entry?.card?.card?.info?.cuisines
  )?.card?.card?.info;

  if (!restaurantInfo) {
    return <p role="alert">Restaurant details are unavailable.</p>;
  }

  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  ////Find menu groups dynamically
  const menuGroups = cards.flatMap(
    (entry) => entry?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? []
  );

  const categories = menuGroups.filter(
    (c) =>
      c.card?.card?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  );

  ////Extract all menu items from every category
  const itemCards = menuGroups.flatMap(
    (group) => group?.card?.card?.itemCards ?? []
  );
  console.log('Category count:', categories.length);

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      {/*//@ cateogies accordians */}
      {categories.map((category, index) => (
        //@ controlled component
        <RestaurantCategory
          key={category.card.card.categoryId}
          data={category?.card?.card}
          ////Only the category matching `showIndex` will display its items.
          showItems={index === showIndex ? true : false}
          ////Toggle the selected category:
          ////If it is already open, set the state to `null` to collapse it.
          ////Otherwise, update the state with the clicked category's index.
          ////This ensures only one category is open at a time.
          setShowIndex={() =>
            setShowIndex((prevIndex) => (prevIndex === index ? null : index))
          }
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
