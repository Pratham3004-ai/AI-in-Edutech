
"use client"

import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function StudentLoginPage() {
	const [form, setForm] = useState({ name: "", className: "", div: "", parentMobile: "" });
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [message, setMessage] = useState("");
	const [btnStyle, setBtnStyle] = useState<React.CSSProperties | undefined>(undefined);
	const [registerStyle, setRegisterStyle] = useState<React.CSSProperties | undefined>(undefined);
	const btnRef = useRef<HTMLButtonElement | null>(null);

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;
		setForm((s) => ({ ...s, [name]: value }));
	}

	function validate() {
		const err: Record<string, string> = {};
		if (!form.name.trim()) err.name = "Student name is required";
		if (!form.className.trim()) err.className = "Class is required";
		if (!form.div.trim()) err.div = "Division is required";
		if (!/^\d{10}$/.test(form.parentMobile)) err.parentMobile = "Enter a valid 10-digit mobile number";
		return err;
	}

	function randomGradient() {
		const colors = [
			["#ff9a9e", "#fad0c4"],
			["#a18cd1", "#fbc2eb"],
			["#f6d365", "#fda085"],
			["#84fab0", "#8fd3f4"],
			["#cfd9df", "#e2ebf0"],
			["#f093fb", "#f5576c"],
			["#43e97b", "#38f9d7"],
			["#30cfd0", "#330867"],
		];
		const pick = colors[Math.floor(Math.random() * colors.length)];
		return `linear-gradient(120deg, ${pick[0]} 0%, ${pick[1]} 100%)`;
	}

	function handleMouseEnter() {
		const bg = randomGradient();
		setBtnStyle({ background: bg, color: "white", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" });
	}

	function handleMouseLeave() {
		setBtnStyle(undefined);
	}

	function handleRegisterMouseEnter() {
		const bg = randomGradient();
		setRegisterStyle({ background: bg, color: "white", boxShadow: "0 8px 24px rgba(0,0,0,0.18)", borderColor: "transparent" });
	}

	function handleRegisterMouseLeave() {
		setRegisterStyle(undefined);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const v = validate();
		setErrors(v);
		if (Object.keys(v).length === 0) {
			setMessage(`Welcome, ${form.name}!`);
		} else {
			setMessage("");
		}
	}

	return (
		<main className={styles.page}>
			<div className={styles.card}>
				<h1 className={styles.title}>Student Login</h1>
				<p className={styles.subtitle}>Enter your details to continue</p>

				<form className={styles.form} onSubmit={handleSubmit} noValidate>
					<label className={styles.label}>
						Student Name
						<input name="name" value={form.name} onChange={handleChange} className={styles.input} placeholder="e.g. Arya Sharma" />
						{errors.name && <span className={styles.error}>{errors.name}</span>}
					</label>

					<label className={styles.row}>
						<span>
							Class
							<input name="className" value={form.className} onChange={handleChange} className={styles.input} placeholder="e.g. 8" />
							{errors.className && <span className={styles.error}>{errors.className}</span>}
						</span>
						<span>
							Division
							<input name="div" value={form.div} onChange={handleChange} className={styles.input} placeholder="e.g. A" />
							{errors.div && <span className={styles.error}>{errors.div}</span>}
						</span>
					</label>

					<label className={styles.label}>
						Parent's Mobile Number
						<input name="parentMobile" value={form.parentMobile} onChange={handleChange} className={styles.input} placeholder="10-digit mobile" />
						{errors.parentMobile && <span className={styles.error}>{errors.parentMobile}</span>}
					</label>

					<div className={styles.actions}>
						<button
							ref={btnRef}
							type="submit"
							className={styles.loginBtn}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							style={btnStyle}
						>
							Login
						</button>

						<Link
							href="/login/student/register"
							className={styles.registerBtn}
							onMouseEnter={handleRegisterMouseEnter}
							onMouseLeave={handleRegisterMouseLeave}
							style={registerStyle}
						>
							Not registered? Register
						</Link>
					</div>

					{message && <div className={styles.success}>{message}</div>}
				</form>
			</div>
		</main>
	);
}
