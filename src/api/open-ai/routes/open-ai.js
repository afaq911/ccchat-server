'use strict';

/**
 * open-ai router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::open-ai.open-ai');
