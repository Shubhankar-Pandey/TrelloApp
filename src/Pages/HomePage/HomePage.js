import HeroSection from "./HeroSection"
import InfoSection from "./InfoSection";
import Stepper from "./Stepper";
import JoinUsNow from "./JoinUsNow";
import Footer from "./Footer";


function HomePage(){
    return (
        <div>
            <HeroSection/>
            <InfoSection/>
            <Stepper/>
            <JoinUsNow/>
            <Footer/>
        </div>
    )
}


export default HomePage;