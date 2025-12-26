import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Product } from '../types';
import { ArrowRight, ShoppingCart, Check, Truck, ShieldCheck, CreditCard } from 'lucide-react';

interface ProductPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ products, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs / Back Button */}
      <div className="mb-8">
        <Link 
          to="/#shop" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition-colors"
        >
          <ArrowRight size={20} />
          חזרה לקטלוג
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Image */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply"
              />
              {product.isNew && (
                <div className="absolute top-6 right-6 bg-secondary text-primary font-black px-4 py-2 rounded-full shadow-lg">
                  NEW ARRIVAL
                </div>
              )}
            </div>
            
            {/* Value Props under image */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl text-center flex flex-col items-center gap-2">
                <Truck className="text-primary" size={24} />
                <span className="text-xs font-bold text-gray-600">משלוח מהיר</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl text-center flex flex-col items-center gap-2">
                <ShieldCheck className="text-primary" size={24} />
                <span className="text-xs font-bold text-gray-600">אחריות מלאה</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl text-center flex flex-col items-center gap-2">
                <CreditCard className="text-primary" size={24} />
                <span className="text-xs font-bold text-gray-600">עד 12 תשלומים</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 font-bold text-sm mb-4">
                {product.category === 'mountain' ? 'אופני הרים' : 
                 product.category === 'road' ? 'אופני כביש' :
                 product.category === 'urban' ? 'אופני עיר' :
                 product.category === 'electric' ? 'אופניים חשמליים' : 'אביזרים'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black text-primary">₪{product.price.toLocaleString()}</span>
              <span className="text-xl text-gray-400 font-bold line-through mb-1.5">₪{(product.price * 1.2).toLocaleString()}</span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {product.specs && product.specs.length > 0 && (
              <div className="mb-10">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">מפרט טכני ויתרונות:</h3>
                <ul className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-secondary/30 text-primary flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-primary text-white text-xl font-black py-5 rounded-2xl shadow-xl shadow-primary/30 hover:bg-purple-600 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <ShoppingCart size={24} strokeWidth={2.5} />
                הוסף לסל הקניות
              </button>
              <p className="text-center text-gray-400 text-sm mt-4 font-medium">
                מלאי מוגבל! הזמן עכשיו לפני שייגמר.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};