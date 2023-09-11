export const roundToThousands = (price: number) => {
    return Math.round(price / 1000) * 1000;
    // console.log(roundToThousands(160480)); // Result: 160000
    // console.log(roundToThousands(160650)); // Result: 161000
  }
