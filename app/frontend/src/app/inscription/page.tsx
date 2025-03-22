"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "@/app/frontend/src/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Footer from "@/app/frontend/src/components/footer/Footer";
import Cart from "@/app/frontend/src/components/cart/Cart";

export default function RegisterPage() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

      try {
          // api register request
          const response = await fetch('/api/inscription', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email,
                  password,
                  nom,
                  prenom,
                  adresse,
                  telephone
              }),
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.error || 'inscription failed');
          }

          // update user context
          register({ email: data.user.email });

          // Redirige vers la page d'accueil
          router.push("/");
      } catch (error: any) {
          setError(error.message || "inscription failed");
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
          <h2 className="text-2xl font-bold text-center text-gray-800">Créer un compte</h2>
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}
          <form className="mt-4" onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Nom</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300 text-black"
                placeholder="Votre nom"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Prénom</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300 text-black"
                placeholder="Votre prénom"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300 text-black"
                placeholder="Votre email"
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
                placeholder="Votre mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Adresse</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300 text-black"
                placeholder="Votre adresse"
                required
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Téléphone</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300 text-black"
                placeholder="Votre numéro de téléphone"
                required
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>

              <button
                  type="submit"
                  className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
              >
                  {isLoading ? "en cours de s'inscrire..." : "S'inscrire"}
              </button>
          </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Déjà un compte ?
                <a href="/frontend/src/app/auth" className="text-blue-600 hover:underline ml-1">Se connecter</a>
            </p>
        </div>
      </div>
        <Footer/>
    </>
  );
}
