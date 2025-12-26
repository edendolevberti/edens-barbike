import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CartSidebar } from './components/CartSidebar';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { ProductPage } from './components/ProductPage';
import { Product, CartItem, User as UserType } from './types';
import { db } from './services/database';
import { Lock, User, Key, AlertCircle, Eye, EyeOff } from 'lucide-react';

// Wrapper for the Shop Layout
const ShopLayout: React.FC<{ 
  children: React.ReactNode; 
  cartCount: number; 
  onOpenCart: () => void;
  products: Product[];
}> = ({ children, cartCount, onOpenCart, products }) => {
  const location = useLocation();

  // Scroll to section if hash is present (e.g., /#shop)
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header cartCount={cartCount} onOpenCart={onOpenCart} products={products} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Login Page Component
const LoginPage: React.FC<{ onLogin: (user: UserType) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = db.authenticate(username, password);
    
    if (user) {
      onLogin(user);
      setError('');
    } else {
      setError('שם משתמש או סיסמא שגויים.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[100px] rounded-full transform translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary/10 blur-[80px] rounded-full transform -translate-x-1/2"></div>
      
      <div className="bg-white/95 backdrop-blur-xl w-full max-w-md p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4 shadow-inner">
            <Lock className="text-primary" size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-800">כניסת מנהלים</h2>
          <p className="text-gray-400 text-sm mt-1">ניהול חנות מאובטח</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
              <User size={14} />
              שם משתמש
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-left"
              dir="ltr"
              placeholder="username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
              <Key size={14} />
              סיסמא
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-left"
                dir="ltr"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-fadeIn">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:bg-purple-600 transform hover:-translate-y-0.5 transition-all mt-4"
          >
            התחבר למערכת
          </button>
          
          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
              חזרה לחנות
            </Link>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">משתמש ברירת מחדל: admin / 123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Initialize from Database Service
  const [products, setProducts] = useState<Product[]>(db.getAllProducts());
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAccessoryFilter, setSelectedAccessoryFilter] = useState<string>('all');

  // Reload products from DB (triggered by admin updates)
  const refreshProducts = () => {
    setProducts(db.getAllProducts());
  };

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  // Admin Logic Helpers
  const handleAddProduct = (newProduct: Product) => {
    db.saveProduct(newProduct);
    refreshProducts();
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    db.saveProduct(updatedProduct);
    refreshProducts();
  };

  const handleDeleteProduct = (id: string) => {
    db.deleteProduct(id);
    refreshProducts();
  };

  const handleAdminLogout = () => {
    setCurrentUser(null);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Filter products logic
  const mainCatalogProducts = products.filter(p => p.category !== 'accessories');
  
  const accessories = products.filter(p => p.category === 'accessories');
  const filteredAccessories = accessories.filter(item => {
    if (selectedAccessoryFilter === 'all') return true;
    const searchStr = (item.name + item.description + (item.specs?.join(' ') || '')).toLowerCase();
    
    if (selectedAccessoryFilter === 'parts') 
      return ['פנימית', 'צמיג', 'טיובלס', 'שרשרת', 'פדל', 'בלם', 'רפידות'].some(k => searchStr.includes(k));
      
    if (selectedAccessoryFilter === 'electronics') 
      return ['בקר', 'סוללה', 'צג', 'פנס', 'מטען', 'חשמלי', 'smart'].some(k => searchStr.includes(k));
      
    if (selectedAccessoryFilter === 'safety') 
      return ['קסדה', 'מנעול', 'כפפות', 'מגני', 'מיגון'].some(k => searchStr.includes(k));
      
    return false;
  });

  return (
    <HashRouter>
      <Routes>
        {/* Shop Routes */}
        <Route path="/" element={
          <ShopLayout cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} products={products}>
            <Hero />
            <div id="shop" className="container mx-auto px-4 py-12">
              
              {/* Main Catalog Section */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-gray-800 mb-6 md:mb-0 relative inline-block">
                  הקטלוג שלנו
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 -z-10 transform -rotate-1"></span>
                </h2>
                
                {/* Main Catalog Filters */}
                <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex gap-1 overflow-x-auto max-w-full">
                  {['all', 'mountain', 'road', 'urban', 'electric'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                        selectedCategory === cat 
                          ? 'bg-primary text-white shadow-md transform scale-105' 
                          : 'text-gray-500 hover:text-primary hover:bg-purple-50'
                      }`}
                    >
                      {cat === 'all' ? 'הכל' : 
                       cat === 'mountain' ? 'הרים' :
                       cat === 'road' ? 'כביש' :
                       cat === 'urban' ? 'עירוני' : 'חשמלי'}
                    </button>
                  ))}
                </div>
              </div>
              
              <ProductGrid 
                products={mainCatalogProducts} 
                category={selectedCategory} 
                onAddToCart={addToCart} 
              />

              {/* Accessories Section */}
              <div className="mt-24 mb-12">
                 <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-3xl font-black text-gray-800 relative inline-block">
                        אביזרים משלימים
                        <span className="absolute bottom-1 left-0 w-full h-2 bg-secondary/30 -z-10 transform -rotate-1"></span>
                      </h2>
                      <div className="hidden md:block w-px h-8 bg-gray-200"></div>
                    </div>

                    {/* Accessories Filters */}
                    <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex gap-1 overflow-x-auto max-w-full">
                      {[
                        { id: 'all', label: 'הכל' },
                        { id: 'parts', label: 'חלפים' },
                        { id: 'electronics', label: 'אלקטרוניקה' },
                        { id: 'safety', label: 'מיגון ובטיחות' }
                      ].map(filter => (
                        <button
                          key={filter.id}
                          onClick={() => setSelectedAccessoryFilter(filter.id)}
                          className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                            selectedAccessoryFilter === filter.id
                              ? 'bg-secondary text-primary shadow-md transform scale-105' 
                              : 'text-gray-500 hover:text-primary hover:bg-lime-50'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                 </div>
                 
                 <ProductGrid 
                    products={filteredAccessories} 
                    category="accessories" 
                    onAddToCart={addToCart} 
                  />
              </div>

            </div>
          </ShopLayout>
        } />
        
        {/* Product Details Route */}
        <Route path="/product/:id" element={
          <ShopLayout cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} products={products}>
             <ProductPage products={products} onAddToCart={addToCart} />
          </ShopLayout>
        } />

        {/* About Route */}
        <Route path="/about" element={
          <ShopLayout cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} products={products}>
             <About />
          </ShopLayout>
        } />

        {/* Admin Route - Protected */}
        <Route path="/admin" element={
          currentUser ? (
            <AdminPanel 
              products={products} 
              currentUser={currentUser}
              onAddProduct={handleAddProduct} 
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct} 
              onLogout={handleAdminLogout}
            />
          ) : (
            <LoginPage onLogin={setCurrentUser} />
          )
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={totalPrice}
      />
    </HashRouter>
  );
};

export default App;