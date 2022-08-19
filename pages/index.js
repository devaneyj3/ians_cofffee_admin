import { useEffect, useState } from "react";

import { Auth } from "aws-amplify";

import Dashboard from "../src/components/dashboard";

function Home() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetchUser = async () => {
			const userData = await Auth.currentAuthenticatedUser();
			setUser(userData);
			console.log(userData);
		};
		fetchUser();
	}, []);

	return <Dashboard user={user} />;
}
export default Home;
