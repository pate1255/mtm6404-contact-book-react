import React, { useState } from "react";
import db from "../utils/db";
import { useEffect } from "react";
import { getDoc , doc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
// import  Edit  from "./Edit";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({});

  const fetchDetails = async (id) => {
    const docRef = doc(db, "contacts", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        setContact({
            id: docSnapshot.id,
            ...docSnapshot.data()
        })
        
    }else{
        console.log('No such document')
        return null;
    }
  };

  useEffect(() => {
    const contact = fetchDetails(id);
    setContact(contact);
  }, [id]);

  console.log(contact);

  return (
    <div className="detail-container">
      <header className="detail-header">
      <Link to="/" style={{
        backgroundColor: '#0ba1ff',
        color: 'white',
      }}>&#8592; Back</Link>
      <Link to={`/edit/${contact.id}`} style={{
        backgroundColor: '#0ba1ff',
        color: 'white',
      }}>Edit</Link>
      </header>
      <h3 style={{
        fontWeight: 200,
      }}>Contact Details</h3>
        <div className="details-section">
            <h1>{contact.firstName} {contact.lastName}</h1>
            <div className="details-list">
              <p>Email:</p>
              <p style={{
                color: 'blue',
              }}>{contact.email}</p>
            </div>
            <div className="details-list">
              <p>Occupation:</p>
              <p>{contact.occupation}</p>
            </div>
            <div className="details-list">
              <p>Address:</p>
              <p>{contact.address}</p>
            </div>
          </div>
    </div>
  );
};

export default ContactDetails;

  