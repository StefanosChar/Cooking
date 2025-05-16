import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Define user type
interface User {
  id: number;
  email: string;
  createdAt: string;
}

// Define AuthContext type
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{success: boolean;error?: string;}>;
  register: (email: string, password: string) => Promise<{success: boolean;error?: string;}>;
  logout: () => void;
  isLoading: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  isLoading: false
});

// Provider component
export const AuthProvider = ({ children }: {children: ReactNode;}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setIsLoading(false);
  }, []);

  // Login function - simulated for now
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // In a real app, this would be an API call
      // This is mock data for demonstration
      if (email && password) {
        // Simulating a server delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock successful login
        const mockUser = {
          id: 1,
          email,
          createdAt: new Date().toISOString()
        };

        const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15);

        // Save to state and localStorage
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', mockToken);

        return { success: true };
      } else {
        return { success: false, error: 'Email and password are required' };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function - simulated for now
  const register = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // In a real app, this would be an API call
      // This is mock data for demonstration
      if (email && password) {
        // Simulating a server delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if email already exists in localStorage (mock check)
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userExists = existingUsers.some((u: {email: string;}) => u.email === email);

        if (userExists) {
          return { success: false, error: 'Email already in use' };
        }

        // Mock successful registration
        const newUser = {
          id: existingUsers.length + 1,
          email,
          createdAt: new Date().toISOString()
        };

        // Save new user to "registeredUsers" for mock persistence
        localStorage.setItem('registeredUsers', JSON.stringify([...existingUsers, { email, password }]));

        // Auto-login after registration
        const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15);

        setUser(newUser);
        setToken(mockToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', mockToken);

        return { success: true };
      } else {
        return { success: false, error: 'Email and password are required' };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>);

};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};