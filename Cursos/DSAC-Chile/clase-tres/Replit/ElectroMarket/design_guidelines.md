# Design Guidelines: Electronics Marketplace MVP

## Design Approach
**Reference-Based Approach**: Drawing inspiration from established e-commerce leaders (Amazon, Shopify, Newegg) with focus on electronics retail patterns. The design prioritizes product discovery, trust-building, and conversion optimization for electronics buyers.

## Core Design Elements

### Color Palette
- **Primary**: 220 85% 25% (Deep professional blue)
- **Secondary**: 220 15% 95% (Light neutral gray)
- **Accent**: 15 90% 55% (Electronics orange - sparingly used)
- **Success**: 142 71% 45% (Confirmation green)
- **Error**: 0 84% 60% (Alert red)
- **Dark mode**: Inverted with 220 15% 12% base

### Typography
- **Primary**: Inter (Google Fonts) - clean, technical readability
- **Secondary**: JetBrains Mono for product codes/specs
- **Hierarchy**: text-3xl (headers), text-lg (product names), text-base (descriptions), text-sm (metadata)

### Layout System
**Tailwind spacing primitives**: 2, 4, 6, 8, 12, 16
- Standard padding: p-4, p-6
- Component spacing: space-y-4, gap-6
- Container margins: mx-4, mx-8

### Component Library

#### Navigation
- **Header**: Fixed top bar with logo, search bar, user menu, cart icon with badge
- **Categories**: Horizontal scrollable tabs below header
- **Breadcrumbs**: On product and category pages

#### Product Display
- **Product Cards**: White background, subtle shadow (shadow-sm), hover elevation (shadow-md)
- **Product Grid**: Responsive (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- **Product Images**: Square aspect ratio with lazy loading placeholder

#### Forms & Interactions
- **Search**: Prominent in header with autocomplete dropdown
- **Filters**: Collapsible sidebar on category pages
- **Cart**: Slide-over panel from right side
- **Buttons**: Primary (solid blue), secondary (outline), danger (red for remove actions)

#### Data Display
- **Price**: Prominent typography with currency formatting
- **Stock Status**: Color-coded badges (green: in stock, yellow: low stock, red: out of stock)
- **Ratings**: Star display with review count
- **Specifications**: Clean table layout for technical details

## Key Design Principles
1. **Electronics Focus**: Technical specifications prominently displayed, precise product imagery
2. **Trust Indicators**: Security badges, stock levels, shipping information clearly visible
3. **Efficient Shopping**: Quick add-to-cart, persistent cart state, streamlined checkout
4. **Responsive Design**: Mobile-first approach with touch-friendly interactions
5. **Performance**: Optimized images, skeleton loading states, efficient pagination

## Images
- **Product Images**: High-resolution square format (400x400px minimum) with zoom functionality
- **Category Images**: Banner-style headers for category pages
- **Placeholder Images**: Gray background with electronics icon for missing products
- **No large hero image**: Focus on product discovery rather than brand storytelling
- **Trust Badges**: Payment security icons in footer and checkout

## Navigation Patterns
- **Search-First**: Prominent search bar as primary discovery method
- **Category Browse**: Secondary navigation via category tabs
- **Breadcrumb Trail**: Always visible for deep navigation
- **Quick Actions**: Floating cart, back-to-top, recently viewed products

This design system balances professional aesthetics with the functional needs of electronics buyers, emphasizing product information, trust, and efficient purchasing workflows.