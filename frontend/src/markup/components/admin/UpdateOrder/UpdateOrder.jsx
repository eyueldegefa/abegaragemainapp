import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router';
import orderService from '../../../../services/order.service'
import { useAuth } from '../../../../Contexts/AuthContext';

function UpdateOrder() {
//   const navigate = useNavigate();
   // get customer id from url
    const { id } = useParams();
    // // Create states to store form data
    const [order_total_price, setOrderTotalPrice] = useState('');
    const [completion_date, setCompletionDate] = useState('');
    const [additional_request, setAdditionalRequest] = useState('');
    const [order_status, setOrderStatus] = useState('');

    // create a state to store error and success
    const [formErrors, setFormErrors] = useState('');
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);

  let token = '';
  const { employee } = useAuth();
  if (employee?.employee_token) {
    token = employee.employee_token;
  }
  // 🚀 Fetch customer data
  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await orderService.getOrderById(id, token);
        console.log(res.data);
        
        if (!res || !res.data) {
          setServerError("Vehicle not found");
        } else {
          setOrderTotalPrice(res.data.order_total_price || "");
          setCompletionDate(res.data.completion_date || "");
          setAdditionalRequest(res.data.additional_request || "");
          setOrderStatus(res.data.order_status || "")
        }
      } catch (err) {
        console.error(err);
        setServerError("Failed to fetch Employee data");
      }

      setLoading(false);
    }

    loadOrder();
  }, [id, token]);

//   🚀 Submit update request
  async function handleSubmit(e) {
    e.preventDefault();

    let valid = true;
    if(
        !order_total_price ||
        !completion_date ||
        !additional_request ||
        !order_status
    ) {
        valid = false
        setFormErrors("All fields are required!")
    }

    if (!valid) return;

    const formData = {
        order_total_price,
        completion_date,
        additional_request,
        order_status
    };

  try {
    const data = await orderService.updateOrderById(id, formData, token);
      if (!data) {
          setServerError("Order couldn't be updated");
      } else {
  // backend returned { message: "...", success: true } or similar
      setServerError('');
      setSuccess(true);
      }
  } catch (error) {
    console.error(error);
    setServerError(error.message || "Server error. Try again.");
    setSuccess(false);
  }
  }

  if (loading) {
    return <div className="loading">Loading Order information...</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        {formErrors && <div className='error'>{formErrors}</div>}
        {success && <div className="success">Order Updated Successfully!</div>}
        <div className="contact-title">
          <h2>Update Order</h2>
          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleSubmit} className="">
                    {serverError && <div className="error" role="alert">{serverError}</div>}
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="orderTotalPrice"
                          value={order_total_price}
                          onChange={(e) => setOrderTotalPrice(e.target.value)}
                          placeholder="Total Price"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="date"
                          name="completionDate"
                          value={completion_date}
                          onChange={(e) => setCompletionDate(e.target.value)}
                          placeholder="Completion Date"
                          required
                        />
                        {formErrors && <div className="error">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="additionalRequest"
                          value={additional_request}
                          onChange={(e) => setAdditionalRequest(e.target.value)}
                          placeholder="Additional Request"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="orderStatus"
                          value={order_status}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          placeholder="order Status"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <button className="theme-btn btn-style-one" type="submit">
                          <span>UPDATE</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateOrder;
