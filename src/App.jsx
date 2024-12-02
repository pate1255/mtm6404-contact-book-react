import { useState , useEffect } from 'react'
import db from './utils/db'
import { Link } from 'react-router-dom'
import { collection , getDocs } from 'firebase/firestore'
import './App.css'
import './index.css'


function App() {
  const [contactList, setContactList] = useState([])

  const fetchContactList = async () => {
    try {
      const classList = await getDocs(collection(db, "contacts"));
      const sortedContacts = classList.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.lastName.localeCompare(b.lastName)); // Sort alphabetically by last name
      setContactList(sortedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContactList();
  }, []);

  console.log(contactList); // Logs the sorted contact list for debugging



  return (
    <>
    <div className='container'>
      <header className='header'>
        <h1>Contacts</h1>
        <Link to="/add" className='add-button' style={{
          textDecoration: 'none',
          color: 'white',
          backgroundColor: '#5cb85c',
          padding: '5px 15px',
          borderRadius: '5px',
          fontSize: '1.25em'
        }}>&#43;</Link>
      </header>
      
      <div className='input'>
        <input 
          type="text" 
          placeholder="Search Contacts" 
          onChange={(e) => {
            const searchQuery = e.target.value.toLowerCase();
            setContactList(prevContacts => 
              prevContacts.filter(contact => 
                contact.firstName.toLowerCase().includes(searchQuery) || 
                contact.lastName.toLowerCase().includes(searchQuery)
              )
            );
          }} 
        />
      </div>
      <div className='contact-list'>
        <ul>
            {contactList.map((contact) => (
              <div key={contact.id} className='contact'>
                <Link to={`/details/${contact.id}`}>
                  {contact.lastName}, {contact.firstName}
                </Link>
              </div> 
            ))}
          </ul>
      </div>
      
    </div>
    </>
  )
}

export default App