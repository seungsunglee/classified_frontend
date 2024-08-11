import Error from '@/components/Error'
import Layout from '@/components/Layout'

const Custom404 = () => {
  return (
    <Layout>
      <Error statusCode={404} />
    </Layout>
  )
}

export default Custom404
