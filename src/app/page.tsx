import React from 'react';

export default function Home() {
  // 这里是我们九宫格的数据，以后想加新的术数，直接在这里加一行就行
  const tools = [
    { name: "八字排盘", desc: "八字排盘、大运流年" },
    { name: "八字合盘", desc: "八字合婚、八字合伙" },
    { name: "六爻起卦", desc: "六爻排盘、大爻起卦" },
    { name: "紫微斗数", desc: "紫微排盘、紫微星象" },
    { name: "大六壬", desc: "大六壬课、天地盘" },
    { name: "梅花易数", desc: "梅花排盘、时间起卦" },
    { name: "择日", desc: "黄历择吉、结婚开业" },
    { name: "姓名学", desc: "姓名打分、起名测名" },
    { name: "风水", desc: "玄空飞星、八宅风水" }
  ];

  return (
    // 整个网页的背景设为极其干净的浅灰白色 (bg-slate-50)
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-20 px-4 font-sans">

      {/* 网站标题区域 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-wider mb-4">
          排盘网站
        </h1>
        <p className="text-slate-500 text-sm md:text-base tracking-widest">
          你的专业术数排盘与命理分析平台
        </p>
      </div>

      {/* 核心九宫格区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {tools.map((tool, index) => (
          // 每一个白色小卡片的设计
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center h-32"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {tool.name}
            </h2>
            <p className="text-xs text-slate-400">
              {tool.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 底部版权信息 */}
      <footer className="mt-24 text-xs text-slate-400">
        © 2026 极简排盘系统
      </footer>

    </main>
  );
}