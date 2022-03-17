const hasExcludedDay = (foreclosure) => foreclosure.list.days.includes(new Date().getDay())

const hasExcludedDate = (foreclosure) =>
    foreclosure.list.dates.some((date) => date.month === new Date().getMonth() && date.day === new Date().getDate())

const hasExcludedInterval = (foreclosure) =>
    foreclosure.list.intervals.some((interval) => {
        const now = new Date()
        const start = new Date(now.getFullYear(), interval.from.month, interval.from.day)
        const end = new Date(now.getFullYear(), interval.to.month, interval.to.day)
        return now > start && now < end
    })

// eslint-disable-next-line import/prefer-default-export
export const isExcluded = (foreclosure) => hasExcludedDay(foreclosure) || hasExcludedDate(foreclosure) || hasExcludedInterval(foreclosure)
