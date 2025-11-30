// import db.config
const conn = require('../config/db.config');

// create a function to add new vehicle
async function addNewVehicle(data) {
      const {
    customer_id,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = data;
    let addedVehicle = {};
    try {
        const query = "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const rows = await conn.query(query, [customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color]);

        if(rows.affectedRows !== 1){
            return false;
        }

        const vehicle_id = rows.insertId;
        addedVehicle = {
            vehicle_id: vehicle_id
        }
        
    } catch (error) {
        console.log(error);
    }
    return addedVehicle;
}
// a function to get all vehicles by customer id
async function getVehiclesByCustomerId(customer_id) {
    const query = "SELECT * FROM customer_vehicle_info AS v INNER JOIN customer_info AS c ON c.customer_id = v.customer_id WHERE v.customer_id = ?";
    const rows = await conn.query(query, [customer_id]);
    
    if (rows.length === 0) {
      return null; // or return []
    }
    return rows;
}
// a function to get all vehicles by vehicle id
async function getVehicleByVehicleId(vehicle_id) {
    const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
    const [rows] = await conn.query(query, [vehicle_id]);
    
    if (rows.length === 0) {
      return null; // or return []
    }
    return rows;
}
// A function to update vehicle
async function updateVehicleById(
  vehicle_id,
  vehicle_year,
  vehicle_make,
  vehicle_model,
  vehicle_type,
  vehicle_mileage,
  vehicle_tag,
  vehicle_serial,
  vehicle_color
) {

  const query = `
    UPDATE customer_vehicle_info
    SET 
      vehicle_year = ?, 
      vehicle_make = ?,
      vehicle_model = ?,
      vehicle_type = ?,
      vehicle_mileage = ?,
      vehicle_tag = ?,
      vehicle_serial = ?,
      vehicle_color = ?
    WHERE vehicle_id = ?
  `;

  const rows = await conn.query(query, [
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
    vehicle_id
  ]);

  return rows;
}
// A function to delete a vehicle by ID
async function deleteVehicleById(vehicle_id) {
  const query = "DELETE FROM customer_vehicle_info WHERE vehicle_id = ?";
  const rows = await conn.query(query, [vehicle_id]);

  const query2 = "DELETE FROM orders WHERE vehicle_id = ?";
  const rows2 = await conn.query(query2, [vehicle_id]);
  return {
    rows,
    rows2
  }
}
// export the functions
module.exports = {
    addNewVehicle,
    getVehiclesByCustomerId,
    getVehicleByVehicleId,
    updateVehicleById,
    deleteVehicleById
}