import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    seller: {
      name: string;
      image: string;
    };
  };
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      className="block w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* 商品画像 */}
      <div className="aspect-square relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 商品情報 */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-left line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-lg font-bold text-left">
          ¥{product.price.toLocaleString()}
        </p>

        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={product.seller.image} />
            <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-500">
            {product.seller.name}
          </span>
        </div>
      </div>
    </button>
  );
} 