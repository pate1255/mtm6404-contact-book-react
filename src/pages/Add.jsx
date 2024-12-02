import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/db"; // Adjust the path if your db.js is located elsewhere

const Add = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the new contact to the Firestore database
      await addDoc(collection(db, "contacts"), formData);

      // Navigate back to the home page or wherever you'd like
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="add-container">
      <Link to="/" className="back-button" style={{
        backgroundColor: '#0ba1ff',
        color: 'white',
      }}>&#8592; Back</Link>
      <h1>Add New Contact</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
           
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            
          />
        </div>

        <button type="submit" className="submit-button" style={{ 
          padding: "10px 20px", 
          backgroundColor: 'rgb(0 194 8)',
          }}>
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default Add;

