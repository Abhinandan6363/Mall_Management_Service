import React, { useEffect, useState } from "react";
import axios from "axios";

function Order() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [shops, setShops] = useState([]);

  const [order, setOrder] = useState({
    customerId: "",
    shopId: "",
    totalAmount: ""
  });

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchShops();
  }, []);

  const fetchOrders = () => {
    axios.get("http://localhost:8080/api/orders")
      .then(res => setOrders(res.data));
  };

  const fetchCustomers = () => {
    axios.get("http://localhost:8080/api/customers")
      .then(res => setCustomers(res.data));
  };

  const fetchShops = () => {
    axios.get("http://localhost:8080/api/shops")
      .then(res => setShops(res.data));
  };

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const saveOrder = () => {
    axios.post("http://localhost:8080/api/orders", order)
      .then(() => {
        fetchOrders();
        setOrder({ customerId: "", shopId: "", totalAmount: "" });
      });
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      axios.delete(`http://localhost:8080/api/orders/${id}`)
        .then(fetchOrders);
    }
  };

  const getCustomerName = (id) =>
    customers.find(c => c.id === id)?.name || "N/A";

  const getShopName = (id) =>
    shops.find(s => s.id === id)?.name || "N/A";

  return (
    <div className="card p-4 shadow-lg">

      <h5 className="text-warning fw-bold border-bottom pb-2">
        🛒 Order Management
      </h5>

      {/* FORM */}
      <div className="row g-2 align-items-end mb-3">

        <div className="col-md-4">
          <select className="form-control" name="customerId"
            value={order.customerId} onChange={handleChange}>
            <option value="">Select Customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-control" name="shopId"
            value={order.shopId} onChange={handleChange}>
            <option value="">Select Shop</option>
            {shops.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <input className="form-control" name="totalAmount"
            placeholder="Amount"
            value={order.totalAmount}
            onChange={handleChange} />
        </div>

        <div className="col-md-1 d-grid">
          <button className="btn btn-primary" onClick={saveOrder}>+</button>
        </div>

      </div>

      <h6 className="text-secondary fw-semibold">📦 Order List</h6>

      <table className="table table-hover align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Customer</th><th>Shop</th><th>Amount</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{getCustomerName(o.customerId)}</td>
              <td>{getShopName(o.shopId)}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.orderDate}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                  onClick={() => deleteOrder(o.id)}>
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

export default Order;