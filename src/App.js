import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import QueryDetails from './Components/QueryDetails'
import Calendar from './Components/Calendar'
import { v4 as uuidv4 } from 'uuid'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function App() {
	const [doses, setDoses] = useState([]) // doses from api
	const [wDose, setWDose] = useState(0) // weekly dose
	const [dateRange, setDateRange] = useState() // start and end of calendar dates object start:, end:
	const [medicines, setMedicines] = useState([])
	const [isInputs, setIsInputs] = useState(false)

	const DelConfirmModal = () => {
		const [show, toggleShow] = useState(true)

		return (
			<>
				{!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
				<Modal.Dialog>
					<Modal.Header closeButton>
						<Modal.Title>Modal title</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Modal body text goes here.</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary">Close</Button>
						<Button variant="primary">Save changes</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</>
		)
	}

	// first time on load
	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('data')) // get data from local storage
		// TODO add data verify
		// verifyData(data)

		if (!data) {
			data = {}
			//set default data
			data.weeklyDose = 42.8
			data.startDate = '2022-05-21'
			data.endDate = '2022-06-21'
			data.medArr = [
				{
					id: uuidv4(),
					name: 'Warfarinum',
					mg: 5,
					quantity: 100,
					splitParts: [1, 0.5],
					color: 'red',
				},
			]
		}
		// set data
		setWDose(data.weeklyDose)

		setDateRange({
			start: data.startDate,
			end: data.endDate,
		})
		setMedicines(data.medArr)
		// console.log(data.medArr)

		setIsInputs(true)
		localStorage.setItem('data', JSON.stringify(data))
	}, [])

	// update local storage
	useEffect(() => {
		if (!isInputs) return
		const data = {
			weeklyDose: wDose,
			startDate: dateRange.start,
			endDate: dateRange.end,
			medArr: medicines,
		}

		getCalendar(data)
		localStorage.setItem('data', JSON.stringify(data))
	}, [isInputs, wDose, dateRange, medicines])

	function getCalendar(data) {
		axios.post(`https://stonkus.lt/api/inr/`, data).then((res) => {
			setDoses(res.data)
		})
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>Warfarin Dose Calendar</h1>
			</header>
			<main>
				{isInputs ? (
					<>
						<QueryDetails
							wDose={wDose}
							setWDose={setWDose}
							dateRange={dateRange}
							setDateRange={setDateRange}
							setMedicines={setMedicines}
							medicines={medicines}
						/>
						<Calendar doses={doses} />
					</>
				) : (
					<h2>No default input data!</h2>
				)}
			</main>
		</div>
	)
}

export default App