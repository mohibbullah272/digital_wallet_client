import { HeroParallax } from "./ui/hero-parallax";

export const products = [
    {
      title: "E-Wallet Future",
   
      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574886/E-Wallet-12-24-2025_04_08_PM_vovzcd.png",
    },
    {
      title: "E-Wallet Help",
   
      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574886/E-Wallet-12-24-2025_04_09_PM_mdpnzo.png",
    },
    {
      title: "E-Wallet Send Money",
    
      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574885/E-Wallet-12-24-2025_04_11_PM_hpk1yi.png",
    },
   
    {
      title: "Transaction",

      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574885/E-Wallet-12-24-2025_04_10_PM_pmlldq.png",
    },
    {
      title: "Deposit",

      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574885/E-Wallet-12-24-2025_04_12_PM_fyrray.png",
    },
    {
      title: "Dashboard",

      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574885/E-Wallet-12-24-2025_05_10_PM_hr5iwe.png",
    },
   
    {
      title: "Profile Setting",
    
      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574885/E-Wallet-12-24-2025_04_13_PM_1_ag9hji.png",
    },
    {
      title: "Withdraw",

      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574885/E-Wallet-12-24-2025_04_13_PM_kawaov.png",
    },
    {
      title: "User Dashboard",
  
      thumbnail:
        "https://res.cloudinary.com/dovnztfxq/image/upload/v1766574885/E-Wallet-12-24-2025_04_14_PM_resboo.png",
    },
  ];
const ParallaxHero = () => {

    return <HeroParallax products={products} />;

};

export default ParallaxHero;