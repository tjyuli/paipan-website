import React from 'react';
// 引入 Next.js 的魔法传送门组件
import Link from 'next/link';

export default function Home() {
  // 定义九宫格数据，给“八字排盘”加上了真实的跳转路径
  const tools = [
    { name: "八字排盘", desc: "八字排盘、大运流年", path: "/bazipaipan" },
    { name: "八字合盘", desc: "八字合婚、八字合伙", path: "#" },
    { name: "六爻起卦", desc: "六爻排盘、大爻起卦", path: "#" },
    { name: "紫微斗数", desc: "紫微排盘、紫微星象", path: "#" },
    { name: "大六壬", desc: "大六壬课、天地盘", path: "#" },
    { name: "梅花易数", desc: "梅花排盘、时间起卦", path: "#" },
    { name: "择日", desc: "黄历择吉、结婚开业", path: "#" },
    { name: "姓名学", desc: "姓名打分、起名测名", path: "#" },
    { name: "风水", desc: "玄空飞星、八宅风水", path: "#" }
  ];

  return (
    // 统一使用高雅的浅灰背景色 bg-gray-50
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4 font-sans">

      {/* 顶部标题区域：增加了新中式的对称线条装饰 */}
      <div className="text-center mb-20 mt-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#a68b60]"></div>
          <div className="w-2 h-2 rotate-45 bg-[#a68b60]"></div>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#a68b60]"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-[0.2em] mb-4">
          排盘网站
        </h1>
        <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
          Professional Metaphysics Platform
        </p>
      </div>

      {/* 核心九宫格区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {tools.map((tool, index) => {

          // 提取出一个公共的卡片样式设计
          const CardContent = (
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(166,139,96,0.15)] hover:border-[#a68b60]/40 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">

              {/* 卡片右上角的隐藏光效，鼠标悬停时显现 */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#a68b60]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-duration-500"></div>

              <div className="flex items-center gap-4 mb-3">
                {/* 标题前面的金棕色竖线指示器 */}
                <div className="w-1.5 h-6 bg-[#a68b60] rounded-full scale-y-75 group-hover:scale-y-100 transition-transform"></div>
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-[#a68b60] transition-colors tracking-widest">
                  {tool.name}
                </h2>
              </div>
              <p className="text-gray-400 text-sm ml-5.5 tracking-wider mt-2">
                {tool.desc}
              </p>
            </div>
          );

          // 判断：如果是八字排盘，就加上真实的链接；如果不是，就只是个展示卡片
          return tool.path !== "#" ? (
            <Link href={tool.path} key={index} className="block outline-none cursor-pointer">
              {CardContent}
            </Link>
          ) : (
            <div key={index} className="block outline-none opacity-60 hover:opacity-100 transition-opacity cursor-not-allowed">
              {CardContent}
            </div>
          );
        })}
      </div>

      {/* 底部版权信息 */}
      <footer className="mt-32 pb-8 flex flex-col items-center">
        <div className="w-12 h-[1px] bg-gray-300 mb-4"></div>
        <p className="text-xs text-gray-400 tracking-widest">
          © 2026 极简排盘系统
        </p>
      </footer>

    </main>
  );
}