import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  isWished: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWish: (id: number) => void;
}

export default function ProductCard({
  product,
  isWished,
  onAddToCart,
  onToggleWish,
}: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "NEW":
        return "bg-[#0c1f3f]";
      case "BEST":
        return "bg-[#c8102e]";
      case "SALE":
        return "bg-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="group cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold text-white tracking-wider ${getBadgeColor(product.badge)}`}
          >
            {product.badge}
          </span>
        )}

        <button
          className={`absolute top-2.5 right-2.5 w-[34px] h-[34px] rounded-full flex items-center justify-center text-[18px] transition-all ${
            isWished
              ? "bg-white text-[#c8102e]"
              : "bg-white/85 text-gray-400 hover:bg-white hover:scale-110"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWish(product.id);
          }}
        >
          {isWished ? "♥" : "♡"}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-[#0c1f3f]/90 backdrop-blur-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            className="w-full py-2.5 bg-white text-[13px] font-bold tracking-wide hover:bg-[#c8102e] hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            장바구니 담기
          </button>
        </div>
      </div>

      <div className="p-3 pt-3.5">
        <p className="text-[13.5px] font-medium leading-[1.45] line-clamp-2 mb-2">
          {product.name}
        </p>

        <div className="flex gap-1.5 mb-2.5">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-gray-200 hover:scale-125 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex items-baseline gap-2 flex-wrap">
          {discount && (
            <span className="text-[17px] font-semibold text-[#c8102e]">
              {discount}%
            </span>
          )}
          <span className="text-[17px] font-semibold">
            {product.price.toLocaleString("ko-KR")}원
          </span>
          {product.originalPrice && (
            <span className="text-[12.5px] text-gray-400 line-through">
              {product.originalPrice.toLocaleString("ko-KR")}원
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
