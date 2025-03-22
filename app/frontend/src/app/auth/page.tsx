"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "@/app/frontend/src/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Footer from "@/app/frontend/src/components/footer/Footer";
import Cart from "@/app/frontend/src/components/cart/Cart";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      try {
          // api login request
          const response = await fetch('/api/auth', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.error || 'login failed');
          }

          // update user context
          login(data.user.email);

          // Redirection vers la page d'accueil
          router.push("/");
      } catch (error: any) {
          setError(error.message || "login failed");
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <>
      <Navbar />
      <Cart />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800">Se connecter</h2>
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

          <form className="mt-4" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300 text-black"
                placeholder="Entrez votre email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Mot de passe</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300 text-black"
                placeholder="Entrez votre mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

              <button
                  type="submit"
                  className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
              >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
          </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Pas encore de compte ?
                <a href="/frontend/src/app/inscription" className="text-blue-600 hover:underline ml-1">
                    Créer un compte
                </a>
          </p>
        </div>
      </div>
      <Footer /> 
    </>
  );
}
