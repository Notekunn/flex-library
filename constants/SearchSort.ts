export enum SearchSortTypes {
  NEWEST = 'createdAt:asc',
  HOSTEST = 'id:desc',
  LOWEST_PRICE = 'rentPrice:desc',
  HIGHEST_PRICE = 'rentPrice:asc',
}

export const SearchSortOptions = [
  {
    title: 'Mới nhất',
    sortBy: SearchSortTypes.NEWEST,
  },
  {
    title: 'Bán chạy',
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
