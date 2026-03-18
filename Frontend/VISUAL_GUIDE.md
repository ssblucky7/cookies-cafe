# 🎨 Visual Layout Guide - Cookies Café Menu System

## Page Layouts Overview

### 1. Menu Listing Page (`/menu`)

```
┌─────────────────────────────────────────────────────────────┐
│                         NAVBAR                               │
│  Logo  Home  Menu  Gallery  Community  About  Contact       │
│                                    🔍 👤 🛒                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      OUR MENU                                │
│         Discover our delicious selection                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🔽 Filters (Mobile)    Sort by: [Newest ▼]   Showing 12/12│
└─────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────────────────────────────────────┐
│              │                                              │
│  FILTERS     │         PRODUCT GRID                         │
│              │                                              │
│  Category    │  ┌────────┐ ┌────────┐ ┌────────┐          │
│  ○ All       │  │ [IMG]  │ │ [IMG]  │ │ [IMG]  │          │
│  ○ Chocolate │  │ Badge  │ │ Badge  │ │ Badge  │          │
│  ○ Classic   │  │ ❤️     │ │ ❤️     │ │ ❤️     │          │
│  ○ Special   │  ├────────┤ ├────────┤ ├────────┤          │
│  ○ Seasonal  │  │ Name   │ │ Name   │ │ Name   │          │
│  ○ Vegan     │  │ Desc   │ │ Desc   │ │ Desc   │          │
│              │  │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐⭐│          │
│  Price Range │  │ $4.99  │ │ $5.99  │ │ $6.99  │          │
│  ├─────────┤ │  │   🛒   │ │   🛒   │ │   🛒   │          │
│  $0    $50  │  └────────┘ └────────┘ └────────┘          │
│              │                                              │
│  [Reset]     │  ┌────────┐ ┌────────┐ ┌────────┐          │
│              │  │ [IMG]  │ │ [IMG]  │ │ [IMG]  │          │
│              │  │ ...    │ │ ...    │ │ ...    │          │
│              │  └────────┘ └────────┘ └────────┘          │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         FOOTER                               │
│  Quick Links | Get Help | Contact | Social Media            │
└─────────────────────────────────────────────────────────────┘
```

---

### 2. Menu Detail Page (`/menu/:id`)

```
┌─────────────────────────────────────────────────────────────┐
│                         NAVBAR                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Home / Menu / Classic Chocolate Chip                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────┬──────────────────────────────────┐
│                          │                                  │
│   IMAGE GALLERY          │   PRODUCT INFORMATION            │
│                          │                                  │
│  ┌────────────────────┐  │  Classic Chocolate Chip          │
│  │                    │  │  ⭐⭐⭐⭐⭐ 4.8 (156 reviews)        │
│  │   MAIN IMAGE       │  │                                  │
│  │      Badge         │  │  Traditional chocolate chip      │
│  │       🔍          │  │  cookies with premium dark...    │
│  │                    │  │                                  │
│  └────────────────────┘  │  $̶6̶.̶9̶9̶  $4.99  Save $2.00      │
│                          │                                  │
│  [📷] [📷] [📷] [📷]     │  Quantity:  [-] 1 [+]            │
│                          │                                  │
│                          │  [🛒 Add to Cart]  [❤️]          │
│                          │                                  │
│                          │  Category: Classic               │
│                          │  Availability: In Stock          │
│                          │  SKU: CK-1                       │
│                          │                                  │
└──────────────────────────┴──────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  [Overview] [Ingredients] [Reviews]                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Product Overview                                            │
│                                                              │
│  Our signature chocolate chip cookies are made with the     │
│  finest Belgian chocolate and organic butter. Each cookie   │
│  is carefully crafted to achieve the perfect balance...     │
│                                                              │
│  • Freshly baked daily                                      │
│  • Made with premium ingredients                            │
│  • Perfect for any occasion                                 │
│  • Can be customized for dietary needs                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Related Products                                            │
│                                                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │[IMG] │  │[IMG] │  │[IMG] │  │[IMG] │                   │
│  │Name  │  │Name  │  │Name  │  │Name  │                   │
│  │$5.99 │  │$4.49 │  │$6.49 │  │$5.29 │                   │
│  │⭐⭐⭐⭐│  │⭐⭐⭐⭐│  │⭐⭐⭐⭐│  │⭐⭐⭐⭐│                   │
│  └──────┘  └──────┘  └──────┘  └──────┘                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         FOOTER                               │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. Zoom Modal (Full Screen)

```
┌─────────────────────────────────────────────────────────────┐
│                                                         [✕]  │
│                                                              │
│                                                              │
│  [◄]                                                   [►]   │
│                                                              │
│                    ┌──────────────┐                         │
│                    │              │                         │
│                    │              │                         │
│                    │  FULL SIZE   │                         │
│                    │    IMAGE     │                         │
│                    │              │                         │
│                    │              │                         │
│                    └──────────────┘                         │
│                                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Mobile Layouts

### Menu Listing (Mobile)

```
┌──────────────────┐
│      NAVBAR      │
│  ☰  Logo  🔍 🛒 │
└──────────────────┘

┌──────────────────┐
│    OUR MENU      │
└──────────────────┘

┌──────────────────┐
│ [🔽 Filters]     │
│ Sort: [Newest ▼] │
│ Showing 12/12    │
└──────────────────┘

┌──────────────────┐
│   ┌──────────┐   │
│   │  [IMG]   │   │
│   │  Badge   │   │
│   │   ❤️     │   │
│   ├──────────┤   │
│   │  Name    │   │
│   │  Desc    │   │
│   │  ⭐⭐⭐⭐⭐ │   │
│   │  $4.99   │   │
│   │    🛒    │   │
│   └──────────┘   │
│                  │
│   ┌──────────┐   │
│   │  [IMG]   │   │
│   │  ...     │   │
│   └──────────┘   │
└──────────────────┘

┌──────────────────┐
│     FOOTER       │
└──────────────────┘
```

