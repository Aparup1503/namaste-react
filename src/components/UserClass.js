import React from 'react';

// Class-Based Component: Extends React.Component to access
// React features such as props, state, and lifecycle methods.
class UserClass extends React.Component {
  constructor(props) {
    // Calls the parent class constructor and initializes
    // the component with the props received from its parent.
    // This allows us to access this.props inside the constructor.
    super(props);

    // Initialize the component's local state.
    // State represents data that can change over time and
    // trigger a re-render when updated using setState().
    this.state = {
      userInfo: {
        name: 'Dummy',
        location: 'Default',
      },
    };

    // Executes when the component instance is created.
    console.log(this.props.name + 'Child Constructor Called');
  }

  // Lifecycle Method: Runs after the component is mounted
  // into the DOM for the first time.
  // Commonly used for API calls, subscriptions, and other
  // post-mount initialization tasks.
  async componentDidMount() {
    //console.log(this.props.name + 'Child Component Did Mount');
    //* Example: Fetch data from an API here.
    const data = await fetch('https://api.github.com/users/Aparup1503');
    const json = await data.json();

    this.setState({
      userInfo: json,
    });

    console.log('Component Did Mount:', json);
  }

  componentDidUpdate() {
    console.log('Component Did Update');
  }

  componentWillUnmount() {
    console.log('Component Will Unmount');
  }

  // render() describes the UI that React should display.
  // It runs during the initial render and subsequent re-renders.
  render() {
    // Destructure props to access data passed from the parent.
    // Props are read-only inputs to the component.
    const { login, location, avatar_url } = this.state.userInfo;

    console.log(this.props.name + 'Child Render Called');

    return (
      <div className="user-card">
        <img src={avatar_url} alt="Image" />
        <h2>{login}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: @aparupkumargiri1503</h4>
      </div>
    );
  }
}

// Export the component so it can be imported and rendered
// by another component.
export default UserClass;
