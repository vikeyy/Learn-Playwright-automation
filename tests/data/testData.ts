/**
 * TEST DATA
 * ---------
 * Store usernames, passwords, and URLs in one place.
 * Change values here once instead of editing every test file.
 */

export const users = {
  validUser: {
    username: process.env.USER_USERNAME || 'standard_user',
    password: process.env.USER_PASSWORD || 'standard123',
  },
};

export const urls = {
  home: '/',
  login: '/login',
  catalog: '/catalog',
  cart: '/cart',
};
