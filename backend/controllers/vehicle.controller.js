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
// export the functions
module.exports = {
    addNewVehicle
}