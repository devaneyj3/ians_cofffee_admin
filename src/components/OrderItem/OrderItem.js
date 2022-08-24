import React, { useState, useEffect } from "react";

import classes from "./OrderItem.module.scss";

import { Drink, OrderStatus } from "../../models";

import { DataStore } from "@aws-amplify/datastore";

import { useOrderContext } from "../../contexts/OrderContext";

export default function OrderItem({ detail, status }) {
	const [orderStatus, setStatus] = useState(status);

	const { changeOrderStatus } = useOrderContext();

	const [drink, setDrink] = useState(null);
	useEffect(() => {
		const getDrink = async () => {
			const drink = await DataStore.query(Drink, detail.drinkID);
			setDrink(drink);
		};
		getDrink();
	}, [detail]);

	const changeStatus = async (orderID) => {
		if (orderStatus === OrderStatus.NEW) {
			setStatus(OrderStatus.IN_PROGRESS);
			await changeOrderStatus(orderID, OrderStatus.IN_PROGRESS);
		} else if (orderStatus === OrderStatus.IN_PROGRESS) {
			setStatus(OrderStatus.READY_FOR_PICKUP);
			await changeOrderStatus(orderID, OrderStatus.READY_FOR_PICKUP);
		} else if (orderStatus === OrderStatus.READY_FOR_PICKUP) {
			setStatus(OrderStatus.COMPLETED);
			await changeOrderStatus(orderID, OrderStatus.COMPLETED);
		}
	};

	return (
		<div className={classes.order_details}>
			{detail && drink ? (
				<>
					<div className={classes.product}>
						<p>{detail.quantity}&#10799;</p>
						<p>{drink.name}</p>
					</div>
					<section className={classes.btn_container}>
						<button
							className={classes.status_btn}
							onClick={() => changeStatus(detail.orderID)}>
							{orderStatus}
						</button>
					</section>
				</>
			) : null}
		</div>
	);
}
