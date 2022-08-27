import { parse } from "query-string";

export const limit = 10;

export const range = (start: number, end: number): number[] => {
  return [...Array(end).keys()].map((item) => item + start);
};

export const getPaginator = (search: string): number[] => {
  const parsedSearch = parse(search);
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1;
  const offset = currentPage * limit - limit;
  return [currentPage, offset];
};
