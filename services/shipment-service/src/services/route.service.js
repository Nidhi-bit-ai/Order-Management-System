import { HUBS } from "../config/hubs.js";

/**
 * Returns complete hub route according
 * to destination city.
 */
export const generateRoute = (city) => {
  const destination = city.trim().toLowerCase();

  switch (destination) {
    case "jaipur":
      return [
        HUBS.WAREHOUSE,
        HUBS.JAIPUR,
      ];

    case "delhi":
      return [
        HUBS.WAREHOUSE,
        HUBS.JAIPUR,
        HUBS.DELHI,
      ];

    case "mumbai":
      return [
        HUBS.WAREHOUSE,
        HUBS.JAIPUR,
        HUBS.DELHI,
        HUBS.MUMBAI,
      ];

    default:


      return [
        HUBS.WAREHOUSE,
        HUBS.JAIPUR,
        HUBS.DELHI,
      ];
  }
};