import { useState, useEffect } from "react"


const Home = () => {

	// Hooks useState() --> viene de reactJS
	// 0: Es el estado actual del componente
	// 1: Es la única persona, funcion o cosa que puede modificar el estado del componente
	const [counter, setCounter] = useState(0)
	const [color, setColor] = useState("text-success")
	const [ligth, setlight] = useState(false)
	const [time, setTime] = useState(new Date())
	const [characters, setCharacters] = useState([])



	const getPerson = async () => {
		const response = await fetch("https://rickandmortyapi.com/api/character")
		const data = await response.json()
		setCharacters(data.results)
	}



	// Code javascript
	function increment() {
		if (counter <= 0) {
			setColor("text-danger")
		} else {
			setColor("text-success")
		}
		setCounter(counter + 2)


	}

	function decrement() {
		if (counter <= 0) {
			setColor(() => "text-danger")
		} else {
			setColor(() => "text-success")
		}

		setCounter(counter - 2)

	}

	const changeColors = () => {
		if (counter <= 0) {
			setColor("text-danger")
		} else {
			setColor("text-success")
		}
	}


	// effects
	useEffect(() => {
		console.log("Me ejecuto useeffects, api awaiting")
	}, [ligth])



	useEffect(() => {
		let intervalId = setInterval(() => {
			setCounter(counter + 1)
		}, 1000)

		return () => clearInterval(intervalId)


	}, [counter])


	useEffect(() => {
		getPerson()
	}, [])


	return (
		<>
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-7 border border-danger">
						<h1
							className={`mt-3 ${color}`}
						>
							Counter: {counter}
						</h1>

						<button
							className="btn btn-success my-3"
							onClick={increment}
						>Increment</button>

						<br />
						<button
							className="btn btn-danger"
							onClick={decrement}
						>Decrement</button>

						<div
							className={`my-light ${ligth ? "bg-warning" : "bg-secondary"}`}
							onClick={() => setlight(!ligth)}
						>
							{ligth ? "on" : "off"}
						</div>
					</div>

					<div>
						{time.toString()}
					</div>
					<ul>
						{
							characters.map((item) => {
								return (
									<li key={item.id}>{`Hola ¿qué tal ${item.name}`} <img src={item.image} alt="" /></li>
								)
							})
						}

					</ul>
				</div>
			</div >
		</>
	);
};

export default Home;