import React, { useState, useEffect } from "react";
import OrderItem from "../OrderItem/OrderItem";

import { useOrderContext } from "../../contexts/OrderContext";

import { DataStore } from "@aws-amplify/datastore";

import { User } from "../../models";

export default function Order({ id, userID, status }) {
	const [details, setDetails] = useState("");

	const [user, setUser] = useState("");

	const { fetchOrder } = useOrderContext();

	useEffect(() => {
		const getDrink = async () => {
			const orderDetail = await fetchOrder(id);

			setDetails(orderDetail);
		};
		getDrink();
	}, [id]);

	useEffect(() => {
		//get user name
		const getUser = async () => {
			const user = await DataStore.query(User, (c) => c.sub("eq", userID));
			user.map((u) => {
				setUser(u);
			});
		};
		getUser();
	}, [userID]);

	return (
		<div>
			<p>Ordered by {user.name}</p>
			{details &&
				details.map((detail) => (
					<OrderItem key={detail.id} detail={detail} status={status} />
				))}
		</div>
	);
}
