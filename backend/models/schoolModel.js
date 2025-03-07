import db from "../config/db.js";

export const addSchool = async (name, address, latitude, longitude) => {
    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4)";
    try {
        const result = await db.query(sql, [name, address, latitude, longitude]);
        console.log("School added successfully:", result);
        return result;
    } catch (err) {
        console.error("Error adding school:", err);
        throw err;
    }
};

export const getAllSchools = async () => {
    const sql = "SELECT * FROM schools";
    try {
        const result = await db.query(sql);
        console.log("Retrieved schools:", result.rows);
        return result.rows;
    } catch (err) {
        console.error("Error retrieving schools:", err);
        throw err;
    }
};