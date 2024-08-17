import { BrowserType } from '@/models/common.model';
import _ from 'lodash';
import { RefObject } from 'react';
import * as yup from 'yup';

interface Match {
  start: number;
  end: number;
}

interface Segment {
  highlight: boolean;
  text: string;
}

export const humanFileSize = (size: number) => {
  let i = -1;
  const byteUnits = [' KB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    size = size / 1024;
    i++;
  } while (size > 1024);

  return Math.max(size, 0.1).toFixed(1) + byteUnits[i];
};

export const humanTimeType = (second: number) => {
  const oneMinute = 60;
  const oneHour = oneMinute * 60;

  if (second <= oneMinute) return `${second} seconds`;
  if (second <= oneHour) return `${Math.floor(second / oneMinute)} minutes`;
  return `${Math.floor(second / oneHour)} hours`;
};

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1) || '';

export const parseToken = (token: string) => {
  if (!token) return null;
  const base64Url = token?.split('.')[1];
  const base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const getBreadcrumbs = (pathName = '') => {
  const listNode = pathName.split('/');
  listNode.shift();
  listNode.pop();
  if (listNode.length <= 1) return listNode;
  return [listNode[0], `${listNode[0]}/${listNode[1]}`];
};

export const getUrlExtension = (url: string) =>
  url?.split(/[#?]/)[0]?.split('.')?.pop()?.trim();

export const getFileNameFromURL = (url: string) => {
  const parts = decodeURIComponent(url.split('?')[0]).split('/');
  const lastPart = parts[parts.length - 1];
  return lastPart.replace(/\.[^/.]+$/, '');
};

export const checkArrayMix = (arr1: string[], arr2: string[]) => {
  return !!arr1.find((item) => {
    return arr2.find((child) => child === item);
  });
};

export const limitText = (text: string, limit: number) =>
  text?.length > limit ? `${text.slice(0, limit)}...` : text;

export const numberWithSpaces = (num: unknown) => {
  if (typeof num === 'number' || typeof num === 'string') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return (num as string)?.toString();
};

export const formatNumber = (num: unknown, seprateBy = '.') => {
  if (typeof num === 'number' || typeof num === 'string') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seprateBy);
  }
  return 0;
};

export const stringAvatar = (name: string) => {
  return `${name.split(' ')?.[0]?.[0] || ''}${name.split(' ')?.[1]?.[0] || ''}`;
};

export const scrollIntoView = (ref: RefObject<HTMLDivElement>) => {
  ref.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

export const findUIElement = (
  queryString: string,
  timeLimit: number,
  timeLoop: number,
  type: 'querySelector' | 'querySelectorAll' = 'querySelector',
) => {
  return new Promise((resolve, reject) => {
    let loopCount = 0;
    const maxLoops = timeLimit / timeLoop;

    const interval = setInterval(() => {
      const ulElement = (document[type] as (selectors: string) => Element)(
        queryString,
      );
      if (ulElement) {
        clearInterval(interval);
        resolve(ulElement);
      }

      loopCount++;
      if (loopCount === maxLoops) {
        clearInterval(interval);
        reject(new Error('Element not found within the specified time limit.'));
      }
    }, timeLoop);
  });
};

export const identifyInput = (input: string) => {
  const emailPattern = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneNumberPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  if (emailPattern.test(input)) {
    return 'email';
  } else if (phoneNumberPattern.test(input)) {
    return 'phone';
  } else {
    return 'unknown';
  }
};

export const getURLHash = () =>
  typeof window !== 'undefined'
    ? decodeURIComponent(window.location.hash.replace('#', ''))
    : undefined;

export const patternInput = {
  floatPattern: /^[+-]?([0-9]*[.,])?[0-9]+$/,
};

export const convertCommaToDot = (numberString?: string | null) => {
  return numberString
    ? parseFloat(numberString.toString().replace(',', '.'))
    : 0;
};

export const convertDotToComma = (number?: number) => {
  return number && number.toString().replace('.', ',');
};

export const validateNumberFloat = (name: string) => {
  return yup
    .string()
    .required(name + ' est obligatoire')
    .matches(
      patternInput.floatPattern,
      name +
        ' doit être un nombre valide avec un point ou une virgule comme séparateur décimal.',
    )
    .test(
      'is-positive',
      name + ' doit être positif.',
      (value) => convertCommaToDot(value) >= 0,
    )
    .test(
      'max-100',
      name + ' ne peut pas dépasser 100%.',
      (value) => convertCommaToDot(value) <= 100,
    );
};
export const validateOnlyFloat = (name: string) => {
  return yup
    .string()
    .required(name + ' est obligatoire')
    .matches(
      patternInput.floatPattern,
      name +
        ' doit être un nombre valide avec un point ou une virgule comme séparateur décimal.',
    )
    .test(
      'is-positive',
      name + ' doit être positif.',
      (value) => convertCommaToDot(value) >= 0,
    );
};

export const generateUUID = () => {
  // Generate random numbers for each part of the UUID
  const hexDigits = '0123456789abcdef';
  let uuid = '';

  for (let i = 0; i < 32; i++) {
    uuid += hexDigits[Math.floor(Math.random() * 16)];
  }

  // Insert dashes and set the version and variant bits
  uuid =
    `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-4${uuid.slice(13, 16)}-` +
    `${(8 + Math.floor(Math.random() * 4)).toString(16)}${uuid.slice(
      17,
      20,
    )}-${uuid.slice(20, 32)}`;

  return uuid;
};

export const isBrowser = (browserName: BrowserType) => {
  if (navigator?.userAgent?.indexOf(browserName)) {
    return true;
  }
  return false;
};

export const parseMatchedSearchHighlight = (
  text: string,
  matches: any[],
): Segment[] => {
  const result: Segment[] = [];
  let lastIndex = 0;

  matches.forEach((match) => {
    if (match.start > lastIndex) {
      result.push({
        highlight: false,
        text: text.substring(lastIndex, match.start),
      });
    }
    result.push({
      highlight: true,
      text: text.substring(match.start, match.end + 1),
    });
    lastIndex = match.end + 1;
  });

  if (lastIndex < text.length) {
    result.push({ highlight: false, text: text.substring(lastIndex) });
  }

  return result;
};

export const capitalizeWorld = (text: string) => {
  return text
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

export const chooseRandomItem = (arr: unknown[]) => {
  if (arr.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const chooseRepeatItem = (arr: unknown[], index: number, repeat = 2) => {
  if (arr.length < repeat) {
    return null;
  }

  const itemIndex = index % repeat;
  return arr[itemIndex];
};

export const parseToJson = (data: string | undefined | null) => {
  try {
    const json = data ? JSON.parse(data) : {};
    return json;
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
};

export const getRandomColor = () => {
  const random = () => Math.floor(Math.random() * 256);
  const r = random();
  const g = random();
  const b = random();
  return `rgb(${r}, ${g}, ${b})`;
};

//Write utils to get old from birthdate
export const getAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export function sanitizeString(str: string) {
  return str.replace(/[\s\.\-_]/g, '').toLowerCase();
}
export const compareString = (str1: string, str2: string) => {
  const sanitizedStr1 = sanitizeString(str1);
  const sanitizedStr2 = sanitizeString(str2);

  return sanitizedStr1 === sanitizedStr2;
};

export const calculatePercentage = (value: number) => {
  const result = value * 100;
  const roundedResult = Math.round(result * 100) / 100;
  return roundedResult;
};

export const getLastWorld = (splitCharacter: string, pureString?: string) => {
  if (
    !pureString ||
    !pureString.includes(splitCharacter) ||
    !pureString.split(pureString).length
  )
    return;

  const lastedIndex = pureString.split(splitCharacter).length - 1;

  return pureString.split(splitCharacter)[lastedIndex].trim();
};

export const getBlobFileUrl = (externalUrl: string): Promise<string> => {
  return new Promise((resolve, _) => {
    fetch(externalUrl)
      .then((response) => {
        if (!response.ok) {
          resolve(externalUrl);
        }
        response &&
          response.blob().then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            resolve(blobUrl);
          });
      })
      .catch((error) => {
        console.error('Failed to fetch or convert image to blob:', error);
        resolve(externalUrl); // Resolve with empty string in case of error
      });
  });
};
