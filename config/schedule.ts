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
            },
            {
                weekday: "Tuesday",
                startTime: "12",
                endTime: "18"
            },
            {
                weekday: "Wednesday",
                startTime: "09",
                endTime: "15"
            },
            {
                weekday: "Friday",
                startTime: "14",
                endTime: "20"
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
            },
            {
                weekday: "Wednesday",
                startTime: "16",
                endTime: "19"
            },
            {
                weekday: "Thursday",
                startTime: "10",
                endTime: "13"
            },
            {
                weekday: "Saturady",
                startTime: "09",
                endTime: "17"
            }
        ]
    },
    {
        name: "Urban Movement",
        shifts: [
            {
                weekday: "Tuesday",
                startTime: "08",
                endTime: "12"
            },
            {
                weekday: "Thursday",
                startTime: "15",
                endTime: "21"
            },
            {
                weekday: "Saturady",
                startTime: "11",
                endTime: "16"
            },
            {
                weekday: "Sunday",
                startTime: "13",
                endTime: "18"
            }
        ]
    }
]