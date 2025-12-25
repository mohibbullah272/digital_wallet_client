
import ParallaxHero from "@/components/ParallaxHero";
import Services from "./Services";
import Timeline from "./Timeline";
import { FeaturesSection } from "./Features";




const Home = () => {
    return (
        <div >
<ParallaxHero></ParallaxHero>
<FeaturesSection></FeaturesSection>
<Services></Services>
<Timeline></Timeline>
        </div>
    );
};

export default Home;