export const API_ROUTE = {
  api: '/api',
  payments: {
    coupang: `${process.env.NEXT_PUBLIC_PLAYWRIGHT_SERVER_URL}/api/payments/coupang`,
    elevenstreet: `${process.env.NEXT_PUBLIC_PLAYWRIGHT_SERVER_URL}/api/payments/11st`,
  },
  payment_details: {
    coupang: `${process.env.NEXT_PUBLIC_PLAYWRIGHT_SERVER_URL}/api/payment-details/coupang`,
    elevenstreet: `${process.env.NEXT_PUBLIC_PLAYWRIGHT_SERVER_URL}/api/payment-details/11st`,
    naverpay: `${process.env.NEXT_PUBLIC_PLAYWRIGHT_SERVER_URL}/api/payment-details/naverpay`,
  },
  cookies: {
    coupang: `${process.env.NEXT_PUBLIC_PLAYWRIGHT_SERVER_URL}/api/cookies/coupang`,
    elevenstreet: `${process.env.NEXT_PUBLIC_PLAYWRIGHT_SERVER_URL}/api/cookies/11st`,
    naverpay: `${process.env.NEXT_PUBLIC_PLAYWRIGHT_SERVER_URL}/api/cookies/naverpay`,
  },
};

export const ROUTE = {
  home: '/',

  signin: '/login',

  mydata: '/mydata',
};
