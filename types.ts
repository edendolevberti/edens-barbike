export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'mountain' | 'road' | 'urban' | 'electric' | 'accessories';
  image: string;
  description: string;
  specs?: string[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  username: string;
  password: string; // Note: In a real backend, this would be hashed
  fullName: string;
  role: 'admin' | 'editor';
  createdAt: string;
}