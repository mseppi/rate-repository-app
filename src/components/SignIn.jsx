import Text from './Text';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        width: '90%',
        borderColor: theme.colors.separatorBorder,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    inputError: {
        borderColor: theme.colors.error,
        borderWidth: 2},
    button: {
        backgroundColor: theme.colors.primary,
        height: 40,
        width: '90%',
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        width: '90%',
        textAlign: 'left',
        marginBottom: 10,
        paddingLeft: 8,
    },
});

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup.string()
        .required('Username is required'),
    password: yup.string()
        .required('Password is required')
});

const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

  return (
    <View style={styles.container}>
      <TextInput 
        style={[styles.input,
           formik.errors.username && formik.touched.username && styles.inputError]}
        placeholder="Username"
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
      />
      {formik.errors.username && formik.touched.username && <Text color="error" style={styles.errorText}>{formik.errors.username}</Text>}
      <TextInput style={[styles.input,
           formik.errors.password && formik.touched.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
      />
      {formik.errors.password && formik.touched.password && <Text color="error" style={styles.errorText}>{formik.errors.password}</Text>}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="textTertiary">Sign In</Text>
      </Pressable>
    </View>
    );
};

export const SignInContainer = ({ onSubmit }) => {
    return <SignInForm onSubmit={onSubmit} />;
};

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            if (data?.authenticate?.accessToken) {
                navigate('/repositories');
            }
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };

    return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;