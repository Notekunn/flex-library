const moneyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

export const moneyFormat = (money: number): string => moneyFormatter.format(money);
