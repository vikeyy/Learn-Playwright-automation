/**
 * testData.ts — centralised test data for all tests.
 * Change values here once to apply across all tests.
 */

export const users = {
  validUser: {
    username: process.env.USER_USERNAME || 'standard_user',
    password: process.env.USER_PASSWORD || 'standard123',
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'wrongpassword',
  },
  lockedUser: {
    username: 'locked_user',
    password: 'locked123',
  },
};

export const products = {
  searchTerm: 'Bluetooth',
  firstProduct: 'Bluetooth Speaker',
  outOfStockProduct: 'Sunglasses',
};

export const billingDetails = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  phone: '9876543210',
  address: '123 Test Street',
  city: 'Chennai',
  postcode: '600001',
  country: 'India',
};

export const urls = {
  home: '/',
  login: '/login',
  cart: '/cart',
  checkout: '/checkout',
  catalog: '/catalog',
  shop: '/catalog',
};
