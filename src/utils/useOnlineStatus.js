import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
  // Store the browser's online/offline status in React state.
  // Initially true, assuming the user is online.
  // When this value changes, components using this Hook re-render.
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    // Listen for the browser's offline event.
    // When the browser reports that connectivity is lost,
    // update the state to false.
    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });

    // Listen for the browser's online event.
    // When the browser reports that connectivity is restored,
    // update the state to true.
    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });

    // The empty dependency array means this effect is intended
    // to register the listeners when the component mounts,
    // rather than after every render.
  }, []);

  // Return the current Boolean status to the component.
  // Consumers do not need to know how the status is detected.
  return onlineStatus;
};

export default useOnlineStatus;
