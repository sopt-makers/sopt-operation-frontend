import { useGetPresignedUrl } from '@/services/api/storage';
import { getBearerTokenAuthHeader } from '@/utils/auth';
import axios from 'axios';

export const useS3Upload = async (file: File): Promise<string | null> => {
  const REMOVE_QUERY_STRING_REGEX = /\?.*/;

  const { data, isError, isLoading } = useGetPresignedUrl<
    ResponsePresignedUrl,
    Error
  >(getBearerTokenAuthHeader());

  if (data && !isLoading && !isError) {
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
