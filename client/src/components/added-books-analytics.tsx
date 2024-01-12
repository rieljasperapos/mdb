"use client"
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// const data = [
//     {
//         name: "Jan",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Feb",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Mar",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Apr",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "May",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Jun",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Jul",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Aug",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Sep",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Oct",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
//     {
//         name: "Nov",
//         total: Math.floor(Math.random() * 5000) + 10,
//     },
// ]

// type chartType = {
//     month: string
//     bookCount: number;
// }

export function Overview() {
    const [data, setData] = useState<any>({});

    useEffect(() => {
        fetch('http://localhost:3001/book-count')
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error${res.status}`);
            }
            
            return res.json();
        })
        .then((data) => {
            setData(data.booksByMonth);
            // console.log(data.booksByMonth);
        })
        .catch(err => {
            console.error(err);
        })
    }, [])

    // console.log(data);
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value}
                />
                <Tooltip />
                <Bar
                    dataKey="bookCount"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}