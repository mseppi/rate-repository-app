import React from 'react';
import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { format } from 'date-fns';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  repositoryName: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 5,
  },
  reviewText: {
    lineHeight: 20,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.separatorBorder,
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
});

const ReviewItem = ({ review, onViewRepository, onDeleteReview }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd.MM.yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => onDeleteReview(review.id)
        },
      ]
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.ratingContainer}>
          <Text color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" style={styles.repositoryName}>
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.date}>
            {formatDate(review.createdAt)}
          </Text>
        </View>
      </View>
      
      {review.text && (
        <Text style={styles.reviewText}>
          {review.text}
        </Text>
      )}
      
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.viewButton]} 
          onPress={() => onViewRepository(review.repository.id)}
        >
          <Text color="textTertiary" fontWeight="bold">
            View repository
          </Text>
        </Pressable>
        <Pressable 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDelete}
        >
          <Text color="textTertiary" fontWeight="bold">
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text color="error">Error loading reviews: {error.message}</Text>
      </View>
    );
  }

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview({
        variables: { id: reviewId },
      });
      refetch();
    } catch (e) {
      console.log('Error deleting review:', e);
    }
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={handleViewRepository}
          onDeleteReview={handleDeleteReview}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default MyReviews;