import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi'

const internships = [
  {
    id: 1,
    company: '温州保博科技有限公司杭州分公司',
    role: '数据验证分析师',
    period: '2025.07 – 2025.10',
    location: '杭州',
    color: '#06B6D4',
    highlights: [
      '负责门店客流量与用户行为数据的深度校验，交叉比对录像与系统数据，排查并修复底层数据异常，保障数据准确率。',
      '针对门店客流差异情况建立分析逻辑，定期输出数据核验与深度分析报告，为业务端调整提供可靠数据支撑。',
      '将一线数据异常特征提炼并反馈给算法及系统部门，协助团队优化了数据获取与初步校验的系统流程。',
    ],
  },
  {
    id: 2,
    company: '杭州兴诚跃达科技有限公司',
    role: '数据分析 / 研发',
    period: '2025.11 – 2026.05',
    location: '杭州',
    color: '#8B5CF6',
    highlights: [
      '负责对接外部客户，梳理并明确业务需求；高效收集客户关键信息，整合整理并归档项目相关材料，保障信息在内外部的准确传递。',
      '针对日常业务中繁琐重复的工作环节，独立使用 Python 编写自动化脚本，替代人工操作，降低人力成本与操作错误率。',
      '通过需求精准把控与自动化工具赋能，有效缩短工作流转周期，协助团队将整体项目推进速度提升 30%。',
    ],
  },
]

function Card3D({ item, idx, inView }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setTilt({ x: -y * 8, y: x * 8 })
    setGlow({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }, [])

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlow({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + idx * 0.15 }}
      className="group cursor-default relative rounded-[20px] border border-white/[0.08]"
      style={{
        background: 'rgba(10, 10, 18, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 跟随鼠标光效 */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${item.color}15 0%, transparent 60%)`,
        }}
      />

      <div className="p-10 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg"
              style={{ background: `${item.color}15`, color: item.color }}
            >
              <FiBriefcase />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{item.role}</h3>
              <p className="text-white/85 text-sm mt-0.5" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.05rem' }}>{item.company}</p>
            </div>
          </div>
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 mt-2"
            style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-6 mb-8 text-sm text-white/70" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem' }}>
          <span className="flex items-center gap-2">
            <FiCalendar size={14} />{item.period}
          </span>
          <span className="flex items-center gap-2">
            <FiMapPin size={14} />{item.location}
          </span>
        </div>

        <div className="w-full h-px bg-white/[0.1] mb-8" />

        {/* Highlights */}
        <div className="flex-1 space-y-5">
          {item.highlights.map((h, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1 flex-shrink-0">
                <FiCheckCircle size={16} style={{ color: item.color }} className="opacity-80" />
              </div>
              <p className="text-sm text-white/85 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.95rem' }}>{h}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function InternshipCards() {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [bgTilt, setBgTilt] = useState({ x: 0, y: 0 })
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // ── Canvas 粒子装饰 ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }))

    function draw() {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.phase += p.speed
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const alpha = 0.3 + 0.3 * Math.sin(p.phase)
        // 光点
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`
        ctx.fill()
        // 光晕
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        glow.addColorStop(0, `rgba(139, 92, 246, ${alpha * 0.3})`)
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
      })

      // 两侧边缘光柱
      for (let i = 0; i < 2; i++) {
        const gx = i === 0 ? 60 : canvas.width - 60
        const grad = ctx.createLinearGradient(gx - 100, 0, gx + 100, 0)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)')
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(gx - 100, 0, 200, canvas.height)
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── 背景 3D 交互 ──
  const handleBgMove = useCallback((e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setBgTilt({ x: x * 6, y: -y * 5 })
  }, [])

  const handleBgLeave = () => setBgTilt({ x: 0, y: 0 })

  return (
    <section
      id="internship"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      onMouseMove={handleBgMove}
      onMouseLeave={handleBgLeave}
      style={{ perspective: '1400px' }}
    >
      {/* ── 3D 视频背景 ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
        preload="metadata"
        poster="./internship-bg-poster.webp"
        disablePictureInPicture
        disableRemotePlayback
        style={{
          filter: 'contrast(1.2) saturate(1.4) brightness(1.8)',
          transform: `scale(1.15) rotateX(${bgTilt.y}deg) rotateY(${bgTilt.x}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <source src="./internship-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Canvas 粒子装饰 ── */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* ── 轻量遮罩 ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-[#050505]/40 pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-[1700px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            实习<span className="text-gradient">经历</span>
          </h2>
          <p className="text-white/70 mt-3 text-sm tracking-wide">
            两段实习，从数据校验到流程自动化，持续深入数据领域
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-8">
          {internships.map((item, idx) => (
            <Card3D key={item.id} item={item} idx={idx} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
