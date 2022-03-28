


export const getDecimalPart = (num: number) => {
    if (Number.isInteger(num)) {
      return 0;
    }
    const decimalStr = num.toString().split('.')[1];
    return Number(decimalStr);
}

export const getIntegerPart = (num: number) => {
    return Math.floor(num);
}
