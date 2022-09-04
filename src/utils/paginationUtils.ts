export const range = (start: number, end: number): number[] => {
  return [...Array(end).keys()].map((item) => item + start);
};
