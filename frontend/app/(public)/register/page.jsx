'use client'

import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function RegisterPage() {
  const { register, confirmSignup } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password, email, phone)
      .then(result => {
        alert(result)
        setConfirm(true)
      })
      .catch(err => {
        setError(err)
      })
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    confirmSignup(username, code);
  };

  const policyPassword = (e) => {
    let erro = "";

    if(!(e.length >= 8)){
      erro = "A senha precisa ter pelomenos 8 dígitos"

    }
    if(!(e.match(/[^a-zA-Z\d]/))) {
      erro = "A senha precisa ter pelomenos 1 caracter especial. Ex: @!#."

    }
    if(!(e.match(/\d/))) {
      erro = "A senha precisa ter pelomenos 1 dígito númerico"

    }
    if(!(e.match(/[A-Z]/) && e.match(/[a-z]/))) {
      erro = "A senha precisa ter letras maiúsculas e minúsculas"

    }

    if(erro != "") {
      setError(erro)
    } else {
      setError("")
    }
  }

  return (
    !confirm ?
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">nome de usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">celular</label>
            <input
              type="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {policyPassword(e.target.value); setPassword(e.target.value)}}
              required
            />
          </div>
          <div>
            <label htmlFor="password">confirme a senha</label>
            <input
              type="password"
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {password != confirmPassword ? <h1>As senhas não são iguais!</h1> : null}
          <button type="submit">Register</button>
        </form>
        {error ? <h1>{error}</h1> : null}
      </div>
      :
      <div>
        <h1>Confirm Registration</h1>
        <form onSubmit={handleConfirm}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="code">Confirmation Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Confirm</button>
        </form>
      </div>
  );
}
