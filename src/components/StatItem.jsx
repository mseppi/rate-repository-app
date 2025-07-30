import Text from './Text';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 5,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

const StatItem = ({ label, value }) => {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue} fontWeight="bold">
        {formatCount(value)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

export default StatItem;