import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";
import { useRouter } from "next/router";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [dbUser, setDbUser] = useState(null);
	const sub = authUser?.attributes?.sub;

	const router = useRouter();

	useEffect(() => {
		Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
	}, [Auth]);

	useEffect(() => {
		if (sub) {
			fetchUser();
		}
	}, [sub]);

	const fetchUser = async () => {
		const user = await DataStore.query(User, (user) => user.sub("eq", sub));
		setDbUser(user[0]);
	};
	const signUp = async (person) => {
		setAuthUser(null);
		let { email, password, username, phone_number } = person;
		phone_number = `+${phone_number.replace(/-/g, "")}`;

		try {
			const { user } = await Auth.signUp({
				username,
				password,
				attributes: {
					email, // optional
					phone_number, // optional - E.164 number convention
					// other custom attributes
				},
			});
			return user;
		} catch (error) {
			console.log("error signing up, cognito.js line 19:", error);
		}
	};

	const confirmSignUp = async (username, code) => {
		try {
			const message = await Auth.confirmSignUp(username, code);
			return message;
		} catch (error) {
			return error;
		}
	};

	const addUserToDatastoreIfNotExists = async (user) => {
		const { username, attributes } = user;
		const { sub, email, phone_number } = attributes;
		const userExists = await DataStore.query(User, (user) =>
			user.sub("eq", sub)
		);
		if (userExists.length < 1) {
			const newUser = await DataStore.save(
				new User({
					sub,
					username,
					email,
					phone: phone_number,
				})
			);

			setAuthUser(null);
			setDbUser(newUser);
		} else {
			setAuthUser(null);
			setDbUser(userExists[0]);
		}
	};

	const signIn = async (username, password, customer) => {
		try {
			const user = await Auth.signIn(username, password);
			if (customer) {
				addUserToDatastoreIfNotExists(user);
			} else {
				setAuthUser(user);
			}
			return user;
		} catch (error) {
			return error.message;
		}
	};

	const authSignOut = async () => {
		try {
			await Auth.signOut();
			setAuthUser(null);
			setDbUser(null);
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				authUser,
				setAuthUser,
				sub,
				setDbUser,
				dbUser,
				signUp,
				confirmSignUp,
				signIn,
				authSignOut,
				addUserToDatastoreIfNotExists,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
