export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    service: "API Gateway",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
};