/* eslint-disable no-useless-escape */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
import crypto from 'crypto';
import trunc from 'truncate-html';
import { DateTime } from 'luxon';

const path = require('path');
require('dotenv').config({ path: (process.env.NODE_ENV === 'production') ? '../.env.production' : '../.env.development' });

export const uuidv4 = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.pseudoRandomBytes(256)[0] & 15 >> c / 4).toString(16));

export const truncate = (content, len) => {
  const length = len || 10;

  return trunc(content, {
    byWords: true,
    length,
    stripTags: true,
    decodeEntities: true,
    excludes: 'img',
  });
};

export const dateLocalization = (date, type) => {
  if (date && typeof date === 'object') {
    switch (type) {
      case 'DAFM': // short for date and full month
        return date.toFormat('DDD');
      case 'F': // short for extra verbose localized date and time
        return date.toFormat('ffff');
      default:
        return date;
    }
  }
  return date;
};

export const compareDateTime = (date1, date2) => {
  if (date1 && typeof date1 === 'object') {
    const date = (date2 !== undefined && date2 !== null) ? date2 : DateTime.local();
    // compare d2 is less than d1 or vice-versa
    return DateTime.fromISO(date1) > DateTime.fromISO(date);
  }

  return false;
};

export const postType = (content) => {
  let type = 'article';

  if (content !== undefined && content.length < 1) {
    type = 'image';
  }

  return type;
};

export const paginate = (totalItems, curPage, pageSize) => {
  const links = {
    perPage: '',
    totalPages: '',
    previousPage: '',
    nextPage: '',
    currentPage: '',
    totalEntries: '',
  };

  if (totalItems && curPage && pageSize) {
    const numberOfPages = Math.ceil(totalItems / pageSize);
    let currentPage = curPage;
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > numberOfPages) {
      currentPage = numberOfPages;
    }

    links.perPage = parseInt(pageSize, 10);
    links.totalEntries = parseInt(totalItems, 10);
    links.totalPages = parseInt(numberOfPages, 10);
    links.currentPage = parseInt(currentPage, 10);
    links.nextPage = links.currentPage === numberOfPages ? 0 : (links.currentPage + 1);
    links.previousPage = links.currentPage === 1 ? 0 : (links.currentPage - 1);

    return links;
  }

  return links;
};

// eslint-disable-next-line arrow-body-style
export const getSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/[^\w\-]+/g, '-') // Replace all non-word chars with -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const findDuplicates = (arr) => {
  const sortedArr = arr.slice().sort(); // You can define the comparing function here.
  // JS by default uses a crappy string compare.
  // (we use slice to clone the array so the
  // original array won't be modified)
  const results = [];
  for (let i = 0; i < sortedArr.length - 1; i += 1) {
    if (sortedArr[i + 1] === sortedArr[i]) {
      results.push(sortedArr[i]);
    }
  }
  return results;
};

export const env = {
  localImageUrl: path.resolve(path.join(__dirname, 'public/img')),
  localImageThumbnailUrl: path.resolve(path.join(__dirname, 'public/img/thumbnails')),
  imageUrl: process.env.API_PROXY_IMAGE_URL,
  contactEmail: process.env.API_CONTACT_EMAIL,
  mapitUrl: process.env.API_MAPIT_URL,
  twitterUser: process.env.API_TWITTER_USER,
  googleSheetKey: process.env.API_GSHEET_KEY,
  googleSheetId: process.env.API_GSHEET_SHEETID,
  honorablesSheet: process.env.API_GSHEET_HONORABLES_SHEET,
  governorsSheet: process.env.API_GSHEET_GOVERNORS_SHEET,
  representativesSheet: process.env.API_GSHEET_REPRESENTATIVES_SHEET,
  senateSheet: process.env.API_GSHEET_SENATE_SHEET,
  appUrl: process.env.VUE_API_URL,
  mapit: path.resolve(path.join(__dirname, 'public/mapit')),
  legislatureStartDate: process.env.VUE_APP_LEGISLATURE_START_DATE,
  legislatureEndDate: process.env.VUE_APP_LEGISLATURE_END_DATE,
  legislatureTenureTerm: process.env.VUE_APP_LEGISLATURE_TENURE,
};

export const first = (values, seperator = ';') => {
  let a = '';
  if (values) {
    [a] = values.toString().split(seperator);
  }

  return a;
};

export const last = (values, seperator = ';') => {
  let a = '';
  if (values) {
    [a] = values.toString().split(seperator).slice(-1);
  }

  return a;
};
