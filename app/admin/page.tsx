import { auth } from "@/auth";
import { uploadImage } from "../../lib/db";
import { putImage } from "../../lib/blob";

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
	const session = await auth();
	if (!session) throw new Error("Not authorized to upload to the Database");
	if (validateForm(formData)) {
		const img = formData.get("image") as File;
		const description = formData.get("description") as string;

		const url = await putImage(img, session);
		await uploadImage(img.name, url, description, session);
	}
}

const validateForm = (formData: FormData) => {
	if (!formData.get("image")) return false;
	if (!formData.get("description")) return false;
	return true;
};

export default Admin;
