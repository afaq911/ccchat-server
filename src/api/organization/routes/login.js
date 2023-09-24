module.exports = {
  routes: [
    {
      method: "GET",
      path: "/organizations/login/:id",
      handler: "organization.Login",
    },
  ],
};
