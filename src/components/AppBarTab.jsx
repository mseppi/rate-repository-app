import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: theme.colors.appBackground,
  },
});

const AppBarTab = ({ title, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable style={styles.tab} onPress={onPress}>
        <Text color="textTertiary" fontWeight="bold">
          {title}
        </Text>
      </Pressable>
    );
  }
  return (
    <View style={styles.tab}>
      <Link to={to || '/'}>
        <Text color="textTertiary" fontWeight="bold">
          {title}
        </Text>
      </Link>
    </View>
  );
};

export default AppBarTab;