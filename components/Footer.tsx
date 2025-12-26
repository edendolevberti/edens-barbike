import React from 'react';
import { Bike, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Bike className="text-secondary" size={32} />
              <span className="text-2xl font-black">בר<span className="text-primary">בייק</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              חנות האופניים המובילה בישראל. אנחנו מאמינים שרכיבה היא לא רק ספורט, אלא דרך חיים. הצטרפו למהפכה.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">ניווט מהיר</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-secondary transition-colors">דף הבית</Link></li>
              <li><Link to="/#shop" className="hover:text-secondary transition-colors">קטלוג</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">אודות</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">צור קשר</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-secondary" />
                רחוב הירקון 45, תל אביב
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary" />
                054-304-3045
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary" />
                hello@barbike.co.il
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">עקבו אחרינו</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-secondary hover:text-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-secondary hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-secondary hover:text-primary transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2024 בר בייק. כל הזכויות שמורות.</p>
          <div className="flex flex-wrap gap-6 items-center">
            <a href="#" className="hover:text-white transition-colors">תנאי שימוש</a>
            <a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a>
            <Link to="/admin" className="flex items-center gap-1.5 hover:text-white transition-colors opacity-60 hover:opacity-100">
              <Lock size={12} />
              <span>כניסת מנהלים</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};