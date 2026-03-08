import HeroPage from "@/sections/Hero";
import Showcase from "@/sections/Showcase";
import About from "@/sections/About";
import Contact from "@/sections/Contact";

import Navbar from "@/components/navbar";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
   <div>
    <Navbar/>
    <HeroPage/>
    <Showcase />
    <About/>
    <Projects />
    <Contact/>
   </div>
  );
}

