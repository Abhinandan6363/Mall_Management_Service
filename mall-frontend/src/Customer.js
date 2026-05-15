import React, { useEffect, useState } from "react";
import axios from "axios";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [editId, setEditId] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get("http://localhost:8080/api/customers")
      .then(res => setCustomers(res.data));
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const saveCustomer = () => {
    const request = editId
      ? axios.put(`http://localhost:8080/api/customers/${editId}`, customer)
      : axios.post("http://localhost:8080/api/customers", customer);

    request.then(() => {
      fetchCustomers();
      resetForm();
    });
  };

  const resetForm = () => {
    setCustomer({ name: "", phone: "", email: "" });
    setEditId(null);
  };

  const deleteCustomer = (id) => {
    if (window.confirm("Delete this customer?")) {
      axios.delete(`http://localhost:8080/api/customers/${id}`)
        .then(fetchCustomers);
    }
  };

  const editCustomer = (c) => {
    setCustomer(c);
    setEditId(c.id);
  };

  return (
    <div className="card p-4 shadow-lg">

      <h5 className="text-success fw-bold border-bottom pb-2">
        👤 Customer Management
      </h5>

      {/* FORM */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input className="form-control" name="name" placeholder="Name"
            value={customer.name} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <input className="form-control" name="phone" placeholder="Phone"
            value={customer.phone} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <input className="form-control" name="email" placeholder="Email"
            value={customer.email} onChange={handleChange} />
        </div>
      </div>

      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-success" onClick={saveCustomer}>
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button className="btn btn-secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>

      <h6 className="text-secondary fw-semibold">📋 Customer List</h6>

      <table className="table table-hover align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editCustomer(c)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteCustomer(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Customer;