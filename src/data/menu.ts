export interface MenuItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Hotdogs' | 'Sides' | 'Drinks';
  price: number;
  description: string;
  image: string;
  isB1T1: boolean;
  isPopular: boolean;
}

export const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Buy 1 Take 1 Minute Burger',
    category: 'Burgers',
    price: 85,
    description: 'Our signature classic beef burger. Buy 1 Take 1 forever!',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isB1T1: true,
    isPopular: true
  },
  {
    id: '2',
    name: 'Black Pepper Burger',
    category: 'Burgers',
    price: 95,
    description: 'Juicy beef patty smothered in our signature sweet and spicy black pepper sauce.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    isB1T1: true,
    isPopular: true
  },
  {
    id: '3',
    name: 'Bacon Cheese Burger',
    category: 'Burgers',
    price: 130,
    description: 'Premium beef patty topped with crispy bacon and melted cheese.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80',
    isB1T1: true,
    isPopular: false
  },
  {
    id: '4',
    name: 'Chicken Time Burger',
    category: 'Burgers',
    price: 110,
    description: 'Crispy fried chicken fillet with creamy mayonnaise and fresh lettuce.',
    image: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?auto=format&fit=crop&w=600&q=80',
    isB1T1: false,
    isPopular: true
  },
  {
    id: '5',
    name: 'Hotdog Sandwich',
    category: 'Hotdogs',
    price: 60,
    description: 'Classic meaty hotdog in a soft, warm bun with ketchup and mayo.',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80',
    isB1T1: false,
    isPopular: false
  },
  {
    id: '6',
    name: 'French Fries',
    category: 'Sides',
    price: 45,
    description: 'Golden, crispy, and perfectly salted crinkle-cut fries.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80',
    isB1T1: false,
    isPopular: true
  },
  {
    id: '7',
    name: 'Iced Tea',
    category: 'Drinks',
    price: 35,
    description: 'Refreshing house-blend iced tea.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    isB1T1: false,
    isPopular: false
  }
];
