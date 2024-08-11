import * as yup from 'yup'
import { setLocale } from 'yup'

setLocale({
  mixed: {
    required: 'この項目は必須です。',
  },
  string: {
    min: '${min}文字以上入力してください。',
    max: '${max}文字以下で入力してください。',
    email: '正しく入力してください。',
    url: '正しく入力してください。',
  },
  number: {
    positive: '正数を入力して下さい。',
  },
})

const test = {
  number: {
    typeError: '正しく入力してください。',
  },
}

export const getLoginSchema = () => {
  return yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })
}

export const getSignupSchema = () => {
  return yup.object().shape({
    email: yup.string().required().email(),
    username: yup.string().required().max(30),
    password: yup.string().required().min(8),
  })
}

export const getResetPasswordSchema = () => {
  return yup.object().shape({
    email: yup.string().required().email(),
  })
}

export const getSetPasswordSchema = () => {
  return yup.object().shape({
    new_password: yup.string().required().min(8),
    re_new_password: yup
      .string()
      .required()
      .oneOf([yup.ref('new_password'), null], 'パスワードが一致しません。'),
  })
}

export const getSettingsSchema = () => {
  return yup.object().shape({
    username: yup.string().required().max(30),
    email: yup.string().required().email(),
    introduction: yup.string().max(150),
    website: yup.string().url(),
  })
}

export const getChangePasswordSchema = () => {
  return yup.object().shape({
    current_password: yup.string().required(),
    new_password: yup.string().required().min(8),
    re_new_password: yup
      .string()
      .required()
      .oneOf([yup.ref('new_password'), null], 'パスワードが一致しません。'),
  })
}

export const getItemSchema = (defaultValues) => {
  let attributesShape = {}
  if ('rent' in defaultValues.attributes) {
    attributesShape.rent = yup
      .number()
      .positive()
      .required()
      .typeError(test.number.typeError)
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
      )
  }
  if ('price' in defaultValues.attributes) {
    attributesShape.price = yup
      .number()
      .positive()
      .typeError(test.number.typeError)
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
      )
      .when('no_price', (no_price, schema) =>
        no_price
          ? schema
          : schema.required().max(999999999, test.number.typeError)
      )
  }
  return yup.object().shape({
    title: yup.string().required().trim().max(80),
    description: yup.string().required().trim().min(10).max(3000),
    attributes: yup.object().shape(attributesShape, []),
    location: yup.object().required().nullable(),
  })
}

export const getFilterRangeInputSchema = () => {
  return yup.object().shape({
    min_deposit: yup
      .number()
      .integer()
      .min(0)
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
      ),
    max_deposit: yup
      .number()
      .integer()
      .min(0)
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
      ),
    min_rent: yup
      .number()
      .integer()
      .min(0)
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
      ),
    max_rent: yup
      .number()
      .integer()
      .positive()
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
      ),
    min_price: yup
      .number()
      .integer()
      .min(0)
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
      ),
    max_price: yup
      .number()
      .integer()
      .min(0)
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
      ),
  })
}

export const getItemDirectSchema = () => {
  return yup.object().shape({
    content: yup.string().required().trim().max(3000),
  })
}
