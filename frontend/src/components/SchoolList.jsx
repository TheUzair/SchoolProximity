import { useState, useEffect } from "react";
import axios from "axios";

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserLocationAndSchools = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLoading(true);
            setMessage("Fetching nearby schools...");
            try {
              const { data } = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/listSchools?latitude=${latitude}&longitude=${longitude}`
              );
              if (data.length === 0) {
                setMessage("No schools found nearby.");
              } else {
                setMessage(`Found ${data.length} schools nearby.`);
              }
              setSchools(data);
            } catch (err) {
              console.error(err);
              setError("Failed to fetch schools. Please try again later.");
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Failed to get location. Please enable location services.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocationAndSchools();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Nearby Schools</h2>
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <svg
            className="animate-spin h-5 w-5 text-blue-500 mr-3"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <p className="text-blue-500">Loading nearby schools...</p>
        </div>
      )}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      <ul className="list-disc pl-5">
        {schools.map((s) => (
          <li key={s.id} className="mb-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-gray-500">{s.distance.toFixed(2)} km</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolList;