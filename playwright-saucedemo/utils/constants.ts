export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

export const URLS = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkout_step1: '/checkout-step-one.html',
  checkout_step2: '/checkout-step-two.html',
  checkout_complete: '/checkout-complete.html',
};

export const MESSAGES = {
  locked_error: 'Epic sadface: Sorry, this user has been locked out.',
  invalid_error: 'Epic sadface: Username and password do not match any user in this service',
  empty_username: 'Epic sadface: Username is required',
  empty_password: 'Epic sadface: Password is required',
  order_complete: 'Thank you for your order!',
};

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
};
