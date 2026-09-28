import LandingHeader from '../../components/landing/LandingHeader/LandingHeader';
import Hero from '../../components/landing/Hero/Hero';
import RatesTicker from '../../components/landing/RatesTicker/RatesTicker';
import HowItWorks from '../../components/landing/HowItWorks/HowItWorks';
import Stories from '../../components/landing/Stories/Stories';
import LandingFooter from '../../components/landing/LandingFooter/LandingFooter';
import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <div className="landing__wrap">
        <LandingHeader />
        <Hero />
      </div>

      <RatesTicker />

      <div className="landing__wrap">
        <main>
          <HowItWorks />
          <Stories />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}

export default Landing;
