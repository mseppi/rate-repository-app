import React from 'react';
import { View, StyleSheet } from 'react-native';
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

const AppBarTab = ({ title, ...props }) => {
  return (
    <View style={styles.tab} {...props}>
      <Link to={props.to || '/'}>
        <Text color="textTertiary" fontWeight="bold">
          {title}
        </Text>
      </Link>
    </View>
  );
};

export default AppBarTab;