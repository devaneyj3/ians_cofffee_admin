import React, { useState } from "react";
import DrinkForm from "../drinkForm";

import { Alert } from "reactstrap";
import { useRouter } from "next/router";
import Inventory from "../inventory";
import { GrAdd } from "react-icons/gr";

import classes from "./dashboard.module.scss";

import { useDrinkContext } from "../../contexts/DrinkContext";

import { Collapse, Button } from "reactstrap";

export default function Dashboard({ user }) {
	const [collapse, setCollapse] = useState(false);

	const [message, setMessage] = useState("");

	const { drinks } = useDrinkContext();

	const router = useRouter();

	if (message) {
		setTimeout(() => {
			setMessage("");
		}, 2000);
	}

	return (
		<div className={classes.dashboard}>
			<section className={classes.welcome}>
				<h1>Hello {user && user.attributes.name}</h1>
				<p>Manage your inventory.</p>
			</section>
			{message && <Alert color="success">{message}</Alert>}
			{drinks.length > 0 ? (
				<Inventory drinks={drinks} />
			) : (
				<p> You have no drinks</p>
			)}
			<Button
				color="primary"
				onClick={() => setCollapse(!collapse)}
				style={{ marginBottom: "1rem" }}>
				Add Drink <GrAdd />
			</Button>
			<Collapse isOpen={collapse}>
				<DrinkForm setMessage={setMessage} />
			</Collapse>
		</div>
	);
}
