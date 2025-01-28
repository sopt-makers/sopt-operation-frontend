import { http, HttpResponse } from 'msw';

export const handler = [
  http.get('http://localhost:3000/test', () => {
    console.log('msw set successfully !');
    return HttpResponse.json({
      name: 'test',
    });
  }),
];
