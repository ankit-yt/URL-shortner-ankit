import React from "react";
import UrlForm from "../components/UrlForm";
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-2xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🔗 Link Shortener
        </h1>
        <UrlForm />
      </div>
    </div>
  );
}

export default Home;
