import React from "react";
function getWeatherIcon(wmoCode) {
	const icons = new Map([
		[[0], "☀️"],
		[[1], "🌤"],
		[[2], "⛅️"],
		[[3], "☁️"],
		[[45, 48], "🌫"],
		[[51, 56, 61, 66, 80], "🌦"],
		[[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
		[[71, 73, 75, 77, 85, 86], "🌨"],
		[[95], "🌩"],
		[[96, 99], "⛈"],
	]);
	const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
	if (!arr) return "NOT FOUND";
	return icons.get(arr);
}

function convertToFlag(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
	return new Intl.DateTimeFormat("en", {
		weekday: "short",
	}).format(new Date(dateStr));
}

async function getWeather(location) {
	/* 	try {
		// 1) Getting location (geocoding)
		const geoRes = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${location}`
		);
		const geoData = await geoRes.json();
		console.log(geoData);

		if (!geoData.results) throw new Error("Location not found");

		const { latitude, longitude, timezone, name, country_code } =
			geoData.results.at(0);
		console.log(`${name} ${convertToFlag(country_code)}`);

		// 2) Getting actual weather
		const weatherRes = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
		);
		const weatherData = await weatherRes.json();
		console.log(weatherData.daily);
	} catch (err) {
		console.err(err);
	} */
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: "patna",
			myName: "Abhishek",
			isLoading: false,
		};
		// this.locationEventHandler = this.locationEventHandler.bind(this);
		this.fetchWeather = this.fetchWeather.bind(this);
	}
	/* locationEventHandler(newValue) {
		this.setState((currentState) => {
			return { ...currentState, location: newValue };
		});
	} */
	setLocation = (event) =>
		this.setState((currentState) => {
			return {
				...currentState,
				location: event.target.value,
			};
		});
	async fetchWeather() {
		// console.log(this.state.location);
		this.setState({ isLoading: true });
		try {
			// 1) Getting location (geocoding)
			const geoRes = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
			);
			const geoData = await geoRes.json();
			console.log(geoData);

			if (!geoData.results) throw new Error("Location not found");

			const { latitude, longitude, timezone, name, country_code } =
				geoData.results.at(0);
			console.log(`${name} ${convertToFlag(country_code)}`);
			this.setState({
				displayLocation: `${name} ${convertToFlag(country_code)}`,
			});

			// 2) Getting actual weather
			const weatherRes = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
			);
			const weatherData = await weatherRes.json();
			console.log(weatherData.daily);
			this.setState({ weather: weatherData.daily });
		} catch (err) {
			console.err(err);
		} finally {
			this.setState({ isLoading: false });
		}
	}
	render() {
		return (
			<div className="app">
				<h1>Classy weather</h1>
				<div>
					<Input
						location={this.state.location}
						onChangeHandler={this.setLocation}
					/>
					<button onClick={this.fetchWeather}>Get Weather</button>
					{this.state.isLoading && (
						<p className="loader">Loading data...</p>
					)}
					{this.state.weather?.weathercode && (
						<Weather
							weather={this.state?.weather}
							location={this.state?.location}
						/>
					)}
				</div>
			</div>
		);
	}
}
export default App;

class Weather extends React.Component {
	render() {
		const {
			temperature_2m_max: max,
			temperature_2m_min: min,
			time: dates,
			weathercode: codes,
		} = this.props.weather;
		return (
			<div>
				<h2>Weather {this.props.location}</h2>
				<ul className="weather">
					{dates.map((date, index) => (
						<Day
							date={date}
							maxTemp={max?.at(index)}
							minTemp={min?.at(index)}
							code={codes?.at(index)}
							key={index}
							isToday={index === 0}
						/>
					))}
				</ul>
			</div>
		);
	}
}

class Day extends React.Component {
	render() {
		const { date, maxTemp, minTemp, code, isToday } = this.props;
		return (
			<li className="day">
				<span>{getWeatherIcon(code)}</span>
				<p>{isToday ? "Today" : formatDay(date)}</p>
				<p>
					{minTemp}&deg; &mdash; {maxTemp}&deg;
				</p>
			</li>
		);
	}
}
