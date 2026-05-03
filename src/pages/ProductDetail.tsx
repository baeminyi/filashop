import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import type { Product } from "../data/products";

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-10 py-20 text-center">
        <p className="text-gray-400 text-lg mb-6">상품을 찾을 수 없습니다.</p>
        <button
          className="px-8 py-3 bg-[#0c1f3f] text-white font-bold tracking-wide cursor-pointer hover:bg-[#c8102e] transition-colors"
          onClick={() => navigate("/")}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-10 py-12">

      <div className="flex gap-12 flex-col lg:flex-row">
        {/* 왼쪽: 상품 이미지 */}
        <div className="flex-1">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 오른쪽: 상품 정보 */}
        <div className="flex-1 max-w-[500px]">
          {/* 뱃지 */}
          {product.badge && (
            <span
              className={`inline-block px-3 py-1 text-[11px] font-bold text-white tracking-wider mb-4 ${
                product.badge === "NEW"
                  ? "bg-[#0c1f3f]"
                  : product.badge === "BEST"
                  ? "bg-[#c8102e]"
                  : "bg-orange-600"
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* 상품명 */}
          <h1 className="text-[28px] font-bold leading-tight mb-4">
            {product.name}
          </h1>

          {/* 가격 */}
          <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-gray-200">
            {discount && (
              <span className="text-[28px] font-bold text-[#c8102e]">
                {discount}%
              </span>
            )}
            <span className="text-[28px] font-bold">
              {product.price.toLocaleString("ko-KR")}원
            </span>
            {product.originalPrice && (
              <span className="text-[16px] text-gray-400 line-through">
                {product.originalPrice.toLocaleString("ko-KR")}원
              </span>
            )}
          </div>

          {/* 컬러 선택 */}
          <div className="mb-8">
            <p className="text-[13px] font-semibold mb-3">컬러</p>
            <div className="flex gap-2.5">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                    selectedColor === i
                      ? "border-[#0c1f3f] scale-110"
                      : "border-gray-200 hover:scale-110"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(i)}
                />
              ))}
            </div>
          </div>

          {/* 수량 */}
          <div className="mb-8">
            <p className="text-[13px] font-semibold mb-3">수량</p>
            <div className="inline-flex items-center border border-gray-200">
              <button
                className="w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 text-[16px]"
                onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
              >
                −
              </button>
              <span className="w-12 text-center text-[14px] font-semibold border-l border-r border-gray-200 leading-10">
                {qty}
              </span>
              <button
                className="w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 text-[16px]"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* 총 금액 */}
          <div className="flex justify-between items-center mb-6 py-4 border-t border-b border-gray-200">
            <span className="text-[14px] font-semibold">총 상품금액</span>
            <span className="text-[24px] font-bold text-[#0c1f3f]">
              {(product.price * qty).toLocaleString("ko-KR")}원
            </span>
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3">
            <button
              className={`flex-1 py-4 text-[15px] font-bold tracking-wide border-none cursor-pointer transition-all duration-300 ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-[#0c1f3f] text-white hover:bg-[#c8102e]"
              }`}
              onClick={handleAddToCart}
            >
              {added ? "✓ 장바구니에 담김" : "장바구니 담기"}
            </button>
            <button className="flex-1 py-4 bg-[#c8102e] text-white text-[15px] font-bold tracking-wide border-none cursor-pointer hover:bg-[#a00d24] transition-colors">
              바로 구매
            </button>
          </div>

          {/* 배송 정보 */}
          <div className="mt-8 p-5 bg-gray-50">
            <div className="flex items-center gap-2 mb-2 text-[13px]">
              <span>🚚</span>
              <span className="font-semibold">무료배송</span>
              <span className="text-gray-400">5만원 이상 구매 시</span>
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <span>📦</span>
              <span className="font-semibold">오늘 출발</span>
              <span className="text-gray-400">18시 이전 주문 시</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}