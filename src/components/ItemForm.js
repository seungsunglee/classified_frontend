import React from 'react'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash.isempty'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import api from '@/lib/api'
import { getItemSchema } from '@/lib/validations'

import useFieldErrors from '@/hooks/useFieldErrors'
import useItemImageField from '@/hooks/useItemImageField'

import ItemAttributeFields from './ItemAttributeFields'
import ItemFormSection from './ItemFormSection'
import ItemImageField from './ItemImageField'
import ItemLocationField from './ItemLocationField'
import Link from './Link'
import NonFieldErrors from './NonFieldErrors'
import PromotionCheckbox from './PromotionCheckbox'

const CategoryContainer = styled('div')(({ theme }) => ({
  padding: '15px 14px',
  border: `1px solid ${theme.palette.action.disabled}`,
  borderRadius: theme.shape.borderRadius,
  userSelect: 'none',
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const ItemForm = ({ instance }) => {
  const router = useRouter()

  const {
    category_object,
    images: presetImages,
    active_promotions,
    ...defaultValues
  } = instance
  const {
    images,
    deletedImages,
    disabled,
    getRootProps,
    getInputProps,
    handleDelete,
    handleSortEnd,
    isUploading,
  } = useItemImageField({ presetImages: presetImages ? presetImages : [] })

  const schema = getItemSchema(defaultValues)

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const { nonFieldErrors, setNonFieldErrors, setFieldErrors } = useFieldErrors({
    setError,
  })

  const onSubmit = async (data) => {
    setNonFieldErrors(null)

    data.location = data.location.id

    data.images = images
    data.deleted_images = deletedImages

    try {
      const response = await api({
        method: instance.id ? 'put' : 'post',
        url: instance.id
          ? `classifieds/items/${instance.id}/`
          : 'classifieds/items/',
        data,
      })

      toast(instance.id ? '投稿を更新しました' : '投稿が完了しました')

      let optionIds = []
      for (let key of Object.keys(data.promotions.types)) {
        if (Boolean(data.promotions.types[key])) {
          optionIds.push(data.promotions.options[key])
        }
      }

      if (optionIds.length > 0) {
        router.replace(
          `/promotion/${response.data.id}?option_id=${optionIds.join(',')}`
        )
      } else {
        router.replace(`/classifieds/p/${response.data.id}`)
      }
    } catch (error) {
      setFieldErrors(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <NonFieldErrors errors={nonFieldErrors} gutterBottom />

      <ItemFormSection title='カテゴリー' divider>
        <CategoryContainer>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            sx={{
              '& .MuiBreadcrumbs-separator': {
                mx: 0.5,
              },
            }}
          >
            <Typography>{category_object.parent.name}</Typography>
            <Typography>{category_object.name}</Typography>
          </Breadcrumbs>
          {!instance.id && (
            <Box whiteSpace='nowrap'>
              <Link href='/classifieds/select-category' variant='body2'>
                変更する
              </Link>
            </Box>
          )}
        </CategoryContainer>
      </ItemFormSection>
      <ItemFormSection title='概要' divider>
        <Controller
          name='title'
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label='タイトル'
              required
              error={!!errors.title}
              helperText={errors.title?.message}
              inputRef={ref}
              {...field}
            />
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label='詳細'
              multiline
              required
              minRows={7}
              maxRows={14}
              error={!!errors.description}
              helperText={errors.description?.message}
              inputRef={ref}
              {...field}
            />
          )}
        />
      </ItemFormSection>

      {!isEmpty(category_object.field_attributes) && (
        <ItemFormSection title='基本情報' divider>
          <ItemAttributeFields
            attributes={category_object.field_attributes}
            control={control}
            errors={errors}
            watch={watch}
          />
        </ItemFormSection>
      )}

      <ItemFormSection title='エリア' divider>
        <ItemLocationField watch={watch} control={control} errors={errors} />
      </ItemFormSection>

      <ItemFormSection
        title='画像'
        subtitle='jpeg・png形式の画像を最大10枚までアップロード可能です。'
        divider
      >
        <ItemImageField
          images={images}
          disabled={disabled}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          onSortEnd={handleSortEnd}
          onDelete={handleDelete}
          isUploading={isUploading}
        />
      </ItemFormSection>

      <ItemFormSection title='プロモーション' divider>
        {category_object.promotions.map((promotion) => (
          <PromotionCheckbox
            key={promotion.slug}
            promotion={promotion}
            control={control}
            active_promotions={active_promotions}
          />
        ))}
      </ItemFormSection>

      <LoadingButton
        type='submit'
        size='large'
        fullWidth
        disabled={isUploading}
        loading={isSubmitting || isSubmitSuccessful}
      >
        {instance.id ? '投稿を更新する' : '新規投稿'}
      </LoadingButton>
    </form>
  )
}

export default ItemForm
