import { Product } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Ghost Rider Pro 2024',
    price: 4500,
    category: 'mountain',
    image: 'https://picsum.photos/800/600?random=1',
    description: 'אופני הרים מקצועיים עם שיכוך מלא ושלדת קרבון קלה במיוחד.',
    specs: ['שלדת קרבון', 'גלגלי 29 אינץ׳', 'מערכת הילוכים Shimano XT'],
    isNew: true
  },
  {
    id: '2',
    name: 'Urban Glide E-Bike',
    price: 6200,
    category: 'electric',
    image: 'https://picsum.photos/800/600?random=2',
    description: 'אופניים חשמליים מתקפלים, מושלמים לנסיעה ברכבת ולמשרד.',
    specs: ['סוללה 48V', 'טווח 40 ק״מ', 'משקל 18 ק״ג']
  },
  {
    id: '3',
    name: 'SpeedMaster 300',
    price: 8900,
    category: 'road',
    image: 'https://picsum.photos/800/600?random=3',
    description: 'אופני כביש אווירודינמיים למהירויות גבוהות ותחרויות.',
    specs: ['בלמי דיסק', 'צמיגי Continental', 'משקל 7.2 ק״ג']
  },
  {
    id: '4',
    name: 'City Cruiser Classic',
    price: 2100,
    category: 'urban',
    image: 'https://picsum.photos/800/600?random=4',
    description: 'אופני עיר נוחים בעיצוב רטרו קלאסי לרכיבה יומיומית.',
    specs: ['מושב עור רחב', 'סלסלה קדמית', '3 הילוכים']
  },
  {
    id: '5',
    name: 'Trail Blazer X',
    price: 3200,
    category: 'mountain',
    image: 'https://picsum.photos/800/600?random=5',
    description: 'אופני זנב קשיח אגרסיביים לשבילים טכניים.',
    specs: ['בולם זעזועים קדמי 140ממ', 'צמיגי שטח רחבים']
  },
  {
    id: '6',
    name: 'Volt Commuter',
    price: 5500,
    category: 'electric',
    image: 'https://picsum.photos/800/600?random=6',
    description: 'אופניים חשמליים חזקים לעליות תלולות ונסיעות ארוכות.',
    specs: ['מנוע 250W', 'סוללה נשלפת', 'תצוגה דיגיטלית']
  },
  {
    id: '7',
    name: 'CST Premium Tube',
    price: 45,
    category: 'accessories',
    image: 'https://picsum.photos/800/600?random=7',
    description: 'פנימית איכותית 29 אינץ׳ עם חומר נוגד תקרים (ג׳יפה) לרכיבה שקטה.',
    specs: ['ונטיל צרפתי', 'עמידות גבוהה']
  },
  {
    id: '8',
    name: 'Smart Controller 500W',
    price: 350,
    category: 'accessories',
    image: 'https://picsum.photos/800/600?random=8',
    description: 'בקר מנוע חכם לאופניים חשמליים, כולל צג דיגיטלי ואפשרויות תכנות.',
    specs: ['36V/48V', 'תצוגת LED']
  }
];