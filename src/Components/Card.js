import React, { useState } from 'react';
import './Card.css';

export default function Card(props) {

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(props.vdata.name);
  const [email, setEmail] = useState(props.vdata.email);
  const [phone, setPhone] = useState(props.vdata.phone);
  const [deleted, setDeleted] = useState(false);


  const handleEdit = () => {
    setEditing(true);
  };


  const handleCancel = () => {
    // Reset the form values to the original contact data
    setName(props.vdata.name);
    setEmail(props.vdata.email);
    setPhone(props.vdata.phone);
    setEditing(false);

  };



  const handleSave = async () => {
    
    try {
      const response = await fetch('https://mycontactbackend.onrender.com/api/updateData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         id: props.id,

          email: props.vdata.email, // provide the email associated with the contact
          name: props.vdata.name,
          phone: props.vdata.phone,

          newemail: email,
          newname: name,
          newphone: phone,

        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setEditing(false);

        } else {
          console.error(data.error);
        }
        
      }
      else {
        console.log('Error:', response.status);
      }
    } 
    catch (error) {
      console.error('An error occurred while updating the contact:', error);
    }

    setEditing(false);
  };




  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    
    if (confirmDelete) {
      try {
        const response = await fetch('https://mycontactbackend.onrender.com/api/deleteData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: props.id,
            email: props.vdata.email, // provide the email associated with the contact
            name: props.vdata.name,
            phone: props.vdata.phone,
          }),
        });
        const data = await response.json();
  
        if (data.success) {
          console.log("deleted");
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('An error occurred while deleting the contact:', error);
      }
    }
  
    if (confirmDelete) {
      setDeleted(true);
    }
  };
  

  if (deleted) {
    return null; // Hide the card if deleted
  }

  return (

    <div className="card mt-3" style={{ width: '18rem', maxHeight: '380px' }}>
      <div style={{ display: 'flex', height: '150px', width: '18rem' }}>
        <img
          className="card-img-top"
          src="https://www.vippng.com/png/detail/356-3563531_transparent-human-icon-png.png"
          alt="Card image cap"
        />
      </div>

      <div className="card-body">
        {editing ? (
          <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        ) : (
          <div>
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Email: {email}</p>
            <p className="card-text">Phone: {phone}</p>
          </div>
        )}
      </div>

      <div className="card-footer btn-group-sm">
        {editing ? (
          <div>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-primary btn-lg" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger btn-lg ml-2" onClick={handleDelete}>
              Delete
            </button>
          </div>

        )}
      </div>
    </div>
  );
}



