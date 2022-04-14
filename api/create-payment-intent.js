require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = async (req, res) => {
    try {
        const amount = JSON.parse(req.body.amount);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });
        
        res.status(200).json({
            paymentIntent,
        });
    } catch (error) {
        console.log({ error });
        res.status(400).json({ 'Failed': error });
    }
}