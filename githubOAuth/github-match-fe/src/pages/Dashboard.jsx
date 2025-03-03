import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log("line 9 at dashboard",searchParams);
    const receivedToken = searchParams.get("token");
    if (receivedToken) {
      setToken(receivedToken);
      localStorage.setItem("jwt", receivedToken); // Store token for future use
    }
  }, [searchParams]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">GitHub OAuth Dashboard</h1>
      {token ? (
        <p>JWT Token: {token}</p>
      ) : (
        <p>No token found. Please login again.</p>
      )}
    </div>
  );
};

export default Dashboard;
