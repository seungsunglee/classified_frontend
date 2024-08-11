import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { NextSeo } from 'next-seo'
import ReactMarkdown from 'react-markdown'
import useSWR from 'swr'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import ResponsiveContainer from '@/components/ResponsiveContainer'

const ArticlePage = () => {
  const router = useRouter()
  const { data: article } = useSWR(
    router.query.id ? `help/articles/${router.query.id}/` : null
  )
  /*
  const { data: topic } = useSWR(
    article ? `help/topics/${article.topic}/` : null
  )
  */

  /*
  if (!article || !topic) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }
  */

  if (!article) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  return (
    <>
      <NextSeo title={article.title} noindex />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '700px' }} sx={{ mt: 3 }}>
          {/*}
          <Breadcrumbs>
            <Link
              href='/'
            >
              すべてのトピック
            </Link>
            {topic.parents && topic.parents.map(parent => (
              <Link
                href='/'
              >
                {parent.title}
              </Link>
            ))}
            <Link
              href='/'
            >
              {topic.title}
            </Link>
            <Typography>
              {article.title}
            </Typography>
          </Breadcrumbs>
            */}

          <Typography component='h1' variant='h4' fontWeight={700} mb={2}>
            {article.title}
          </Typography>

          <ReactMarkdown
            components={{
              h4: ({ children }) => (
                <Typography component='h4' variant='h6'>
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <Typography variant='body2' my={2}>
                  {children}
                </Typography>
              ),
              ol: ({ children }) => (
                <Box component='ol' my={2}>
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Typography component='li' variant='body2' my={0.5}>
                  {children}
                </Typography>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default ArticlePage
