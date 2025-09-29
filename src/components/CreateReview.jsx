import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: theme.colors.separatorBorder,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    fontSize: 16,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 15,
    marginTop: -10,
    paddingLeft: 15,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text: text || undefined,
          },
        },
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log('Error creating review:', e);
    }
  };

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
          formik.errors.ownerName && formik.touched.ownerName && styles.inputError,
        ]}
        placeholder="Repository owner name"
        onChangeText={formik.handleChange('ownerName')}
        value={formik.values.ownerName}
      />
      {formik.errors.ownerName && formik.touched.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.errors.repositoryName && formik.touched.repositoryName && styles.inputError,
        ]}
        placeholder="Repository name"
        onChangeText={formik.handleChange('repositoryName')}
        value={formik.values.repositoryName}
      />
      {formik.errors.repositoryName && formik.touched.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.errors.rating && formik.touched.rating && styles.inputError,
        ]}
        placeholder="Rating between 0 and 100"
        onChangeText={formik.handleChange('rating')}
        value={formik.values.rating}
        keyboardType="numeric"
      />
      {formik.errors.rating && formik.touched.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          styles.multilineInput,
          formik.errors.text && formik.touched.text && styles.inputError,
        ]}
        placeholder="Review (optional)"
        onChangeText={formik.handleChange('text')}
        value={formik.values.text}
        multiline
        numberOfLines={4}
      />
      {formik.errors.text && formik.touched.text && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="textTertiary" fontWeight="bold" fontSize="subheading">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;