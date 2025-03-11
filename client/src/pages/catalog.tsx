import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Loader2, ShoppingBag, LogIn, Menu } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const categories = {
  "Living Room": [
    "Sofas & Couches",
    "Sectionals",
    "Coffee Tables",
    "End Tables",
    "TV Stands & Media Consoles",
    "Recliners",
    "Accent Chairs",
    "Bookshelves",
    "Ottomans & Poufs"
  ],
  "Bedroom": [
    "Beds",
    "Nightstands",
    "Dressers & Chests",
    "Wardrobes & Armoires",
    "Bedside Tables",
    "Headboards",
    "Vanity Tables",
    "Mattresses"
  ],
  "Dining Room": [
    "Dining Tables",
    "Dining Chairs",
    "Bar Stools",
    "Buffets & Sideboards",
    "China Cabinets",
    "Benches"
  ],
  "Office": [
    "Desks",
    "Office Chairs",
    "Bookcases",
    "Filing Cabinets",
    "Conference Tables",
    "Shelving Units"
  ],
  "Outdoor": [
    "Patio Tables",
    "Outdoor Chairs",
    "Lounge Chairs",
    "Hammocks",
    "Outdoor Sofas",
    "Gazebos & Pergolas",
    "Fire Pits"
  ],
  "Storage": [
    "Cabinets & Cupboards",
    "Shoe Racks",
    "Coat Racks & Hall Trees",
    "Storage Bins & Baskets",
    "Floating Shelves"
  ],
  "Kids & Nursery": [
    "Cribs & Bassinets",
    "Kids' Beds & Bunk Beds",
    "Changing Tables",
    "Toy Storage",
    "Kids' Desks & Chairs"
  ],
  "Accent & Decor": [
    "Console Tables",
    "Accent Cabinets",
    "Mirrors",
    "Room Dividers"
  ]
};

export default function Catalog() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h2 className="text-2xl font-light tracking-wide cursor-pointer">
                ISLA Living
              </h2>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {Object.entries(categories).map(([category, subcategories]) => (
                  <NavigationMenuItem key={category}>
                    <NavigationMenuTrigger className="text-sm font-light">
                      {category}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                        {subcategories.map((subcategory) => (
                          <li key={subcategory}>
                            <NavigationMenuLink asChild>
                              <a className="block p-2 hover:bg-accent rounded-md text-sm">
                                {subcategory}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              {user?.isAdmin ? (
                <Link href="/admin">
                  <Button variant="ghost" className="text-sm font-light">Admin</Button>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button variant="ghost" className="text-sm font-light">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-32 px-4 text-center bg-gradient-to-b from-primary/5">
        <h1 className="text-5xl md:text-6xl font-light tracking-wide text-primary">
          Island-Inspired Living
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Discover our curated collection of furniture that brings the serenity of coastal living to your home.
        </p>
      </header>

      {/* Product Grid */}
      <main className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products?.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="cursor-pointer group hover:shadow-lg transition-all duration-500 border-0 bg-transparent">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="px-2 pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-light tracking-wide group-hover:text-primary transition-colors">
                      {product.name}
                    </h2>
                    <span className="text-xs font-medium text-primary/80 tracking-wider uppercase">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-light">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-light">
                      ${(product.price / 100).toFixed(2)}
                    </p>
                    <ShoppingBag className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}