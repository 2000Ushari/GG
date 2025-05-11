import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AccessoryVsStock = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Units quantity",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/dashboard/getAccessoryVsStock");
        const data = response.data;

        // Extract labels and data points
        const labels = data.map((item) => item.accessoryId);
        const accessoryData = data.map((item) => item.totalQuantity);

        // Update chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Price",
              data: accessoryData,
              backgroundColor: "rgba(75,100,192,0.4)",
              borderColor: "rgba(75,100,192,1)",
              borderWidth: 1,
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
    <Bar
      data={chartData}
      options={{
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Accessory Id",
            },
          },
          y: {
            title: {
              display: true,
              text: "Stock quantity (Units)",
            },
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default AccessoryVsStock;


// import React, { useState, useEffect } from "react";
// import { Doughnut } from "react-chartjs-2";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register necessary components
// ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

// const AccessoryVsStockDoughnut = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Stock quantity",
//         data: [],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(153, 102, 255, 0.6)",
//           "rgba(255, 159, 64, 0.6)",
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/api/dashboard/getAccessoryVsStock"
//         );
//         const data = response.data;

//         // Extract labels and data points
//         const labels = data.map((item) => item.accessoryId);
//         const accessoryData = data.map((item) => item.totalQuantity);

//         // Update chart data
//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Stock quantity",
//               data: accessoryData,
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.6)",
//                 "rgba(54, 162, 235, 0.6)",
//                 "rgba(255, 206, 86, 0.6)",
//                 "rgba(75, 192, 192, 0.6)",
//                 "rgba(153, 102, 255, 0.6)",
//                 "rgba(255, 159, 64, 0.6)",
//               ],
//               hoverOffset: 4,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Doughnut
//       data={chartData}
//       options={{
//         responsive: true,
//         plugins: {
//           legend: {
//             position: "top",
//           },
//           title: {
//             display: true,
//             text: "Accessory Stock Distribution",
//           },
//         },
//       }}
//     />
//   );
// };

// export default AccessoryVsStockDoughnut;
