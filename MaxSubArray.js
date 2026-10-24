export function maxSubArray(nums) {
  // ! Initialize current sum to 0
  let currSum = 0;

  // ? Initialize max sum to the lowest possible number
  // This ensures even if all numbers are negative, we still capture the largest one
  let maxSum = Number.NEGATIVE_INFINITY;

  // * Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    // // Add current element to the running sum
    currSum += nums[i];

    // ✅ Update maxSum if currSum is greater
    maxSum = Math.max(maxSum, currSum);

    // todo If currSum becomes negative, reset it to 0
    // Because a negative sum will only reduce future subarray sums
    if (currSum < 0) currSum = 0;
  }

  // ! Return the maximum subarray sum found
  return maxSum;
}

// Example for debugging:
// Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// ✅ Output: 6 (subarray [4, -1, 2, 1])
maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
