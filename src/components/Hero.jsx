import { useEffect, useRef, useCallback, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

// ═══════════════════════════════════════
// 🎬 视频背景设置：将你的视频文件放到 public/ 目录下，修改下方文件名
// ═══════════════════════════════════════
const VIDEO_SRC = '/bg.mp4'

export default function Hero() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetRef = useRef({ x: 0.5, y: 0.5 })

  // ── 鼠标追踪 ──
  const handleMouseMove = useCallback((e) => {
    targetRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // ── Canvas 叠加层：樱花 + 星光 + 鼠标光晕 ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 樱花
    const petals = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 12 + 5,
      speed: Math.random() * 0.8 + 0.3,
      swayAmp: Math.random() * 2.5 + 1,
      swaySpeed: Math.random() * 0.018 + 0.008,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.7 + 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
    }))

    // 星光
    const sparkles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.4,
      speed: Math.random() * 0.35 + 0.1,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.025 + 0.008,
      opacity: Math.random() * 0.8 + 0.2,
    }))

    function drawPetal(ctx, x, y, size, rotation, opacity) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity
      const s = size * 0.5
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, s)
      gradient.addColorStop(0, '#FFE0EC')
      gradient.addColorStop(0.35, '#FFB7C5')
      gradient.addColorStop(1, '#FF8FAB')
      ctx.fillStyle = gradient
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        const cx = Math.cos(a) * s * 0.55
        const cy = Math.sin(a) * s * 0.55
        if (i === 0) ctx.moveTo(cx, cy)
        const am = a - 0.55
        const ap = a + 0.55
        ctx.quadraticCurveTo(Math.cos(am) * s * 0.85, Math.sin(am) * s * 0.85, cx, cy)
        ctx.quadraticCurveTo(Math.cos(ap) * s * 0.85, Math.sin(ap) * s * 0.85, cx, cy)
      }
      ctx.fill()
      ctx.restore()
    }

    function draw() {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ── 极光光柱 (半透明，叠加在视频上) ──
      for (let i = 0; i < 3; i++) {
        const bx = canvas.width * (0.2 + i * 0.3) + Math.sin(time * 0.3 + i) * 120
        const beamGrad = ctx.createRadialGradient(bx, 0, 0, bx, canvas.height * 0.55, 350)
        beamGrad.addColorStop(0,
          `rgba(${i === 0 ? '0,230,200' : i === 1 ? '100,180,255' : '170,100,255'}, 0.03)`
        )
        beamGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = beamGrad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // ── 星光粒子 ──
      sparkles.forEach(s => {
        s.y -= s.speed
        s.phase += s.freq
        if (s.y < -10) { s.y = canvas.height + 10; s.x = Math.random() * canvas.width }
        const alpha = s.opacity * (0.55 + 0.45 * Math.sin(s.phase))
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 5)
        glow.addColorStop(0, `rgba(200, 235, 255, ${alpha * 0.5})`)
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210, 240, 255, ${alpha})`
        ctx.fill()
      })

      // ── 樱花花瓣 ──
      petals.forEach(p => {
        p.y += p.speed
        p.swayOffset += p.swaySpeed
        p.x += Math.sin(p.swayOffset) * p.swayAmp * 0.5
        p.rotation += p.rotSpeed
        if (p.y > canvas.height + 40) { p.y = -40; p.x = Math.random() * canvas.width }
        if (p.x < -40) p.x = canvas.width + 40
        if (p.x > canvas.width + 40) p.x = -40
        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity)
      })

      // ── 鼠标光晕 ──
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.04
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.04
      const mx = mouseRef.current.x * canvas.width
      const my = mouseRef.current.y * canvas.height
      const cursorGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 220)
      cursorGlow.addColorStop(0, 'rgba(100, 210, 255, 0.07)')
      cursorGlow.addColorStop(0.5, 'rgba(100, 180, 255, 0.025)')
      cursorGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = cursorGlow
      ctx.beginPath()
      ctx.arc(mx, my, 220, 0, Math.PI * 2)
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── 声音控制 ──
  const [isMuted, setIsMuted] = useState(true)
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  // ── 鼠标视差偏移 ──
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  useEffect(() => {
    let raf
    const update = () => {
      setOffset({
        x: (targetRef.current.x - 0.5) * 35,
        y: (targetRef.current.y - 0.5) * 22,
      })
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── 右上角 "無限進步" ── */}
      <div className="absolute top-8 right-10 z-20 pointer-events-none select-none">
        <span
          className="text-lg font-bold tracking-[0.15em]"
          style={{ fontFamily: "'Noto Serif SC', 'STSong', serif", fontStyle: 'italic', transform: 'skewX(-8deg)', color: '#f9a8d4' }}
        >
          無限進步
        </span>
      </div>

      {/* ── Layer 0: 视频背景 ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── Layer 1: Canvas 叠加效果层 (樱花 + 星光 + 光柱) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* ── Layer 2: 暗色渐变遮罩 (保证文字可读) ── */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#050505]/60 via-[#050505]/20 to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/20 pointer-events-none" />

      {/* ── 左侧动漫角色 (视差) ── */}
      <div
        className="absolute left-[6%] bottom-[18%] z-[6] pointer-events-none select-none"
        style={{ transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.3}px)` }}
      >
        <div className="relative w-32 h-40">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-36 h-32 rounded-[50%]"
            style={{ background: 'linear-gradient(180deg, #2a1a3e 0%, #1a2a4e 50%, #1a3a5e 100%)' }} />
          <div className="absolute top-6 right-3 w-6 h-6 rounded-full bg-pink-300/50 blur-[2px]" />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-22 h-24 rounded-[45%] bg-[#fef0d5]/16" />
          <div className="absolute top-13 left-[28%] w-2.5 h-3 rounded-full bg-[#06B6D4]/40" />
          <div className="absolute top-13 right-[28%] w-2.5 h-3 rounded-full bg-[#06B6D4]/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24"
            style={{ background: 'linear-gradient(180deg, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.15) 100%)', clipPath: 'polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)' }} />
          <div className="absolute inset-0 rounded-full blur-3xl bg-[#8B5CF6]/8" />
        </div>
      </div>


      {/* ── 悬浮光点装饰 ── */}
      <div className="absolute left-[18%] top-[22%] z-[4] pointer-events-none">
        <div className="w-4 h-4 rounded-full bg-pink-300/35 blur-[2px] animate-float" style={{ animationDelay: '0s' }} />
      </div>
      <div className="absolute right-[18%] top-[28%] z-[4] pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-[#06B6D4]/25 blur-[2px] animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute left-[45%] top-[12%] z-[4] pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]/25 blur-[1px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* ── 主内容 ── */}
      <div
        className="relative z-10 px-16 max-w-[1700px] mx-auto w-full"
        style={{ transform: `translate(${offset.x * 0.6}px, ${offset.y * 0.4}px)` }}
      >
        <div className="max-w-[750px]">
          {/* 名字大标题 */}
          <h1 className="text-[7.5rem] font-black tracking-tighter leading-[0.9] mb-8 select-none">
            <span className="text-gradient">ZHANG</span>
            <br />
            <span className="text-gradient">QINGHUI</span>
          </h1>

          {/* 身份信息 */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[2px] bg-[#06B6D4]/60" />
            <p className="text-lg text-white/50 font-light tracking-[0.2em]">
              数据分析师 · AI Agent 开发
            </p>
          </div>

          {/* 描述 */}
          <p className="text-base text-white/35 font-light leading-relaxed mb-10 max-w-lg">
            数据科学与大数据技术专业 · 22岁 · 现居杭州
            <br />
            从复杂数据中发现业务痛点，用自动化工具提升团队效能
          </p>

          {/* CTA */}
          <div className="flex items-center gap-5 mb-16">
            <a
              href="#internship"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-[#06B6D4] transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]"
            >
              查看我的经历
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full border border-white/[0.1] text-white/55 text-sm font-medium tracking-wide hover:border-white/30 hover:text-white transition-all duration-300"
            >
              联系我
            </a>
          </div>

          {/* 技能关键词 */}
          <div className="flex items-center gap-3 flex-wrap">
            {['Python', 'SQL', 'Spark', '数据校验', '流程自动化', 'AI Agent'].map(tag => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-white/30 hover:text-[#06B6D4] hover:border-[#06B6D4]/15 transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 声音开关 ── */}
      <button
        onClick={toggleSound}
        className="absolute bottom-8 right-8 z-20 w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
        title={isMuted ? '开启声音' : '静音'}
      >
        {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
      </button>

      {/* ── 鼠标跟随光点 (全局) ── */}
      <div
        className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none z-[100] blur-3xl opacity-25 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
          transform: `translate(${mouseRef.current.x * window.innerWidth - 160}px, ${mouseRef.current.y * window.innerHeight - 160}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      />
    </section>
  )
}
