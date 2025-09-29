import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.separatorBorder,
  },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showGitHubButton={true} />;
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading repository...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text color="error">Error loading repository: {error.message}</Text>
      </View>
    );
  }

  if (!data?.repository) {
    return (
      <View style={styles.error}>
        <Text color="error">Repository not found</Text>
      </View>
    );
  }

  const repository = data.repository;
  const reviews = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default SingleRepository;