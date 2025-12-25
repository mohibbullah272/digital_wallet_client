import Logo from "@/components/ui/Logo";
import { Link } from "react-router";


const Footer = () => {
    return (

      <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center  sm:justify-start ">
      <Logo></Logo> 
            </div>
    
            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left dark:text-gray-400">
            Your Trusted E-Wallet Now World Wide Used Let's Connect and follow to each other and bring success together
            </p>
    
         
          </div>
    
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 dark:text-white">Quick Links</p>
    
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link to={'/'} className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
          Home
                  </Link>
                </li>
    
                <li>
                  <Link to={'/about'} className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" >
                    About Us
                  </Link>
                </li>
    
                <li>
                  <Link to={'/FAQ'} className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" >
         FAQ
                  </Link>
                </li>
    
                <li>
                  <Link className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" to={"/Contact"}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
    
    
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 dark:text-white">Helpful Links</p>
    
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" to="/FAQ">
                    FAQs
                  </Link>
                </li>
    
                <li>
                  <Link className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" to={'/Contact'}>
                    Support
                  </Link>
                </li>
    
                <li>
                  <Link className="group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end" to="/Contact">
                    <span className="text-gray-700 transition group-hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
          Contact 
                    </span>
    
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
    
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 dark:text-white">Contact Us</p>
    
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
    
                    <span className="text-gray-700 dark:text-gray-300"> john@doe.com </span>
                  </a>
                </li>
    
                <li>
                  <a className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
    
                    <span className="text-gray-700 dark:text-gray-300">0123456789</span>
                  </a>
                </li>
    
                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
    
                  <address className="-mt-0.5 text-gray-700 not-italic dark:text-gray-300">
                    213 Lane, London, United Kingdom
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
    
        <div className="mt-12 border-t border-gray-100 pt-6 dark:border-gray-800">
          <div className="text-center flex gap-2 justify-center sm:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="block sm:inline">All rights reserved </span>
    
    by E-Wallet
            </p>
    
            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0 dark:text-gray-400">
              © {new Date().getFullYear()} 
            </p>
          </div>
        </div>
      </div>
    </footer>
    
    );
};

export default Footer;