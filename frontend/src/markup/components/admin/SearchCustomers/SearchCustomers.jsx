import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useAuth } from '../../../../Contexts/AuthContext';
import Customer from '../../../../services/customer.service';
import './SearchCustomers.css';

function SearchCustomers() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

useEffect(() => {
  if (!input.trim() || input.trim().length < 2) {
    setResults([]);
    setError('');
    return;
  }

  setLoading(true);

  Customer.searchCustomers(input, token)
    .then((data) => {
      if (!data) {
        setError("No results found");
        setResults([]);
      } else {
        console.log(data);
        
        setResults(data.data);
        console.log(results);
        setError('');
      }
    })
    .catch((err) => {
      console.log(err.message);
      setError('Error fetching search results. Please try again.');
      setResults([]);
    })
    .finally(() => setLoading(false));
}, [input, token]);


  return (
    <section className="contact-section row">
      <div className="auto-container col-11">
        <div className="contact-title">
          <h2>Create a new order</h2>
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-12">
            <div className="inner-column">
              <div className="contact-form">
                <div className="row clearfix get-customer">
                  <div className="form-group col-md-10">
                    <input
                      type="text"
                      name="input"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Search for customer using first name, last name, email or phone number"
                    />
                  </div>

                  <Link to="/admin/add-customer" className="form-group col-md-12">
                    <button
                      className="theme-btn btn-style-one"
                      type="button"
                      data-loading-text="Please wait..."
                    >
                      <span>ADD CUSTOMER</span>
                    </button>
                  </Link>
                </div>

                <div className="search-results mt-4">
                  {loading && <p>Loading...</p>}
                  {error ?( <p className="error">{error}</p> ) :
                  (
                    <div className="table-responsive">
                      <Table striped bordered hover responsive className="customer-table">
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results ? (
                            results.map((cust) => (
                              <>
                              <tr key={cust.customer_id}>
                                <td>{cust.customer_first_name}</td>
                                <td>{cust.customer_last_name}</td>
                                <td>{cust.customer_email}</td>
                                <td>{cust.customer_phone_number}</td>
                                <td>
                                  <Link
                                    to={`/admin/customer/${cust.customer_id}`}
                                    className="btn btn-primary btn-sm"
                                  >
                                    View Details
                                  </Link>
                                </td>
                              </tr>
                              </>
                            ))
                          ) : (
                            <tr><td colSpan="5">No customers found</td></tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchCustomers;
