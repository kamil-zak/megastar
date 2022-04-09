import PDF from 'pdfkit'

const getTimesString = (timetable, type) =>
    timetable
        .filter((departure) => departure.type === type)
        .map(({ time }) => `${time.hours}:${String(time.mins).padStart(2, '0')}${time.foreclosures.join('')}`)
        .join('    ') || '-'

const centeredText = (doc, text, size, down) => doc.fontSize(size).text(text, { align: 'center' }).fontSize(down).moveDown()

const printDirection = (doc, departures, entry, destination) => {
    centeredText(doc, `${entry} - ${destination}`, 20, 10)
    centeredText(doc, `Dni tygodnia`, 13, 5)
    centeredText(doc, getTimesString(departures, 'week'), 10, 10)
    centeredText(doc, `Sobota`, 13, 5)
    centeredText(doc, getTimesString(departures, 'saturday'), 10, 10)
    centeredText(doc, `Niedziela`, 13, 5)
    centeredText(doc, getTimesString(departures, 'sunday'), 10, 10)
}

export const generateLinePDF = async (line, foreclosures) => {
    const usedForeclosures = foreclosures.filter((foreclosure) =>
        line.timetable.some((dep) => dep.time.foreclosures.includes(foreclosure.symbol))
    )
    const { entry, destination, timetable } = line
    const toDestination = timetable.filter((dep) => dep.direction === 'destination')
    const toEntry = timetable.filter((dep) => dep.direction === 'entry')

    const doc = new PDF({ margin: 20 })
    doc.font('src/resources/assets/montserrat.ttf')
    doc.image('src/resources/assets/fulllogo.png', { fit: [555, 100], align: 'center' })
    doc.fontSize(30).moveDown()
    printDirection(doc, toDestination, entry, destination)
    doc.fontSize(30).moveDown()
    printDirection(doc, toEntry, destination, entry)
    doc.fontSize(30).moveDown()
    usedForeclosures.forEach((foreclosure) => centeredText(doc, `${foreclosure.symbol} - ${foreclosure.description}`, 10, 5))
    doc.end()
    return doc
}
