import { View, StyleSheet } from 'react-native';
import StatItem from './StatItem';

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 5,
  },
});

const RepositoryStats = ({ item }) => {
  return (
    <View style={styles.statsContainer}>
      <StatItem label="Stars" value={item.stargazersCount} />
      <StatItem label="Forks" value={item.forksCount} />
      <StatItem label="Reviews" value={item.reviewCount} />
      <StatItem label="Rating" value={item.ratingAverage} />
    </View>
  );
};

export default RepositoryStats;