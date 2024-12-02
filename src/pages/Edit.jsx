import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../utils/db"; // Adjust the path if your db.js is located elsewhere
import { Link } from "react-router-dom";

const Edit = () => {
  const { id } = useParams(); // Get the ID of the document to edit from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Fetch existing data to prefill the form
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchContact();
  }, [id]);

  // Handle input changes
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
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, formData);
      navigate("/"); // Navigate back to home after updating
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="edit-container">
      <Link to="/" className="back-button" style={{
        backgroundColor: '#0ba1ff',
        color: 'white',
      }} >&#8592; Back</Link>
      <h1>Edit Contact</h1>
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
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            
          />
        </div>
        <div>
          <label>Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            
          />
        </div>
        <button type="submit" className="edit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
