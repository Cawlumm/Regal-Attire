import Directory from '../../directory/directory.component';
import WelcomeBanner from '../../welcome-banner/welcome-banner.component';
import './home.styles.scss';
const Home = () => {
  return (<div className='home-container'>
    <WelcomeBanner />
    <Directory />
  </div>)
};

export default Home;