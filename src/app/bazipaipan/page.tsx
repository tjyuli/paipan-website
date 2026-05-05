'use client';

import React, { useState } from 'react';
// 召唤我们刚刚安装的排盘神器
import { Solar } from 'lunar-javascript';

export default function BaziPage() {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("male");
    const [birthTime, setBirthTime] = useState("");

    // 新增一个“小本子”，用来专门存算好的八字结果
    const [baziResult, setBaziResult] = useState<string[]>([]);

    const handleCalculate = () => {
        if (!birthTime) {
            alert("老板，您还没填出生时间呢！");
            return;
        }

        // 1. 把前端的 HTML 时间字符串（比如 1988-04-21T00:00）拆解开
        const dateObj = new Date(birthTime);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes();

        // 2. 将时间丢给排盘神器，让它精确处理历法和节气交接（立春）
        const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
        const lunar = solar.getLunar();
        const baZi = lunar.getEightChar();

        // 3. 拿到算好的四柱干支
        const yearGanZhi = baZi.getYear();
        const monthGanZhi = baZi.getMonth();
        const dayGanZhi = baZi.getDay();
        const hourGanZhi = baZi.getTime();

        // 4. 把算出来的四个柱存进结果小本子里
        setBaziResult([yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi]);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-20 px-4 font-sans">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">八字排盘</h1>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 w-full max-w-md">
                <div className="mb-5">
                    <label className="block text-sm text-slate-600 mb-2">姓名 (选填)</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-slate-500" placeholder="请输入姓名" />
                </div>

                <div className="mb-5">
                    <label className="block text-sm text-slate-600 mb-2">性别</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border border-slate-300 rounded p-2 bg-white focus:outline-none focus:border-slate-500">
                        <option value="male">男 (乾造)</option>
                        <option value="female">女 (坤造)</option>
                    </select>
                </div>

                <div className="mb-8">
                    <label className="block text-sm text-slate-600 mb-2">出生时间 (公历)</label>
                    <input type="datetime-local" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-slate-500" />
                </div>

                <button onClick={handleCalculate} className="w-full bg-slate-800 text-white rounded p-3 font-bold tracking-widest hover:bg-slate-700 transition-colors">
                    开始排盘
                </button>

                {/* --- 这里是全新的魔法区域：展示计算结果 --- */}
                {baziResult.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                        <h3 className="text-center text-slate-500 mb-4 tracking-widest">排盘结果</h3>
                        <div className="flex justify-between items-center bg-slate-50 p-4 rounded border border-slate-100">
                            {baziResult.map((ganzhi, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <span className="text-xs text-slate-400 mb-1">
                                        {["年柱", "月柱", "日柱", "时柱"][index]}
                                    </span>
                                    {/* 把干支切开，天干在上面，地支在下面 */}
                                    <span className="text-lg font-bold text-slate-800 leading-tight">{ganzhi.charAt(0)}</span>
                                    <span className="text-lg font-bold text-slate-800 leading-tight">{ganzhi.charAt(1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}