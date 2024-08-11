import Error from '@/components/Error'
import Layout from '@/components/Layout'

const Custom500 = () => {
  return (
    <Layout>
      <Error statusCode={500} />
    </Layout>
  )
}

export default Custom500
