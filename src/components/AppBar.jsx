import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

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
    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scrollView}>
                <AppBarTab title="Repositories" to="/" />
                <AppBarTab title="Sign In" to="/signin" />
            </ScrollView>
        </View>
    );
};


export default AppBar;