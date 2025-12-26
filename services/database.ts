import { Product, User } from '../types';
import { initialProducts } from '../constants';

// Database Keys
const DB_KEYS = {
  PRODUCTS: 'barbike_db_products_v1',
  USERS: 'barbike_db_users_v1'
};

// Initial Admin User
const DEFAULT_ADMIN: User = {
  id: '1',
  username: 'admin',
  password: '123', // Default password
  fullName: 'מנהל ראשי',
  role: 'admin',
  createdAt: new Date().toISOString()
};

class DatabaseService {
  constructor() {
    this.initialize();
  }

  private initialize() {
    // Initialize Products Table
    if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    }

    // Initialize Users Table
    if (!localStorage.getItem(DB_KEYS.USERS)) {
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify([DEFAULT_ADMIN]));
    }
  }

  // --- Products Table Operations ---

  getAllProducts(): Product[] {
    try {
      const data = localStorage.getItem(DB_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveProduct(product: Product): Product {
    const products = this.getAllProducts();
    const index = products.findIndex(p => p.id === product.id);
    
    if (index >= 0) {
      // Update
      products[index] = product;
    } else {
      // Insert
      products.unshift(product);
    }
    
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
    return product;
  }

  deleteProduct(id: string): void {
    const products = this.getAllProducts().filter(p => p.id !== id);
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
  }

  // --- Users Table Operations ---

  getAllUsers(): User[] {
    try {
      const data = localStorage.getItem(DB_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  authenticate(username: string, password: string): User | null {
    const users = this.getAllUsers();
    // Simple string comparison. In real app -> bcrypt.compare()
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getAllUsers();
    
    if (users.some(u => u.username === user.username)) {
      throw new Error('שם משתמש כבר קיים במערכת');
    }

    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    return newUser;
  }

  deleteUser(id: string): void {
    // Prevent deleting the last admin
    const users = this.getAllUsers();
    if (users.length <= 1) {
      throw new Error('לא ניתן למחוק את המשתמש האחרון במערכת');
    }
    
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(filtered));
  }
}

export const db = new DatabaseService();