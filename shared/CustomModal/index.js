import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function CustomModal({ selectedDrink, modal, toggle }) {
	const { removeDrink } = useDrinkContext();
	const deleteInfo = async (drinkId) => {
		await removeDrink(drinkId);
		//close modal
		toggle();
	};
	return (
		<div>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Delete</ModalHeader>
				<ModalBody>
					Are you sure you want to delete {selectedDrink.name}
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => deleteInfo(selectedDrink.id)}>
						Yes
					</Button>
					<Button color="secondary" onClick={toggle}>
						No
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
