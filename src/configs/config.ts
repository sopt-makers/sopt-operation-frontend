const API_URL =
  process.env.NEXT_PUBLIC_API_URL === 'PRODUCTION'
    ? 'https://operation.api.sopt.org/api/v1'
    : 'https://operation.api.dev.sopt.org/api/v1';
const CLIENT_URL = 'https://operation.sopt.org';

const ORG_API_URL =
  process.env.NEXT_PUBLIC_API_URL === 'PRODUCTION'
    ? 'https://api.sopt.org'
    : 'https://api-dev.sopt.org';

const config = {
  ENV_STATUS: process.env.NODE_ENV,
  API_URL,
  CLIENT_URL,
  ORG_API_URL,
};

export default config;
