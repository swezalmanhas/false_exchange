import axios from 'axios';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons for edit and delete actions
import './OrderList.css'; // Import the enhanced CSS

const OrderList = ({ orders, fetchOrders }) => {
  const [amendQty, setAmendQty] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for feedback

  // Function to amend the order quantity
  const amendOrder = async (id) => {
    if (!amendQty || amendQty <= 0) {
      setError('Please enter a valid quantity.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://mo-ex-latest.onrender.com/api/order/amend/${id}`,
        { qty: amendQty },
        { headers: { 'x-auth-token': token } }
      );
      setAmendQty(''); // Clear the input
      setSuccess('Order amended successfully!');
      setError('');
      fetchOrders(); // Refresh the order list
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel an order
  const cancelOrder = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://mo-ex-latest.onrender.com/api/order/cancel/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setSuccess('Order canceled successfully!');
      setError('');
      fetchOrders(); // Refresh the order list
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-list">
      <h3 className="order-list-header">Your Orders</h3>
      {error && <p className="error-message" role="alert">{error}</p>}
      {success && <p className="success-message" role="status">{success}</p>}
      {orders.length === 0 ? (
        <p className="no-orders">No orders available.</p>
      ) : (
        <ul className="orders">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <div className="order-details">
                <p><strong>Qty:</strong> {order.qty}</p>
                <p><strong>Executed Qty:</strong> {order.executedQty}</p>
                <p><strong>Status:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
              </div>

              {/* Actions Container */}
              <div className="order-actions">
                {/* Show Amend Input and Button for Partial Orders */}
                {order.status === 'partial' && (
                  <div className="amend-section">
                    <input
                      type="number"
                      placeholder="New Qty"
                      value={amendQty}
                      onChange={(e) => setAmendQty(e.target.value)}
                      className="amend-input"
                      min="1"
                    />
                    <button
                      onClick={() => amendOrder(order._id)}
                      className="amend-button"
                      disabled={!amendQty || loading}
                      title="Amend Order"
                    >
                      {loading ? 'Amending...' : <FaEdit />}
                    </button>
                  </div>
                )}

                {/* Show Cancel Button for Pending and Partial Orders */}
                {(order.status === 'pending' || order.status === 'partial') && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="cancel-button"
                    title="Cancel Order"
                    disabled={loading}
                  >
                    {loading ? 'Cancelling...' : <FaTrash />} Cancel
                  </button>
                )}

                {/* Display a Canceled Message for Canceled Orders */}
                {order.status === 'canceled' && (
                  <p className="canceled-message">Order Canceled</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
