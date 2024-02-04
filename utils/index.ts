export * from './assert';
export * from './etherToString';
export * from './formatBalance';
export * from './logger';
export * from './stringToEther';
export * from './standardFetcher';
export * from './serverLogger';

export const getDate = (utcDate: number) => {
  const redeemDate = new Date(utcDate);

  const y = redeemDate.getFullYear();
  const m =
    redeemDate.getMonth() + 1 < 10
      ? '0' + (redeemDate.getMonth() + 1)
      : redeemDate.getMonth() + 1;
  const d =
    redeemDate.getDate() < 10
      ? '0' + redeemDate.getDate()
      : redeemDate.getDate();
  const h =
    redeemDate.getHours() < 10
      ? '0' + redeemDate.getHours()
      : redeemDate.getHours();
  const i =
    redeemDate.getMinutes() < 10
      ? '0' + redeemDate.getMinutes()
      : redeemDate.getMinutes();
  return y + '-' + m + '-' + d + ' ' + h + ':' + i;
};
