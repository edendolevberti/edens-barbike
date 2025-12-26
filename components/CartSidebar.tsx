import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  total: number;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemove, 
  onUpdateQuantity,
  total 
}) => {
  
  const handleCheckout = () => {
    const phoneNumber = "972543043045"; // The requested phone number
    
    // Construct the message
    let message = `היי, אשמח לבצע הזמנה מאתר BarBike:%0A%0A`;
    
    cartItems.forEach(item => {
      message += `▫️ *${item.name}* (x${item.quantity}) - ₪${(item.price * item.quantity).toLocaleString()}%0A`;
    });
    
    message += `%0A*סה"כ לתשלום: ₪${total.toLocaleString()}*%0A%0A`;
    message += `אשמח לקבל פרטים לתשלום ומשלוח.`;

    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-out flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-primary text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            הסל שלי
            <span className="text-xs bg-secondary text-primary px-2 py-0.5 rounded-full font-bold">
              {cartItems.reduce((a,b) => a + b.quantity, 0)}
            </span>
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                 <Trash2 size={48} className="text-gray-300" />
              </div>
              <p className="text-lg font-medium">הסל שלך ריק</p>
              <p className="text-sm">זה הזמן למלא אותו בציוד שווה!</p>
              <button onClick={onClose} className="mt-6 text-primary font-bold hover:underline">
                חזרה לחנות
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg bg-white"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                  <p className="text-primary font-bold text-sm">₪{item.price.toLocaleString()}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">סה"כ לתשלום</span>
              <span className="text-2xl font-black text-gray-900">₪{total.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <MessageCircle size={24} />
              שלח הזמנה בוואטסאפ
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              לחיצה תעביר אותך לשיחה עם נציג להשלמת הרכישה
            </p>
          </div>
        )}
      </div>
    </>
  );
};