import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, Moon, Sun, ChevronRight, MapPin } from 'lucide-react';
import { menuData, MenuItem } from './data/menu';

// --- CONTEXT: Cart & Theme ---
type CartItem = MenuItem & { quantity: number };
interface AppContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
}
const AppContext = createContext<AppContextType | null>(null);

// --- COMPONENT: Navbar ---
const Navbar = ({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(AppContext);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Promotions', path: '/promotions' },
    { name: 'Locator', path: '/locator' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-mb-dark border-b-4 border-mb-yellow shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="font-heading text-3xl tracking-wide group-hover:scale-105 transition-transform">
              <span className="text-mb-red">MINUTE</span>
              <span className="text-mb-orange">BURGER</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-bold text-lg hover:text-mb-red transition-colors ${
                  location.pathname === link.path ? 'text-mb-red' : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300 hover:text-mb-red transition-colors">
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={context?.toggleCart} className="relative p-2 text-gray-800 dark:text-white hover:text-mb-red transition-colors">
              <ShoppingBag size={24} />
              {context!.cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-mb-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-mb-dark">
                  {context!.cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
            <Link to="/menu" className="hidden lg:block bg-mb-red text-white font-heading px-6 py-2 rounded-full shadow-lg hover:bg-mb-orange transition-all hover:-translate-y-1">
              ORDER NOW
            </Link>
            <button className="md:hidden p-2 text-gray-800 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-mb-dark border-t dark:border-gray-800 p-4 space-y-4 shadow-xl absolute w-full">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block font-bold text-lg text-gray-800 dark:text-gray-200 hover:text-mb-red"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/menu" onClick={() => setIsOpen(false)} className="block text-center bg-mb-red text-white font-heading py-3 rounded-xl w-full">
            ORDER NOW
          </Link>
        </div>
      )}
    </nav>
  );
};

// --- COMPONENT: Cart Sidebar ---
const CartSidebar = ({ isOpen }: { isOpen: boolean }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { cart, removeFromCart, toggleCart } = context;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={toggleCart} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 flex justify-between items-center border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <h2 className="font-heading text-2xl flex items-center gap-2">
            <ShoppingBag className="text-mb-red" /> YOUR ORDER
          </h2>
          <button onClick={toggleCart} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:text-mb-red"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag size={64} className="mb-4 opacity-50" />
              <p className="font-medium text-lg">Your tray is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center p-3 border dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                  <p className="text-mb-red font-heading">₱{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">x{item.quantity}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-mb-red"><X size={18} /></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Subtotal</span>
            <span className="font-heading text-2xl">₱{total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-mb-red text-white font-heading text-xl py-4 rounded-xl shadow-lg hover:bg-mb-dark transition-colors flex justify-center items-center gap-2" onClick={() => alert('Proceeding to checkout!')}>
            CHECKOUT <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

// --- COMPONENT: Product Card ---
const ProductCard = ({ item }: { item: MenuItem }) => {
  const context = useContext(AppContext);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-4 shadow-xl border-2 border-transparent hover:border-mb-yellow transition-all group flex flex-col">
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3] mb-4">
        {item.isB1T1 && <span className="absolute top-3 left-3 bg-mb-red text-white font-heading text-xs px-2 py-1 rounded shadow z-10">BUY 1 TAKE 1</span>}
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-heading text-xl mb-1">{item.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex-1">{item.description}</p>
        <div className="flex justify-between items-center mt-4 pt-4 border-t dark:border-gray-800">
          <span className="font-heading text-2xl text-mb-red">₱{item.price}</span>
          <button onClick={() => context?.addToCart(item)} className="bg-mb-yellow text-mb-dark hover:bg-mb-dark hover:text-mb-yellow w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors font-bold">+</button>
        </div>
      </div>
    </div>
  );
};

// --- PAGE: Home ---
const Home = () => {
  return (
    <div className="animate-slide-in">
      {/* Hero Section */}
      <section className="relative bg-mb-red overflow-hidden py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-6">
            <span className="inline-block bg-mb-yellow text-mb-dark font-heading px-4 py-1.5 rounded-full text-sm transform -rotate-2">
              🔥 THE PAMBANSANG BURGER
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-white leading-[1.1] drop-shadow-lg">
              DOUBLE <br /><span className="text-mb-yellow">THE TASTE.</span>
            </h1>
            <p className="text-white/90 text-lg sm:text-xl font-medium max-w-lg mx-auto lg:mx-0">
              Savor the iconic flavor of Minute Burger. Premium flame-grilled goodness that’s always better in pairs.
            </p>
            <div className="pt-4">
              <Link to="/menu" className="inline-block bg-white text-mb-red font-heading text-2xl px-10 py-4 rounded-full shadow-xl hover:bg-mb-yellow hover:text-mb-dark transition-transform hover:scale-105">
                EXPLORE MENU
              </Link>
            </div>
          </div>
          <div className="flex-1 relative flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-mb-orange/40 rounded-full blur-3xl -z-10"></div>
            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" alt="Premium Burger" className="w-full max-w-md object-cover rounded-full drop-shadow-2xl animate-float border-4 border-mb-yellow/20" />
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">OUR LEGENDS</h2>
          <p className="text-gray-500 font-medium text-lg">The timeless classics that defined the Philippine burger scene.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuData.filter(item => item.isPopular).map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* CTA Promo Banner */}
      <section className="bg-mb-dark text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-heading text-4xl sm:text-5xl text-mb-yellow">CRAVING A MIDNIGHT SNACK?</h2>
          <p className="text-lg text-gray-300">We are open 24/7. Order online now and skip the line!</p>
          <Link to="/locator" className="inline-block bg-mb-red font-heading px-8 py-3 rounded-full hover:bg-mb-yellow hover:text-mb-dark transition-colors">
            FIND A STORE
          </Link>
        </div>
      </section>
    </div>
  );
};

// --- PAGE: Menu ---
const Menu = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Burgers', 'Hotdogs', 'Sides', 'Drinks'];

  const filteredData = filter === 'All' ? menuData : menuData.filter(item => item.category === filter);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto min-h-screen animate-slide-in">
      <div className="text-center mb-10">
        <h1 className="font-heading text-5xl mb-4">FULL MENU</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${
                filter === cat ? 'bg-mb-red text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// --- PAGE: Locator (Placeholder to show routing) ---
const Locator = () => (
  <div className="py-20 px-4 max-w-7xl mx-auto text-center min-h-screen">
    <MapPin size={64} className="mx-auto text-mb-red mb-6" />
    <h1 className="font-heading text-5xl mb-4">FIND A STORE</h1>
    <p className="text-gray-500 mb-8">Locate the nearest 24/7 Minute Burger branch.</p>
    <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl h-96 flex items-center justify-center">
      <p className="font-bold text-gray-400">Interactive Google Maps Integration Goes Here</p>
    </div>
  </div>
);

// --- COMPONENT: Footer ---
const Footer = () => (
  <footer className="bg-mb-dark text-white pt-16 pb-8 border-t-8 border-mb-yellow">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div className="space-y-4">
        <h2 className="font-heading text-3xl"><span className="text-mb-red">MINUTE</span><span className="text-mb-orange">BURGER</span></h2>
        <p className="text-gray-400 text-sm">Serving premium Buy 1 Take 1 burgers across the Philippines since 1982. Open 24/7 to satisfy your cravings.</p>
      </div>
      <div>
        <h4 className="font-heading text-xl mb-4">QUICK LINKS</h4>
        <ul className="space-y-2 text-gray-400">
          <li><Link to="/menu" className="hover:text-mb-yellow">Menu</Link></li>
          <li><Link to="/promotions" className="hover:text-mb-yellow">Promotions</Link></li>
          <li><Link to="/locator" className="hover:text-mb-yellow">Store Locator</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading text-xl mb-4">STAY HUNGRY</h4>
        <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive deals.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Email" className="w-full bg-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-mb-yellow" />
          <button className="bg-mb-red px-4 rounded font-bold hover:bg-mb-orange transition-colors">GO</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm border-t border-white/10 pt-8">
      © {new Date().getFullYear()} Minute Burger Philippines. All Rights Reserved.
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Theme Toggle Effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, toggleCart: () => setIsCartOpen(!isCartOpen) }}>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar toggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <CartSidebar isOpen={isCartOpen} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/promotions" element={<div className="text-center py-20 font-heading text-4xl">PROMOTIONS (Coming Soon)</div>} />
            <Route path="/locator" element={<Locator />} />
          </Routes>
        </main>

        <Footer />

        {/* Mobile Floating Action Button */}
        <Link to="/menu" className="md:hidden fixed bottom-6 right-6 bg-mb-red text-white p-4 rounded-full shadow-2xl z-40 border-2 border-white">
          <ShoppingBag size={24} />
        </Link>
      </div>
    </AppContext.Provider>
  );
}

export default App;
