import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
)

const Chart = () => {

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: "Sales",
                data: [120, 190, 300, 250, 220],
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            }
        },
        title: {
            display: true,
            text: "Monthly Sales"
        }
    }

    return (
        <div>
            <Bar data={data} options={options} redraw={false} />
        </div>
    )
}

export default Chart
