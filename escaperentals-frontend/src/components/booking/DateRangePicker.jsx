import { useState, useMemo } from "react"
import { DateRange } from "react-date-range"
import { addDays, isWithinInterval, eachDayOfInterval } from "date-fns"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

export default function DateRangePicker({ onChange, blockedDates }) {
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ])
    // // Disable booked dates
    // const isBlocked = (date) => {
    //     return blockedDates.some((booking) =>
    //         isWithinInterval(date, {
    //             start: new Date(booking.check_in),
    //             end: addDays(new Date(booking.check_out), -1),
    //         })
    //     )
    // }

    // Convert backend ranges into disabled days
    const disabledDates = useMemo(() => {
        if (!blockedDates || blockedDates.length === 0) return []

        let all = []

        blockedDates.forEach((b) => {
            const days = eachDayOfInterval({
                start: new Date(b.check_in),
                end: addDays(new Date(b.check_out), -1),
            })

            all = [...all, ...days]
        })

        return all
    }, [blockedDates])

    const handleChange = (item) => {
        setRange([item.selection])
        onChange(item.selection)
    }

    return (
        <DateRange
            ranges={range}
            onChange={handleChange}
            minDate={new Date()}
            rangeColors={["#000"]}
            disabledDates={disabledDates}
            months={1}                // 👈 Only one month
            direction="horizontal"    // 👈 No vertical stacking
            showDateDisplay={false}   // 👈 Remove big top date boxes
            showMonthAndYearPickers={true}
            moveRangeOnFirstSelection={false}
            editableDateInputs={false}
        />
    )
}
