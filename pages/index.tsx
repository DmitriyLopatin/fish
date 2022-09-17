import type { NextPage } from 'next'
import Wrapper from '../app/component/wrapper/Wrapper'
import Authorization from '../app/pages/authorization/Authorization'


const Home: NextPage = () => {
  
  return (
    <Wrapper>
      <Authorization/>
    </Wrapper>
  )
}

export default Home
