import Intl from 'intl';
import 'intl/locale-data/jsonp/en';
const moneyFormatter = new Intl.NumberFormat('vi-VN');

export const moneyFormat = (money: number, includeMoneyCharacter = true): string =>
  `${moneyFormatter.format(money)}${includeMoneyCharacter ? 'đ' : ''}`;
