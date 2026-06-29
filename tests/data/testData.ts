/**
 * testData.ts — centralised test data for all tests.
 * Change values here once to apply across all tests.
 */

export const users = {
  validUser: {
    email: process.env.USER_EMAIL || 'testuser@example.com',
    password: process.env.USER_PASSWORD || 'Test@1234',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
};

export const products = {
  searchTerm: 'shirt',
  firstProduct: 'Album',
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
  login: '/my-account',
  cart: '/cart',
  checkout: '/checkout',
  shop: '/shop',
};
