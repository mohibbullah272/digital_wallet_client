import { useEffect } from "react";
import Shepherd from "shepherd.js";
import { useLocation, useNavigate } from "react-router";
import 'shepherd.js/dist/css/shepherd.css';

const TourGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");

    if (hasSeenTour) return;

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        
        classes: "shadow-lg rounded-lg p-4 bg-white text-black",
        scrollTo: { behavior: "smooth", block: "center" },
      },
    });

    // Step 1: Navigation menu
    tour.addStep({
      id: "nav",
      text: "Use this menu to switch between different sections",

      attachTo: { element: "#nav-menu", on: "bottom" },
      buttons: [
        {
          text: "Next",
          action: () => {
            tour.next();
          },
        },
      ],
    });

  
    tour.addStep({
      id: "theme",
      text: "Use this button to toggle between light and dark mode",
      attachTo: { element: "#theme-toggle", on: "left" },
      buttons: [{ text: "Done", action: tour.complete }],
      beforeShowPromise: () => {
        if (location.pathname !== "/settings") navigate("/");
        return Promise.resolve();
      },
    });

    tour.on("complete", () => {
      localStorage.setItem("hasSeenTour", "true");
    });

    tour.start();
  }, [location, navigate]);

  return null;
};

export default TourGuide;
