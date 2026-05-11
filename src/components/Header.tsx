import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ cartCount, onCartOpen, onSearch }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogoClick = () => {
    navigate("/");
    setMobileMenuOpen(false);
    onSearch("");
    setSearchQuery("");
  };

  return (
    <>
      {/* 상단 마퀴 바 */}
      <div className="bg-[#ffffff] text-black text-[11px] md:text-[11.5px] h-[30px] md:h-[34px] flex items-center overflow-hidden font-bold">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex">
              <span className="px-6 md:px-14">무료배송 5만원 이상 구매 시</span>
              <span className="px-6 md:px-14">신규 회원 10,000원 쿠폰</span>
              <span className="px-6 md:px-14">FILA MEMBERS 전용 혜택</span>
              <span className="px-6 md:px-14">오늘 주문 내일 도착</span>
            </span>
          ))}
        </div>
      </div>

      {/* 헤더 */}
      <header
        className={`sticky top-0 z-50 bg-[#01224D] border-b border-[#01224D] transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between h-[56px] md:h-[68px]">
          {/* 모바일: 햄버거 */}
                    <button
            className="md:hidden w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <span className="text-white text-[22px]">✕</span>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span className="w-5 h-[2px] bg-white" />
                <span className="w-5 h-[2px] bg-white" />
                <span className="w-5 h-[2px] bg-white" />
              </div>
            )}
          </button>

          {/* 로고 */}
          <img
            src="/filashop/images/logo.png"
            alt="FILA"
            className="h-[22px] md:h-[24px] cursor-pointer"
            onClick={handleLogoClick}
          />

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex gap-7">
            {["NEW", "MEN", "WOMEN", "KIDS", "SPORTS", "SALE"].map((item) => (
              <span
                key={item}
                className={`text-[13.5px] font-semibold uppercase tracking-[1.5px] cursor-pointer relative pb-1
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300
                  ${item === "SALE"
                    ? "text-[#c8102e] hover:after:w-full after:bg-[#c8102e]"
                    : "text-white/85 hover:text-white hover:after:w-full after:bg-white"
                  }`}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* 아이콘들 */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* PC 검색바 */}
            <div className="hidden md:flex items-center bg-white px-3.5 py-2 w-[200px] focus-within:w-[260px] focus-within:border-[#01224D] border border-transparent transition-all duration-300">
              <span className="mr-2 text-[13px]">🔍</span>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border-none bg-transparent outline-none text-[13px] w-full text-black placeholder:text-gray-400"
              />
            </div>
            {/* 모바일 검색 아이콘 */}
<button
              className="md:hidden w-9 h-9 flex items-center justify-center text-[17px]"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              🔍
            </button>
            <button
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-[17px] md:text-[19px] cursor-pointer"
              onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
            >
              👤
            </button>
            <button
              className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-[17px] md:text-[19px] cursor-pointer"
              onClick={onCartOpen}
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#c8102e] text-white text-[9px] md:text-[10px] font-bold min-w-[16px] md:min-w-[18px] h-[16px] md:h-[18px] rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 모바일 검색바 */}
        {mobileSearchOpen && (
<div className="md:hidden px-4 pb-3 border-t border-white/10">
            <div className="flex items-center bg-white px-3 py-2.5 mt-2">
              <span className="mr-2 text-[13px]">🔍</span>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border-none bg-transparent outline-none text-[14px] w-full text-black placeholder:text-gray-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  className="text-gray-400 text-[14px] ml-2"
                  onClick={() => { setSearchQuery(""); onSearch(""); }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[86px] bg-white z-40 animate-[fadeIn_0.2s]">
          <nav className="flex flex-col">
            {["NEW", "MEN", "WOMEN", "KIDS", "SPORTS", "SALE"].map((item) => (
              <span
                key={item}
                className={`px-6 py-4 text-[15px] font-semibold uppercase tracking-[1.5px] border-b border-gray-100 cursor-pointer ${
                  item === "SALE" ? "text-[#c8102e]" : "text-gray-900"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </span>
            ))}
            <span
              className="px-6 py-4 text-[15px] font-semibold tracking-wide border-b border-gray-100 cursor-pointer text-gray-900"
              onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
            >
              로그인 / 회원가입
            </span>
          </nav>
        </div>
      )}
    </>
  );
}