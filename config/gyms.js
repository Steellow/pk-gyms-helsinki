export const gyms = [
    {
        name: "Monday regular jam",
        price: "Free",
        website: "https://t.me/parkourhelsinki",
        mapsId: "placeholder", // Required field but not used for this item
        disclaimer: "Not a gym, but a regular outdoor training session. Location varies so check the Telegram group for details. Beginners are welcome too!",
        shifts: {
            "Monday": {
                startTime: "18",
                endTime: "21"
            }
        },
        isTelegramGroup: true
    },
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
        shifts: {
            "Monday": {
                startTime: "14",
                endTime: "16"
            },
            "Tuesday": {
                startTime: "14",
                endTime: "17"
            },
            "Wednesday": {
                startTime: "14",
                endTime: "17"
            },
            "Thursday": {
                startTime: "14",
                endTime: "16"
            },
            "Friday": {
                startTime: "14",
                endTime: "17"
            }
        }
    },
    {
        name: "Parkour Akatemia Vallila",
        mapsId: "p8VU23eob1FjNhFJ9",
        website: "https://parkourakatemia.fi/vallila/english/",
        price: "5 €",
        seasonStart: "2025-08-18",
        seasonEnd: "2025-12-14",
        actualParkourGym: true,
        equipment: ["Small trampoline & mattresses", "Airtrack"],
        shifts: {
            "Saturday": {
                startTime: "18",
                endTime: "20"
            },
            "Sunday": {
                startTime: "18.15",
                endTime: "20.15"
            }
        }
    },
    {
        name: "Parkour Akatemia Lauttasaari",
        mapsId: "9FcwgDJGNFXqaJ8p6",
        website: "https://parkourakatemia.fi/lauttasaari/ilmoittautuminen",
        price: "5 €",
        seasonStart: "2025-08-11",
        seasonEnd: "2025-12-14",
        equipment: ["Acrobatics area with small trampoline & mattresses", "Small airtrack"],
        shifts: {
            "Sunday": {
                startTime: "18",
                endTime: "19.30"
            }
        },
        actualParkourGym: true
    },
        {
        name: "Parkour Akatemia Espoo",
        mapsId: "58mU6CnjSp59o8Bz9",
        website: "https://parkourakatemia.fi/espoo/ilmoittautuminen/",
        actualParkourGym: true
    },
    {
        name: "Voimisteluseura Helsinki",
        equipment: ["Some soft obstacles for parkour", "Trampolines", "Airtrack"],
        mapsId: "ouLsNbZzWnL4RBYZ9",
        website: "https://www.voimisteluseurahelsinki.fi/opengym",
        price: "10 €",
        seasonStart: "2025-08-18",
        seasonEnd: "2025-12-14",
        shifts: {
            "Saturday": {
                startTime: "14",
                endTime: "17"
            }
        }
    },
    {
        name: "Calisthenics Lab",
        equipment: ["Trampoline", "Foam pit with a bar"],
        mapsId: "e88xE1UH8689B7Z28",
        price: "1h: 9 € / 2h: 15 €",
        website: "https://www.calisthenicslab.fi/en/",
        seasonEnd: "2025-08-31",
        shifts: {
            "Monday": {
                startTime: "10",
                endTime: "12.25"
            },
            "Tuesday": {
                startTime: "10",
                endTime: "13.40"
            },
            "Wednesday": {
                startTime: "10",
                endTime: "13.4"
            },
            "Saturday": {
                startTime: "17.30",
                endTime: "20"
            },
            "Sunday": {
                startTime: "17.30",
                endTime: "20"
            }
        }
    },
    {
        name: "Rush Helsinki",
        mapsId: "nbRipsLdcmr8dNL68",
        price: "24.9 € / 2h, other options available",
        disclaimer: "Trampoline park, mostly kids so might be annoying to train at. Tickets are chaper to reserve online.",
        equipment: ["Lots of trampolines", "Foam pits", "High platform to foam pit", "Angled trampoline to foam pit"],
        website: "https://rushfinland.fi/hinnasto-ja-aukioloajat#hours",
        shifts: {
            "Monday": {
                startTime: "14",
                endTime: "21"
            },
            "Tuesday": {
                startTime: "14",
                endTime: "21"
            },
            "Wednesday": {
                startTime: "14",
                endTime: "21"
            },
            "Thursday": {
                startTime: "14",
                endTime: "21"
            },
            "Friday": {
                startTime: "14",
                endTime: "21"
            },
            "Saturday": {
                startTime: "9",
                endTime: "21"
            },
            "Sunday": {
                startTime: "9",
                endTime: "19"
            }
        }
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
        shifts: {
            "Monday": {
                startTime: "11",
                endTime: "19"
            },
            "Tuesday": {
                startTime: "11",
                endTime: "19"
            },
            "Wednesday": {
                startTime: "11",
                endTime: "19"
            },
            "Thursday": {
                startTime: "11",
                endTime: "19"
            },
            "Friday": {
                startTime: "11",
                endTime: "19"
            },
            "Saturday": {
                startTime: "11",
                endTime: "18"
            },
            "Sunday": {
                startTime: "11",
                endTime: "18"
            }
        }
    },
    {
        name: "OCR Factory",
        mapsId: "7KZ37LcBzB7SH33d9",
        disclaimer: "Not exactly a parkour gym, but has some Ninja Warrior -style stuff",
        price: "19 €",
        website: "https://ocrfactory.fi/fi-fi/article/etusivu/yhteystiedot/9/",
        shifts: {
            "Monday": {
                startTime: "05",
                endTime: "23"
            },
            "Tuesday": {
                startTime: "05",
                endTime: "23"
            },
            "Wednesday": {
                startTime: "05",
                endTime: "23"
            },
            "Thursday": {
                startTime: "05",
                endTime: "23"
            },
            "Friday": {
                startTime: "05",
                endTime: "23"
            },
            "Saturday": {
                startTime: "05",
                endTime: "23"
            },
            "Sunday": {
                startTime: "05",
                endTime: "23"
            }
        }
    },
];