import axios from "axios";

export const publishToOrderService = async (order) => {
    console.log("📤 Sending to Order Service:");
    console.log(order);

    try {
        const response = await axios.post(
            process.env.ORDER_SERVICE_URL,
            order
        );

        console.log("✅ Response received");
        console.log(response.data);

        return response.data.data;

    } catch (err) {
        console.log("❌ Axios Error");

        console.log(err.message);

        if (err.response)
            console.log(err.response.data);

        throw err;
    }
};