import React, { useEffect, useState } from "react";
import axios from "axios";

function Shop() {
  const [shops, setShops] = useState([]);
  const [editId, setEditId] = useState(null);

  const [shop, setShop] = useState({
    name: "",
    ownerName: "",
    rent: "",
    status: ""
  });

  useEffect(() => {
    fetchShops();
  }, []);

  // 🔹 FETCH ALL
  const fetchShops = () => {
    axios.get("http://localhost:8080/api/shops")
      .then(res => setShops(res.data));
  };

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  // 🔹 SAVE (ADD + UPDATE)
  const saveShop = () => {
    const request = editId
      ? axios.put(`http://localhost:8080/api/shops/${editId}`, shop)
      : axios.post("http://localhost:8080/api/shops", shop);

    request.then(() => {
      fetchShops();
      resetForm();
    });
  };

  // 🔹 RESET FORM
  const resetForm = () => {
    setShop({ name: "", ownerName: "", rent: "", status: "" });
    setEditId(null);
  };

  // 🔹 DELETE
  const deleteShop = (id) => {
    if (window.confirm("Delete this shop?")) {
      axios.delete(`http://localhost:8080/api/shops/${id}`)
        .then(() => fetchShops());
    }
  };

  // 🔹 EDIT
  const editShop = (s) => {
    setShop({
      name: s.name,
      ownerName: s.ownerName,
      rent: s.rent,
      status: s.status
    });
    setEditId(s.id);
  };

  return (
    <div className="card p-4 shadow-lg">

      {/* TITLE */}
      <h5 className="text-primary fw-bold border-bottom pb-2 mb-3">
        🏬 Shop Management
      </h5>

      {/* FORM */}
      <div className="row g-2 align-items-end mb-3">

        <div className="col-md-3">
          <input
            className="form-control"
            name="name"
            placeholder="Shop Name"
            value={shop.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            name="ownerName"
            placeholder="Owner Name"
            value={shop.ownerName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            name="rent"
            placeholder="Rent"
            value={shop.rent}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-control"
            name="status"
            value={shop.status}
            onChange={handleChange}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="col-md-2 d-grid">
          <button className="btn btn-primary" onClick={saveShop}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

      </div>

      {/* TABLE */}
      <h6 className="text-secondary fw-semibold">📋 Shop List</h6>

      <table className="table table-hover align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Shop Name</th>
            <th>Owner</th>
            <th>Rent</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {shops.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.ownerName}</td>
              <td>₹{s.rent}</td>

              <td>
                <span className={`badge ${s.status === "Active" ? "bg-success" : "bg-danger"}`}>
                  {s.status}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editShop(s)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteShop(s.id)}
                >
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

export default Shop;