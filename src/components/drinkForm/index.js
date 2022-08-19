import React, { useState } from "react";

import classes from "./drinkForm.module.scss";
import { Button } from "reactstrap";
import CustomInputs from "../CustomInput";

import { useDrinkContext } from "../../contexts/DrinkContext";

export default function DrinkForm({ setMessage }) {
	const { addDrink } = useDrinkContext();
	const [drink, setDrink] = useState({
		name: "",
		description: "",
		price: "",
	});

	const storeDrink = async (e) => {
		e.preventDefault();
		drink.price = parseFloat(drink.price);

		//reset state
		setDrink({
			name: "",
			description: "",
			image: "",
			price: "",
		});

		await addDrink(drink);

		setMessage(`${drink.name} has been added successfully`);
	};
	return (
		<div>
			<form className={classes.form_container}>
				<CustomInputs drink={drink} setDrink={setDrink} />

				<Button color="success" onClick={(e) => storeDrink(e)}>
					Submit
				</Button>
			</form>
		</div>
	);
}
