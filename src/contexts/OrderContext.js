import React, { createContext, useContext } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Order, OrderDrink } from "../models";

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

	const changeOrderStatus = async (id, status) => {
		const original = await DataStore.query(Order, id);

		await DataStore.save(
			Order.copyOf(original, (item) => {
				item.status = status;
			})
		);
	};

	return (
		<OrderContext.Provider
			value={{ fetchAllOrders, fetchOrder, changeOrderStatus }}>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrderContext = () => useContext(OrderContext);
