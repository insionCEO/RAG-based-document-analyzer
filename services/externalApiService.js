const axios = require('axios');
const config = require('../config/config');

/**
 * Service for fetching data from external APIs to enrich AI prompts
 */
class ExternalApiService {
  /**
   * Fetch data from the configured external API
   * @returns {Promise<Object|string|null>} The data from the API or null if disabled/error
   */
  async fetchData() {
    try {
      // Check if external API integration is enabled
      if (!config.externalApiConfig || config.externalApiConfig.enabled !== 'yes') {
        console.log('[DEBUG] External API integration is disabled');
        return null;
      }

      const {
        url,
        method = 'GET',
        headers = {},
        body = {},
        timeout = 5000,
        transform
      } = config.externalApiConfig;

      if (!url) {
        console.error('[ERROR] External API URL not configured');
        return null;
      }

      console.log(`[DEBUG] Fetching data from external API: ${url}`);

      // Parse headers if they're a string
      let parsedHeaders = headers;
      if (typeof headers === 'string') {
        try {
          parsedHeaders = JSON.parse(headers);
        } catch (error) {
          console.error('[ERROR] Failed to parse external API headers:', error.message);
          parsedHeaders = {};
        }
      }

      // Parse body if it's a string
      let parsedBody = body;
      if (typeof body === 'string' && (method === 'POST' || method === 'PUT')) {
        try {
          parsedBody = JSON.parse(body);
        } catch (error) {
          console.error('[ERROR] Failed to parse external API body:', error.message);
          parsedBody = {};
        }
      }

      // Configure request options
      const options = {
        method,
        url,
        headers: parsedHeaders,
        timeout: parseInt(timeout) || 5000,
      };

      // Add request body for POST/PUT requests
      if (method === 'POST' || method === 'PUT') {
        options.data = parsedBody;
      }

      // Make the request
      const response = await axios(options);
      let data = response.data;

      // Apply transform function if provided
      if (transform && typeof transform === 'string') {
        try {
          // Create a safe transform function
          const transformFn = new Function('data', transform);
          data = transformFn(data);
          console.log('[DEBUG] Successfully transformed external API data');
        } catch (error) {
          console.error('[ERROR] Failed to execute transform function:', error.message);
        }
      }

      return data;
    } catch (error) {
      console.error('[ERROR] Failed to fetch data from external API:', error.message);
      if (error.response) {
        console.error('[ERROR] API Response:', error.response.status, error.response.data);
      }
      return null;
    }
  }
}

module.exports = new ExternalApiService();
