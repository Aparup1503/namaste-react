import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

function AutoSaveInput() {
  // Stores the current input value.
  const [text, setText] = useState('');

  // Tracks whether the saved value has been loaded from localStorage.
  // This prevents the initial empty state from overwriting saved data.
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the previously saved text when the component mounts.
  useEffect(() => {
    const savedText = localStorage.getItem('autosave-text');

    // Check for null so that even an empty saved string is handled correctly.
    if (savedText !== null) {
      setText(savedText);
    }

    // Allow autosaving only after the initial load is complete.
    setIsLoaded(true);
  }, []);

  // Automatically synchronize the input value with localStorage
  // whenever the text changes, but only after the initial load.
  useEffect(() => {
    // Skip saving until the existing value has been loaded.
    if (!isLoaded) return;

    if (text === '') {
      // Remove the saved entry when the input is empty.
      localStorage.removeItem('autosave-text');
    } else {
      // Save the latest input value using the specified key.
      localStorage.setItem('autosave-text', text);
    }
  }, []);

  // Clear the input. The saving effect will remove the stored value.
  function clearText() {
    setText('');
  }

  return (
    <div>
      <h1>Auto Save Input</h1>

      {/* Prevent the form from submitting and refreshing the page. */}
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        {/* Connect the label to the input for accessibility. */}
        <label htmlFor="name-input">Name:</label>

        {/* Controlled input: React state determines the displayed value. */}
        <input
          id="name-input"
          type="text"
          data-testid="input-field"
          value={text}
          // Update React state whenever the user types.
          onChange={(event) => setText(event.target.value)}
        />

        {/* type="button" prevents accidental form submission. */}
        <button type="button" onClick={clearText} data-testid="clear-btn">
          Clear
        </button>
      </form>
    </div>
  );
}

export default AutoSaveInput;

const root = createRoot(document.getElementById('root'));
root.render(<AutoSaveInput />);
