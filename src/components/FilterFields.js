import React from 'react'

import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import useFilterSelectField from '@/hooks/useFilterSelectField'

import FilterRangeInput from './FilterRangeInput'
import FilterSection from './FilterSection'
import FilterSelectField from './FilterSelectField'
import SortForm from './SortForm'

const FilterFieldsHeader = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 56,
}))

const FilterFields = ({ categories, locations, searchQuery, size }) => {
  const router = useRouter()

  const { handleChange: handleChangeFilterSelect } = useFilterSelectField({
    searchQuery,
  })

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))

  return (
    <>
      <FilterFieldsHeader>
        <Typography variant='h6' fontWeight={700}>
          絞り込み
        </Typography>
        {searchQuery && Object.keys(searchQuery).length > 0 && (
          <Button onClick={() => router.push('/classifieds/search')}>
            クリア
          </Button>
        )}
      </FilterFieldsHeader>

      <FilterSection label='カテゴリー'>
        <Stack spacing={2}>
          <FilterSelectField
            value={categories.l1_value}
            onChange={(event) =>
              handleChangeFilterSelect(event, 'category_id', true)
            }
            options={categories.l1_options}
            size={size}
          />

          {categories.l2_options.length > 0 && (
            <FilterSelectField
              value={categories.l2_value}
              onChange={(event) =>
                handleChangeFilterSelect(event, 'category_id', false)
              }
              parentValue={categories.l1_value}
              options={categories.l2_options}
              size={size}
            />
          )}
        </Stack>
      </FilterSection>

      <FilterSection label='エリア'>
        <Stack spacing={2}>
          <FilterSelectField
            value={locations.l1_value}
            onChange={(event) =>
              handleChangeFilterSelect(event, 'location_id', false)
            }
            options={locations.l1_options}
            size={size}
          />

          {locations.l2_options.length > 0 && (
            <FilterSelectField
              value={locations.l2_value}
              onChange={(event) =>
                handleChangeFilterSelect(event, 'location_id', false)
              }
              parentValue={locations.l1_value}
              options={locations.l2_options}
              optionName='name_with_postcode'
              size={size}
            />
          )}
        </Stack>
      </FilterSection>

      {categories.selected && searchQuery && (
        <>
          {categories.selected.filter_attributes.map((attribute, index) => (
            <React.Fragment key={index}>
              {attribute.filter_type === 'range_input' ? (
                <FilterSection label={attribute.name}>
                  <FilterRangeInput
                    attribute={attribute}
                    searchQuery={searchQuery}
                    size={size}
                  />
                </FilterSection>
              ) : (
                <></>
              )}
            </React.Fragment>
          ))}
        </>
      )}

      {!lgUp && (
        <FilterSection label='並べ替え'>
          <SortForm
            categories={categories}
            searchQuery={searchQuery}
            size={size}
          />
        </FilterSection>
      )}
    </>
  )
}

export default FilterFields
