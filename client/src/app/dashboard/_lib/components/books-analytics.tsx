"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function Overview() {
    const [data, setData] = useState<any>({});
    const { data: session, status } = useSession();

    useEffect(() => {
        fetch('https://api-mdb.vercel.app/book-count-user', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: session?.user?.email })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            setData(data.booksByMonth);
        })
        .catch(err => {
            console.error(err);
        })
    }, [status])

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