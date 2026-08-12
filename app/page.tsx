import Contact from "./sections/contact";
import Hero from "./sections/hero";
import Menu from "./sections/menu";
import Testimonials from "./sections/testimonials";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Menu/>
      <Testimonials/>
      <Contact/>
    </>
  );
}
