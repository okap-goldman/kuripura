import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductDetailProps {
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
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePurchase = () => {
    // TODO: Implement Stripe Checkout
    console.log('購入処理を実装予定');
  };

  const handleContact = () => {
    // TODO: Implement messaging
    console.log('メッセージ機能を実装予定');
  };

  return (
    <div className="space-y-6">
      {/* 商品画像スライダー */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={`${product.name} - 画像 ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {product.images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* 画像インジケーター */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 商品情報 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-2xl font-bold">
            ¥{product.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={product.seller.image} />
            <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{product.seller.name}</span>
        </div>

        <p className="text-gray-600 whitespace-pre-wrap">
          {product.description}
        </p>
      </div>

      {/* アクションボタン */}
      <div className="flex space-x-4">
        <Button
          className="flex-1"
          onClick={handlePurchase}
        >
          購入する
        </Button>
        
        <Button
          variant="outline"
          onClick={handleContact}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          出品者に質問する
        </Button>
      </div>
    </div>
  );
} 