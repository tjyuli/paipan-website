// 这是您的 Node.js 后端代码，运行在服务器上，浏览器里是绝对看不到的！
import { NextResponse } from 'next/server';

// 假设我们暂时先用简单的逻辑模拟一下后端处理的过程
// （未来您可以把天文学算法、算命核心逻辑全部塞进这里）
export async function POST(request: Request) {
    try {
        // 1. 接收前端网页（大堂）传过来的客人资料
        const body = await request.json();
        const { name, gender, birthTime, location } = body;

        // 打印在服务器后台看看（前端浏览器的控制台是看不到这句话的）
        console.log("🔥 独立后端收到排盘请求:", { name, gender, birthTime });

        // 2. 这里是后厨处理核心逻辑的地方...
        // 【架构解耦：我们可以在这里安全地调用任何算法，哪怕是引入别人的库，别人也偷不走您的 API 结构】

        // 3. 为了演示后端成功跑通，我们先手动捏造一个极其简单的假数据返回给前端
        // 证明您的前端和后端已经成功牵手了！
        const baziResult = {
            message: "独立后端计算成功",
            year: { gan: "甲", zhi: "辰", shiShen: "正官" },
            month: { gan: "丙", zhi: "寅", shiShen: "偏印" },
            day: { gan: "戊", zhi: "申", shiShen: "日主" },
            time: { gan: "壬", zhi: "戌", shiShen: "偏财" },
        };

        // 4. 把算好的结果打包，安全地发回给前端
        return NextResponse.json(baziResult, { status: 200 });

    } catch (error) {
        // 抓取并处理服务器可能出现的错误
        return NextResponse.json({ error: "后端处理发生异常" }, { status: 500 });
    }
}