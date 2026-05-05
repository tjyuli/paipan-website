'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BaziPage() {
    // --- 表单状态 ---
    const [name, setName] = useState("测试");
    const [gender, setGender] = useState("男");
    const [calendarType, setCalendarType] = useState("公历");
    const [birthTime, setBirthTime] = useState("1990-01-01T00:00");
    const [location, setLocation] = useState("天津市 天津市 和平区");

    const [isDST, setIsDST] = useState(false);
    const [isTrueSolar, setIsTrueSolar] = useState(true);
    const [isSplitZi, setIsSplitZi] = useState(false);
    const [isSave, setIsSave] = useState(false);

    // --- 页面控制与数据状态 ---
    const [isCalculated, setIsCalculated] = useState(false);
    const [activeTab, setActiveTab] = useState("基本信息"); // 默认打开基本信息
    const [baziData, setBaziData] = useState<any>(null);

    // 五行颜色映射表
    const getWuxingColor = (char: string) => {
        const colors: { [key: string]: string } = {
            '甲': 'text-green-600', '乙': 'text-green-600', '寅': 'text-green-600', '卯': 'text-green-600',
            '丙': 'text-red-600', '丁': 'text-red-600', '巳': 'text-red-600', '午': 'text-red-600',
            '戊': 'text-amber-700', '己': 'text-amber-700', '辰': 'text-amber-700', '戌': 'text-amber-700', '丑': 'text-amber-700', '未': 'text-amber-700',
            '庚': 'text-gray-400', '辛': 'text-gray-400', '申': 'text-gray-400', '酉': 'text-gray-400',
            '壬': 'text-blue-600', '癸': 'text-blue-600', '亥': 'text-blue-600', '子': 'text-blue-600',
        };
        return colors[char] || 'text-gray-900';
    };

    const handleCalculate = async () => {
        if (!birthTime) {
            alert("请先选择出生时间！");
            return;
        }

        try {
            const response = await fetch('/api/bazi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, gender, birthTime, location }),
            });
            const data = await response.json();
            if (response.ok) {
                setBaziData({
                    year: { ...data.year, cangGan: ['戊', '乙', '癸'], fuXing: ['偏财', '正官', '正印'], xingYun: "冠带", xunKong: "戌亥", naYin: "大林木", shenSha: ["文昌", "华盖"] },
                    month: { ...data.month, cangGan: ['癸'], fuXing: ['正印'], xingYun: "临官", xunKong: "戌亥", naYin: "炉中火", shenSha: ["月德"] },
                    day: { ...data.day, cangGan: ['戊', '庚', '壬'], fuXing: ['偏财', '食神', '七杀'], xingYun: "病", xunKong: "辰巳", naYin: "大驿土", shenSha: ["将星"] },
                    time: { ...data.time, cangGan: ['癸'], fuXing: ['正印'], xingYun: "帝旺", xunKong: "戌亥", naYin: "大海水", shenSha: ["桃花"] },
                    basicInfo: {
                        name: name || "测试",
                        gender: gender,
                        lunar: "1989年腊月初五 子时",
                        solar: birthTime.replace("T", " ") || "1990年01月01日 00:00",
                        zodiac: "蛇",
                        trueSolar: "1989-12-31 23:45",
                        location: location || "天津市 天津市 和平区",
                        solarTermInfo: "出生于大雪后24天12小时，小寒前4天22小时",
                        prevTerm: "1989-12-07 11:20:57",
                        nextTerm: "1990-01-05 22:33:14",
                        xingSu: "房宿东方苍龙",
                        constellation: "摩羯座(Capricorn)",
                        taiXi: "辛亥 (钗钏金)",
                        taiYuan: "丁卯 (炉中火)",
                        siLing: "癸水用事",
                        kongWang: "戌亥",
                        shenGong: "丁丑 (涧下水)",
                        mingGong: "己巳 (大林木)",
                        mingGua: "坤卦 (西四命)"
                    }
                });
                setIsCalculated(true);
            } else {
                alert("后端报错：" + data.error);
            }
        } catch (e) { alert("网络请求失败，请检查后端是否运行"); }
    };

    // 辅助组件：信息展示小卡片 (用于基本信息页面)
    const InfoCard = ({ label, value, className = "" }: { label: string, value: string, className?: string }) => (
        <div className={`bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center ${className}`}>
            <span className="text-gray-400 text-xs tracking-widest mb-1">{label}</span>
            <span className="text-gray-800 font-medium text-sm">{value}</span>
        </div>
    );

    // 提取为数组，方便表格行遍历对齐
    const columns = baziData ? [baziData.year, baziData.month, baziData.day, baziData.time] : [];

    // ================= 视图 1：输入表单 =================
    if (!isCalculated) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 font-sans text-sm">
                <div className="absolute top-12 left-12">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#a68b60] transition-colors tracking-widest cursor-pointer group">
                        <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        返回大堂
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 w-full max-w-xl h-fit mt-10">
                    <div className="flex items-center mb-6">
                        <label className="w-20 text-gray-700 font-medium shrink-0">命主姓名</label>
                        <input type="text" placeholder="请输入姓名" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#a68b60] transition-colors placeholder:text-gray-300" />
                    </div>

                    <div className="flex items-center mb-6">
                        <div className="w-20 shrink-0"></div>
                        <div className="flex items-center gap-4 mr-8">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                <input type="radio" checked={gender === "男"} onChange={() => setGender("男")} className="w-4 h-4 accent-[#a68b60]" /> 男
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                <input type="radio" checked={gender === "女"} onChange={() => setGender("女")} className="w-4 h-4 accent-[#a68b60]" /> 女
                            </label>
                        </div>

                        <div className="flex bg-gray-50 rounded-full border border-gray-100 overflow-hidden">
                            {["公历", "农历", "四柱"].map((type) => (
                                <button
                                    key={type} onClick={() => setCalendarType(type)}
                                    className={`px-5 py-1.5 text-sm transition-colors ${calendarType === type ? "bg-[#a68b60] text-white" : "text-gray-500 hover:text-gray-800"}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center mb-6">
                        <label className="w-20 text-gray-700 font-medium shrink-0">出生时间</label>
                        <input type="datetime-local" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="flex-1 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#a68b60] transition-colors text-gray-700" />
                    </div>

                    <div className="flex items-center mb-6">
                        <label className="w-20 text-gray-700 font-medium shrink-0">出生地址</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="flex-1 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#a68b60] transition-colors text-gray-700" />
                    </div>

                    <div className="flex items-center justify-between mb-6 pl-20">
                        <div className="flex gap-4 sm:gap-6">
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

                    <div className="pl-20 text-gray-500 mb-2 text-xs sm:text-sm">
                        <span>真太阳时：1990-01-01 00:00</span>
                        <span className="ml-6">地址经纬：北纬39.00 东经120.00</span>
                    </div>
                    <div className="pl-20 flex items-center gap-2 text-gray-500 mb-8 text-sm">
                        <span>案例分类</span>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full border-[3px] border-[#a68b60] bg-white"></div>
                            <span>全部</span>
                        </div>
                    </div>

                    <button onClick={handleCalculate} className="w-full bg-black text-[#f3d9a4] text-lg rounded-full py-4 font-bold tracking-[0.2em] hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200">
                        开始排盘
                    </button>
                </div>
            </div>
        );
    }

    // ================= 视图 2：排盘结果展示面板 =================
    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <div className="max-w-[1400px] mx-auto flex gap-6">

                {/* 左侧菜单 */}
                <div className="w-40 shrink-0 flex flex-col gap-2">
                    {["基本信息", "基本排盘", "专业细盘"].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-4 text-left rounded-xl font-bold tracking-widest ${activeTab === tab ? "bg-white text-[#a68b60] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>{tab}</button>
                    ))}
                    <button onClick={() => setIsCalculated(false)} className="mt-4 py-3 px-4 text-left text-gray-400 hover:text-[#a68b60] transition-colors flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        重新输入
                    </button>
                </div>

                {/* 内容容器 */}
                <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[700px]">

                    {/* ---- 基本信息 (完整恢复) ---- */}
                    {activeTab === "基本信息" && (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <div className="w-1.5 h-4 bg-[#a68b60] rounded-full mr-2"></div>时空信息
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <InfoCard label="姓名" value={baziData.basicInfo.name} />
                                    <InfoCard label="性别" value={baziData.basicInfo.gender} />
                                    <InfoCard label="生肖" value={baziData.basicInfo.zodiac} />
                                    <InfoCard label="星座" value={baziData.basicInfo.constellation} />
                                    <InfoCard label="阳历" value={baziData.basicInfo.solar} className="col-span-2" />
                                    <InfoCard label="农历" value={baziData.basicInfo.lunar} className="col-span-2" />
                                    <InfoCard label="真太阳时" value={baziData.basicInfo.trueSolar} className="col-span-2" />
                                    <InfoCard label="出生地区" value={baziData.basicInfo.location} className="col-span-2" />
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <div className="w-1.5 h-4 bg-[#a68b60] rounded-full mr-2"></div>节气交接
                                </h3>
                                <div className="bg-[#fcfaf7] border border-[#a68b60]/20 rounded-xl p-5">
                                    <div className="text-gray-800 font-medium mb-4 text-center tracking-wide">{baziData.basicInfo.solarTermInfo}</div>
                                    <div className="flex justify-around items-center border-t border-[#a68b60]/10 pt-4">
                                        <div className="text-center">
                                            <span className="text-gray-400 text-xs block mb-1">大雪</span>
                                            <span className="text-gray-700 font-medium">{baziData.basicInfo.prevTerm}</span>
                                        </div>
                                        <div className="w-px h-8 bg-gray-200"></div>
                                        <div className="text-center">
                                            <span className="text-gray-400 text-xs block mb-1">小寒</span>
                                            <span className="text-gray-700 font-medium">{baziData.basicInfo.nextTerm}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <div className="w-1.5 h-4 bg-[#a68b60] rounded-full mr-2"></div>命理核心参数
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <InfoCard label="胎元" value={baziData.basicInfo.taiYuan} />
                                    <InfoCard label="胎息" value={baziData.basicInfo.taiXi} />
                                    <InfoCard label="命宫" value={baziData.basicInfo.mingGong} />
                                    <InfoCard label="身宫" value={baziData.basicInfo.shenGong} />
                                    <InfoCard label="命卦" value={baziData.basicInfo.mingGua} />
                                    <InfoCard label="空亡" value={baziData.basicInfo.kongWang} />
                                    <InfoCard label="星宿" value={baziData.basicInfo.xingSu} />
                                    <InfoCard label="人元司令" value={baziData.basicInfo.siLing} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ---- 基本排盘 ---- */}
                    {activeTab === "基本排盘" && (
                        <div className="flex gap-8 h-full animate-fade-in">
                            <div className="w-[58%] border-r border-gray-100 pr-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 tracking-widest">专业四柱命盘</h2>
                                    <div className="text-[10px] text-gray-400">真太阳时: {baziData.basicInfo.trueSolar}</div>
                                </div>

                                <table className="w-full text-center border border-gray-100 rounded-xl overflow-hidden table-fixed">
                                    <thead className="bg-gray-50 text-gray-400 text-[10px]">
                                        <tr>
                                            <th className="py-3 w-16 font-normal border-r border-gray-100">项目</th>
                                            <th className="py-3 font-normal text-gray-700">年柱</th>
                                            <th className="py-3 font-normal text-gray-700">月柱</th>
                                            <th className="py-3 font-normal bg-amber-50/50 text-[#a68b60]">日柱</th>
                                            <th className="py-3 font-normal text-gray-700">时柱</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        <tr>
                                            <td className="py-3 text-gray-400 border-r border-gray-100 text-xs">主星</td>
                                            {columns.map((col, i) => <td key={i} className={`py-3 text-gray-500 ${i === 2 ? 'bg-amber-50/20' : ''}`}>{col.shiShen}</td>)}
                                        </tr>
                                        <tr>
                                            <td className="py-4 text-gray-400 border-r border-gray-100 text-xs">天干</td>
                                            {columns.map((col, i) => <td key={i} className={`py-4 text-3xl font-bold ${getWuxingColor(col.gan)} ${i === 2 ? 'bg-amber-50/20' : ''}`}>{col.gan}</td>)}
                                        </tr>
                                        <tr>
                                            <td className="py-4 text-gray-400 border-r border-gray-100 text-xs">地支</td>
                                            {columns.map((col, i) => <td key={i} className={`py-4 text-3xl font-bold ${getWuxingColor(col.zhi)} ${i === 2 ? 'bg-amber-50/20' : ''}`}>{col.zhi}</td>)}
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-400 border-r border-gray-100 text-xs align-top pt-4">
                                                <div className="flex flex-col gap-[18px]">
                                                    <span>藏干</span>
                                                    <span>副星</span>
                                                </div>
                                            </td>
                                            {columns.map((col, i) => (
                                                <td key={i} className={`py-3 align-top pt-4 ${i === 2 ? 'bg-amber-50/20' : ''}`}>
                                                    <div className="flex flex-col text-xs text-gray-600 gap-1.5">
                                                        {col.cangGan.map((cg: string, idx: number) => (
                                                            <div key={idx} className="flex justify-center gap-2">
                                                                <span className={getWuxingColor(cg)}>{cg}</span>
                                                                <span className="text-gray-400">{col.fuXing[idx]}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-400 border-r border-gray-100 text-xs">星运</td>
                                            {columns.map((col, i) => <td key={i} className={`py-3 text-red-600 font-bold ${i === 2 ? 'bg-amber-50/20' : ''}`}>{col.xingYun}</td>)}
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-400 border-r border-gray-100 text-xs">空亡</td>
                                            {columns.map((col, i) => <td key={i} className={`py-3 text-gray-400 text-xs ${i === 2 ? 'bg-amber-50/20' : ''}`}>{col.xunKong}</td>)}
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-400 border-r border-gray-100 text-xs">纳音</td>
                                            {columns.map((col, i) => <td key={i} className={`py-3 text-gray-400 text-[11px] ${i === 2 ? 'bg-amber-50/20' : ''}`}>{col.naYin}</td>)}
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-400 border-r border-gray-100 text-xs align-top pt-4">神煞</td>
                                            {columns.map((col, i) => (
                                                <td key={i} className={`py-3 align-top pt-3 ${i === 2 ? 'bg-amber-50/20' : ''}`}>
                                                    <div className="flex flex-col gap-1.5 items-center">
                                                        {col.shenSha.map((s: string, idx: number) => (
                                                            <span key={idx} className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-[3px] text-[10px] w-fit">{s}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                    <div className="text-xs font-bold text-gray-500 mb-2">干支合化关系</div>
                                    <div className="flex gap-4 flex-wrap">
                                        <span className="text-[11px] text-gray-600"><b className="text-red-500">冲</b> 子午相冲 (年时)</span>
                                        <span className="text-[11px] text-gray-600"><b className="text-green-500">合</b> 寅亥六合 (月日)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-800 tracking-widest">古籍批注参考</h2>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-0.5 bg-amber-100 text-[#a68b60] text-[10px] rounded cursor-pointer">三命通会</span>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] rounded cursor-pointer hover:bg-gray-200">渊海子平</span>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="bg-[#fcfaf7] p-6 rounded-2xl border border-amber-100/50">
                                        <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                                            <p className="font-bold text-[#a68b60] border-b border-amber-100 pb-2">日干论命：{baziData.day.gan}金坐{baziData.day.zhi}</p>
                                            <p>庚申日柱，木火岁运为宜。金水过旺则为人清孤。申中藏庚壬戊，食神生财，主人聪明有福，但性格刚毅，过犹不及。</p>
                                            <p className="font-bold text-[#a68b60] border-b border-amber-100 pb-2">月令解析：{baziData.month.zhi}月</p>
                                            <p>子月庚金，水冷金寒，非丁火锻炼不可。若无火，则为寒蝉，虽有才华亦难显达。此时最喜丙丁透出，辅以戊土护身。</p>
                                            <p className="font-bold text-[#a68b60] border-b border-amber-100 pb-2">综合评述</p>
                                            <p>此造四柱配合尚可，唯水势稍旺。早年行运平平，中年后火土齐来，方能显发。需注意性格中固执的一面，待人接物宜圆融。</p>
                                            <p>《三命通会》云：庚子日，日德格。主人心地善良，晚年大发。若见午冲，则福气减半。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ---- 专业细盘 ---- */}
                    {activeTab === "专业细盘" && (
                        <div className="animate-fade-in flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                            <p className="text-lg tracking-widest mb-2">十年大运时间轴即将载入</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}