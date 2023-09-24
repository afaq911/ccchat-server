"use strict";

/**
 * organization controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::organization.organization",
  ({ strapi }) => ({
    async Login(ctx) {
      try {
        ctx.send("Hello Login", 200);
      } catch (error) {
        console.log(error);
      }
    },
  })
);
