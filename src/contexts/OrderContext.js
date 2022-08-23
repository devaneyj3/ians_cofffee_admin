import React, { createContext, useContext } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Order, OrderDrink, Drink } from "../models";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
	const fetchAllOrders = async () => {
		const orders = await DataStore.query(Order);

		return orders;
	};

	const fetchOrder = async (id) => {
		const orderDrinks = await DataStore.query(OrderDrink, (c) =>
			c.orderID("eq", id)
		);
		return orderDrinks;
	};

	return (
		<OrderContext.Provider value={{ fetchAllOrders, fetchOrder }}>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrderContext = () => useContext(OrderContext);
