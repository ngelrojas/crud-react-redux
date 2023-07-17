import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import React, { useState } from "react";
import { useUserActions } from "../hook/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "error" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const user = {
			id: Math.random().toString(16).slice(2),
			name: data.get("name") as string,
			email: data.get("email") as string,
			github: data.get("github") as string,
		};
		if (!user.name || !user.email || !user.github) {
			return setResult("error");
		}
		addUser(user);
		setResult("ok");
		form.reset();
	};
	return (
		<Card style={{ marginTop: "16px" }}>
			<form onSubmit={handleSubmit}>
				<Title>Crear nuevo usuario</Title>
				<TextInput name="name" placeholder="Nombre" />
				<TextInput name="email" placeholder="Email" />
				<TextInput name="github" placeholder="Github" />
				<Button style={{ marginTop: "16px" }} type="submit">
					Crear usuario
				</Button>
				<span>
					{result === "ok" && (
						<Badge color="green">guardado correctamente</Badge>
					)}
					{result === "error" && <Badge color="red">error al guardar</Badge>}
				</span>
			</form>
		</Card>
	);
}
