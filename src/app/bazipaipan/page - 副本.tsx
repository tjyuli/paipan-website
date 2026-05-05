'use client';

import React, { useState } from 'react';
// 🚨 第一步：引入 Next.js 的传送门组件
import Link from 'next/link';

export default function BaziPage() {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("男");
    const [calendarType, setCalendarType] = useState("公历");
    const [birthTime, setBirthTime] = useState("1990-01-01T00:00");
    const [location, setLocation] = useState("未知地 北京时间 --");

    const [isDST, setIsDST] = useState(false);
    const [isTrueSolar, setIsTrueSolar] = useState(true);
    const [isSplitZi, setIsSplitZi] = useState(false);
    const [isSave, setIsSave] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans text-sm">

            {/* 🚨 第二步：新增的“返回首页”按钮区域 */}
            <div className="w-full max-w-xl mb-4">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#a68b60] transition-colors tracking-widest cursor-pointer group">
                    {/* 这是一个用代码画出来的优雅左箭头 SVG 图标 */}
                    <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    返回
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 w-full max-w-xl">

                <div className="flex items-center mb-6">
                    <label className="w-20 text-gray-700 font-medium shrink-0">命主姓名</label>
                    <input type="text" placeholder="请输入姓名" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-amber-600 transition-colors placeholder:text-gray-300" />
                </div>

                <div className="flex items-center mb-6">
                    <div className="w-20 shrink-0"></div>
                    <div className="flex items-center gap-4 mr-8">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <input type="radio" name="gender" checked={gender === "男"} onChange={() => setGender("男")} className="w-4 h-4 accent-[#a68b60]" /> 男
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <input type="radio" name="gender" checked={gender === "女"} onChange={() => setGender("女")} className="w-4 h-4 accent-[#a68b60]" /> 女
                        </label>
                    </div>
                    <div className="flex bg-gray-50 rounded-full border border-gray-100 overflow-hidden">
                        {["公历", "农历", "四柱"].map((type) => (
                            <button key={type} onClick={() => setCalendarType(type)} className={`px-5 py-1.5 text-sm transition-colors ${calendarType === type ? "bg-[#a68b60] text-white" : "text-gray-500 hover:text-gray-800"}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center mb-6">
                    <label className="w-20 text-gray-700 font-medium shrink-0">出生时间</label>
                    <input type="datetime-local" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="flex-1 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-amber-600 transition-colors text-gray-700" />
                </div>

                <div className="flex items-center mb-6">
                    <label className="w-20 text-gray-700 font-medium shrink-0">出生地址</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="flex-1 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-amber-600 transition-colors text-gray-700" />
                </div>

                <div className="flex items-center justify-between mb-6 pl-20">
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <input type="checkbox" checked={isDST} onChange={(e) => setIsDST(e.target.checked)} className="w-4 h-4 accent-[#a68b60]" /> 夏令时
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <input type="checkbox" checked={isTrueSolar} onChange={(e) => setIsTrueSolar(e.target.checked)} className="w-4 h-4 accent-[#a68b60]" /> 真太阳时
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <input type="checkbox" checked={isSplitZi} onChange={(e) => setIsSplitZi(e.target.checked)} className="w-4 h-4 accent-[#a68b60]" /> 早晚子时
                        </label>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${isSave ? 'bg-[#a68b60]' : 'bg-gray-200'}`} onClick={() => setIsSave(!isSave)}>
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${isSave ? 'left-5' : 'left-1'}`}></div>
                        </div>
                        保存
                    </label>
                </div>

                <div className="pl-20 text-gray-500 mb-2">
                    <span>真太阳时：1990-01-01 00:00</span>
                    <span className="ml-6">地址经纬：北纬39.00 东经120.00</span>
                </div>
                <div className="pl-20 flex items-center gap-2 text-gray-500 mb-8">
                    <span>案例分类</span>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full border-[3px] border-[#a68b60] bg-white"></div>
                        <span>全部</span>
                    </div>
                </div>

                <button className="w-full bg-black text-[#f3d9a4] text-lg rounded-full py-4 font-bold tracking-[0.2em] hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200">
                    开始排盘
                </button>

            </div>
        </div>
    );
}