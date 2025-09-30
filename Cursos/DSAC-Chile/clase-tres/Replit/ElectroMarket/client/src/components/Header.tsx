import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartCount?: number;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onUserClick?: () => void;
}

export default function Header({ cartCount = 0, onSearch, onCartClick, onUserClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    console.log('Search triggered:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary" data-testid="text-logo">
              ElectroMarket
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onUserClick}
              data-testid="button-user"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}