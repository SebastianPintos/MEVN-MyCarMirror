const Sell = require('../models/sell');
const helperVehicle = require('../lib/helperVehicle');
const helperProduct = require('../lib/helperProduct');
const ctrl = {};

ctrl.listVehicle = (req, res) => {
    Sell.find((err, sell) => {
        if (err) { console.log(err) }
        res.send({
            Sell: sell
        })
    }).populate('VehicleSell').populate('PaymentType');
};

/* {
    "sell": {
        "PriceFreeTax": "2000000",
        "Tax": "21",
        "Discount": "0",
        "CompanyName": "Morgue Juanito SRL",
        "CUIT": "20360772528",
        "TaxCategory": "RESPONSABLE INSCRIPTO",
        "Cliente": "5faad8b67e6c362bb0ba3136",
        "Employee": "5fc5404274173634a099be7f",
        "Service": [],
        "ProductStock": [],
        "VehicleSold":[{
            "VehicleStock": "5fc9566be84a6b031cd9a692"
        }],
        "PaymentType": ["5fc94d3138063149f8a977a3"]
    }
} */

ctrl.sellVehicle = async (req, res) => {
    var body = req.body.sell;
    console.log(body);
    
    var sell = new Sell({
        RewarderDiscount: body.RewarderDiscount,
        Client: body.Client,
        Employee: body.Employee,
        Service: body.Service,
        ProductStock: body.ProductStock,
        VehicleSold: body.VehicleSold,
        PaymentType: body.PaymentType
    })

    console.log(sell);

    sell.save(async (err, sellDB) => {
        if(err) {console.log(err)}
        else{ 
            console.log(sellDB);
            await helperVehicle.SellVehicle(sellDB);
            res.status(200).json({title: 'Venta generada correctamente'});
        }
    });
}

module.exports = ctrl;