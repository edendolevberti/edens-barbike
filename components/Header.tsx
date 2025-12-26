import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Bike, Search, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  products: Product[];
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, products }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search Logic
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.category.toLowerCase().includes(term)
    );
    setSearchResults(results.slice(0, 5)); // Limit to 5 results
  }, [searchTerm, products]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchTerm('');
    setShowResults(false);
  };

  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#shop');
    } else {
      const shopElement = document.getElementById('shop');
      if (shopElement) {
        shopElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToShop = () => {
    if (location.pathname !== '/') {
      navigate('/#shop');
    } else {
      const shopElement = document.getElementById('shop');
      if (shopElement) {
        shopElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'דף הבית', path: '/' },
    { name: 'קטלוג', path: '/#shop', onClick: handleShopClick },
    { name: 'אודות', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/30 transform transition-transform group-hover:rotate-12">
            <Bike size={24} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-gray-900 leading-none tracking-tight">
              Bar<span className="text-primary">Bike</span>
            </span>
            <span className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">Premium Store</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 mx-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={link.onClick}
              className={`text-sm font-bold transition-colors duration-200 ${
                (location.pathname === link.path) || (link.path === '/#shop' && location.hash === '#shop')
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search - Functional with Autocomplete */}
        <div className="hidden lg:flex flex-1 max-w-sm relative group mx-4" ref={searchRef}>
          <input 
            type="text" 
            placeholder="חיפוש אופניים, אביזרים..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
          />
          
          {searchTerm ? (
            <button 
              onClick={() => { setSearchTerm(''); setSearchResults([]); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          ) : (
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
          )}

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 animate-fadeIn z-[60]">
              {searchResults.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category === 'accessories' ? 'אביזרים' : 'אופניים'}</p>
                  </div>
                  <span className="text-xs font-bold text-primary">₪{product.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
          
          {showResults && searchTerm && searchResults.length === 0 && (
             <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-4 text-center text-gray-500 text-sm z-[60]">
               לא נמצאו מוצרים
             </div>
          )}
        </div>

        {/* Actions */}
        <nav className="flex items-center gap-4 shrink-0">
          <button 
            onClick={scrollToShop}
            className="hidden md:block bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/30 hover:bg-purple-600 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            קנה עכשיו
          </button>

          <button 
            onClick={onOpenCart}
            className="relative p-3 rounded-full hover:bg-gray-100 transition-all group"
          >
            <ShoppingCart size={24} className="text-gray-700 group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-secondary text-primary font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-pulse border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};