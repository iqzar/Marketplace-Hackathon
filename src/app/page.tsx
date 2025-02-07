import Top from './top'
import Header from './header'
import Hero from './hero'
import Sec1 from './sec1'
import Airmax from './airmax'
import Sec2 from './sec2';
import Sec3 from './sec3'
import Gearup from './gearup'
import Essential from './essentials'
import Footer from './footer'
export default function Home(){
  return(
    <main>
      <Top/>
      <Header/>
      <Hero/>
      <Sec1/>
      <Airmax/>
      <Sec2/>
      <Gearup/>
      <Sec3/>
      <Essential/>
    
      <Footer/>
    </main>
  )
}