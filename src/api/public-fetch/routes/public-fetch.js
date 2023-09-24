'use strict';

/**
 * public-fetch router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::public-fetch.public-fetch');
