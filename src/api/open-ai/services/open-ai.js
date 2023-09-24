'use strict';

/**
 * open-ai service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::open-ai.open-ai');
