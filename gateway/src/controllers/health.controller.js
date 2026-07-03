export const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        service: "API Gateway",
        message: "Gateway is running successfully",
        timestamp: new Date().toISOString()
    });
};