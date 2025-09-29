import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    borderColor: theme.colors.separatorBorder,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sortContainer: {
    marginBottom: 10,
  },
  sortLabel: {
    marginBottom: 8,
  },
  picker: {
    height: 50,
    borderColor: theme.colors.separatorBorder,
    borderWidth: 1,
    borderRadius: 4,
  },
});

const RepositoryListHeader = ({ 
  searchKeyword, 
  onSearchChange, 
  sortBy, 
  onSortChange 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories..."
          value={searchKeyword}
          onChangeText={onSearchChange}
        />
      </View>
      
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel} fontWeight="bold">
          Sort by:
        </Text>
        <Picker
          selectedValue={sortBy}
          onValueChange={onSortChange}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
    </View>
  );
};

export default RepositoryListHeader;