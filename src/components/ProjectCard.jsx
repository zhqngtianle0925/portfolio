import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiFolder, FiTrendingUp, FiTarget, FiUsers } from 'react-icons/fi'

const project = {
  name: '校园闲置物品交易平台',
  role: '执行人员',
  period: '2023.08 – 2024.04',
  description:
    '主导校园二手交易平台的需求调研与数据化运营，通过数据分析驱动产品策略优化，最终实现平台日均浏览量 1000+ 与交易量增长 10%。',
  details: [
    {
      icon: FiTarget,
      title: '需求调研',
      text: '主导市场调研，设计问卷收集有效样本，通过数据分析精准定位核心受众对 3C 电子产品及各类商品的交易需求。',
    },
    {
      icon: FiTrendingUp,
      title: '数据化运营',
      text: '建立日常运营数据追踪体系，监控用户行为路径。通过分析发现"商品图片质量"是转化率的核心痛点，制定图片优化规范并引导卖家执行。',
    },
    {
      icon: FiUsers,
      title: '策略优化',
      text: '对比不同推广渠道的引流效果，动态调整推广策略，有效提升平台日均浏览量 1000+，促成交易量上涨 10%，深刻理解数据驱动对项目成功的关键意义。',
    },
  ],
}

export default function ProjectCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="project" className="relative py-32 px-6 overflow-hidden">
      {/* 照片背景 */}
      <img src="/project-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/35 via-transparent to-[#050505]/70 pointer-events-none" />
      <div ref={ref} className="max-w-[1700px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold tracking-tight text-white drop-shadow-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            项目经历
          </h2>
        </motion.div>

        {/* Single Large Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-[20px] border border-white/[0.08] overflow-hidden"
          style={{ background: 'rgba(10,10,18,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <div className="p-12">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#06B6D4]/10 flex items-center justify-center">
                  <FiFolder className="text-2xl text-[#06B6D4]" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{project.name}</h3>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-white/35 uppercase tracking-wider">
                      {project.role}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm font-mono">{project.period}</p>
                </div>
              </div>

              {/* Stats highlight */}
              <div className="flex items-center gap-10">
                <div className="text-center">
                  <div className="text-3xl font-black text-gradient">1000+</div>
                  <div className="text-[11px] text-white/60 mt-1 tracking-wide">日均浏览量</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gradient">10%</div>
                  <div className="text-[11px] text-white/60 mt-1 tracking-wide">交易量增长</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-3xl" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {project.description}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-white/[0.12] mb-10" />

            {/* Detail Cards Row */}
            <div className="grid grid-cols-3 gap-6">
              {project.details.map((d, i) => {
                const Icon = d.icon
                return (
                  <div
                    key={i}
                    className="p-6 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:border-[#06B6D4]/20 hover:bg-white/[0.08] transition-all duration-400"
                  >
                    <Icon className="text-xl text-[#06B6D4] mb-4 opacity-90" />
                    <h4 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>{d.title}</h4>
                    <p className="text-sm text-white/75 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.95rem' }}>{d.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
