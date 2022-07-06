export enum SearchSortTypes {
  NEWEST = 'createdAt:desc',
  HOSTEST = 'id:asc',
  LOWEST_PRICE = 'rentPrice:asc',
  HIGHEST_PRICE = 'rentPrice:desc',
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
