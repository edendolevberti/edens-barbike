import React from 'react';
import { Bike, Users, ShieldCheck, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section of About */}
      <div className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img 
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            הסיפור של <span className="text-primary">BarBike</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            יותר מסתם חנות אופניים. אנחנו קהילה של רוכבים, חולמים ומכורים לאדרנלין. 
            המסע שלנו התחיל במוסך קטן והפך למותג שמוביל את תרבות הרכיבה בישראל.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
                <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-sm mb-4">
                    החזון שלנו
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-6">להנגיש את חופש התנועה לכולם</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                        ב-BarBike אנחנו מאמינים שאופניים הם הכלי האולטימטיבי לשינוי חיים. הם לא רק כלי תחבורה, אלא דרך להתחבר לטבע, לעיר ולעצמך.
                    </p>
                    <p>
                        אנחנו מקפידים לבחור בקפידה כל דגם ודגם שנכנס לחנות שלנו, החל מאופני כניסה לרוכבים מתחילים ועד למכונות מרוץ משומנות למקצוענים. המטרה שלנו היא לוודא שכל לקוח יוצא מכאן עם חיוך ועם הזוג המושלם עבורו.
                    </p>
                </div>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 bg-secondary rounded-3xl transform rotate-3 opacity-20"></div>
                <img 
                    src="https://images.unsplash.com/photo-1558507304-7c2a74c43926?q=80&w=1000&auto=format&fit=crop" 
                    alt="Mechanic working" 
                    className="relative rounded-3xl shadow-2xl z-10"
                />
            </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bike size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">מקצועיות ללא פשרות</h3>
                <p className="text-sm text-gray-500">צוות של מומחים שחיים ונושמים אופניים 24/7.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-secondary/20 text-yellow-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">אחריות מורחבת</h3>
                <p className="text-sm text-gray-500">אנחנו עומדים מאחורי כל בורג וכל שלדה שאנחנו מוכרים.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">קהילה תומכת</h3>
                <p className="text-sm text-gray-500">קבוצות רכיבה, אירועים ומפגשים ללקוחות שלנו.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">שירות מהלב</h3>
                <p className="text-sm text-gray-500">אנחנו כאן בשבילכם, לפני, במהלך ואחרי הקנייה.</p>
            </div>
        </div>

      </div>
    </div>
  );
};