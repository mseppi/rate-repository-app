import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBackground,
    },
    scrollView: {
        flexDirection: 'row',
    },
});

const AppBar = () => {
    const { data } = useQuery(ME);
    const signOut = useSignOut();

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scrollView}>
                <AppBarTab title="Repositories" to="/" />
                {data?.me ? (
                    <>
                        <AppBarTab title="Create a review" to="/create-review" />
                        <AppBarTab title="My reviews" to="/my-reviews" />
                        <AppBarTab title="Sign Out" onPress={signOut} />
                    </>
                ) : (
                    <>
                        <AppBarTab title="Sign In" to="/signin" />
                        <AppBarTab title="Sign Up" to="/signup" />
                    </>
                )}
            </ScrollView>
        </View>
    );
};


export default AppBar;