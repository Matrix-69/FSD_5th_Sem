const checkOddEvenArrow = (num) => {
    console.log(num + (num % 2 === 0 ? " is Even" : " is Odd"));
  };
  function OddEven(num) {
    console.log(num + (num % 2 === 0 ? " is Even" : " is Odd"));
  }
  
  // Example usage
  OddEven(7);   // Outputs: 7 is Odd
  checkOddEvenArrow(12);  // Outputs: 12 is Even