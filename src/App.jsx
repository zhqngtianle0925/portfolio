import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import InternshipCards from './components/InternshipCards'
import ProjectCard from './components/ProjectCard'
import SkillsGrid from './components/SkillsGrid'
import ContactFullscreen from './components/ContactFullscreen'

export default function App() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <InternshipCards />
      <ProjectCard />
      <SkillsGrid />
      <ContactFullscreen />
    </div>
  )
}
