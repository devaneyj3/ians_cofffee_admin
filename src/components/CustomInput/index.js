import React from "react";

export default function CustomInputs({ drink, setDrink }) {
	const onChange = (e) => {
		const { name, value } = e.target;
		setDrink({ ...drink, [name]: value });
	};
	return (
		<>
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={drink.name}
				onChange={(e) => onChange(e)}
			/>
			<input
				type="text"
				name="description"
				placeholder="Description"
				value={drink.description}
				onChange={(e) => onChange(e)}
			/>
			<input
				type="text"
				name="image"
				placeholder="Image"
				value={drink.image}
				onChange={(e) => onChange(e)}
			/>
			<input
				type="number"
				min="0.01"
				step="0.01"
				max="2500"
				placeholder="Price"
				name="price"
				value={drink.price}
				onChange={(e) => onChange(e)}
			/>
		</>
	);
}
