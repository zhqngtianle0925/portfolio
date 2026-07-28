import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBookOpen, FiAward, FiVolume2, FiVolumeX } from 'react-icons/fi'

const stats = [
  { label: 'GPA', value: '3.278', sub: '/ 4.0' },
  { label: '专业排名', value: 'Top 10%', sub: '' },
  { label: '毕业年份', value: '2026', sub: '届' },
]

const courses = [
  'MySQL 数据库技术', 'Linux 操作系统', 'Spark 原理与应用',
  'Python 技术应用', 'JavaEE 编程技术', '数据挖掘',
]

export default function About() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const [musicOn, setMusicOn] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  // ── 3D 鼠标倾斜 ──
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 8, y: -y * 6 })
  }, [])

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (musicOn) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setMusicOn(!musicOn)
  }

  // ── 太空感 Canvas 叠加 (星空 + 流星 + 星云光晕) ──
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

    // 星空
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.3,
      twinkleSpeed: Math.random() * 0.03 + 0.008,
      twinkleOffset: Math.random() * Math.PI * 2,
      baseOpacity: Math.random() * 0.7 + 0.3,
    }))

    // 流星
    const shootingStars = Array.from({ length: 3 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      vx: -(Math.random() * 3 + 2),
      vy: Math.random() * 2 + 1,
      length: Math.random() * 60 + 40,
      life: Math.random() * 100 + 50,
      maxLife: 0,
      active: false,
      cooldown: Math.random() * 300 + 100,
    }))
    shootingStars.forEach(s => { s.maxLife = s.life; s.active = false })

    function draw() {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ── 星云光晕 ──
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.25, canvas.height * 0.35, 0,
        canvas.width * 0.25, canvas.height * 0.35, 300
      )
      nebula1.addColorStop(0, 'rgba(139, 92, 246, 0.04)')
      nebula1.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)')
      nebula1.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.55, 0,
        canvas.width * 0.7, canvas.height * 0.55, 250
      )
      nebula2.addColorStop(0, 'rgba(6, 182, 212, 0.03)')
      nebula2.addColorStop(0.5, 'rgba(139, 92, 246, 0.015)')
      nebula2.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // ── 星空闪烁 ──
      stars.forEach(s => {
        const alpha = s.baseOpacity * (0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset))
        if (alpha > 0.15) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.fill()
          // 十字光芒(亮星)
          if (s.size > 1.3 && alpha > 0.6) {
            ctx.strokeStyle = `rgba(200, 220, 255, ${alpha * 0.3})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(s.x - s.size * 3, s.y)
            ctx.lineTo(s.x + s.size * 3, s.y)
            ctx.moveTo(s.x, s.y - s.size * 3)
            ctx.lineTo(s.x, s.y + s.size * 3)
            ctx.stroke()
          }
        }
      })

      // ── 流星 ──
      shootingStars.forEach(s => {
        if (s.active) {
          s.x += s.vx
          s.y += s.vy
          s.life--
          const progress = s.life / s.maxLife
          const alpha = progress < 0.2 ? progress / 0.2 : 1

          const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.vx * s.length, s.y + s.vy * s.length)
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x + s.vx * s.length, s.y + s.vy * s.length)
          ctx.stroke()

          if (s.life <= 0 || s.x < -100 || s.y > canvas.height + 100) {
            s.active = false
            s.cooldown = 200 + Math.random() * 400
            s.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1
            s.y = Math.random() * canvas.height * 0.3
          }
        } else {
          s.cooldown--
          if (s.cooldown <= 0) {
            s.active = true
            s.life = s.maxLife
            s.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1
            s.y = Math.random() * canvas.height * 0.3
            s.vx = -(Math.random() * 3 + 2)
            s.vy = Math.random() * 2 + 1
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1400px' }}
    >
      {/* ── 右上角 "永無止境" ── */}
      <div className="absolute top-8 right-10 z-20 pointer-events-none select-none">
        <span
          className="text-lg font-bold tracking-[0.15em]"
          style={{ fontFamily: "'Noto Serif SC', 'STSong', serif", fontStyle: 'italic', transform: 'skewX(-8deg)', color: '#f9a8d4' }}
        >
          永無止境
        </span>
      </div>

      {/* ── 3D 图片背景 ── */}
      <img
        src="./skills-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          imageRendering: 'crisp-edges',
          filter: 'contrast(1.15) saturate(1.2) brightness(1.1)',
          transform: `scale(1.15) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* ── 太空感 Canvas 叠加 (星空 + 流星 + 星云) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* ── 背景音乐（仅用户点击后加载，避免阻塞首屏）── */}
      <audio ref={audioRef} loop preload="none">
        <source src="./bgm.mp3" type="audio/mpeg" />
      </audio>

      {/* ── 轻量遮罩 ── */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#050505]/55 via-transparent to-[#050505]/80 pointer-events-none" />

      <div className="relative z-10 max-w-[1700px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold tracking-tight">
            关于<span className="text-gradient">我</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-[380px_1fr] gap-16 items-start">
          {/* 左侧：头像 + 快速数据 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-60 rounded-2xl border border-white/[0.1] mb-8 overflow-hidden">
              <img
                src="./photo.png"
                alt="张清慧"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full grid grid-cols-3 gap-3">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="text-center py-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                >
                  <div className="text-xl font-bold text-white">
                    {s.value}
                    <span className="text-sm font-normal text-white/30">{s.sub}</span>
                  </div>
                  <div className="text-[11px] text-white/30 mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 右侧 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-10"
          >
            <div>
              <p className="text-2xl font-light text-white/80 leading-relaxed">
                我是<span className="text-white font-medium">张清慧</span>，
                <span className="text-[#06B6D4]">数据分析师</span> &amp;
                <span className="text-[#8B5CF6]">AI Agent 开发</span>。
                <br />
                <span className="text-lg text-white/40">
                  22岁，现居杭州。具备较强的数据敏感度与逻辑分析能力，
                  善于从复杂数据中发现业务痛点。责任心强，做事有计划性，
                  具备优秀的跨部门沟通协调能力。乐于在团队中持续学习新知。
                </span>
              </p>
            </div>

            <div className="line-cyan" />

            {/* 教育信息 */}
            <div className="card-dark p-8 bg-white/[0.03] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center">
                  <FiBookOpen className="text-[#06B6D4]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">长春科技学院</h3>
                  <p className="text-sm text-white/35">
                    数据科学与大数据技术 · 本科 · 2022.08 – 2026.06
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/25 mb-3 font-mono tracking-wider uppercase">主修课程</p>
              <div className="flex flex-wrap gap-2">
                {courses.map(c => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-white/45 hover:text-[#06B6D4] hover:border-[#06B6D4]/20 transition-all duration-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* 奖项 */}
            <div className="card-dark p-8 bg-white/[0.03] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                  <FiAward className="text-[#8B5CF6]" />
                </div>
                <h3 className="font-semibold text-white">荣誉奖项</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  '2026 校级社会实践先进个人',
                  '2025-2026 校级三好学生',
                  '2024-2025 校级奖学金',
                  '普通话二级甲等',
                ].map((award, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60 flex-shrink-0" />
                    <span className="text-sm text-white/55">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 音乐开关 ── */}
      <button
        onClick={toggleMusic}
        className="absolute bottom-8 right-8 z-20 w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
        title={musicOn ? '暂停音乐' : '播放音乐'}
      >
        {musicOn ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
      </button>
    </section>
  )
}
