import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.separatorBorder,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        searchKeyword={props.searchKeyword}
        onSearchChange={props.onSearchChange}
        sortBy={props.sortBy}
        onSortChange={props.onSortChange}
      />
    );
  };

  render() {
    const { repositories, onRepositoryPress } = this.props;
    const repositoryNodes = repositories && repositories.edges
      ? repositories.edges.map(edge => edge.node)
      : [];

    const renderItem = ({ item }) => (
      <Pressable onPress={() => onRepositoryPress && onRepositoryPress(item.id)}>
        <RepositoryItem item={item} />
      </Pressable>
    );

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  
  const navigate = useNavigate();

  const getSortingVariables = (sortBy) => {
    switch (sortBy) {
      case 'highest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const variables = {
    ...getSortingVariables(sortBy),
    searchKeyword: debouncedSearchKeyword || undefined,
  };

  const { repositories } = useRepositories(variables);

  const handleRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={handleRepositoryPress}
      searchKeyword={searchKeyword}
      onSearchChange={handleSearchChange}
      sortBy={sortBy}
      onSortChange={handleSortChange}
    />
  );
};

export default RepositoryList;