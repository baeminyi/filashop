import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (isLogin) {
      if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
      }
      alert("로그인 되었습니다! (데모)");
      navigate("/");
    } else {
      if (!name || !email || !password || !phone) {
        alert("모든 항목을 입력해주세요.");
        return;
      }
      alert("회원가입이 완료되었습니다! (데모)");
      setIsLogin(true);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 md:py-20 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-[440px]">
        {/* 탭 */}
        <div className="flex border-b-2 border-gray-200 mb-6 md:mb-12">
          <button
            className={`flex-1 pb-4 text-[15px] md:text-[16px] font-bold tracking-wide transition-all border-b-2 -mb-[2px] cursor-pointer ${
              isLogin
                ? "text-[#0c1f3f] border-[#0c1f3f]"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            로그인
          </button>
          <button
            className={`flex-1 pb-4 text-[15px] md:text-[16px] font-bold tracking-wide transition-all border-b-2 -mb-[2px] cursor-pointer ${
              !isLogin
                ? "text-[#0c1f3f] border-[#0c1f3f]"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            회원가입
          </button>
        </div>

        {/* 로그인 폼 */}
        {isLogin ? (
          <div>
            <div className="mb-4 md:mb-7">
              <label className="block text-[13px] font-semibold mb-2">
                이메일
              </label>
              <input
                type="email"
                placeholder="example@fila.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 text-[14px] outline-none focus:border-[#0c1f3f] transition-colors"
              />
            </div>
            <div className="mb-6 md:mb-12">
              <label className="block text-[13px] font-semibold mb-2">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 text-[14px] outline-none focus:border-[#0c1f3f] transition-colors"
              />
            </div>

            <button
              className="w-full py-3.5 md:py-5 bg-[#0c1f3f] text-white text-[15px] font-bold tracking-wide border-none cursor-pointer hover:bg-[#c8102e] transition-colors mb-4"
              onClick={handleSubmit}
            >
              로그인
            </button>

            {/* 간편 로그인 */}
            <div className="relative my-5 md:my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-[12px] text-gray-400">
                  간편 로그인
                </span>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <button className="flex-1 py-3 md:py-4 bg-[#fee500] text-[#3c1e1e] text-[12px] md:text-[13px] font-bold border-none cursor-pointer hover:opacity-90 transition-opacity">
                카카오
              </button>
              <button className="flex-1 py-3 md:py-4 bg-[#03c75a] text-white text-[12px] md:text-[13px] font-bold border-none cursor-pointer hover:opacity-90 transition-opacity">
                네이버
              </button>
              <button className="flex-1 py-3 md:py-4 bg-white text-gray-700 text-[12px] md:text-[13px] font-bold border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                Google
              </button>
            </div>

            <div className="flex justify-center gap-6 mt-5 md:mt-10 text-[12px] md:text-[12.5px] text-black">
              <span className="cursor-pointer transition-colors">
                아이디 찾기
              </span>
              <span>|</span>
              <span className="cursor-pointer transition-colors">
                비밀번호 찾기
              </span>
            </div>
          </div>
        ) : (
          /* 회원가입 폼 */
          <div>
            <div className="mb-6 md:mb-7">
              <label className="block text-[13px] font-semibold mb-3">
                이름 <span className="text-[#c8102e]">*</span>
              </label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 text-[14px] outline-none focus:border-[#0c1f3f] transition-colors"
              />
            </div>
            <div className="mb-6 md:mb-7">
              <label className="block text-[13px] font-semibold mb-3">
                이메일 <span className="text-[#c8102e]">*</span>
              </label>
              <input
                type="email"
                placeholder="example@fila.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 text-[14px] outline-none focus:border-[#0c1f3f] transition-colors"
              />
            </div>
            <div className="mb-6 md:mb-7">
              <label className="block text-[13px] font-semibold mb-3">
                비밀번호 <span className="text-[#c8102e]">*</span>
              </label>
              <input
                type="password"
                placeholder="8자 이상 영문, 숫자, 특수문자 조합"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 text-[14px] outline-none focus:border-[#0c1f3f] transition-colors"
              />
            </div>
            <div className="mb-8 md:mb-10">
              <label className="block text-[13px] font-semibold mb-3">
                휴대폰 번호 <span className="text-[#c8102e]">*</span>
              </label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 text-[14px] outline-none focus:border-[#0c1f3f] transition-colors"
              />
            </div>

            {/* 약관 동의 */}
            <div className="mb-8 md:mb-10 p-5 md:p-6 bg-gray-50">
              <label className="flex items-center gap-2.5 cursor-pointer mb-4">
                <input type="checkbox" className="w-4 h-4 accent-[#0c1f3f]" />
                <span className="text-[13px] font-semibold">전체 동의</span>
              </label>
              <div className="border-t border-gray-200 pt-4 flex flex-col gap-3.5">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#0c1f3f]" />
                  <span className="text-[12px] md:text-[12.5px] text-gray-500">
                    [필수] 이용약관 동의
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#0c1f3f]" />
                  <span className="text-[12px] md:text-[12.5px] text-gray-500">
                    [필수] 개인정보 수집 및 이용 동의
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#0c1f3f]" />
                  <span className="text-[12px] md:text-[12.5px] text-gray-500">
                    [선택] 마케팅 정보 수신 동의
                  </span>
                </label>
              </div>
            </div>

            <button
              className="w-full py-4 md:py-5 bg-[#0c1f3f] text-white text-[15px] font-bold tracking-wide border-none cursor-pointer hover:bg-[#c8102e] transition-colors"
              onClick={handleSubmit}
            >
              회원가입
            </button>

            <div className="mt-6 md:mt-8 p-4 md:p-5 border border-[#c8102e]/20 bg-[#c8102e]/5 text-center">
              <p className="text-[12px] md:text-[13px] text-[#c8102e] font-semibold">
                🎉 신규 회원 즉시 10,000원 쿠폰 발급!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}