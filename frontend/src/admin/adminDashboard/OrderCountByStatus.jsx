import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const OrderCountByStatus = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order Count",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/dashboard/getOrderCountByStatus"
        );
        const data = response.data;

        // Extract labels and data points
        const labels = data.map((item) => item.OrderStatus);
        const orderData = data.map((item) => item.orderCount);

        // Update chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Order Count",
              data: orderData,
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "350px", height: "350px" }}> 
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Accessory Stock Distribution",
          },
        },
      }}
    />
    </div>
  );
};

export default OrderCountByStatus;
