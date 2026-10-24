import { createRoot } from 'react-dom/client';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://www.logodesign.net/logo-new/burger-with-fries-on-side-7182ld.png?nwm=1&nws=1&industry=burger-fries&txt_keyword=All"
          alt="logo"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

// *When you dynamically pass in some data to a component, we call it props. Props are immutable. We cannot change the value of props inside the component. Props are used to pass data from parent to child component.
const RestaurantCard = (props) => {
  console.log(props);
  const { resData } = props; // Destructuring props
  const { name, cuisines, avgRating, costForTwo, sla } = resData?.info; // Destructuring resData.info
  return (
    <div
      className="restaurant-card"
      style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '200px',
        margin: '10px',
      }}
    >
      <img
        className="res-logo"
        alt="res-logo"
        //src="https://b.zmtcdn.com/data/pictures/chains/1/50691/ecfdc75d21bd7cd9d880f05c8382bc65.jpg"
        src={
          'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1600,h_640,c_fill/' +
          resData.info.cloudinaryImageId
        }
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{sla.deliveryTime} mins</h4>
      <h4>{costForTwo}</h4>
    </div>
  );
};

// index as key is not recommended because it can lead to performance issues and bugs in certain scenarios. It's better to use a unique identifier for each item, such as an ID from the data itself.
const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="restaurant-container">
        {resObj.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} /> // Adding a unique key prop to each RestaurantCard component for better performance and to avoid warnings in React.
        ))}
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = createRoot(document.getElementById('root'));

root.render(<AppLayout />);
