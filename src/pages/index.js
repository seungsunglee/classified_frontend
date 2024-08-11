import React from 'react'

import { NextSeo } from 'next-seo'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import CategoryPaper from '@/components/CategoryPaper'
import Hero from '@/components/Hero'
import HomeSection from '@/components/HomeSection'
import Layout from '@/components/Layout'
import LocationCard from '@/components/LocationCard'

const categories = [
  {
    id: 100000,
    name: '求人',
    image: '/jobs.png',
  },
  {
    id: 200000,
    name: '住まい',
    image: '/real-estate.png',
  },
  {
    id: 300000,
    name: '売ります',
    image: '/sell.png',
  },
  {
    id: 400000,
    name: 'コミュニティ',
    image: '/community.png',
  },
]

const locations = [
  {
    id: 16002,
    name: 'New South Wales',
    image: '/nsw.jpg',
  },
  {
    id: 16004,
    name: 'Queensland',
    image: '/qld.jpg',
  },
  {
    id: 16007,
    name: 'Victoria',
    image: '/vic.jpg',
  },
  {
    id: 16008,
    name: 'Western Australia',
    image: '/wa.jpg',
  },
]

const HomePage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
        }}
      />
      <Layout>
        <Hero />
        <Container>
          <HomeSection title='カテゴリーから探す'>
            <Grid container spacing={2}>
              {categories.map((category) => (
                <Grid item xs={6} md={3} key={category.id}>
                  <CategoryPaper
                    label={category.name}
                    image={category.image}
                    categoryId={category.id}
                  />
                </Grid>
              ))}
            </Grid>
          </HomeSection>

          <HomeSection title='エリアから探す'>
            <Grid container spacing={2}>
              {locations.map((location) => (
                <Grid item xs={6} md={3} key={location.id}>
                  <LocationCard
                    label={location.name}
                    image={location.image}
                    locationId={location.id}
                  />
                </Grid>
              ))}
            </Grid>
          </HomeSection>
        </Container>
      </Layout>
    </>
  )
}

export default HomePage
