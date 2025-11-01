// import vehicle service
const Vehicles = require('../services/vehicle.service');

// a function for add new vehicle
async function addNewVehicle(req, res) {
    try {
        const vehicleData = req.body;
        const vehicle = Vehicles.addNewVehicle(vehicleData);

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
    const vehicles = await Vehicles.getVehiclesByCustomerId(customer_id);

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

// export the functions
module.exports = {
    addNewVehicle,
    getVehiclesByCustomerId
}