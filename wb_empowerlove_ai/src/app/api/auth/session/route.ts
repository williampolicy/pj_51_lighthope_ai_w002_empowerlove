import { NextResponse } from "next/server"

export async function GET() {
  // 暂时返回未认证状态
  return NextResponse.json(null)
}
