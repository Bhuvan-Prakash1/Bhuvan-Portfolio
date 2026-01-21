import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDownload,
  FaPaperPlane,
  FaBars,
  FaTimes,
  FaPuzzlePiece,
  FaFileAlt,
  FaBolt,
  FaAddressCard,
  FaGraduationCap,
  FaCertificate,
  FaUser,
  FaBriefcase,
  FaCode,
  FaServer,
  FaLaptopCode,
  FaTools,
  FaArrowUp
} from 'react-icons/fa'
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiGit,
  SiVercel,
  SiSpringboot
} from 'react-icons/si'

interface Project {
  title: string
  status: string
  category: string
  description: string
  techStack: string
  liveDemo: string
  github: string
}

const ROLES = ['Software Developer']

const PROJECTS: Project[] = [
  {
    title: 'JS ANALYTICS',
    status: 'COMPLETED',
    category: 'Frontend',
    description: 'JSAnalytics – Career Transforming Web Platform. JSAnalytics is a professionally developed web platform designed to introduce users to the world of data analytics and career growth. It presents a clear value-driven journey for learners by highlighting industry-relevant benefits, a comprehensive syllabus covering tools like Power BI, Tableau, SQL, Python, Power Apps, and real student testimonials to build credibility and trust. The site emphasizes flexibility, practical skill development, and career support, making it an engaging and informative experience for anyone interested in upskilling in data analytics.',
    techStack: 'HTML, CSS, REACT.JS',
    liveDemo: 'https://jsanalytics.vercel.app/',
    github: 'https://jsanalytics.vercel.app/'
  },
  {
    title: 'NGO-CONNECT',
    status: 'completed',
    category: 'Full Stack',
    description: 'NGO Connect is a web-based platform developed to connect individuals with non-governmental organizations by providing a centralized and accessible source of information. Built during my internship, the project focuses on creating a responsive and user-friendly interface that allows users to explore NGOs easily and understand their missions and activities. The application highlights clean UI/UX design, structured content presentation, and smooth navigation across devices. This project demonstrates my ability to build real-world web applications with social impact using modern frontend technologies and best development practices.',
    techStack: 'Html, CSS, REACT, JAVA SCRIPT',
    liveDemo: 'https://ngo-connect-two.vercel.app/',
    github: 'https://ngo-connect-two.vercel.app/'
  },
  {
    title: 'CAFEAURA',
    status: 'completed',
    category: 'Frontend',
    description: 'Cafe Aura Website is a fully responsive and visually appealing web project designed to showcase the offerings and ambience of a premium café/restaurant. The site presents visitors with an engaging user experience through clean layout, attractive visuals, and well-structured content that highlights menu items, ambience, and brand identity. During this project, I focused on building a modern frontend using HTML, CSS, JavaScript, and React, ensuring that the design adapts seamlessly across devices and screen sizes. This project reflects my ability to translate real-world business requirements into a functional and professional web presence while emphasizing UI/UX best practices.',
    techStack: 'HTML, CSS, REACT, TREE.JS, JAVA SCRIPT',
    liveDemo: 'https://cafeaura-website-93f6.vercel.app/',
    github: 'https://cafeaura-website-93f6.vercel.app/'
  }
]

