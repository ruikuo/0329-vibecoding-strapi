export default {
  routes: [
    {
      method: 'GET',
      path: '/profile',
      handler: 'profile.find',
      config: {
        auth: false,
      },
    },
  ],
};
