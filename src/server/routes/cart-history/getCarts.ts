import { UserID } from ".";

export async function getCarts(userId: UserID): Promise<Cart[]> {
	const res = await fetch(`https://fakestoreapi.com/carts/${userId}`);
	const items: Cart[] = await res.json();

	console.log("Items from fake API:", items);

	return items;
}

export type Cart = Readonly<{
	products: readonly { productId: number; quantity: number }[];
	userId: number;
	id: number;
	date: Date;
}>;
