//  Show price with suffixes

export function convertPriceToUnits(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + " Billion";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + " Million";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return false;
  }
}

//  Show price direction depending on value

export const getPriceDirection = (percentage: number) => {
  return percentage > 0 ? "up" : percentage < 0 ? "down" : "netutral";
};
