export const gyms = [
    {
        name: "Parkourkeskus",
        mapsId: "8Q9426hWEwuuvDRT8",
        price: "7 €",
        website: "https://parkourkeskus.fi/vapaavuorot",
        disclaimer: "Has some open shifts, but are inconsistent. Check website for latest shifts.",
        actualParkourGym: true,
    },
    {
        name: "Taitoliikuntakeskus",
        equipment: ["Trampolines", "Airtrack"],
        mapsId: "9VJnQNx9ZHCNxpNz5",
        price: "10 €",
        website: "https://taitoliikuntakeskus.fi/pages/aukioloajat",
        actualParkourGym: true,
        seasonEnd: "2025-07-04",
        shifts: [
            {
                weekday: "Monday",
                startTime: "10",
                endTime: "16"
            },
            {
                weekday: "Tuesday",
                startTime: "10",
                endTime: "16"
            },
            {
                weekday: "Wednesday",
                startTime: "10",
                endTime: "16"
            },
            {
                weekday: "thrusday",
                startTime: "10",
                endTime: "16"
            },
            {
                weekday: "Friday",
                startTime: "10",
                endTime: "16"
            }
        ]
    },
    {
        name: "Parkour Akatemia Vallila",
        mapsId: "p8VU23eob1FjNhFJ9",
        website: "https://parkourakatemia.fi/vallila/english/",
        price: "5 €",
        seasonStart: "2025-08-18",
        seasonEnd: "2025-12-14",
        actualParkourGym: true,
        shifts: [
            {
                weekday: "saturday",
                startTime: "18",
                endTime: "20"
            },
            {
                weekday: "sunday",
                startTime: "18.15",
                endTime: "20.15"
            }
        ]
    },
    {
        name: "Voimisteluseura Helsinki",
        equipment: ["Some soft obstacles for parkour", "Trampolines", "Airtrack"],
        mapsId: "ouLsNbZzWnL4RBYZ9",
        website: "https://www.voimisteluseurahelsinki.fi/opengym",
        price: "10 €",
        seasonStart: "2025-08-18",
        seasonEnd: "2025-12-14",
        shifts: [
            {
                weekday: "Saturday",
                startTime: "14",
                endTime: "17"
            }
        ]
    },
    {
        name: "Calisthenics Lab",
        equipment: ["Trampoline", "Foam pit with a bar"],
        mapsId: "e88xE1UH8689B7Z28",
        price: "1h: 9 € / 2h: 15 €",
        website: "https://www.calisthenicslab.fi/en/",
        seasonEnd: "2025-08-31",
        shifts: [
            {
                weekday: "Monday",
                startTime: "10",
                endTime: "12.25"
            },
            {
                weekday: "Tuesday",
                startTime: "10",
                endTime: "13.40"
            },
            {
                weekday: "Wednesday",
                startTime: "10",
                endTime: "13.4"
            },
            {
                weekday: "Saturday",
                startTime: "17.30",
                endTime: "20"
            },
            {
                weekday: "Sunday",
                startTime: "17.30",
                endTime: "20"
            }
        ]
    },
    {
        name: "Rush Helsinki",
        mapsId: "nbRipsLdcmr8dNL68",
        price: "24.9 € / 2h, other options available",
        disclaimer: "Trampoline park, mostly kids so might be annoying to train at. Tickets are chaper to reserve online.",
        equipment: ["Lots of trampolines", "Foam pits", "High platform to foam pit", "Angled trampoline to foam pit"],
        website: "https://rushfinland.fi/hinnasto-ja-aukioloajat",
        seasonEnd: "2025-08-05",
        shifts: [
            {
                weekday: "Monday",
                startTime: "10",
                endTime: "20"
            },
            {
                weekday: "Tuesday",
                startTime: "10",
                endTime: "20"
            },
            {
                weekday: "Wednesday",
                startTime: "10",
                endTime: "20"
            },
            {
                weekday: "Thursday",
                startTime: "10",
                endTime: "20"
            },
            {
                weekday: "Friday",
                startTime: "10",
                endTime: "20"
            },
            {
                weekday: "Saturday",
                startTime: "10",
                endTime: "20"
            },
            {
                weekday: "Sunday",
                startTime: "10",
                endTime: "18"
            },
        ]
    },
    {
        name: "Woltti",
        mapsId: "HeZTztyziKCNqDQJ8",
        price: "1h: 14 € / 2h: 22 €",
        equipment: ["Trampoline park", "Airtrack"],
        website: "https://woltti.com/trampoliinipuisto-helsinki/",
        disclaimer: "Requires a reservation online"
    },
    {
        name: "SuperPark Vantaa",
        mapsId: "oA4wRK6f8SiecYqU9",
        price: "20 € / 2h, other options available",
        website: "https://superpark.fi/verkkokauppa-vantaa/",
        equipment: ["Trampoline park", "Foam pits"],
        disclaimer: "Mostly kids so might be annoying to train at",
        shifts: [
            {
                weekday: "monday",
                startTime: "11",
                endTime: "19"
            },
            {
                weekday: "tuesday",
                startTime: "11",
                endTime: "19"
            },
            {
                weekday: "wednesday",
                startTime: "11",
                endTime: "19"
            },
            {
                weekday: "thursday",
                startTime: "11",
                endTime: "19"
            },
            {
                weekday: "friday",
                startTime: "11",
                endTime: "19"
            },
            {
                weekday: "saturday",
                startTime: "11",
                endTime: "18"
            },
            {
                weekday: "sunday",
                startTime: "11",
                endTime: "18"
            },
        ]
    },
    {
        name: "OCR Factory",
        mapsId: "7KZ37LcBzB7SH33d9",
        disclaimer: "Not exactly a parkour gym, but has some Ninja Warrior -style stuff",
        price: "19 €",
        website: "https://ocrfactory.fi/fi-fi/article/etusivu/yhteystiedot/9/",
        shifts: [
            {
                weekday: "Monday",
                startTime: "05",
                endTime: "23"
            },
            {
                weekday: "Tuesday",
                startTime: "05",
                endTime: "23"
            },
            {
                weekday: "Wednesday",
                startTime: "05",
                endTime: "23"
            },
            {
                weekday: "Thursday",
                startTime: "05",
                endTime: "23"
            },
            {
                weekday: "Friday",
                startTime: "05",
                endTime: "23"
            },
            {
                weekday: "Saturday",
                startTime: "05",
                endTime: "23"
            },
            {
                weekday: "Sunday",
                startTime: "05",
                endTime: "23"
            },
        ]
    },
];