import React, { useState } from "react";
import { Table } from "reactstrap";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import CustomModal from "../../../shared/CustomModal";
import CustomInputs from "../../../shared/CustomInput";

export default function Inventory({ drinks }) {
	const [selectedDrink, setSelectedDrink] = useState("");
	const [editingId, setIsEditingId] = useState("");
	const [data, setData] = useState({
		name: "",
		description: "",
		price: "",
	});

	const toggle = () => {
		setModal(!modal);
	};

	const [modal, setModal] = useState(false);

	const triggerModal = (drink) => {
		setSelectedDrink(drink);
		setModal(!modal);
	};

	const editedDrink = async (drink) => {
		let { id, name, description, price } = drink;

		const editedDrink = {
			id,
			name: data.name || name,
			description: data.description || description,
			price: parseFloat(data.price) || parseFloat(price),
		};
		console.log(editedDrink);

		updateDrink(editedDrink);

		if (name === "" || description === "" || price === "") {
			setIsEditingId(null);
		}
		setIsEditingId(null);
		//reset state
		setData({
			name: "",
			description: "",
			price: "",
		});
	};
	if (!drinks.length) {
		return <div>Loading...</div>;
	}

	const onChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	return (
		<>
			<Table striped>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{drinks.map((drink) => {
						return (
							<>
								{editingId === drink.id ? (
									<tr>
										<td>
											<input
												type="text"
												name="name"
												placeholder={drink.name}
												value={data.name}
												onChange={(e) => onChange(e)}
											/>
										</td>
										<td>
											<input
												type="text"
												name="description"
												placeholder={drink.description}
												value={data.description}
												onChange={(e) => onChange(e)}
											/>
										</td>
										<td>
											<input
												type="number"
												min={0}
												max={100}
												name="price"
												placeholder={drink.price}
												value={data.price}
												onChange={(e) => onChange(e)}
											/>
										</td>
										<td>
											<AiFillEdit onClick={() => editedDrink(drink)} />
										</td>
									</tr>
								) : (
									<tr>
										<td>{drink.name}</td>
										<td>{drink.description}</td>
										<td>${drink.price}</td>
										<td>
											<AiFillDelete onClick={() => triggerModal(drink)} />
										</td>
										<td>
											<AiFillEdit onClick={() => setIsEditingId(drink.id)} />
										</td>
									</tr>
								)}
							</>
						);
					})}
				</tbody>
			</Table>
			{selectedDrink && (
				<CustomModal
					selectedDrink={selectedDrink}
					modal={modal}
					toggle={toggle}
				/>
			)}
		</>
	);
}
