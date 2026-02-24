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
import { Bar, Line } from "react-chartjs-2"

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

const Chart = ({ Chart, data, options }) => {




    return (
        <div>

            {Chart && <Chart data={data} options={options} redraw={false} />}
        </div>
    )
}

export default Chart
