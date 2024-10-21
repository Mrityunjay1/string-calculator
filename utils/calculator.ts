export const add = (numbers: string): number => {
  console.log("Input string:", numbers);

  if (numbers === "") return 0;

  numbers = numbers.replace(/\\n/g, "\n");

  let delimiters = [",", "\n"];
  let numbersString = numbers;

  if (numbers.startsWith("//")) {
    const newLineIndex = numbers.indexOf("\n");
    if (newLineIndex !== -1) {
      const delimiterPart = numbers.substring(2, newLineIndex);

      if (delimiterPart.startsWith("[") && delimiterPart.endsWith("]")) {
        delimiters =
          delimiterPart.match(/\[([^\]]+)\]/g)?.map((d) => d.slice(1, -1)) ||
          [];
      } else {
        delimiters = [delimiterPart];
      }

      numbersString = numbers.substring(newLineIndex + 1);
    }
  }

  console.log("Delimiters:", delimiters);
  console.log("Numbers string:", numbersString);

  const escapedDelimiters = delimiters.map((d) =>
    d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  const splitRegex = new RegExp(escapedDelimiters.join("|"));
  console.log("Split regex:", splitRegex);

  const nums = numbersString.split(splitRegex);
  console.log("Split numbers:", nums);

  const parsedNums = nums.map((num) => {
    const trimmedNum = num.trim();
    return trimmedNum === "" ? 0 : parseInt(trimmedNum, 10);
  });
  console.log("Parsed numbers:", parsedNums);

  const negatives = parsedNums.filter((num) => num < 0);
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  const sum = parsedNums.reduce((acc, num) => acc + num, 0);
  console.log("Final sum:", sum);

  return sum;
};
