import Directory from '../../directory/directory.component';
import WelcomeBanner from '../../welcome-banner/welcome-banner.component';
import Declaration from '../../declaration/declaration.component';
import './home.styles.scss';
const Home = () => {
  return (<div className='home-container'>
    <WelcomeBanner />
    <Declaration/>
    <Directory />
  </div>)
};

export default Home;