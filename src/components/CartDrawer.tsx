import type { Product } from "../data/products";

interface CartItem extends Product {
  qty: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      {/* 어두운 배경 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-[300] animate-[fadeIn_0.25s]"
          onClick={onClose}
        />
      )}

      {/* 장바구니 패널 */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-white z-[310] flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[#0c1f3f]">
          <h3 className="text-[18px] font-bold text-[#0c1f3f]">
            장바구니
            <span className="inline-flex items-center justify-center bg-[#c8102e] text-white text-[12px] font-bold min-w-[22px] h-[22px] rounded-full px-1.5 ml-2">
              {cartCount}
            </span>
          </h3>
          <button
            className="text-[20px] text-gray-400 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              장바구니가 비어있습니다
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 py-4 border-b border-gray-200 relative"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[72px] h-[72px] object-cover bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.name}
                  </p>
                  <p className="text-[15px] font-semibold mb-2">
                    {item.price.toLocaleString("ko-KR")}원
                  </p>
                  <div className="inline-flex items-center border border-gray-200">
                    <button
                      className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 text-[14px]"
                      onClick={() => onUpdateQty(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-[13px] font-semibold border-l border-r border-gray-200 leading-7">
                      {item.qty}
                    </span>
                    <button
                      className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 text-[14px]"
                      onClick={() => onUpdateQty(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="absolute top-4 right-0 bg-transparent border-none text-gray-400 hover:text-[#c8102e] cursor-pointer text-[14px]"
                  onClick={() => onRemove(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* 하단 결제 */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t-2 border-[#0c1f3f]">
            <div className="flex justify-between items-center mb-4 text-[14px]">
              <span>총 결제금액</span>
              <strong className="text-[22px] text-[#0c1f3f]">
                {cartTotal.toLocaleString("ko-KR")}원
              </strong>
            </div>
            <button className="w-full py-3.5 bg-[#0c1f3f] text-white text-[15px] font-bold tracking-wider border-none cursor-pointer hover:bg-[#c8102e] transition-colors">
              주문하기
            </button>
          </div>
        )}
      </div>
    </>
  );
}