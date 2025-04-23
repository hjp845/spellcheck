import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const response = await fetch(
    `https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?where=nexearch&color_blindness=0&callback=&q=${encodeURIComponent(text)}`
  );

  const data = await response.json();
  console.log('API 응답:', data);
  const html = data.message.result.html;

  // 태그 제거
  const clean = html.replace(/<[^>]*>/g, '').replace(/\n+/g, '\n').trim();

  return NextResponse.json({ result: clean });
}
