interface Gym {
    name: string
    shifts: Shift[]
}

interface Shift {
    weekday: Weekday
    startTime: string
    endTime: string
}

type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturady" | "Sunday"

const schedule: Gym[] = [
    {
        name: "Taitoliikuntakeskus",
        shifts: [
            {
                weekday: "Monday",
                startTime: "10",
                endTime: "16"
            }
        ]
    },
    {
        name: "Calisthenics Lab",
        shifts: [
            {
                weekday: "Monday",
                startTime: "11",
                endTime: "14"
            }
        ]
    }
]