// import order.service
const orderController = require('../services/order.service');

// get customer by search
async function getCustomerBySearch(req, res) {  
    try {
        const { first_name, email } = req.query;
        const customers = await orderController.getCustomerBySearch(first_name, email);
        if(!customers){
            return res.status(404).json({ 
                status: 'Fail',
                message: 'No customers found' 
            });
        } else {
            return res.status(200).json({
                status: 'Success',
                message: "Customers retrieved successfully",
                data: customers
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: "Internal Server Error"
        });
    }
}
// export the functions
module.exports = {
    getCustomerBySearch
}