import axios, { AxiosResponse } from 'axios';

import { getBearerTokenAuthHeader } from '@/utils/auth';
import { orgClient } from '@/services/api/client';

export const putObject = async (file: File): Promise<string | null> => {
  const REMOVE_QUERY_STRING_REGEX = /\?.*/;

  const extension = file.name.split('.').pop();

  const { data }: AxiosResponse<ResponsePresignedUrl> = await orgClient.get(
    `/file/presigned-url?fileType=${extension}`,
    {
      headers: { ...getBearerTokenAuthHeader() },
    },
  );

  if (data) {
    try {
      const res = await axios.put(data.presignedUrl, file);
      if (!res.status === 200) {
        return null;
      }
      return data.presignedUrl.replace(REMOVE_QUERY_STRING_REGEX, '');
    } catch (e) {
      console.log(e);
      return null;
    }
  }
};
