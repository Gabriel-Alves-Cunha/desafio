///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Main functions:

export async function getUser(userId: UserID): Promise<User> {
	const res = await fetch(`https://fakestoreapi.com/users/${userId}`);
	const user: User = await res.json();

	return user;
}

///////////////////////////////////////

export async function getAllUsers(): Promise<readonly User[]> {
	const res = await fetch(`https://fakestoreapi.com/users`);
	const user: User[] = await res.json();

	return user;
}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Types:

export type GeoLocation = Readonly<{
	long: string;
	lat: string;
}>;

///////////////////////////////////////

export type UserID = number;

///////////////////////////////////////

export type User = Readonly<{
	username: string;
	password: string;
	email: string;
	phone: string;
	id: number;
	name: {
		firstname: string;
		lastname: string;
	};
	address: {
		geolocation: GeoLocation;
		zipcode: string;
		street: string;
		number: number;
		city: string;
	};
}>;
