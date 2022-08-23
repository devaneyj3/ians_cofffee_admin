import React, { useState, useEffect } from "react";

import classes from "./OrderItem.module.scss";

import { Drink } from "../../models";

import { DataStore } from "@aws-amplify/datastore";

export default function OrderItem({ detail }) {
	const [drink, setDrink] = useState(null);
	useEffect(() => {
		const getDrink = async () => {
			const drink = await DataStore.query(Drink, detail.drinkID);
			setDrink(drink);
		};
		getDrink();
	}, []);

	return (
		<div>
			{detail && drink ? (
				<>
					<div className={classes.product}>
						<p>{detail.quantity}&#10799;</p>
						<p>{drink.name}</p>
					</div>
				</>
			) : null}
		</div>
	);
}
