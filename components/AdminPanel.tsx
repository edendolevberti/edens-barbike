import React, { useState, useMemo, useEffect } from 'react';
import { Product, User } from '../types';
import { db } from '../services/database';
import { 
  Plus, Trash2, Tag, ArrowRight, LayoutDashboard, 
  Package, Settings, LogOut, Search, TrendingUp, DollarSign, Edit2, Image as ImageIcon, X, Users, Shield
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  currentUser: User;
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onLogout: () => void;
}

const initialProductFormState: Partial<Product> = {
  category: 'mountain',
  price: 0,
  name: '',
  description: '',
  image: '',
  specs: [],
  isNew: false
};

const initialUserFormState: Partial<User> = {
  username: '',
  password: '',
  fullName: '',
  role: 'admin'
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  currentUser,
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data States
  const [users, setUsers] = useState<User[]>([]);

  // Form States
  const [productFormData, setProductFormData] = useState<Partial<Product>>(initialProductFormState);
  const [userFormData, setUserFormData] = useState<Partial<User>>(initialUserFormState);
  const [userFormError, setUserFormError] = useState('');

  // Load Users on mount or tab change
  useEffect(() => {
    if (activeTab === 'users') {
      setUsers(db.getAllUsers());
    }
  }, [activeTab]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.category.includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // --- Product Handlers ---
  const handleOpenAddProduct = () => {
    setIsEditingProduct(false);
    setProductFormData({
      ...initialProductFormState,
      image: `https://picsum.photos/800/600?random=${Date.now()}`
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setIsEditingProduct(true);
    setProductFormData({ ...product });
    setShowProductModal(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productFormData.name && productFormData.price) {
      if (isEditingProduct && productFormData.id) {
        onUpdateProduct(productFormData as Product);
      } else {
        onAddProduct({
          ...productFormData,
          id: Date.now().toString(),
          specs: productFormData.specs || ['איכות גבוהה'],
        } as Product);
      }
      setShowProductModal(false);
    }
  };

  // --- User Handlers ---
  const handleOpenAddUser = () => {
    setUserFormData(initialUserFormState);
    setUserFormError('');
    setShowUserModal(true);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userFormData.username && userFormData.password && userFormData.fullName) {
        db.createUser(userFormData as User);
        setUsers(db.getAllUsers()); // Refresh list
        setShowUserModal(false);
      }
    } catch (err: any) {
      setUserFormError(err.message);
    }
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
        try {
            db.deleteUser(id);
            setUsers(db.getAllUsers());
        } catch (err: any) {
            alert(err.message);
        }
    }
  };

  const totalInventoryValue = products.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans" dir="rtl">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-l border-gray-200 flex flex-col shadow-xl z-20">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <span className="text-2xl font-black text-primary tracking-tight">Admin<span className="text-secondary">Panel</span></span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard size={20} />
            לוח בקרה
          </button>
          
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'products' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Package size={20} />
            מוצרים ומלאי
          </button>

          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'users' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Users size={20} />
            ניהול משתמשים
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Settings size={20} />
            הגדרות מערכת
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors px-4 py-2 font-medium"
          >
            <LogOut size={18} />
            יציאה מהמערכת
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex justify-between items-center px-8">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === 'products' ? 'ניהול מוצרים' : 
             activeTab === 'users' ? 'ניהול משתמשים' : 'לוח בקרה'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-left">
                <p className="font-bold text-gray-800 text-sm">{currentUser.fullName}</p>
                <p className="text-xs text-gray-400 capitalize">{currentUser.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
              {currentUser.fullName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">סה"כ מוצרים</p>
                  <h3 className="text-3xl font-black text-gray-800">{products.length}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Package size={24} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">שווי מלאי</p>
                  <h3 className="text-3xl font-black text-gray-800">₪{totalInventoryValue.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">משתמשים רשומים</p>
                  <h3 className="text-3xl font-black text-gray-800">{db.getAllUsers().length}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                  <Users size={24} />
                </div>
              </div>
            </div>
          )}

          {/* Product Management Section */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                   <h3 className="font-bold text-lg text-gray-800 whitespace-nowrap">רשימת מלאי</h3>
                   <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">{filteredProducts.length} מוצרים</div>
                </div>

                <div className="flex w-full md:w-auto gap-3">
                  <div className="relative flex-grow md:flex-grow-0">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="חיפוש מוצר..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 pl-4 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm"
                    />
                  </div>
                  <button 
                    onClick={handleOpenAddProduct}
                    className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-purple-600 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 text-sm whitespace-nowrap"
                  >
                    <Plus size={18} />
                    הוסף חדש
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-medium">מוצר</th>
                      <th className="px-6 py-4 font-medium">קטגוריה</th>
                      <th className="px-6 py-4 font-medium">מחיר</th>
                      <th className="px-6 py-4 font-medium">סטטוס</th>
                      <th className="px-6 py-4 font-medium">פעולות</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 shadow-sm" />
                            <div>
                              <p className="font-bold text-gray-800">{product.name}</p>
                              <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            product.category === 'accessories' 
                            ? 'bg-blue-50 text-blue-700 border-blue-100' 
                            : 'bg-purple-50 text-purple-700 border-purple-100'
                          }`}>
                            {product.category === 'accessories' ? 'אביזרים' : 
                             product.category === 'mountain' ? 'הרים' :
                             product.category === 'road' ? 'כביש' :
                             product.category === 'urban' ? 'עירוני' : 'חשמלי'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-700">
                          ₪{product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {product.isNew ? (
                            <span className="text-secondary bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold">חדש</span>
                          ) : (
                            <span className="text-gray-400 text-xs">רגיל</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleOpenEditProduct(product)}
                              className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                              title="ערוך מוצר"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => onDeleteProduct(product.id)}
                              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="מחק מוצר"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* User Management Section */}
          {activeTab === 'users' && (
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">ניהול הרשאות ומשתמשים</h3>
                        <p className="text-sm text-gray-400">הוספה והסרה של מנהלי מערכת</p>
                    </div>
                    <button 
                        onClick={handleOpenAddUser}
                        className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-purple-600 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 text-sm"
                    >
                        <Plus size={18} />
                        הוסף מנהל
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">שם משתמש</th>
                                <th className="px-6 py-4 font-medium">שם מלא</th>
                                <th className="px-6 py-4 font-medium">תפקיד</th>
                                <th className="px-6 py-4 font-medium">תאריך יצירה</th>
                                <th className="px-6 py-4 font-medium">פעולות</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-bold text-gray-800">{user.username}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.fullName}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-100">
                                            <Shield size={10} />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.id !== currentUser.id ? (
                                             <button 
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="מחק משתמש"
                                             >
                                                <Trash2 size={16} />
                                             </button>
                                        ) : (
                                            <span className="text-xs text-gray-300 italic">זה אתה</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
          )}

        </main>
      </div>

      {/* Add/Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
            <div className="bg-primary px-6 py-5 text-white flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold">{isEditingProduct ? 'עריכת מוצר' : 'הוספת מוצר חדש'}</h3>
              <button onClick={() => setShowProductModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="flex gap-6 flex-col md:flex-row">
                
                {/* Left Side - Image Preview */}
                <div className="md:w-1/3 space-y-3">
                  <label className="block text-sm font-bold text-gray-700">תצוגה מקדימה</label>
                  <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative group">
                    {productFormData.image ? (
                      <img src={productFormData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400 text-center p-4">
                        <ImageIcon className="mx-auto mb-2 opacity-50" size={32} />
                        <span className="text-xs">הכנס קישור לתמונה</span>
                      </div>
                    )}
                  </div>
                  <input 
                    type="text" 
                    value={productFormData.image}
                    onChange={e => setProductFormData({...productFormData, image: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:border-primary outline-none text-left"
                    placeholder="https://example.com/image.jpg"
                    dir="ltr"
                  />
                </div>

                {/* Right Side - Fields */}
                <div className="md:w-2/3 space-y-4">
                   <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">שם המוצר</label>
                    <input 
                      type="text" 
                      value={productFormData.name}
                      onChange={e => setProductFormData({...productFormData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:ring-0 outline-none transition-all font-medium"
                      placeholder="לדוגמה: אופני הרים X200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">מחיר (₪)</label>
                      <input 
                        type="number" 
                        value={productFormData.price || ''}
                        onChange={e => setProductFormData({...productFormData, price: Number(e.target.value)})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:ring-0 outline-none transition-all font-medium"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">קטגוריה</label>
                      <select 
                        value={productFormData.category}
                        onChange={e => setProductFormData({...productFormData, category: e.target.value as any})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:ring-0 outline-none transition-all font-medium cursor-pointer"
                      >
                        <option value="mountain">אופני הרים</option>
                        <option value="road">אופני כביש</option>
                        <option value="urban">אופני עיר</option>
                        <option value="electric">אופניים חשמליים</option>
                        <option value="accessories">אביזרים וציוד</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">תיאור המוצר</label>
                    <textarea 
                      value={productFormData.description}
                      onChange={e => setProductFormData({...productFormData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:ring-0 outline-none transition-all font-medium h-24 resize-none text-sm"
                      placeholder="כתוב תיאור קצר וקולע..."
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isNew"
                      checked={productFormData.isNew || false}
                      onChange={e => setProductFormData({...productFormData, isNew: e.target.checked})}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="isNew" className="text-sm font-medium text-gray-700 select-none">סמן כמוצר חדש (New Arrival)</label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="w-1/3 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  ביטול
                </button>
                <button 
                  type="submit"
                  className="w-2/3 bg-primary text-secondary font-black py-4 rounded-xl shadow-lg hover:brightness-110 hover:shadow-primary/40 transform hover:-translate-y-1 transition-all"
                >
                  {isEditingProduct ? 'שמור שינויים' : 'הוסף למלאי'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
                <div className="bg-gray-900 px-6 py-5 text-white flex justify-between items-center shrink-0">
                    <h3 className="text-xl font-bold">הוספת מנהל חדש</h3>
                    <button onClick={() => setShowUserModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleUserSubmit} className="p-8 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">שם משתמש (לכניסה)</label>
                        <input 
                            type="text" 
                            value={userFormData.username}
                            onChange={e => setUserFormData({...userFormData, username: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none"
                            dir="ltr"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">שם מלא (לתצוגה)</label>
                        <input 
                            type="text" 
                            value={userFormData.fullName}
                            onChange={e => setUserFormData({...userFormData, fullName: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">סיסמא</label>
                        <input 
                            type="text" 
                            value={userFormData.password}
                            onChange={e => setUserFormData({...userFormData, password: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none"
                            dir="ltr"
                            required
                        />
                    </div>

                    {userFormError && (
                        <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">{userFormError}</p>
                    )}

                    <div className="pt-4 flex gap-3">
                         <button 
                            type="button"
                            onClick={() => setShowUserModal(false)}
                            className="w-1/3 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                        >
                            ביטול
                        </button>
                        <button 
                            type="submit"
                            className="w-2/3 bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-all"
                        >
                            צור משתמש
                        </button>
                    </div>
                </form>
           </div>
        </div>
      )}
    </div>
  );
};