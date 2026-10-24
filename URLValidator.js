import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function URLValidator() {
  // ! State to hold the input value
  const [input, setInput] = useState('');

  // ? State to hold validation result (true/false/null)
  const [isValid, setIsValid] = useState(null);

  function validateUrl(value) {
    // ! Step 1: Basic checks
    try {
      // // Reject empty strings or whitespace
      if (!value || /\s/.test(value)) return false;

      // // Must contain "://"
      if (!value.includes('://')) return false;

      // * Step 2: Use built-in URL constructor for parsing
      const url = new URL(value);

      // ? Step 3: Check protocol (only http/https allowed)
      const isHTTP = url.protocol === 'http:' || url.protocol === 'https:';

      // ? Step 4: Check hostname validity
      // Allow "localhost" or any domain with dot notation
      const hasValidHost =
        url.hostname === 'localhost' || /\w+\.\w+/.test(url.hostname);

      // ✅ Return true only if both protocol and host are valid
      return isHTTP && hasValidHost;
    } catch (error) {
      // ❌ If parsing fails, it's not a valid URL
      return false;
    }
  }

  function handleChange(e) {
    // ! Capture user input
    const value = e.target.value;

    // // Update input state
    setInput(value);

    // * Validate URL and update result state
    setIsValid(validateUrl(value));
  }

  return (
    <div>
      <h1>URL Validator</h1>

      <div className="container">
        {/* ? Input field for URL entry */}
        <input
          type="text"
          value={input}
          placeholder="Enter a URL"
          onChange={handleChange}
          data-testid="url-input"
        />

        {/* ✅ Show result only after user types */}
        {isValid !== null && (
          <p style={{ color: isValid ? 'green' : 'red' }} data-testid="result">
            {isValid ? 'Valid URL' : 'Invalid URL'}
          </p>
        )}
      </div>
    </div>
  );
}

export default URLValidator;

createRoot(document.getElementById('root')).render(<URLValidator />);
