import React from "react";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Home;
