export default {
  routes: [
    {
      method: 'GET',
      path: '/profile-like',
      handler: 'profile-like.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/profile-like/increment',
      handler: 'profile-like.increment',
      config: {
        auth: false,
      },
    },
  ],
};
