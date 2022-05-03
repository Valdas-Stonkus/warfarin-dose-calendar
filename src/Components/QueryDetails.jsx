import WeeklyDose from "./queryDetails/WeeklyDose"
import Dates from "./queryDetails/Dates"
import Medicine from "./queryDetails/Medicine"

function QueryDetails({ wDose, setWDose, dateRange, setDateRange, medicines }) {
	return (
		<div className="p-4">
			<WeeklyDose wDose={wDose} setWDose={setWDose} />
			<Dates
				dateRange={{ start: dateRange.start, end: dateRange.end }}
				setDateRange={setDateRange}
			/>
			<Medicine medicines={medicines} />
		</div>
	)
}

export default QueryDetails