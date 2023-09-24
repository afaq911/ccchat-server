'use strict';

/**
 * public-fetch service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::public-fetch.public-fetch');
