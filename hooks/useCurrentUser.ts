import useSwr from 'swr'
//swr module is used for giving better experience of fetching and providing remote data (the data that is returned by one of the file from api folder)

import fetcher from '../lib/fetcher';

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);
    return {
      data,
      error,
      isLoading,
      mutate,
    }
  };
  
  export default useCurrentUser;