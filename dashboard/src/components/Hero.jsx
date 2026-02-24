import React from 'react'
import styled from 'styled-components'
import SmallBox from './SmallBox'
import Chart from './Chart'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

const Hero = () => {

    const BoxContent = [
        { heading: "Total Users", quantity: "1,200", url: "/icons/users.svg" },
        { heading: "Total Products", quantity: "3,450", url: "/icons/products.svg" },
        { heading: "Total Sales", quantity: "$25,000", url: "/icons/sales.svg" }
    ]

    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [
    //         {
    //             label: "Sales",
    //             data: [120, 190, 300, 250, 220],
    //         }
    //     ]
    // }
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [120, 190, 300, 250, 220],
                backgroundColor: '#4bc0c0',

                borderRadius: {
                    topLeft: 20,
                    topRight: 20,
                },
                borderSkipped: false, // 👈 IMPORTANT
            },
        ],
    }

    // const options = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: "top",
    //         }
    //     },
    //     title: {
    //         display: true,
    //         text: "Monthly Sales"
    //     }
    // }
    const options = {
        responsive: true,
        circumference: 180, // 👈 half circle
        rotation: 270,      // 👈 starts from bottom
        cutout: '70%',      // thickness
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
    }

    return (
        <HeroSection>
            <h2>Welcome back, John</h2>
            <p>Measure your advertising ROI and report website traffic.</p>
            <div className="parent_box">
                {
                    BoxContent?.map((item) => {
                        return (
                            <SmallBox key={item.heading} heading={item.heading} quantity={item.quantity} url={item.url} />
                        )
                    })
                }
            </div>

            <Chart Chart={Line} data={data} options={options} />
            <Chart Chart={Bar} data={data} options={options} />
            <Chart Chart={Doughnut} data={data} options={options} />
        </HeroSection>
    )
}

export default Hero

const HeroSection = styled.section`

.parent_box{
    display: flex;
    gap: 16px;
}
    
`