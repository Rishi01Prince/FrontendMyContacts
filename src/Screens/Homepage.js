import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Card from '../Components/Card';
import './HomePage.css';

export default function Homepage() {

  const [contactData, setContactData] = useState([]);
  const [search, setSearch] = useState('');
  

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const fetchContactData = async () => {

    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch("https://mycontactbackend.onrender.com/api/mycurrentData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });

      if (response.ok) {

        // My documnet
        const data = await response.json();

        if (data && data.contacts) {
          //My array of contacts
          setContactData(data.contacts);
        }
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);


  const handleAddContact = async (e) => {

    e.preventDefault();

    let userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch('https://mycontactbackend.onrender.com/api/addContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newContact, useremail: userEmail }),
      });

      if (response.ok) {
        fetchContactData();
        setNewContact({ name: '', email: '', phone: '' });
      }
      else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };


  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };




  // const filteredContacts = 

  return (
    <div>
      <Navbar />
      <div className="container title">
        <h1>Your Contact List</h1>
      </div>

      <div id="carouselExampleFade" className="searchdiv" data-bs-ride="carousel">
        <div className="d-flex justify-content-center">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search your Contacts"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        <div className="row">


          {
            contactData.filter((contact) =>
              contact.name.toLowerCase().startsWith(search.toLowerCase())).

            map((x) => (
              <div className="col-md-4" key={x.email}>
                <Card vdata={x} />
              </div>
            ))
          }

        </div>
      </div>



      <div style={{ paddingBottom: '320px', paddingTop: '200px' }}>
        <div className="container form-container card mt-3" style={{ width: '18rem', maxHeight: '380px' }}>
          <form onSubmit={handleAddContact}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={newContact.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                required
                value={newContact.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                value={newContact.email}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Contact</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
