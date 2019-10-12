/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
import crypto from 'crypto';
import trunc from 'truncate-html';
import { DateTime } from 'luxon';

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
