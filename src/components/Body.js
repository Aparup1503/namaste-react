import RestaurantCard from './RestaurantCard';
import { useState, useEffect } from 'react'; // maintain the state of your component
import Shimmer from './Shimmer';
import { API_URL } from '../utils/constant.js';

// index as key is not recommended because it can lead to performance issues and bugs in certain scenarios. It's better to use a unique identifier for each item, such as an ID from the data itself.
const Body = () => {
  //Local State Variable - Super powerful variable

  ////Whenever a State Variable updates react re-render the component.
  const [listofrestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Whenever state variables update, react triggers a reconciliation cycle (re-renders the component)
  console.log('Body Rendered');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.4756677&lng=86.93611949999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );
    const json = await data.json();
    //optional chaining
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  //Conditional Rendering
  return listofrestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filters">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="search-box"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value); // Update searchText state on every keystroke
            // React re-renders the component whenever state changes
          }}
        />
        {
          //Filters the restaurant cards and update the UI
          //searchText
        }
        <button
          onClick={() => {
            console.log(searchText);
            const filteredRestaurant = listofrestaurants.filter((res) =>
              res.info?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurant(filteredRestaurant);
          }}
        >
          Search
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            //// Filter restaurants with rating above 4
            const filteredList = listofrestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            ////Update state to trigger re-render with filtered results
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restaurant-container">
        {filteredRestaurant.map((restaurant) => (
          //// Render each restaurant card here
          <RestaurantCard key={restaurant.info.id} resData={restaurant} /> // Adding a unique key prop to each RestaurantCard component for better performance and to avoid warnings in React.
        ))}
      </div>
    </div>
  );
};
// const Body = () => {
//   const [showTopRated, setShowTopRated] = useState(false);

//   const displayedRestaurants = showTopRated
//     ? resObj.filter((res) => res.info.avgRating > 4)
//     : resObj;

//   return (
//     <div className="body">
//       <div className="filters">
//         <button
//           className="filter-btn"
//           onClick={() => setShowTopRated((prev) => !prev)}
//         >
//           {showTopRated ? 'Show All Restaurants' : 'Top Rated Restaurants'}
//         </button>
//       </div>

//       <div className="restaurant-container">
//         {displayedRestaurants.map((restaurant) => (
//           <RestaurantCard key={restaurant.info.id} resData={restaurant} />
//         ))}
//       </div>
//     </div>
//   );
// };
// const Body = () => {
//   const [showTopRated, setShowTopRated] = useState(false);

//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const data = await fetch(
//       'https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.4756677&lng=86.93611949999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
//     );
//     const json = await data.json();
//     console.log(json);
//     set
//   };

//   const getInfo = (restaurant) =>
//     restaurant.info ?? restaurant.data ?? restaurant;

//   // First apply the button filter.
//   const filteredList = showTopRated
//     ? resObj.filter((restaurant) => getInfo(restaurant).avgRating > 4.2)
//     : resObj;

//   // Then apply search to that result.
//   const displayedRestaurants = searchText.trim()
//     ? filteredList.filter((restaurant) =>
//         getInfo(restaurant)
//           .name.toLowerCase()
//           .includes(searchText.trim().toLowerCase())
//       )
//     : filteredList;

//   return (
//     <div className="body">
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search restaurants..."
//           value={searchText}
//           onChange={(event) => setSearchText(event.target.value)}
//         />
//         <button onClick={() => setShowTopRated((prev) => !prev)}>
//           {showTopRated ? 'Show All Restaurant' : 'Top Rated Restaurants'}{' '}
//         </button>
//       </div>

//       <div className="restaurant-container">
//         {displayedRestaurants.map((restaurant) => {
//           const info = getInfo(restaurant);
//           return <RestaurantCard key={info.id} resData={info} />;
//         })}
//       </div>
//     </div>
//   );
// };

// const Body = () => {
//   const [listOfRestaurant, setListOfRestaurant] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError('');

//         const response = await fetch(API_URL, {
//           signal: controller.signal,
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch restaurants');
//         }

//         const json = await response.json();

//         // Adapt this extraction to the actual API response.
//         const restaurants = extractRestaurants(json);

//         setListOfRestaurant(restaurants);
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           setError('Unable to load restaurants. Please try again.');
//         }
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => controller.abort();
//   }, []);

//   if (loading) {
//     return <Shimmer />;
//   }

//   if (error) {
//     return <p role="alert">{error}</p>;
//   }

//   if (listOfRestaurant.length === 0) {
//     return <p>No restaurants found.</p>;
//   }

//   return (
//     <div className="restaurant-list">
//       {listOfRestaurant.map((restaurant) => (
//         <RestaurantCard key={restaurant.id} restaurant={restaurant} />
//       ))}
//     </div>
//   );
// };

export default Body;
