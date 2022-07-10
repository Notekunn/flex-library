import Intl from 'intl';
import 'intl/locale-data/jsonp/en';
const moneyFormatter = new Intl.NumberFormat('vi-VN');

export const moneyFormat = (money: number): string => `${moneyFormatter.format(money)}đ`;
