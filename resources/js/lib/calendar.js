export function generateFullCalendar(year, month) {
    const weeks = []
    const weekNumbers = []
    const firstDate = new Date(year, month, 1)
    const lastDate = new Date(year, month + 1, 0)

    const firstMonday = new Date(firstDate)
    firstMonday.setDate(
        firstMonday.getDate() - ((firstMonday.getDay() + 6) % 7),
    )

    let currentDate = firstMonday

    while (currentDate <= lastDate) {
        const week = []

        for (let i = 0; i < 7; i++) {
            week.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }

        const weekNumber = getISOWeekNumber(week[0])
        weekNumbers.push(weekNumber)
        weeks.push(week)
    }

    return { weeks, weekNumbers }
}

export function getISOWeekNumber(date) {
    const target = new Date(date.valueOf())
    const dayNr = (date.getDay() + 6) % 7
    target.setDate(target.getDate() - dayNr + 3)
    const firstThursday = target.valueOf()

    target.setMonth(0, 1)
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
    }

    const weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000)
    return weekNumber
}

