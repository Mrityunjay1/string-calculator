export const add = (numbers: string): number => {
  if (numbers === "") return 0;

  let delimiters = [",", "\n"]; // Default delimiters
  let numbersString = numbers;

  // Check for custom delimiters starting with "//"
  if (numbers.startsWith("//")) {
    const newLineIndex = numbers.indexOf("\n");
    if (newLineIndex !== -1) {
      const delimiterPart = numbers.substring(2, newLineIndex);

      // Check if the delimiters are in the form "[delim1][delim2]"
      if (delimiterPart.startsWith("[") && delimiterPart.endsWith("]")) {
        // Extract all delimiters enclosed in square brackets
        delimiters =
          delimiterPart.match(/\[([^\]]+)\]/g)?.map((d) => d.slice(1, -1)) ||
          [];
      } else {
        // Single custom delimiter without square brackets
        delimiters.push(delimiterPart);
      }

      // Get the numbers part after the delimiter definition
      numbersString = numbers.substring(newLineIndex + 1);
    }
  }

  // Escape the delimiters for use in the regex
  const escapedDelimiters = delimiters.map((d) =>
    d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  // Create a RegExp pattern using all delimiters, separating them with '|'
  const splitRegex = new RegExp(escapedDelimiters.join("|"), "g");

  // Split the numbers string using the regular expression
  const nums = numbersString.split(splitRegex);

  // Parse the numbers into integers, handling possible empty strings or invalid numbers
  const parsedNums = nums.map((num) => {
    const trimmedNum = num.trim();
    return trimmedNum === "" ? NaN : parseInt(trimmedNum, 10);
  });

  // Check for any negative numbers
  const negatives = parsedNums.filter((num) => num < 0);
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  // Calculate the sum, ignoring any NaN values (invalid or empty entries)
  return parsedNums.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
};
