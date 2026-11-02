import { User } from './User';
import UserClass from './UserClass';
import { Component } from 'react';
import UserContext from '../utils/UserContext';

// Class-Based Component:
// Extending React's Component class provides access to
// lifecycle methods, props, and other class component features.
class About extends Component {
  constructor(props) {
    // Calls the parent Component constructor.
    // This initializes the component with the props received
    // from its parent and makes this.props available.
    super(props);

    // Executes when the About component instance is created.
    //console.log('Parent Constructor Called');
  }

  // Lifecycle Method:
  // Executes after the About component has been mounted
  // into the DOM.
  // Common use cases include API calls, subscriptions,
  // and initializing external integrations.
  async componentDidMount() {
    //console.log('Parent Component Did Mount');
  }

  // render() defines the UI returned by this component.
  // It runs during the initial render and whenever React
  // re-renders the component.
  render() {
    //console.log('Parent Render Called');

    return (
      <div>
        {/* Static content rendered by the parent component. */}
        <h1>About</h1>
        <h2>This is Namaste React Web Series</h2>
        <div>
          Logged In User
          <UserContext.Consumer>
            {({ loggedInUser }) => (
              <h1 className="text-lg font-bold">{loggedInUser}</h1>
            )}
          </UserContext.Consumer>
        </div>
        {/* Render a class-based child component.
            The name and location values are passed as props
            and can be accessed inside UserClass using this.props. */}
        <UserClass name={'FirstChild'} location={'Bhubaneshwar'} />
      </div>
    );
  }
}


// Export About so it can be imported and rendered elsewhere.
export default About;