const App = () => {
  const [typedText, setTypedText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseDuration = 2000

  useEffect(() => {
    const currentRole = ROLES[currentRoleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && typedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false)
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length)
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed
      timeout = setTimeout(() => {
        setTypedText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentRole.slice(0, prev.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, currentRoleIndex])

  const projects = PROJECTS

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category.toLowerCase())))]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:bhuvanprakashr@gmail.com?subject=Contact from Portfolio&body=Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`
    window.location.href = mailtoLink
    setFormData({ name: '', email: '', message: '' })
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#030014] text-gray-100 min-h-screen relative font-sans selection:bg-cyan-500/30">

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Back To Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 bg-cyan-600 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-500 transition-colors"
          >
            <FaArrowUp className="text-white text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#030014] to-[#030014] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-[#030014] to-[#030014] pointer-events-none"></div>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 sm:gap-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="https://i.postimg.cc/GHsfv0LQ/portfolio-logo1.png"
              alt="Portfolio Logo"
              className="h-10 sm:h-12 w-auto"
            />
            <span className="text-sm sm:text-base font-bold text-gradient">Bhuvan.dev</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Skills', 'Projects', 'Education', 'Certifications', 'Contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href="https://drive.google.com/file/d/1uGc9gKb4YuDveCmuzy134tmjpodrPr3V/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              <FaDownload />
              <span>Download Resume</span>
            </motion.a>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-white/20 bg-gray-900/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {['About', 'Skills', 'Projects', 'Education', 'Certifications', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase())
                    setMobileMenuOpen(false)
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="text-left text-gray-300 hover:text-white transition-colors py-2"
                >
                  {item}
                </motion.button>
              ))}
              <motion.a
                href="https://drive.google.com/file/d/1uGc9gKb4YuDveCmuzy134tmjpodrPr3V/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all w-fit"
              >
                <FaDownload />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-24 sm:pt-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

        <motion.div
          style={{ opacity, scale }}
          className="container mx-auto max-w-6xl px-4 z-10 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center"
        >
          {/* Text Content (Order 2 on Mobile, Order 1 on Desktop) */}
          <div className="order-2 md:order-1 text-center md:text-left transition-all duration-500">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6 hover:bg-blue-500/20 transition-colors cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Available for Work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
            >
              <span className="block text-gray-100 mb-2">Hi, I'm</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 animate-gradient-x">Bhuvan Prakash</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 mb-6 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3"
            >
              <span>I am a</span>
              <span className="text-blue-400 font-semibold">{typedText}</span>
              <span className="animate-pulse text-blue-400">|</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0"
            >
              Transforming complex problems into elegant, scalable solutions.
              Passionate about <span className="text-gray-200">Full Stack Development</span> and building the future of web technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <motion.a
                href="https://www.linkedin.com/in/bhuvan-prakash"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/40 transition-all"
              >
                <FaLinkedin /> Connect on LinkedIn
              </motion.a>
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 glass rounded-lg text-white font-semibold flex items-center gap-2 hover:bg-white/5 transition-all border border-white/10 hover:border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              >
                <FaPaperPlane /> Get In Touch
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex items-center justify-center md:justify-start gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
            >
              <SiReact className="text-2xl hover:text-[#61DAFB] transition-colors" />
              <SiSpringboot className="text-2xl hover:text-[#6DB33F] transition-colors" />
              <SiNodedotjs className="text-2xl hover:text-[#339933] transition-colors" />
              <SiMongodb className="text-2xl hover:text-[#47A248] transition-colors" />
            </motion.div>
          </div>

          {/* Profile Image (Order 1 on Mobile, Order 2 on Desktop) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 relative flex justify-center group"
          >
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-purple-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500 delay-100"></div>

            <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border border-white/20 animate-[spin_15s_linear_infinite_reverse]"></div>
              <img
                src="https://i.postimg.cc/G4dCX3SM/Profile-pic.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl shadow-black/50 hover:scale-[1.02] transition-transform duration-500 ease-out"
              />

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 glass px-4 py-2 rounded-xl border border-white/20 shadow-lg backdrop-blur-md"
              >
                <span className="text-xs font-semibold text-gray-200">✨ Full Stack Dev</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
          >
            About Bhuvan
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Bio Card - Spans 2 Columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 glass p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500"></div>

              <h3 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-3">
                <FaUser className="text-3xl" />
                My Journey
              </h3>

              <div className="space-y-6 text-gray-300 leading-relaxed text-lg relative z-10">
                <p>
                  I am a <span className="text-blue-300 font-semibold">Final Year Computer Science Student</span> and <span className="text-blue-300 font-semibold">AI Software Developer Intern</span> driven by a passion for building logical, impactful solutions. My journey began with a curiosity for how things work, which quickly evolved into a deep love for <span className="text-blue-300 font-semibold">Full Stack Development</span>.
                </p>
                <p>
                  With a strong foundation in <span className="text-purple-300 font-semibold">Java, Spring Boot, and React</span>, I bridge the gap between robust backend systems and dynamic frontend interfaces. I don't just write code; I design architectures that are scalable, maintainable, and efficient.
                </p>
                <p>
                  Through multiple internships, I've had the opportunity to build <span className="text-green-300 font-semibold">real-world applications</span> that solve actual business problems. I thrive in challenging environments where I can apply my knowledge of Data Structures, Algorithms, and System Design to create software that matters.
                </p>
              </div>
            </motion.div>

            {/* Side Column - Highlights & Info */}
            <div className="flex flex-col gap-8">
              {/* Highlights Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden flex-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              >
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none"></div>

                <h3 className="text-xl font-bold mb-6 text-green-400 flex items-center gap-2">
                  <FaBolt /> Highlights
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-300 group/item">
                    <span className="p-2 bg-green-500/10 rounded-lg text-green-400 group-hover/item:bg-green-500/20 transition-colors">
                      <FaGraduationCap />
                    </span>
                    <div>
                      <span className="block font-semibold text-white">CGPA: 8.7 / 10</span>
                      <span className="text-sm text-gray-500">Consistent Academic Performer</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 group/item">
                    <span className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover/item:bg-purple-500/20 transition-colors">
                      <FaBriefcase />
                    </span>
                    <div>
                      <span className="block font-semibold text-white">Intern Experience</span>
                      <span className="text-sm text-gray-500">FreshTron & AI Labs</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 group/item">
                    <span className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover/item:bg-blue-500/20 transition-colors">
                      <FaCode />
                    </span>
                    <div>
                      <span className="block font-semibold text-white">Full Stack Focus</span>
                      <span className="text-sm text-gray-500">Spring Boot + React Ecosystem</span>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Status Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-100 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Open to Work
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Actively looking for Internships and Entry-level positions.
                </p>
                <div className="flex items-center gap-3 text-gray-300 mb-2">
                  <FaMapMarkerAlt className="text-red-400" />
                  <span>Bangalore, Chennai, Coimbatore</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="text-blue-400" />
                  <span className="truncate">bhuvanprakashr@gmail.com</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {/* Skills Section */}
      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 bg-[#030014] relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Technical Ecosystem</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A comprehensive tool belt for building scalable, high-performance applications from the ground up.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-colors"
            >
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <SiReact className="text-[15rem] text-cyan-500 animate-[spin_10s_linear_infinite]" />
              </div>

              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <FaLaptopCode className="text-2xl" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Frontend Architecture</h3>
              <p className="text-slate-400 mb-8 leading-relaxed relative z-10 text-sm">
                Crafting responsive, intuitive user interfaces with modern component systems.
              </p>

              <div className="flex flex-wrap gap-3 relative z-10">
                {[
                  { icon: SiReact, name: 'React', color: '#61DAFB' },
                  { icon: SiJavascript, name: 'JS', color: '#F7DF1E' },
                  { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
                  { icon: SiCss3, name: 'CSS3', color: '#1572B6' }
                ].map((tool) => (
                  <div key={tool.name} className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-lg border border-white/5 hover:border-white/20 transition-all group/icon cursor-default">
                    <tool.icon className="text-lg text-slate-400 group-hover/icon:text-[var(--color)] transition-colors" style={{ '--color': tool.color } as any} />
                    <span className="text-sm font-medium text-slate-300">{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Backend Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-colors"
            >
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <SiSpringboot className="text-[15rem] text-purple-500 animate-[spin_10s_linear_infinite]" />
              </div>

              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <FaServer className="text-2xl" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Backend Logic</h3>
              <p className="text-slate-400 mb-8 leading-relaxed relative z-10 text-sm">
                Building robust, scalable server-side systems and efficient databases.
              </p>

              <div className="flex flex-wrap gap-3 relative z-10">
                {[
                  { icon: SiSpringboot, name: 'Spring', color: '#6DB33F' },
                  { icon: SiNodedotjs, name: 'Node', color: '#339933' },
                  { icon: SiExpress, name: 'Express', color: '#ffffff' },
                  { icon: SiMongodb, name: 'Mongo', color: '#47A248' }
                ].map((tool) => (
                  <div key={tool.name} className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-lg border border-white/5 hover:border-white/20 transition-all group/icon cursor-default">
                    <tool.icon className="text-lg text-slate-400 group-hover/icon:text-[var(--color)] transition-colors" style={{ '--color': tool.color } as any} />
                    <span className="text-sm font-medium text-slate-300">{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DevOps Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-fuchsia-500/30 transition-colors"
            >
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <SiGit className="text-[15rem] text-fuchsia-600 animate-[pulse_5s_ease-in-out_infinite]" />
              </div>

              <div className="w-14 h-14 bg-fuchsia-500/10 rounded-2xl flex items-center justify-center mb-6 text-fuchsia-400 border border-fuchsia-500/20 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <FaTools className="text-2xl" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">DevOps & Tools</h3>
              <p className="text-slate-400 mb-8 leading-relaxed relative z-10 text-sm">
                Streamlining the development lifecycle with modern CI/CD pipelines.
              </p>

              <div className="flex flex-wrap gap-3 relative z-10">
                {[
                  { icon: SiGit, name: 'Git', color: '#F05032' },
                  { icon: SiVercel, name: 'Vercel', color: '#ffffff' },
                ].map((tool) => (
                  <div key={tool.name} className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-lg border border-white/5 hover:border-white/20 transition-all group/icon cursor-default">
                    <tool.icon className="text-lg text-slate-400 group-hover/icon:text-[var(--color)] transition-colors" style={{ '--color': tool.color } as any} />
                    <span className="text-sm font-medium text-slate-300">{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-lg">
              Featured Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass rounded-3xl overflow-hidden border border-white/10 group hover:border-cyan-500/30 transition-colors flex flex-col"
              >
                {/* Gradient Header - Placeholder for Image */}
                <div className="h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 opacity-75 group-hover:opacity-100 transition-opacity"></div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-xs font-semibold tracking-wider">
                      {project.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.split(',').map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-800/50 border border-white/5 rounded-md text-xs text-slate-300 group-hover:border-white/10 transition-colors">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-semibold text-center text-sm shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <FaPaperPlane className="text-xs" /> Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-center text-sm hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <FaGithub /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-lg">
              Education
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500"></div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                <FaGraduationCap className="text-4xl text-white" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">B.E. Computer Science</h3>
                    <p className="text-xl text-cyan-400 font-medium">Study World College of Engineering</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-4 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-bold">
                      CGPA: 8.7 / 10
                    </span>
                    <span className="text-slate-400 text-sm font-medium">2022 - 2026</span>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  Pursuing Computer Science Engineering with a strong focus on software development and system architecture.
                  Consistently maintaining academic excellence while actively building real-world projects.
                </p>

                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Core Coursework</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Data Structures', 'Algorithms', 'DBMS', 'OS', 'Computer Networks', 'Software Engineering', 'AI'].map((course) => (
                      <span key={course} className="px-3 py-1.5 bg-indigo-900/30 border border-indigo-500/20 rounded-lg text-indigo-200 text-xs font-medium hover:bg-indigo-900/50 transition-colors cursor-default">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-lg">
              Certifications
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-yellow-500/30 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-500 group-hover:scale-110 transition-transform">
                  <FaCertificate className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Web Based Technologies</h3>
                  <p className="text-slate-400 mb-4">SWAYAM – IGNOU | July 2024</p>
                  <div className="flex flex-wrap gap-2">
                    {['Multimedia', 'Web Arch', 'Applications'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/10 rounded-lg text-yellow-200 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-500 group-hover:scale-110 transition-transform">
                  <FaCertificate className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Full Stack Development</h3>
                  <p className="text-slate-400 mb-4">Udemy | 2023</p>
                  <div className="flex flex-wrap gap-2">
                    {['MERN Stack', 'API Design', 'Deployment'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/10 rounded-lg text-cyan-200 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <section id="cta" className="py-24 px-4 bg-[#030014] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl max-w-4xl mx-auto border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.1)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="mb-8 flex justify-center">
              <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available for Immediate Opportunities
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Collaborate?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              I'm currently seeking internships and entry-level full-stack positions.
              Let's build something extraordinary together.
            </p>

            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-900/20 transition-all border border-white/10"
            >
              Start a Conversation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-4 bg-[#030014] relative">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-lg">
              Get In Touch
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 glass p-8 rounded-3xl border border-white/10 flex flex-col gap-8 h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Contact Info</h3>
                <p className="text-slate-400">Feel free to reach out via email or LinkedIn.</p>
              </div>

              <div className="flex flex-col gap-6">
                <a href="mailto:bhuvanprakashr@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
                    <FaEnvelope className="text-xl text-slate-300 group-hover:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Email</p>
                    <p className="text-slate-200 font-semibold group-hover:text-cyan-400 transition-colors">bhuvanprakashr@gmail.com</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/bhuvan-prakash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                    <FaLinkedin className="text-xl text-slate-300 group-hover:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">LinkedIn</p>
                    <p className="text-slate-200 font-semibold group-hover:text-blue-400 transition-colors">/in/bhuvan-prakash</p>
                  </div>
                </a>

                <a href="https://github.com/Bhuvan-Prakash1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all">
                    <FaGithub className="text-xl text-slate-300 group-hover:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">GitHub</p>
                    <p className="text-slate-200 font-semibold group-hover:text-purple-400 transition-colors">Bhuvan-Prakash1</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="md:col-span-3 glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="relative group">
                  <label htmlFor="name" className="text-sm font-medium text-slate-400 mb-2 block group-focus-within:text-cyan-400 transition-colors">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900/80 transition-all placeholder:text-slate-600"
                    placeholder="John Doe"
                  />
                </div>
                <div className="relative group">
                  <label htmlFor="email" className="text-sm font-medium text-slate-400 mb-2 block group-focus-within:text-purple-400 transition-colors">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:bg-slate-900/80 transition-all placeholder:text-slate-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="relative group mb-8">
                <label htmlFor="message" className="text-sm font-medium text-slate-400 mb-2 block group-focus-within:text-fuchsia-400 transition-colors">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500/50 focus:bg-slate-900/80 transition-all resize-none placeholder:text-slate-600"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2"><FaPaperPlane /> Send Message</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-[#020010] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">Bhuvan Prakash</span>. Crafted with Cosmic Energy.
          </p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/bhuvan-prakash" className="text-slate-500 hover:text-blue-400 transition-colors"><FaLinkedin className="text-xl" /></a>
            <a href="https://github.com/Bhuvan-Prakash1" className="text-slate-500 hover:text-purple-400 transition-colors"><FaGithub className="text-xl" /></a>
            <a href="mailto:bhuvanprakashr@gmail.com" className="text-slate-500 hover:text-cyan-400 transition-colors"><FaEnvelope className="text-xl" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

