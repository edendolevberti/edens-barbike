import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://barbike.co.il/wp-content/uploads/2025/05/bg.svg" 
        alt="BarBike Hero" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent z-10"></div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center justify-between h-full">
        
        {/* Content Section */}
        <div className="md:w-2/3 text-right text-white space-y-8 pt-12 md:pt-0">
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight drop-shadow-2xl">
            אופניים וקורקינטים <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary to-white">בלי פשרות ⚡</span>
          </h1>
          
          {/* Description Text */}
          <div className="space-y-3 max-w-2xl">
            <p className="text-lg md:text-xl text-gray-100 font-medium leading-relaxed drop-shadow-md">
              ב־Bar Bike תמצאו אופניים וקורקינטים ממותגים מובילים, אביזרים וקסדות איכותיות – עם שירות מקצועי וליווי אישי.
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
              אנחנו שמים דגש על איכות, בטיחות ואמינות ומלווים אתכם מהבחירה ועד אחרי הקנייה.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-3 py-2">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
              <span className="text-xl">🚚</span>
              <span className="font-bold text-sm text-gray-100">משלוחים לכל הארץ</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
              <span className="text-xl">🛠️</span>
              <span className="font-bold text-sm text-gray-100">שירות ותיקונים</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
              <span className="text-xl">🔋</span>
              <span className="font-bold text-sm text-gray-100">מומחים לחשמליים</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              onClick={scrollToShop}
              className="group bg-secondary text-black font-black px-8 py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(203,245,58,0.4)] hover:shadow-[0_20px_30px_-15px_rgba(203,245,58,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              לקטלוג המלא
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold border border-white/20 transition-colors shadow-lg">
              צור קשר
            </button>
          </div>
        </div>

        {/* Empty right side to reveal background */}
        <div className="md:w-1/3 h-full"></div>
      </div>
    </div>
  );
};