### Menu Detail (Mobile)

```
┌──────────────────┐
│      NAVBAR      │
└──────────────────┘

┌──────────────────┐
│  Home / Menu /   │
│  Product Name    │
└──────────────────┘

┌──────────────────┐
│  ┌────────────┐  │
│  │   IMAGE    │  │
│  │   Badge    │  │
│  │     🔍     │  │
│  └────────────┘  │
│  [📷][📷][📷][📷]│
└──────────────────┘

┌──────────────────┐
│  Product Name    │
│  ⭐⭐⭐⭐⭐ (156)   │
│                  │
│  Description...  │
│                  │
│  $̶6̶.̶9̶9̶  $4.99    │
│                  │
│  Qty: [-] 1 [+]  │
│                  │
│  [🛒 Add to Cart]│
│  [❤️ Wishlist]   │
│                  │
│  Category: ...   │
│  Stock: ...      │
└──────────────────┘

┌──────────────────┐
│ [Overview]       │
│ [Ingredients]    │
│ [Reviews]        │
├──────────────────┤
│  Content here... │
└──────────────────┘

┌──────────────────┐
│ Related Products │
│  ┌────┐ ┌────┐  │
│  │IMG │ │IMG │  │
│  └────┘ └────┘  │
└──────────────────┘

┌──────────────────┐
│     FOOTER       │
└──────────────────┘
```

---

## Component Breakdown

### Product Card Component

```
┌────────────────────┐
│  ┌──────────────┐  │  ← Image Container
│  │   IMAGE      │  │
│  │   [Badge]    │  │  ← Badge (Hot/New/Sale)
│  │    ❤️        │  │  ← Wishlist Button
│  └──────────────┘  │
│                    │
│  Product Name      │  ← Title
│  Short desc...     │  ← Description (2 lines)
│                    │
│  ⭐⭐⭐⭐⭐ (123)     │  ← Rating & Reviews
│                    │
│  $̶6̶.̶9̶9̶  $4.99      │  ← Price (old/new)
│           🛒       │  ← Add to Cart
└────────────────────┘
```

### Filter Sidebar Component

```
┌──────────────┐
│   FILTERS    │
│              │
│  Category    │
│  ○ All       │
│  ○ Chocolate │
│  ○ Classic   │
│  ○ Special   │
│  ○ Seasonal  │
│  ○ Vegan     │
│              │
│  Price Range │
│  ├─────────┤ │
│  $0    $50  │
│              │
│  [Reset]     │
└──────────────┘
```

### Image Gallery Component

```
┌──────────────────┐
│                  │
│   MAIN IMAGE     │  ← Large display
│     [Badge]      │
│      🔍         │  ← Zoom button
│                  │
└──────────────────┘
[📷] [📷] [📷] [📷]  ← Thumbnails
```

### Tab Component

```
┌────────────────────────────┐
│ [Overview] Ingredients Reviews │  ← Tab Headers
├────────────────────────────┤
│                            │
│   Tab Content Here...      │  ← Active Tab Content
│                            │
└────────────────────────────┘
```

---

## Color Scheme Visual

```
┌─────────────────────────────────────┐
│  #FFF8F0  Cream (Background)        │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  #C08552  Caramel (Primary)         │
│  ████████████████████████████████  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  #8C5A3C  Brown (Secondary)         │
│  ████████████████████████████████  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  #4B2E2B  Dark Brown (Text)         │
│  ████████████████████████████████  │
└─────────────────────────────────────┘
```

---

## Badge Colors

```
🔴 Hot       - Red (#EF4444)
🟢 New       - Green (#10B981)
🟠 Sale      - Orange (#F97316)
🟣 Offer     - Purple (#A855F7)
🟡 Discount  - Yellow (#EAB308)
```

---

## Responsive Breakpoints

```
Mobile:    < 640px    (sm)
┌──────┐
│      │
│      │
└──────┘

Tablet:    640-1024px (md-lg)
┌────────────┐
│            │
│            │
└────────────┘

Desktop:   > 1024px   (xl)
┌──────────────────────┐
│                      │
│                      │
└──────────────────────┘
```

---

## Grid Layouts

### Desktop (3 columns)
```
┌────┐ ┌────┐ ┌────┐
│    │ │    │ │    │
└────┘ └────┘ └────┘
┌────┐ ┌────┐ ┌────┐
│    │ │    │ │    │
└────┘ └────┘ └────┘
```

### Tablet (2 columns)
```
┌────┐ ┌────┐
│    │ │    │
└────┘ └────┘
┌────┐ ┌────┐
│    │ │    │
└────┘ └────┘
```

### Mobile (1 column)
```
┌────┐
│    │
└────┘
┌────┐
│    │
└────┘
```

---

## Interactive States

### Button States
```
Normal:    [  Button  ]
Hover:     [  Button  ]  ← Darker
Active:    [  Button  ]  ← Pressed
Disabled:  [  Button  ]  ← Grayed
```

### Card States
```
Normal:    ┌────┐
           │    │
           └────┘

Hover:     ┌────┐  ← Shadow grows
           │    │  ← Image scales
           └────┘
```

---

This visual guide helps understand the layout structure and component organization of the Cookies Café menu system! 🎨🍪
