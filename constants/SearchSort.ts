export enum SearchSortTypes {
  NEWEST = 'createdAt:desc',
  HOSTEST = 'rentCount:desc',
  LOWEST_PRICE = 'rentPrice:asc',
  HIGHEST_PRICE = 'rentPrice:desc',
}

export const SearchSortOptions = [
  {
    title: 'Mới nhất',
    sortBy: SearchSortTypes.NEWEST,
  },
  {
    title: 'Thuê nhiều',
    sortBy: SearchSortTypes.HOSTEST,
  },
  {
    title: 'Giá thấp',
    sortBy: SearchSortTypes.LOWEST_PRICE,
  },
  {
    title: 'Giá cao',
    sortBy: SearchSortTypes.HIGHEST_PRICE,
  },
];
