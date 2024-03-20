import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
ChartJS.register(
  Tooltip,
  LinearScale,
  LineElement,
  CategoryScale,
  PointElement,
  Filler,
  ArcElement,
  Legend
);
import { Doughnut, Line } from "react-chartjs-2";
import { mainBg } from "../../constants/color";
import { getLast7days } from "../../lib/features";

const doughnutChartOptions = {
    responsive:true,
    plugins:{
        legend:{
            display:false,
        } ,
        title:{
            display:false
        }
    },
    cutout:80
}
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
export const LineChart = () => {
  const data = {
    labels: getLast7days(),
    datasets: [
      {
        data: [2, 13, 4, 9, 15, 0,20],
        fill: true,
        label: "Revenue",
        backgroundColor: "#d2a3d9",
        borderColor: mainBg,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};
export const DougnutChart = ({ value = [22, 12] }) => {
  const data = {
    labels: ["Single Chats", "Group Chats"],
    datasets: [
      {
        data: value,
    
        backgroundColor:["#ff9ec3",'#9ab9fc'],
        borderColor:['#de0055','blue'],
        offset:40
      },
    ],
  };
  return <Doughnut style={{zIndex:10}} data={data} options={doughnutChartOptions} />;
};
