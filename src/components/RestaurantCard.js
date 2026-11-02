//* Named import of CDN_URL from constant.js
import { CDN_URL } from '../utils/constant.js'; // Importing CDN_URL from constant.js
import { useContext } from 'react';
import UserContext from '../utils/UserContext';
// *When you dynamically pass in some data to a component, we call it props. Props are immutable. We cannot change the value of props inside the component. Props are used to pass data from parent to child component.
// const RestaurantCard = (props) => {
//   console.log(props);
//   const { resData } = props; // Destructuring props
//   const { name, cuisines, avgRating, costForTwo, sla } = resData?.info; // Destructuring resData.info
//   return (
//     <div
//       className="restaurant-card"
//       style={{
//         backgroundColor: '#f0f0f0',
//         padding: '20px',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         textAlign: 'center',
//         width: '200px',
//         margin: '10px',
//       }}
//     >
//       <img
//         className="res-logo"
//         alt="res-logo"
//         //src="https://b.zmtcdn.com/data/pictures/chains/1/50691/ecfdc75d21bd7cd9d880f05c8382bc65.jpg"
//         src={CDN_URL + resData.info.cloudinaryImageId}
//       />
//       <h3>{name}</h3>
//       <h4>{cuisines.join(', ')}</h4>
//       <h4>{avgRating} Stars</h4>
//       <h4>{sla.deliveryTime} mins</h4>
//       <h4>{costForTwo}</h4>
//     </div>
//   );
// };

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    resData.info;

  const { loggedInUser } = useContext(UserContext);
  return (
    <div className="m-4 w-[250px] cursor-pointer rounded-lg bg-white p-4 text-gray-900 transition-all duration-200 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
      <img
        className="rounded-lg"
        src={CDN_URL + cloudinaryImageId}
        alt={`${name} restaurant`}
      />

      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <p>{cuisines.join(', ')}</p>
      <p>{avgRating} Stars</p>
      <p>{costForTwo}</p>
      <p>{sla?.slaString}</p>
      <h4>User : {loggedInUser} </h4>
    </div>
  );
};

//// Higher Order Component
//// input - RestaurantCard =>> RestaurantCardPromoted
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="pointer-events-none absolute left-6 top-0 z-10 rounded-md bg-green-500 px-2 py-1 text-white">
          ✅VEG
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
