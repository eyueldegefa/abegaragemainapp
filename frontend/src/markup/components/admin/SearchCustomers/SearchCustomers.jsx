import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useAuth } from '../../../../Contexts/AuthContext';
import Customer from '../../../../services/customer.service';
import './SearchCustomers.css';

function SearchCustomers() {
  const navigate = useNavigate();
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
      console.log("Fetched Data:", data.data);

      if (data) {
        setResults(data.data);
        setError('');
      } else {
        setError('No data found.');
        setResults([]);
      }
    })
    .catch((err) => {
      console.error('Error fetching customers:', err);
      setError('An error occurred while fetching data.');
      setResults([]);
    })
    .finally(() => {
      setLoading(false);
    });
    
}, [input, token]);

const handleClick = (id) => {
    navigate(`/admin/add-order2/${id}`); // navigate to the detail page
  }

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
                      <Table striped bordered hover responsive className="customer-order-page">
                        <tbody>
                            <tr onClick={() => handleClick(results.customer_id)}>
                              <td>{results.customer_id}</td>
                              <td>{results.customer_first_name}</td>
                              <td>{results.customer_last_name}</td>
                              <td>{results.customer_email}</td>
                              <td>{results.customer_phone_number}</td>
                            </tr>
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
