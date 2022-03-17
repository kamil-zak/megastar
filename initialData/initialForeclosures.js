export default [
    {
        _id: '621753deb0e24e085988b75d',
        list: { days: [0, 1, 3, 4, 5, 6], dates: [], intervals: [] },
        symbol: 'W',
        description: 'Kursuje tylko we wtorki',
    },
    {
        _id: '621753deb0e24e085988b760',
        list: {
            days: [],
            intervals: [
                {
                    from: { day: 1, month: 6 },
                    to: { day: 31, month: 7 },
                    id: '2502e5c1-ac6c-4c9f-915f-c875d6b9445f',
                },
            ],
            dates: [],
        },
        symbol: 'H',
        description: 'Kursuje w dni nauki szkolnej',
    },
    {
        _id: '621753deb0e24e085988b75e',
        list: {
            days: [0],
            intervals: [],
            dates: [
                { day: 1, month: 0, id: '54f42815-f06d-4e20-81f6-6bf80dd83818' },
                { day: 6, month: 0, id: 'fd2c56ff-f001-4f8c-ad9b-78a454613752' },
                { day: 11, month: 10, id: '4156a4ee-302c-4d29-a3f6-65d9dd58d74a' },
                { day: 24, month: 11, id: 'cc84ccea-9eca-42ed-8c23-84130d7c536a' },
                { day: 25, month: 11, id: 'bb2e0923-9af7-4f1b-9a82-dfac0479b9d0' },
            ],
        },
        symbol: 'S',
        description: 'Nie kursuje w niedziele i święta',
    },
]
