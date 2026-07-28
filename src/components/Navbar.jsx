import { useState, useEffect } from 'react'

const links = [
  { href: '#hero', label: '首页' },
  { href: '#about', label: '关于' },
  { href: '#internship', label: '经历' },
  { href: '#project', label: '项目' },
  { href: '#contact', label: '联系' },
]

export default function Navbar() {
  const [active, setActive] = useState('#hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = links.map(l => document.querySelector(l.href)).filter(Boolean)
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive('#' + sections[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-10 flex items-center justify-center">
        {/* Links */}
        <ul className="flex items-center gap-8">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  active === link.href
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#06B6D4] rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
