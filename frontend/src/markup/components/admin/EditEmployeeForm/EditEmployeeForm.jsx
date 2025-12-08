import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router';
import employeeService from '../../../../services/employee.service'
import { useAuth } from '../../../../Contexts/AuthContext';
import Loader from '../../Loader/Loader';

function EditEmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee_email, setEmployeeEmail] = useState('')
  const [employee_first_name, setEmployeeFirstName] = useState('');
  const [employee_last_name, setEmployeeLastName] = useState('');
  const [employee_phone, setEmployeePhone] = useState('');
  const [company_role_id, setCompanyRoleId] = useState('')
  const [active_employee, setEmployeeStatus] = useState(false);

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  let token = '';
  const { employee } = useAuth();
  if (employee?.employee_token) {
    token = employee.employee_token;
  }
  // 🚀 Fetch customer data
  useEffect(() => {
    async function loadEmployee() {
      try {
        const res = await employeeService.getEmployeeById(id, token);
        
        if (!res || !res.data) {
          setServerError("Employee not found");
        } else {
          setEmployeeEmail(res.data.employee_email || "");
          setEmployeeFirstName(res.data.employee_first_name || "");
          setEmployeeLastName(res.data.employee_last_name || "");
          setEmployeePhone(res.data.employee_phone || "");
          setCompanyRoleId(res.data.company_role_id || "")
          setEmployeeStatus(res.data.active_employee === 1 || res.data.active_employee === '1');
        }
      } catch (err) {
        console.error(err);
        setServerError("Failed to fetch Employee data");
      }
      setLoading(false);
    }
    loadEmployee();
  }, [id, token]);

  // 🚀 Submit update request
  async function handleSubmit(e) {
    e.preventDefault();

    let valid = true;
    const regexPhone = /^\+2519\d{8}$/; // Ethiopian format: +2519XXXXXXXX

    if (!employee_first_name.trim()) {
      setFirstNameError("First name is required");
      valid = false;
    } else setFirstNameError("");

    if (!employee_last_name.trim()) {
      setLastNameError("Last name is required");
      valid = false;
    } else setLastNameError("");

    if (!regexPhone.test(employee_phone)) {
      setPhoneError("Phone must be like +2519XXXXXXXX");
      valid = false;
    } else setPhoneError("");

    if (!valid) return;

    const formData = {
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_id,
      active_employee: active_employee ? '1' : '0',
    };

  try {
    const data = await employeeService.editEmployee(id, formData, token);
      if (!data) {
          setServerError("Employee couldn't be updated");
      } else {
  // backend returned { message: "...", success: true } or similar
      setServerError('');
      setSuccess(true);
      setTimeout(() => navigate('/admin/employees'), 2000);
      }
  } catch (error) {
    console.error(error);
    setServerError(error.message || "Server error. Try again.");
    setSuccess(false);
  }
  }

  if (loading) {
    return <Loader/>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">

        {success && <div className="success">Employee Updated Successfully!</div>}

        <div className="contact-title">
          <h2>Edit: {employee_first_name} {employee_last_name}</h2>
          <h5 className='text-dark mb-4'>Employee Email: {employee_email}</h5>

          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleSubmit} className="">

                    {serverError && <div className="error">{serverError}</div>}

                    <div className="row clearfix">

                      {/* First Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={employee_first_name}
                          onChange={(e) => setEmployeeFirstName(e.target.value)}
                          placeholder="Enter first name"
                          required
                        />
                        {firstNameError && <div className="error">{firstNameError}</div>}
                      </div>

                      {/* Last Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={employee_last_name}
                          onChange={(e) => setEmployeeLastName(e.target.value)}
                          placeholder="Enter last name"
                          required
                        />
                        {lastNameError && <div className="error">{lastNameError}</div>}
                      </div>

                      {/* Phone Number */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={employee_phone}
                          onChange={(e) => setEmployeePhone(e.target.value)}
                          placeholder="+2519XXXXXXXX"
                          required
                        />
                        {phoneError && <div className="error">{phoneError}</div>}
                      </div>
                      {/* Employee role */}
                      <div className="form-group col-md-12">
                        <select
                          name="role"
                          value={company_role_id}
                          onChange={(e) => setCompanyRoleId(e.target.value)}
                          required
                        >
                          <option value="1">Employee</option>
                          <option value="2">Manager</option>
                          <option value="3">Admin</option>
                        </select>
                      </div>
                      {/* Customer status */}
                      <div className="form-group col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          checked={active_employee}  // boolean
                          onChange={(e) => setEmployeeStatus(e.target.checked)}
                          id="customerStatus"
                        />
                        <label htmlFor="customerStatus" className="mt-2 px-2">Is Customer Active</label>
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

export default EditEmployeeForm;
