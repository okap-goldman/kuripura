import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter } from 'lucide-react';
import ProductCard from './product-card';
import ProductDetail from './product-detail';

// モックデータ
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: '瞑想ガイドブック',
    description: '目醒めへの第一歩。瞑想の基本から応用まで、分かりやすく解説しています。',
    price: 2800,
    images: ['https://source.unsplash.com/random/800x600?meditation'],
    seller: {
      name: '山田太郎',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
  },
  {
    id: '2',
    name: 'オリジナルマインドフルネスカード',
    description: '日々の気づきを深めるためのカードセット。52枚入り。',
    price: 3500,
    images: ['https://source.unsplash.com/random/800x600?cards'],
    seller: {
      name: '佐藤花子',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
  },
  // 他の商品...
];

const SORT_OPTIONS = [
  { value: 'newest', label: '新着順' },
  { value: 'price-asc', label: '価格が安い順' },
  { value: 'price-desc', label: '価格が高い順' },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState<typeof MOCK_PRODUCTS[0] | null>(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search
    console.log({ searchQuery });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        {/* 検索・フィルターヘッダー */}
        <div className="sticky top-16 bg-gray-50 py-4 z-10 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="商品を検索"
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center justify-between">
            <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  フィルター
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>フィルター</DialogTitle>
                </DialogHeader>
                {/* TODO: フィルターの実装 */}
                <div className="h-24 flex items-center justify-center text-gray-400">
                  フィルター（実装予定）
                </div>
              </DialogContent>
            </Dialog>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 商品一覧 */}
        <div className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>

        {/* 商品詳細モーダル */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
            <DialogContent className="max-w-2xl">
              <ProductDetail
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
} 