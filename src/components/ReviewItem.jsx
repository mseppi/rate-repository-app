import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
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
  username: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 5,
  },
  reviewText: {
    lineHeight: 20,
  },
});

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd.MM.yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.ratingContainer}>
          <Text color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" style={styles.username}>
            {review.user.username}
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
    </View>
  );
};

export default ReviewItem;