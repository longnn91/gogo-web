import { ENV } from '@/constants/app.const';
import { globalActions } from '@/store/global/global.slice';

export const successNotification = (message: string) =>
  globalActions.pushNotification({
    type: 'success',
    message,
  });

export const errorNotification = (message: string) =>
  globalActions.pushNotification({
    type: 'error',
    message,
  });

export const warningNotification = (message: string) =>
  globalActions.pushNotification({
    type: 'warning',
    message,
  });

export const getOptionsOnMaritalStatus = (
  options: {
    value: string;
    label: string;
  }[],
  isSingle: boolean,
) => {
  if (isSingle) {
    return options.filter((option) => option.value === 'VOUS');
  }

  return options;
};

export const isIncompatibleDeviceSize = () => {
  if (typeof window === 'undefined') return false;
  const minWidth = 1024;
  const minHeight = 520;
  return window?.innerWidth < minWidth || window?.innerHeight < minHeight;
};

export const isProductionEnv = () =>
  ENV.API_URI.includes('https://api.dayslegacy.com');

export const getTextOptimizeSize = (
  text: string,
  maxLength: number,
  defaultSize: number,
) => {
  let expectedSize = defaultSize;
  if (text && text?.length > maxLength) {
    expectedSize = (maxLength / text.length) * defaultSize;
  }
  return `${expectedSize?.toFixed(0)}rem`;
};
