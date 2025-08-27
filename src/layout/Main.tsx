import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import TourGuide from "@/components/TourGuide";


const Main = () => {
    return (
        <div  className="min-h-screen flex flex-col ">
          <header className="">  <Navbar></Navbar></header>
       <div className="grow-1">
        <TourGuide></TourGuide>
       <Outlet></Outlet>
       </div>
          <Footer></Footer>
        </div>
    );
};

export default Main;