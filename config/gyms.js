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
        equipment: ["Soft floor", "Trampolines", "Airtrack"],
        mapsId: "dPQnoi2VU5wx548X7",
        price: "15€ / session",
        actualParkourGym: true,
        shifts: [
            {
                weekday: "Monday",
                startTime: "11.20",
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
        equipment: ["💪 Pull-up bars", "🤲 Parallettes", "💍 Rings"],
        mapsId: "dPQnoi2VU5wx548X7",
        price: "12€ / day pass",
        seasonStart: "2025-09-01",
        seasonEnd: "2026-05-31",
        shifts: [
            {
                weekday: "Monday",
                startTime: "10",
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
                weekday: "Saturday",
                startTime: "09",
                endTime: "17"
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