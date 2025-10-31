// import db.config
const conn = require('../config/db.config');

// create a function to add new vehicle
async function addNewVehicle(vehicle) {
    let addedVehicle = {};
    try {
        const query = "INSERT INTO customer_vehicle_info (vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        const rows = await conn.query(query, [vehicle.vehicle_year, vehicle.vehicle_make, vehicle.vehicle_model, vehicle.vehicle_type, vehicle.vehicle_mileage, vehicle.vehicle_tag, vehicle.vehicle_serial, vehicle.vehicle_color]);

        if(rows.affectedRows !==1){
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

module.exports = {
    addNewVehicle
}