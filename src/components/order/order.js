import React, { useState, useEffect } from "react";
import OrderItem from "../OrderItem/OrderItem";

import { useOrderContext } from "../../contexts/OrderContext";

import { DataStore } from "@aws-amplify/datastore";

import { User } from "../../models";

export default function Order({ id, userID }) {
	const [details, setDetails] = useState("");

	const [user, setUser] = useState("");

	const { fetchOrder } = useOrderContext();

	useEffect(() => {
		const getDrink = async () => {
			const orderDetail = await fetchOrder(id);

			setDetails(orderDetail);
		};
		getDrink();
	}, []);

	useEffect(() => {
		//get user name
		const getUser = async () => {
			const user = await DataStore.query(User, (c) => c.sub("eq", userID));
			console.log(user);
			user.map((u) => {
				setUser(u);
			});
		};
		getUser();
	}, []);

	return (
		<div>
			<p>Ordered by {user.name}</p>
			{details && details.map((detail) => <OrderItem detail={detail} />)}
		</div>
	);
}
