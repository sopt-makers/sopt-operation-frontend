// TEST는 운영 브랜치를 그대로 배포해 어드민 API만 dev 서버로 바꿔 검증하는 환경이라
// 화면과 나머지 API는 운영과 동일하게 취급한다.
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_API_URL === 'PRODUCTION' ||
  process.env.NEXT_PUBLIC_API_URL === 'TEST';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL === 'PRODUCTION'
    ? 'https://operation.api.sopt.org/api/v1'
    : process.env.NEXT_PUBLIC_API_URL === 'DEVELOPMENT'
      ? 'https://operation-api-dev.sopt.org/api/v1'
      : 'https://dev.api.sopt.org/api/v1/admin';

const ORG_API_URL = IS_PRODUCTION
  ? 'https://api.sopt.org'
  : 'https://api-dev.sopt.org';
const SOPT_API_URL = IS_PRODUCTION
  ? 'https://api.sopt.org'
  : 'https://api-dev.sopt.org';

const config = {
  ENV_STATUS: process.env.NODE_ENV,
  IS_PRODUCTION,
  API_URL,
  ORG_API_URL,
  SOPT_API_URL,
};

export default config;
