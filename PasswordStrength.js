import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { findMissingNumber } from './FindMissingNumber.js';
import { maxSubArray } from './MaxSubArray.js';
//import './styles.css';

// ✅ Export this so it can be tested
export const checkPasswordStrength = (password) => {
  const checks = [
    // ! Must be at least 8 characters long
    password.length >= 8,

    // ? Contains at least one uppercase letter (A–Z)
    /[A-Z]/.test(password),

    // // Contains at least one lowercase letter (a–z)
    /[a-z]/.test(password),

    // todo Contains at least one number (0–9)
    /[0-9]/.test(password),

    // * Contains at least one special character (@, #, $, %, etc.)
    /[^A-Za-z0-9]/.test(password),
  ];

  // Example outputs:
  // "Pass123!" → [ true, true, true, true, true ]
  // ✅ Passed all five rules

  // "hello" → [ false, false, true, false, false ]
  // ❌ Only passed the lowercase rule

  // Count how many rules passed (true values)
  const passed = checks.filter(Boolean).length;

  // ! Strength levels based on how many rules passed
  if (passed === 1) return 'Level 1'; // Very weak → only 1 rule passed
  if (passed >= 2 && passed <= 3) return 'Level 2'; // Medium → 2–3 rules passed
  if (passed >= 4 && passed <= 5) return 'Level 3'; // Strong → 4–5 rules passed

  // ! If no rules passed at all
  return 'Weak Password';
};

const PasswordStrength = () => {
  // ! State to hold the entered password
  const [password, setPassword] = useState('');

  // ! State to hold the calculated strength result
  const [strength, setStrength] = useState('');

  // todo Function to check strength when button is clicked
  const handleCheck = () => {
    setStrength(checkPasswordStrength(password));
  };

  return (
    <div>
      <h2>Password Strength Checker</h2>

      {/* ? Input field where user types password */}
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // ! Updates state as user types
      />

      {/* * Button to trigger strength check */}
      <button onClick={handleCheck}>Check Strength</button>

      {/* ✅ Display strength result only if available */}
      {strength && (
        <p>
          Strength: <strong>{strength}</strong>
        </p>
      )}
    </div>
  );
};

const missingnum = findMissingNumber([0, 1]);
console.log('Missing Number:', missingnum);

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const maxSum = maxSubArray(nums);
console.log('Max Subarray :', maxSum);

export default PasswordStrength;

createRoot(document.getElementById('root')).render(<PasswordStrength />);
