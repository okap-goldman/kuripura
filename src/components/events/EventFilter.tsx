import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, FilterIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EventFilterProps {
  onFilterChange: (filters: EventFilters) => void
}

interface EventFilters {
  keyword: string
  location: string
  minPrice: number
  maxPrice: number
  date: Date | undefined
}

export function EventFilter({ onFilterChange }: EventFilterProps) {
  const [filters, setFilters] = useState<EventFilters>({
    keyword: "",
    location: "",
    minPrice: 0,
    maxPrice: 100000,
    date: undefined
  })

  const handleFilterChange = (newFilters: Partial<EventFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="イベントを検索"
            value={filters.keyword}
            onChange={(e) => handleFilterChange({ keyword: e.target.value })}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              詳細検索
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>開催場所</Label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => handleFilterChange({ location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="場所を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="tokyo">東京</SelectItem>
                    <SelectItem value="osaka">大阪</SelectItem>
                    <SelectItem value="online">オンライン</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>参加費用</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="最小"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange({ minPrice: Number(e.target.value) })}
                  />
                  <span>〜</span>
                  <Input
                    type="number"
                    placeholder="最大"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange({ maxPrice: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>開催日</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.date ? (
                        format(filters.date, "PPP", { locale: ja })
                      ) : (
                        <span>日付を選択</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.date}
                      onSelect={(date) => handleFilterChange({ date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
} 