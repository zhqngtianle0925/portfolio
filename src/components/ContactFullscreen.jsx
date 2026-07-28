import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi'

export default function ContactFullscreen() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#06B6D4]/[0.02] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#8B5CF6]/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-[1700px] mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-6xl font-black tracking-tight mb-6">
            期待与您<span className="text-gradient">交流</span>
          </h2>
          <p className="text-lg text-white/25 font-light tracking-wide max-w-md mx-auto">
            如果您对我的经历感兴趣，欢迎随时联系
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center gap-6 mb-20 flex-wrap"
        >
          {/* Email */}
          <a
            href="mailto:3199902738@qq.com"
            className="card-dark group flex items-center gap-5 px-10 py-7 min-w-[280px] hover:border-[#06B6D4]/30"
          >
            <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center group-hover:bg-[#06B6D4]/15 transition-colors duration-300">
              <FiMail className="text-xl text-[#06B6D4]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em] mb-1">
                Email
              </p>
              <p className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">
                3199902738@qq.com
              </p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:18628736617"
            className="card-dark group flex items-center gap-5 px-10 py-7 min-w-[280px] hover:border-[#8B5CF6]/30"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-colors duration-300">
              <FiPhone className="text-xl text-[#8B5CF6]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em] mb-1">
                Phone
              </p>
              <p className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">
                186-2873-6617
              </p>
            </div>
          </a>

          {/* Location */}
          <div className="card-dark group flex items-center gap-5 px-10 py-7 min-w-[280px]">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors duration-300">
              <FiMapPin className="text-xl text-white/40" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em] mb-1">
                Location
              </p>
              <p className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">
                杭州
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-white/15 text-sm font-mono tracking-wider mb-10"
        >
          © 2026 张清慧 · 数据分析师 &amp; AI Agent 开发
        </motion.p>

        {/* Back to Top */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.06] text-white/30 text-sm hover:text-white hover:border-white/20 transition-all duration-300"
        >
          <FiArrowUp size={14} />
          返回顶部
        </motion.button>
      </div>
    </section>
  )
}
