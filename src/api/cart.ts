import type { UserID } from "./user";

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Main functions:

export async function getCart(userId: UserID): Promise<Cart> {
	const res = await fetch(`https://fakestoreapi.com/carts/${userId}`);
	const items: Cart = await res.json();

	return items;
}

///////////////////////////////////////

export async function getAllCarts(): Promise<readonly Cart[]> {
	const res = await fetch("https://fakestoreapi.com/carts");
	const items: Cart[] = await res.json();

	return items;
}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Types:

export type Product = Readonly<{
	productId: number;
	quantity: number;
}>;

///////////////////////////////////////

export type Cart = Readonly<{
	products: readonly Product[];
	userId: number;
	id: number;
	date: Date;
}>;
