"use client";

import { useState } from "react";
import { useAuth } from "@/app/frontend/src/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Footer from "@/app/frontend/src/components/footer/Footer";
import Cart from "@/app/frontend/src/components/cart/Cart";

export default function RegisterPage() {
  const [, setNom] = useState("");
    // const [nom, setNom] = useState("");
  const [, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [, setPassword] = useState("");
  const [, setAdresse] = useState("");
  const [, setTelephone] = useState("");

  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({ email }); // Simule une inscription
    router.push("/"); // Redirige vers la page d'accueil
  };

  return (
    <>
      <Navbar /> 
      <Cart />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800">Créer un compte</h2>

          <form className="mt-4" onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Nom</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300"
                placeholder="Votre nom"
                required
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Prénom</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300"
                placeholder="Votre prénom"
                required
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300"
                placeholder="Votre email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Mot de passe</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300"
                placeholder="Votre mot de passe"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Adresse</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300"
                placeholder="Votre adresse"
                required
                onChange={(e) => setAdresse(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Téléphone</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-300"
                placeholder="Votre numéro de téléphone"
                required
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
                {"S'inscrire"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Déjà un compte ?
            <a href="/frontend/src/app/auth" className="text-blue-600 hover:underline ml-1">Se connecter</a>
          </p>
        </div>
      </div>
      <Footer /> 
    </>
  );
}
