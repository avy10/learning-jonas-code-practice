import { useState } from "react";
const ICON_SOURCES = [
	{
		name: "IndiGo",
		shortID: "6E",
		longID: "6E001",
		icon2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcUMH0VxUTElD1tjWO8iLs_8mN7Lm2l0HEw&s",
		newtonID: "65144a1b664a43628887c45e",
	},

	{
		name: "Air India",
		shortID: "AI",
		longID: "AI001",
		icon2: "https://play-lh.googleusercontent.com/BMIZX4wV8t3ZbgDaPwPNXgzsSWrmu9c-aMIBPknr9MttjL05SsHRPJ7shNy4D-bA6y5U",
		newtonID: "65144a1b664a43628887c45d",
	},
	{
		name: "Vistara",
		shortID: "UK",
		longID: "UK001",
		icon2: "https://play-lh.googleusercontent.com/E_SwrB7iPlTB53XBwlrgNsWPM_JhJ8DPK60Ht_RDHLkim_FIGF558LPA7QXw4ksWYEU",
		newtonID: "65144a1b664a43628887c460",
	},
	{
		name: "SpiceJet",
		shortID: "SG",
		longID: "SG001",
		icon2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-HlmvzR5LoJ-ME_f5OcL2OBYYj7l8YKfiEqiqg8U7JIOmLLuIuJiBroO9mZDtm1MDwVM&usqp=CAU",
		newtonID: "65144a1b664a43628887c45f",
	},
	{
		name: "Go Air",
		shortID: "G8",
		longID: "G801",
		icon2: "https://play-lh.googleusercontent.com/E_SwrB7iPlTB53XBwlrgNsWPM_JhJ8DPK60Ht_RDHLkim_FIGF558LPA7QXw4ksWYEU",
		newtonID: "65144a1b664a43628887c461",
	},
];
export default function TempApp() {
	const [selectedAirline, setSelectedAirline] = useState(undefined);
	// const [selectedAirline, setSelectedAirline] = useState("65144a1b664a43628887c460");
	function airlineSelectionHandler(e, target) {
		if (e.target.checked) {
			setSelectedAirline(target);
		} else {
			setSelectedAirline(undefined);
		}
		console.log(target);
		console.log(e.target.checked);
	}
	const [sortOptions, setSortOptions] = useState({});
	const [filterOptions, setFilterOptions] = useState({});
	return (
		<div>
			<h1>AAAAAA</h1>
			<FilterAirlines
				selectedAirline={selectedAirline}
				airlineSelectionHandler={airlineSelectionHandler}
			/>
		</div>
	);
}

function FilterAirlines({ selectedAirline, airlineSelectionHandler }) {
	const [renderAirline, setRenderAirlines] = useState([...ICON_SOURCES]);
	return (
		<div className="filterAirlines">
			{renderAirline.map((element, index) => (
				<div key={index}>
					<input
						type="checkbox"
						className="filterCheckBox"
						checked={element.newtonID == selectedAirline}
						onChange={(e) =>
							airlineSelectionHandler(e, element.newtonID)
						}
					/>
					<label>
						<img src={element.icon2} style={{ height: "50px" }} />
						{element.name}
					</label>
				</div>
			))}
		</div>
	);
}
