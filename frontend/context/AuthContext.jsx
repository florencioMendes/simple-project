'use client'

import React, { createContext, useState, useEffect } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { poolData } from '@/config/cognito';

const AuthContext = createContext({});
const userPool = new CognitoUserPool(poolData);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setUser({
          username,
          ...result,
        });
        localStorage.setItem('user', JSON.stringify({ username, ...result }));
      },
      onFailure: (err) => {
        console.error('Login failed:', err);
        console.log(err.message || JSON.stringify(err));
      },
    });
  };

  const logout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const register = (username, password, email, phone) => {
    return new Promise((resolve, reject) => {
      const attributeList = [];
      const dataEmail = {
        Name: 'email',
        Value: email,
      };

      const dataPhone = {
        Name: 'phone_number',
        Value: phone,
      };

      const attributeEmail = new CognitoUserAttribute(dataEmail);
      const attributePhone = new CognitoUserAttribute(dataPhone);

      attributeList.push(attributeEmail);
      attributeList.push(attributePhone);

      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err.message);
        }
        resolve(result);
      });
    })
  };

  const confirmSignup = (username, code) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error('Confirmation failed:', err);
        console.log(err.message || JSON.stringify(err));
        return;
      }
      console.log('Confirmation successful:', result);
      console.log('Confirmation successful! You can now log in.');
    });
  };

  const resetPassword = (username) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        console.log('Password reset initiated:', data);
        alert('Password reset initiated. Please check your email for the verification code.');
      },
      onFailure: (err) => {
        console.error('Password reset failed:', err);
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  const confirmResetPassword = (username, code, newPassword) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: (result) => {
        console.log('Password reset confirmed:', result);
        alert('Password reset successful. You can now log in with your new password.');
      },
      onFailure: (err) => {
        console.error('Password reset confirmation failed:', err);
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, confirmSignup, resetPassword, confirmResetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }