import * as Yup from 'yup'


export const createMovieSchema = Yup.object().shape({
  title: Yup.string().required('title is required'),
  year: Yup.number().required('year is required'),
  released: Yup.string().typeError('inform string value'),
  runtime: Yup.string().typeError('inform string value'),
  director: Yup.string().typeError('inform string value'),
  writer: Yup.string().typeError('inform string value'),
  actors: Yup.string().typeError('inform string value'),
  plot: Yup.string().typeError('inform string value'),
  language: Yup.string().required('language is required'),
  country: Yup.string().typeError('inform string value'),
  awards: Yup.string().typeError('inform string value'),
  rating: Yup.number().typeError('inform number value'),
  type: Yup.string().required('type is required'),
  gender: Yup.string().required('gender is required')
})
