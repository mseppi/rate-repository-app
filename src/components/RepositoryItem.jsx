import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import Text from './Text';
import theme from '../theme';
import RepositoryStats from './RepositoryStats';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    marginTop: 5,
    marginBottom: 10,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 15,
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  const handleOpenGitHub = () => {
    if (item.url) {
      Linking.openURL(item.url);
    }
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.headerContainer}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          {item.language && (
            <View style={styles.languageTag}>
              <Text color="textTertiary">
                {item.language}
              </Text>
            </View>
          )}
        </View>
      </View>

      <RepositoryStats item={item} />
      
      {showGitHubButton && (
        <Pressable style={styles.button} onPress={handleOpenGitHub}>
          <Text color="textTertiary" fontWeight="bold">
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;