// import vehicle service
const vehicleService = require('../services/vehicle.service');

// a function for add new vehicle
async function addNewVehicle(req, res) {
    try {
        const vehicleData = req.body;
        const vehicle = vehicleService.addNewVehicle(vehicleData);

        if(!vehicle){
            return res.status(400).json({
                status: "Fail",
                message: "Vehicle not added"
            })
        } else {
            return res.status(200).json({
                status: "Success",
                message: "Vehicle added successfully"
            })
        }
        
    } catch (error) {
        console.log(error);
               return res.status(500).json({
            status: "Fail",
            message: "Server error"
        })  
    }
}
// a function to get vehicles by customer id
async function getVehiclesByCustomerId(req, res) {
  try {
    const customer_id = req.params.id; // or req.params.customer_id depending on your route
    const vehicles = await vehicleService.getVehiclesByCustomerId(customer_id);

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({
        status: "Fail",
        message: "No vehicles found for this customer",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: vehicles,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Server error",
    });
  }
}
// a function to get vehicles by customer id
async function getVehicleByVehicleId(req, res) {
  try {
    const vehicle_id = req.params.id; // or req.params.customer_id depending on your route
    const vehicle = await vehicleService.getVehicleByVehicleId(vehicle_id);

    if (!vehicle || vehicle.length === 0) {
      return res.status(404).json({
        status: "Fail",
        message: "No vehicles found for this customer",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: vehicle,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Server error",
    });
  }
}
// a function to update Employee
async function updateVehicleById(req, res) {
  const { id } = req.params;
  const { 
    vehicle_year, 
    vehicle_make, 
    vehicle_model, 
    vehicle_type, 
    vehicle_mileage, 
    vehicle_tag, 
    vehicle_serial, 
    vehicle_color
  } = req.body;

  try {

    const result = await vehicleService.updateVehicleById(
      vehicle_id= id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color
    );

    // Check if update happened
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failure",
        message: "Vehicle not found or not updated"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Vehicle updated successfully"
    });

  } catch (error) {
    console.error("Error updating vehicle:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
}
// To delete a vehicle by ID
async function deleteVehicleById(req, res) {
  try {
    const result = await vehicleService.deleteVehicleById(req.params.id);

    if (!result || result.affectedRows === 0) {
      // 404 when nothing deleted
      return res.status(404).json({
        status: "Fail",
        message: "Vehicle not found or could not be deleted",
        affectedRows: result ? result.affectedRows : 0
      });
    }

    // success (200) — include a predictable JSON shape
    return res.status(200).json({
      status: "Success",
      message: "Vehicle deleted successfully!",
      affectedRows: result.affectedRows
    });

  } catch (err) {
    // Log server-side error for debugging
    console.error("Error in deleteVehicleById controller:", err);

    return res.status(500).json({
      status: "Error",
      message: err.message || "Internal server error"
    });
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