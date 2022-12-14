import React, { useState, createContext, useContext, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Drink, CartItem } from "../models";

const DrinkContext = createContext();

export const DrinkContextProvider = ({ children }) => {
	const [drinks, setDrinks] = useState([]);

	useEffect(() => {
		const fetchDrinks = async () => {
			const response = await DataStore.query(Drink);
			console.log("response", response);
			setDrinks(response);
		};
		fetchDrinks();
	}, []);

	const addDrink = async (drink) => {
		//add drink to datastore
		const newDrink = await DataStore.save(new Drink(drink));
		//add drink to state
		setDrinks([...drinks, newDrink]);
	};

	const updateDrink = async (drink) => {
		let { id, name, description, price } = drink;

		price = parseFloat(price);
		//update the drink in the datastore
		const orginal = await DataStore.query(Drink, id);
		await DataStore.save(
			Drink.copyOf(orginal, (updated) => {
				updated.name = name;
				updated.description = description;
				updated.price = price;
			})
		);
		//update the drink in the state
		setDrinks(
			drinks.map((d) => {
				if (d.id === drink.id) {
					return drink;
				}
				return d;
			})
		);
	};

	const removeDrink = async (id) => {
		//fetch the cartItem from the datastore
		const models = await DataStore.query(CartItem);
		//filter out the cartItems that have the drink id
		const idExists = models.filter((model) => model.drinkID === id);
		await DataStore.query(Drink, id);
		//delete the cartItem of user has it in the cart
		if (idExists.length > 0) {
			await DataStore.delete(CartItem, (c) => c.drinkID("eq", id));
		}

		//remove the drink from the datastore
		DataStore.delete(Drink, id);
		//remove the drink from the state
		setDrinks(drinks.filter((d) => d.id !== id));
	};

	return (
		<DrinkContext.Provider
			value={{ drinks, addDrink, removeDrink, updateDrink }}>
			{children}
		</DrinkContext.Provider>
	);
};

export const useDrinkContext = () => useContext(DrinkContext);
