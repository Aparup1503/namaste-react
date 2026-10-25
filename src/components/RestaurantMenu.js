import { useEffect, useState } from 'react';
import { MENU_API } from '../utils/constant';
import { useParams } from 'react-router';
import Shimmer from './Shimmer';

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();
  console.log(resId);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    //console.log('Status:', response.status);
    const json = await data.json();

    console.log('JSON:', json);

    setResInfo(json.data);
  };

  if (resInfo === null) {
    return <Shimmer />;
  }

  // const restaurantInfo = resInfo.cards?.[2]?.card?.card?.info;
  // if (!restaurantInfo) {
  //   return <p role="alert">Restaurant details are unavailable.</p>;
  // }

  // const { name, cuisines, costForTwoMessage } = restaurantInfo;
  // console.log('Restaurant Info:', restaurantInfo);
  // const { itemCards } =
  //   resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[7]?.card?.card;

  // console.log('Item Cards :', itemCards);

  const cards = resInfo?.cards ?? [];

  // Find restaurant information dynamically
  const restaurantInfo = cards.find(
    (entry) =>
      entry?.card?.card?.info?.name && entry?.card?.card?.info?.cuisines
  )?.card?.card?.info;

  if (!restaurantInfo) {
    return <p role="alert">Restaurant details are unavailable.</p>;
  }

  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  // Find menu groups dynamically
  const menuGroups = cards.flatMap(
    (entry) => entry?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? []
  );

  // Extract all menu items from every category
  const itemCards = menuGroups.flatMap(
    (group) => group?.card?.card?.itemCards ?? []
  );

  console.log('Restaurant Info:', restaurantInfo);
  console.log('Menu Groups:', menuGroups);
  console.log('Item Cards:', itemCards);

  return (
    <main className="restaurant-menu">
      <section className="menu-overview" aria-labelledby="restaurant-name">
        <p className="menu-eyebrow">Restaurant</p>
        <h1 id="restaurant-name">{name}</h1>
        <p className="menu-cuisines">{cuisines?.join(', ')}</p>
        <p className="menu-cost">{costForTwoMessage}</p>
      </section>

      <section className="menu-section" aria-labelledby="menu-heading">
        <div className="menu-section-heading">
          <p className="menu-eyebrow">Explore the selection</p>
          <h2 id="menu-heading">Menu</h2>
        </div>
        <ul className="menu-items">
          {itemCards.map((item, index) => (
            <li className="menu-item" key={`${item.card.info.id}-${index}`}>
              {item.card.info.name} -{'Rs.'}
              {item.card.info.price || item.card.info.defaultPrice}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default RestaurantMenu;
