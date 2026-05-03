import { useState, useEffect, useRef } from "react";

const BANNERS = [
  {
    title: "2026 S/S\nNEW COLLECTION",
    sub: "새 시즌의 시작, FILA와 함께",
    cta: "컬렉션 보기",
    bg: "linear-gradient(135deg, #0c1f3f 0%, #162d5a 50%, #0c1f3f 100%)",
  },
  {
    title: "DISRUPTOR\nSERIES",
    sub: "전 세계 1,000만 족 판매 돌파",
    cta: "자세히 보기",
    bg: "linear-gradient(135deg, #1a0005 0%, #5c0a1e 50%, #1a0005 100%)",
  },
  {
    title: "MEMBERS\nEXCLUSIVE",
    sub: "신규 가입 시 10,000원 쿠폰 즉시 발급",
    cta: "회원가입",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 50%, #0a0a0a 100%)",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goSlide = (direction: number) => {
    setCurrent((prev) => (prev + direction + BANNERS.length) % BANNERS.length);
    startTimer();
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    startTimer();
  };

  return (
    <section className="relative h-[280px] sm:h-[380px] md:h-[480px] overflow-hidden">
      {BANNERS.map((banner, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{ background: banner.bg }}
        >
          {/* <div className="absolute top-0 left-1/2 w-px h-full bg-white/5 hidden md:block" /> */}
          <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-white/10 hidden md:none" />

          <div className="text-center z-10 px-6">
            <h2
              className="text-[32px] sm:text-[48px] md:text-[64px] font-bold text-white leading-[1.08] tracking-[2px] md:tracking-[5px] uppercase whitespace-pre-line"
              style={{ fontFamily: "'Oswald', sans-serif", textShadow: "0 2px 40px rgba(0,0,0,0.3)" }}
            >
              {banner.title}
            </h2>
            <p className="text-[12px] sm:text-[14px] md:text-[15px] text-white/65 mt-3 md:mt-4 tracking-[2px] md:tracking-[3px] font-light">
              {banner.sub}
            </p>
            <button className="mt-5 md:mt-7 px-8 md:px-11 py-2.5 md:py-3.5 bg-transparent text-white border-2 border-white text-[12px] md:text-[13px] font-bold tracking-[2px] uppercase cursor-pointer hover:bg-white hover:text-[#0c1f3f] transition-all duration-300">
              {banner.cta}
            </button>
          </div>
        </div>
      ))}

      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-3 md:px-5 z-10 pointer-events-none">
        <button
          className="pointer-events-auto w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[18px] md:text-[22px] cursor-pointer hover:bg-white/20 transition-all"
          onClick={() => goSlide(-1)}
        >
          ‹
        </button>
        <button
          className="pointer-events-auto w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[18px] md:text-[22px] cursor-pointer hover:bg-white/20 transition-all"
          onClick={() => goSlide(1)}
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex gap-2 md:gap-2.5 z-10">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            className={`h-[3px] border-none cursor-pointer transition-all duration-300 ${
              i === current ? "w-9 md:w-11 bg-white" : "w-5 md:w-7 bg-white/25"
            }`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </section>
  );
}