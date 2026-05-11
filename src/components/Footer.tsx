export default function Footer() {
  return (
    <footer className="bg-[#0c1f3f] text-white/70 text-[13px]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        {/* 상단 */}
        <div className="flex flex-col md:flex-row justify-between py-10 md:py-12 border-b border-white/10 gap-8 md:gap-10">
          <div className="max-w-[300px]">
            <img
              src="/filashop/images/ft_logo.png"
              alt="FILA"
              className="h-[22px] md:h-[24px] mb-3"
            />
            <p className="text-[12.5px] leading-relaxed">
              1911년 이탈리아에서 시작된 글로벌 스포츠 브랜드
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-16">
            <div>
              <h4 className="text-white text-[12px] md:text-[13px] font-bold mb-3 tracking-wide">
                고객센터
              </h4>
              <p className="mb-2 text-[11.5px] md:text-[12.5px]">1588-0000</p>
              <p className="mb-2 text-[11.5px] md:text-[12.5px]">평일 09:00 - 18:00</p>
            </div>
            <div>
              <h4 className="text-white text-[12px] md:text-[13px] font-bold mb-3 tracking-wide">
                회사소개
              </h4>
              <p className="mb-2 text-[11.5px] md:text-[12.5px] cursor-pointer hover:text-white transition-colors">
                브랜드 스토리
              </p>
              <p className="mb-2 text-[11.5px] md:text-[12.5px] cursor-pointer hover:text-white transition-colors">
                매장안내
              </p>
              <p className="mb-2 text-[11.5px] md:text-[12.5px] cursor-pointer hover:text-white transition-colors">
                채용정보
              </p>
            </div>
            <div>
              <h4 className="text-white text-[12px] md:text-[13px] font-bold mb-3 tracking-wide">
                이용안내
              </h4>
              <p className="mb-2 text-[11.5px] md:text-[12.5px] cursor-pointer hover:text-white transition-colors">
                이용약관
              </p>
              <p className="mb-2 text-[11.5px] md:text-[12.5px] cursor-pointer hover:text-white transition-colors">
                개인정보처리방침
              </p>
              <p className="mb-2 text-[11.5px] md:text-[12.5px] cursor-pointer hover:text-white transition-colors">
                배송/교환/반품
              </p>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="py-5 text-center text-[10.5px] md:text-[11.5px] text-white/35">
          © FILA Clone – 학습/포트폴리오 목적으로 제작됨. 실제 FILA Korea와
          관련 없습니다.
        </div>
      </div>
    </footer>
  );
}