import Footer from './Footer'
import Header from './Header'
import LayoutContainer from './LayoutContainer'

const Layout = ({ children }) => (
  <LayoutContainer>
    <Header />
    <div>{children}</div>
    <Footer />
  </LayoutContainer>
)

export default Layout
