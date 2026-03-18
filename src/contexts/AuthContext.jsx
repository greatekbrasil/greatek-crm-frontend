import React, { createContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext(null);

const DEFAULT_USERS = {
  'marketing@greatek.com.br': { id: 'dir-01', name: 'Diretoria Greatek', role: 'diretoria', defaultSecret: 'GTK@2026' },
  'rodrigo.santos@greatek.com.br': { id: 'ven-01', name: 'Rodrigo Santos', role: 'vendedor', defaultSecret: '123' },
  'carlos.silva@greatek.com.br': { id: 'ven-02', name: 'Carlos Silva', role: 'vendedor', defaultSecret: '123' },
  'vitoria.abreu@greatek.com.br': { id: 'ven-03', name: 'Vitória Abreu', role: 'vendedor', defaultSecret: '123' },
  'lucas.teixeira@greatek.com.br': { id: 'ven-04', name: 'Lucas Teixeira', role: 'vendedor', defaultSecret: '123' },
  'lucas.santos@greatek.com.br': { id: 'ven-05', name: 'Lucas Santos', role: 'vendedor', defaultSecret: '123' },
  'rafael.morais@greatek.com.br': { id: 'ven-06', name: 'Rafael Morais', role: 'vendedor', defaultSecret: '123' },
  'paula.rosa@greatek.com.br': { id: 'ven-07', name: 'Paula Rosa', role: 'vendedor', defaultSecret: '123' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      // Valida se o objeto salvo tem a estrutura nova. Se estiver velho (sem role ou id), limpa.
      if (!parsed.id || !parsed.role) {
        localStorage.removeItem('user');
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  });
  
  const [isInitialized, setIsInitialized] = useState(false);

  // Simulação de banco de dados de senhas no localStorage
  const [passwordsDb, setPasswordsDb] = useState(() => {
    const saved = localStorage.getItem('passwords_db');
    if (saved) return JSON.parse(saved);
    
    const initialDb = {};
    Object.keys(DEFAULT_USERS).forEach(email => {
      initialDb[email] = DEFAULT_USERS[email].defaultSecret;
    });
    localStorage.setItem('passwords_db', JSON.stringify(initialDb));
    return initialDb;
  });

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const login = useCallback(async (email, password) => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerEmail = email.toLowerCase();
    const foundUser = DEFAULT_USERS[lowerEmail];
    
    if (!foundUser) {
      return { success: false, message: 'Usuário não encontrado.' };
    }
    
    const correctPassword = passwordsDb[lowerEmail];
    
    if (password !== correctPassword) {
      return { success: false, message: 'Senha incorreta.' };
    }
    
    const userData = { ...foundUser, email: lowerEmail };
    
    // Se a senha for a padrão '123', marcamos que precisa resetar
    // (Exceto diretoria que tem senha própria GTK@2026, mas o user pediu reset geral no 1º acesso)
    const needsReset = password === '123';
    
    if (needsReset) {
      // Login "parcial": o usuário existe, mas está bloqueado para troca de senha
      setUser({ ...userData, mustReset: true });
      localStorage.setItem('user', JSON.stringify({ ...userData, mustReset: true }));
      return { success: true, requireReset: true, role: foundUser.role };
    }
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', 'mock-token-' + foundUser.id);
    
    return { success: true, requireReset: false, role: foundUser.role };
  }, [passwordsDb]);

  const resetPassword = useCallback(async (newPassword) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!user) return { success: false, message: 'Sessão expirada.' };
    
    const updatedDb = { ...passwordsDb, [user.email]: newPassword };
    setPasswordsDb(updatedDb);
    localStorage.setItem('passwords_db', JSON.stringify(updatedDb));
    
    const updatedUser = { ...user, mustReset: false };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('accessToken', 'mock-token-' + user.id);
    
    return { success: true };
  }, [user, passwordsDb]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }, []);

  const isAuthenticated = !!user;

  const isDirector = useCallback(() => user?.role === 'diretoria', [user]);
  const isVendedor = useCallback(() => user?.role === 'vendedor', [user]);
  const getSalesmanInstance = useCallback(() => {
    // Para vendedores da Greatek, a parte antes do @ é a instância.
    // Ex: rodrigo.santos@greatek... -> rodrigo.santos
    if (!user || user.role !== 'vendedor') return null;
    return user.email.split('@')[0];
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      resetPassword, 
      isAuthenticated, 
      isInitialized,
      isDirector,
      isVendedor,
      getSalesmanInstance
    }}>
      {children}
    </AuthContext.Provider>
  );
};

