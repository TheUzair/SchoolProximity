import { addSchool, getAllSchools } from "../models/schoolModel.js";

// Haversine Formula for Distance Calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// List Schools API
export const listSchoolsHandler = async (req, res) => {
  let { latitude, longitude } = req.query;

  // Convert latitude and longitude to numbers
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: "Latitude and longitude must be numbers" });
  }

  try {
    const schools = await getAllSchools();
    const filteredSchools = schools
      .map(school => ({
        ...school,
        distance: calculateDistance(latitude, longitude, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance); // Sort by distance

    res.json(filteredSchools);
  } catch (err) {
    console.error("Error retrieving schools:", err);
    res.status(500).json({ message: "Database Error" });
  }
};

// Validation function
const validateSchoolData = ({ name, address, latitude, longitude }) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return "Name is required and must be a non-empty string.";
  }
  if (!address || typeof address !== 'string' || address.trim() === '') {
    return "Address is required and must be a non-empty string.";
  }
  if (typeof latitude !== 'number' || isNaN(latitude) || latitude < -90 || latitude > 90) {
    return "Latitude must be a number between -90 and 90.";
  }
  if (typeof longitude !== 'number' || isNaN(longitude) || longitude < -180 || longitude > 180) {
    return "Longitude must be a number between -180 and 180.";
  }
  return null;
};

export const addSchoolHandler = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input data
  const validationError = validateSchoolData({
    name,
    address,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  });

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    await addSchool(name, address, latitude, longitude);
    res.status(201).json({ message: "School added successfully" });
  } catch (err) {
    console.error("Error adding school:", err);
    res.status(500).json({ message: "Database Error" });
  }
};