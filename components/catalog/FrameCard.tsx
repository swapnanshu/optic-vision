import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Frame } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { toDisplay } from "@/lib/utils/price";
import { useCartStore } from "@/store/cartStore";
import { toast } from "@/components/ui/Toast";

interface FrameCardProps {
  frame: Frame;
}

export const FrameCard: React.FC<FrameCardProps> = ({ frame }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(frame, 1);
    toast.success(`${frame.name} cart mein daal diya! 🎉`);
  };

  const inStock = frame.stock > 0;

  return (
    <Link href={`/catalog/${frame.id}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] group-hover:border-[var(--color-primary-light)] transition-all duration-300 shadow-xs group-hover:shadow-sm">
        {frame.images && frame.images[0] ? (
          <Image
            src={frame.images[0]}
            alt={frame.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-[1.5s] group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-semibold">
            No image
          </div>
        )}

        {/* Stock Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant={inStock ? "success" : "danger"}>
            {inStock ? "In Stock" : "Abhi nahi hai"}
          </Badge>
        </div>

        {/* Brand Label */}
        {/* {frame.brand && (
          <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-bold text-[var(--color-text-secondary)] shadow-xs">
            {frame.brand}
          </div>
        )} */}

        {/* Add to Cart button */}
        {inStock && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-[var(--color-cta)]/90 text-[var(--color-cta-text)] w-10 h-10 rounded-xl flex items-center justify-center shadow-md hover:bg-[var(--color-cta)] active:scale-90 transition-all"
            title="Cart mein daalo"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        )}
      </div>

      <div>
        <h3 className="text-lg font-extrabold text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors duration-150">
          {frame.name}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className="font-extrabold text-[var(--color-primary)] text-base">
            {toDisplay(frame.price)}
          </p>
          <span className="text-xs font-semibold text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] px-2.5 py-1 rounded-lg border border-[var(--color-primary-light)] uppercase tracking-wider">
            {frame.frameStyle}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FrameCard;

