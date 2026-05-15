import React, { useEffect, useState } from "react";
import axios from "axios";

function Guest() {
  const [guests, setGuests] = useState([]);
  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    purpose: ""
  });

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = () => {
    axios.get("http://localhost:8080/api/guests")
      .then(res => setGuests(res.data));
  };

  const handleChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
  };

  const addGuest = () => {
    axios.post("http://localhost:8080/api/guests", guest)
      .then(() => {
        fetchGuests();
        setGuest({ name: "", phone: "", purpose: "" });
      });
  };

  const deleteGuest = (id) => {
    if (window.confirm("Delete this entry?")) {
      axios.delete(`http://localhost:8080/api/guests/${id}`)
        .then(fetchGuests);
    }
  };

  return (
    <div className="card p-4 shadow-lg">

      <h5 className="text-info fw-bold border-bottom pb-2 mb-3">
        📘 Guest Book Management
      </h5>

      {/* FORM */}
      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <input className="form-control" name="name"
            placeholder="Guest Name"
            value={guest.name}
            onChange={handleChange}/>
        </div>

        <div className="col-md-3">
          <input className="form-control" name="phone"
            placeholder="Phone"
            value={guest.phone}
            onChange={handleChange}/>
        </div>

        <div className="col-md-4">
          <input className="form-control" name="purpose"
            placeholder="Purpose"
            value={guest.purpose}
            onChange={handleChange}/>
        </div>

        <div className="col-md-2 d-grid">
          <button className="btn btn-info" onClick={addGuest}>
            Add
          </button>
        </div>
      </div>

      <h6 className="text-secondary fw-semibold">📋 Guest List</h6>

      <table className="table table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Purpose</th>
            <th>Visit Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {guests.map(g => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.name}</td>
              <td>{g.phone}</td>
              <td>{g.purpose}</td>
              <td>{g.visitTime}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                  onClick={() => deleteGuest(g.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Guest;