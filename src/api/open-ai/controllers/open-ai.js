'use strict';

/**
 * open-ai controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::open-ai.open-ai');
