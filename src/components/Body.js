import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import { useState, useEffect, useContext } from 'react'; // maintain the state of your component
import Shimmer from './Shimmer';
import { Link } from 'react-router';
import { API_URL } from '../utils/constant.js';
import useOnlineStatus from '../utils/useOnlineStatus.js';
import UserContext from '../utils/UserContext.js';

// index as key is not recommended because it can lead to performance issues and bugs in certain scenarios. It's better to use a unique identifier for each item, such as an ID from the data itself.
const Body = () => {
  //Local State Variable - Super powerful variable

  ////Whenever a State Variable updates react re-render the component.
  const [listofrestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const onlinStatus = useOnlineStatus();

  const { loggedInUser, setUserName } = useContext(UserContext);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  // Whenever state variables update, react triggers a reconciliation cycle (re-renders the component)
  console.log('Body Rendered');

  //-Fetch restaurant data once when the component is mounted.
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      console.log('Fetching.....');
      console.log(response);
      if (!response.ok) {
        throw new Error(`Restaurant request failed (${response.status}).`);
      }

      const json = await response.json();
      console.log(json);
      const restaurantCard = json?.data?.cards?.find(
        (card) =>
          card?.card?.card?.['@type'] ===
            'type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget' &&
          Array.isArray(
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants
          )
      );
      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      if (!Array.isArray(restaurants)) {
        throw new Error(
          'The restaurant list was missing from the API response.'
        );
      }
      console.log('Restaurant:', restaurants);
      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while loading restaurants.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Shimmer />;
  }

  if (error) {
    return <p role="alert">Unable to load restaurants: {error}</p>;
  }

  if (listofrestaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  if (onlinStatus === false)
    return (
      <h1>Looks like you are offline.Please check your network settings...</h1>
    );
  return (
    <div className="body min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="rounded-lg border border-solid border-gray-400 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            value={searchText}
            //-Keep the search input state synchronized with the user's input.
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
            className="m-4 rounded-lg bg-green-100 px-4 py-2 text-gray-900 dark:bg-green-900 dark:text-gray-100"
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
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
            onClick={() => {
              //- Display only restaurants with an average rating greater than 4.
              const filteredList = listofrestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              //-Update the displayed restaurant list with the filtered results.
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <label>User Name:</label>
          <input
            type="text"
            value={loggedInUser}
            className="border border-black p-2 m-2"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          //-Render each restaurant as a navigable card using its unique restaurant ID.
          <Link
            key={restaurant.info.id}
            to={'/restaurants/' + restaurant.info.id}
          >
            {restaurant.info?.veg ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
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
