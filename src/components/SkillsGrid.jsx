import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FiBarChart2,
  FiCpu,
  FiMessageSquare,
  FiShield,
  FiTarget,
  FiZap,
} from 'react-icons/fi'

const strengths = [
  {
    icon: FiBarChart2,
    title: '数据敏感度',
    desc: '能够从海量、杂乱的数据中迅速识别异常模式与业务痛点，精准定位核心问题。',
  },
  {
    icon: FiCpu,
    title: '逻辑分析能力',
    desc: '具备结构化思维，善于建立分析框架，将复杂问题拆解为可执行的步骤。',
  },
  {
    icon: FiMessageSquare,
    title: '跨部门沟通',
    desc: '能够高效对齐业务方与技术团队，将一线需求准确转化为技术实现方案。',
  },
  {
    icon: FiShield,
    title: '责任心强',
    desc: '对数据质量与交付结果有极高要求，做事有计划性，确保每一步都准确可靠。',
  },
]

const capabilities = [
  {
    icon: FiZap,
    title: '流程自动化',
    desc: '独立用 Python 编写自动化脚本，替代重复人工操作，降低人力成本与错误率。',
  },
  {
    icon: FiTarget,
    title: '项目推进',
    desc: '通过需求精准把控与自动化工具赋能，有效缩短流转周期，提升整体效能 30%。',
  },
]

export default function SkillsGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* 照片背景 */}
      <img src="./skills-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/55 via-transparent to-[#050505]/80 pointer-events-none" />
      <div ref={ref} className="max-w-[1700px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold tracking-tight">
            个人优势<span className="text-gradient"> & 能力</span>
          </h2>
        </motion.div>

        {/* Strengths Grid */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          {strengths.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="group cursor-default relative rounded-[20px] border border-white/[0.08] p-8"
                style={{ background: 'rgba(10,10,18,0.55)', backdropFilter: 'blur(4px)' }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center mb-5 group-hover:bg-[#06B6D4]/15 transition-colors duration-300">
                  <Icon className="text-lg text-[#06B6D4]" />
                </div>
                <h3 className="font-semibold text-white mb-2.5 text-base">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Capabilities Row */}
        <div className="grid grid-cols-2 gap-5">
          {capabilities.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + 0.15 * idx }}
                className="group cursor-default relative rounded-[20px] border border-white/[0.08] p-8"
                style={{ background: 'rgba(10,10,18,0.55)', backdropFilter: 'blur(4px)' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-colors duration-300">
                    <Icon className="text-lg text-[#8B5CF6]" />
                  </div>
                  <h3 className="font-semibold text-white text-base">{item.title}</h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
