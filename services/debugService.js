// service to debug the paperless-ngx api routes
const env = require('dotenv').config();
const axios = require('axios');
const paperless_api = process.env.PAPERLESS_API_URL;
const paperless_token = process.env.PAPERLESS_API_TOKEN;

const getDocuments = async () => {
    try {
        const response = await axios.get(`${paperless_api}/documents/`, {
            headers: {
          'Authorization': `Token ${paperless_token}`,
          'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Paperless validation error:', error.message);
        return JSON.stringify(error);
    }
}

const getTags = async () => {
    try {
        const response = await axios.get(`${paperless_api}/tags/`, {
            headers: {
          'Authorization': `Token ${paperless_token}`,
          'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Paperless validation error:', error.message);
        return JSON.stringify(error);
    }
}

const getCorrespondents = async () => {
    try {
        const response = await axios.get(`${paperless_api}/correspondents/`, {
            headers: {
          'Authorization': `Token ${paperless_token}`,
          'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Paperless validation error:', error.message);
        return JSON.stringify(error);
    }
}

module.exports = { getDocuments, getTags, getCorrespondents };
