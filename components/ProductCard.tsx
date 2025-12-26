import React from 'react';
import { Product } from '../types';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-gray-100 flex flex-col h-full relative overflow-hidden">
      
      {/* Image Area - Link to Product Page */}
      <Link to={`/product/${product.id}`} className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-50 mb-4 block">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply filter contrast-[1.05] transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-secondary text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10">
            New Arrival
          </span>
        )}
      </Link>

      {/* Floating Add Button positioned over image corner */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          onAddToCart(product);
        }}
        className="absolute top-[calc(aspect-[4/3]-20px)] left-6 z-20 bg-white text-gray-900 p-3 rounded-full shadow-lg transform translate-y-0 group-hover:scale-110 transition-all duration-300 hover:bg-primary hover:text-white border border-gray-100"
      >
        <Plus size={20} strokeWidth={3} />
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col px-2">
        <div className="mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
          <Link to={`/product/${product.id}`} className="block group-hover:text-primary transition-colors">
            <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">{product.name}</h3>
          </Link>
        </div>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold line-through">₪{(product.price * 1.2).toLocaleString()}</span>
            <span className="text-xl font-black text-gray-900">₪{product.price.toLocaleString()}</span>
          </div>
          
          <Link 
            to={`/product/${product.id}`}
            className="text-sm font-bold text-gray-400 flex items-center gap-1 hover:text-primary transition-colors"
          >
            פרטים נוספים
            <ArrowLeft size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};