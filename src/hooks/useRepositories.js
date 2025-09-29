import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const repositories = (data && data.repositories) ? data.repositories : { edges: [] };

  return { repositories, loading, refetch };
};

export default useRepositories;
