# namaste-react

“Learning React basics with Namaste React course” “Practice projects and assignments for React” “React experiments and sample apps”

# Parcel

- Dev Build
- Local Server
- HMR = Hot Module Replacement
- File Watching Algorithm
- Catching - Faster Builds
- Image Optimization
- Minification
- Bundling
- Compress
- Consistent Hashing
- Code Splitting
- Differnt Bundling - support older browsers
- Diagnostic - Error Reporting
- Error Handling - Friendly Error Messages
- HTTPS
- Tree Shaking - remove unused code
- Different Dev and prod bundles

# Namaste Food

/\*\*

- Header
- - Logo
- - Nav Items
- Body
- - Search
- - RestaurantContainer
-     - RestaurantCard
-        - Image
-        - Name of Restaurant, Stars, Cuisine, Delivery Time, Cost for Two
-      - Cuisine
- Footer
- - Copyright
- - Links
- - Address
- - Contact
    \*/

There are two types of exports in JavaScript: named exports and default exports.

- Default Export
  export default functionName; // Exporting a single function, class, or object as the default export from a module.
- Named Export
  export { functionName1, functionName2 }; // Exporting multiple functions, classes, or objects as named exports from a module.

## React Hooks

Hooks are special functions in React that let you:

- Use **state** (`useState`) inside functional components
- Handle **side effects** (`useEffect`) like API calls or subscriptions
- Share **reusable logic** across components (`useCustomHook`)
- Access **context** (`useContext`) for global data

They make functional components powerful and eliminate the need for most class components.

//There are two types of Routing in Web Apps

- Client Side Routing
- Server Side Routing

# Redux Toolkit

- Install Redux Toolkit @reduxjs/toolkit and React-Redux @reduxjs/react-redux
- Build our Redux Store using configureStore() from Redux Toolkit
- Connect our Store to our React App using the Provider component from React-Redux
- Slice (createSlice) - Reducer + Actions
- dispatch(action) - to send an action to the store
- Selector (useSelector) - to read data from the store
- npm i @reduxjs/toolkit react-redux

# Types of Testing in React

- Unit Testing
- Integration Testing
- End-to-End (E2E) Testing

# Setting up Testing in our app

- Install React Testing Library
- Installed jest
- Installed Babel dependencies
- Configure Babel
- Configure Parcel config file to disable default Parcel Babel config and use our own Babel config
- Jest - npm init jest@latest instead of installing npx jest --init which is deprecated
- Install jsdom library.
- Install jest-environment-jsdom package to use jsdom as the test environment for Jest.
- Install @babel/preset-react package to transpile JSX code in our tests.
- Include @babel/preset-react in the Babel configuration file (babel.config.js) to enable JSX transformation.
- Install @testing-library/jest-dom package to extend Jest's assertions with custom matchers for testing DOM elements.
