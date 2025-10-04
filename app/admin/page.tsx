import { auth } from "@/auth";
import { put } from "@vercel/blob";
import getCollection from "../../lib/db";

const Admin = async () => {
	const session = await auth();
	return session ? (
		<form action={handleUpload}>
			<input type='file' name='image' />
			<input type='text' name='description' />
			<button type='submit'>Submit</button>
		</form>
	) : (
		<h1>Admins Only! Please Log In.</h1>
	);
};

async function handleUpload(formData: FormData) {
	"use server";
	const img = formData.get("image") as File;
	const description = formData.get("description") as string;
	const url = await put("pics/" + img.name, img, { access: "public" });
	const collection = await getCollection("img_ref");
	const results = await collection?.insertOne({
		name: img.name,
		url,
		description,
	});
	console.log(results?.acknowledged);
}

export default Admin;
