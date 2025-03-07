import { useState } from "react";
import axios from "axios";
import { z } from "zod";

// Define a schema using Zod
const schoolSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  address: z.string().min(1, "Address cannot be empty"),
  latitude: z.number().min(-90, "Latitude must be between -90 and 90").max(90, "Latitude must be between -90 and 90"),
  longitude: z.number().min(-180, "Longitude must be between -180 and 180").max(180, "Longitude must be between -180 and 180"),
});

const AddSchoolForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateInputs = () => {
    try {
      schoolSchema.parse({
        name,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
      setError("");
      return true;
    } catch (e) {
      setError(e.errors[0].message);
      return false;
    }
  };

  const addSchool = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setSuccess("");
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/addSchool`, {
        name,
        address,
        latitude,
        longitude,
      });
      setSuccess("School added successfully!");
      resetFields();
    } catch (err) {
      console.error(err);
      setError("Failed to add school. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setName("");
    setAddress("");
    setLatitude("");
    setLongitude("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add School</h2>
      <div className="mb-4">
        <label className="block mb-4">
          <span className="text-gray-700">School Name</span>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 p-2 w-full border rounded ${error.includes("Name") ? "border-red-500" : ""}`}
            aria-label="School Name"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">School Address</span>
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`mt-1 p-2 w-full border rounded ${error.includes("Address") ? "border-red-500" : ""}`}
            aria-label="School Address"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Latitude</span>
          <input
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className={`mt-1 p-2 w-full border rounded ${error.includes("Latitude") ? "border-red-500" : ""}`}
            aria-label="Latitude"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Longitude</span>
          <input
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className={`mt-1 p-2 w-full border rounded ${error.includes("Longitude") ? "border-red-500" : ""}`}
            aria-label="Longitude"
          />
        </label>
        <div className="flex justify-end space-x-4 my-8">
          <button
            onClick={addSchool}
            className={`p-2 text-white rounded ${loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add School"}
          </button>
          <button
            onClick={resetFields}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
      <div aria-live="polite" className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default AddSchoolForm;