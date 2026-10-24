export function findMissingNumber(nums) {
  // ! Step 1: Get the length of the array
  const n = nums.length;

  // ? Step 2: Calculate the expected sum of numbers from 0 to n
  // Formula: n * (n + 1) / 2
  const expectedSum = (n * (n + 1)) / 2;

  // // Step 3: Calculate the actual sum of the given array
  const actualSum = nums.reduce((acc, num) => acc + num, 0);

  // * Step 4: The missing number is the difference
  return expectedSum - actualSum;
}

// Example for debugging:
// "nums = [3, 0, 1]" → expected sum = 6, actual sum = 4
// ✅ Missing number = 2
//findMissingNumber([0, 1]);
