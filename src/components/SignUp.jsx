import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

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
    borderWidth: 2,
  },
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
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation must match password')
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.errors.username && formik.touched.username && styles.inputError,
        ]}
        placeholder="Username"
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
      />
      {formik.errors.username && formik.touched.username && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.errors.password && formik.touched.password && styles.inputError,
        ]}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
      />
      {formik.errors.password && formik.touched.password && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.errors.passwordConfirmation && formik.touched.passwordConfirmation && styles.inputError,
        ]}
        placeholder="Password confirmation"
        secureTextEntry
        onChangeText={formik.handleChange('passwordConfirmation')}
        value={formik.values.passwordConfirmation}
      />
      {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.passwordConfirmation}
        </Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="textTertiary" fontWeight="bold">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return <SignUpForm onSubmit={onSubmit} />;
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: { username, password },
        },
      });

      const { data } = await signIn({ username, password });
      
      if (data?.authenticate?.accessToken) {
        navigate('/');
      }
    } catch (e) {
      console.log('Error during sign up:', e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;