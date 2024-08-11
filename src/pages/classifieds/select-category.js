import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { NextSeo } from 'next-seo'
import useSWR from 'swr'

import ClearIcon from '@mui/icons-material/Clear'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import useAuthUser from '@/hooks/useAuthUser'

import Error from '@/components/Error'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Loading from '@/components/Loading'
import ResponsiveContainer from '@/components/ResponsiveContainer'

const SelectCategoryPage = () => {
  const router = useRouter()
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { data: parentCategories, error } = useSWR('classifieds/categories/')

  const handleClick = (category) => {
    setSelectedCategory(category)
  }

  const handleCancel = () => {
    setSelectedCategory(null)
  }

  if (error) {
    return (
      <Layout>
        <Error statusCode={error.response.status} />
      </Layout>
    )
  }

  if (!authUser || !authUser.isAuthenticated || !parentCategories) {
    return (
      <>
        <NextSeo title='カテゴリーを選択' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='カテゴリーを選択' noindex />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '400px' }} sx={{ mt: 3 }}>
          <Typography component='h1' variant='h4' fontWeight={700} mb={2}>
            カテゴリーを選択
          </Typography>

          {selectedCategory ? (
            <>
              <Paper variant='outlined' sx={{ mb: 3 }}>
                <List disablePadding>
                  <ListItem button onClick={handleCancel}>
                    <ListItemText primary={selectedCategory.name} />
                    <ClearIcon color='action' />
                  </ListItem>
                </List>
              </Paper>

              <Paper variant='outlined'>
                <List disablePadding>
                  {selectedCategory.children.map((category, index) => (
                    <ListItem
                      key={category.id}
                      component={Link}
                      href={`/classifieds/new?category_id=${category.id}`}
                      noLinkStyle
                      button
                      divider={index < selectedCategory.children.length - 1}
                    >
                      <ListItemText primary={category.name} />
                      <KeyboardArrowRightIcon color='action' />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </>
          ) : (
            <Paper variant='outlined'>
              <List disablePadding>
                {parentCategories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    {category.children.length > 0 ? (
                      <ListItem
                        button
                        divider={index < parentCategories.length - 1}
                        onClick={() => handleClick(category)}
                      >
                        <ListItemText primary={category.name} />
                      </ListItem>
                    ) : (
                      <ListItem
                        component={Link}
                        href={`/classifieds/new?category_id=${category.id}`}
                        noLinkStyle
                        button
                        divider={index < parentCategories.length - 1}
                      >
                        <ListItemText primary={category.name} />
                        <KeyboardArrowRightIcon color='action' />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default SelectCategoryPage
