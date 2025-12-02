
"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function StudentLoginPage() {
	const [form, setForm] = useState({ name: "", className: "", div: "", parentMobile: "" });
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [message, setMessage] = useState("");
	const [btnStyle, setBtnStyle] = useState<React.CSSProperties | undefined>(undefined);
	const [registerStyle, setRegisterStyle] = useState<React.CSSProperties | undefined>(undefined);
	const [loginColorIndex, setLoginColorIndex] = useState(0);
	const [registerColorIndex, setRegisterColorIndex] = useState(0);
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const registerRef = useRef<HTMLAnchorElement | null>(null);
	const [isRegisterHovered, setIsRegisterHovered] = useState(false);

	const gradientPalette = [
		"linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
		"linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
		"linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
		"linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
		"linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
		"linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
		"linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
		"linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setRegisterColorIndex((prevIndex) => {
				const nextIndex = (prevIndex + 1) % gradientPalette.length;
				if (!isRegisterHovered) {
					setRegisterStyle({
						background: gradientPalette[nextIndex],
						color: "white",
						boxShadow: "0 8px 24px rgba(99, 102, 241, 0.3), 0 0 20px rgba(139, 92, 246, 0.15)",
						borderColor: "transparent",
						transform: "translateY(0)",
						transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					});
				}
				return nextIndex;
			});
		}, 1500);

		return () => clearInterval(interval);
	}, [isRegisterHovered, gradientPalette.length]);

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

	function handleMouseEnter() {
		const nextIndex = (loginColorIndex + 1) % gradientPalette.length;
		setLoginColorIndex(nextIndex);
		setBtnStyle({
			background: gradientPalette[nextIndex],
			color: "white",
			boxShadow: "0 12px 32px rgba(99, 102, 241, 0.4), 0 0 30px rgba(139, 92, 246, 0.25)",
			transform: "translateY(-3px)",
			transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		});
	}

	function handleMouseLeave() {
		setBtnStyle({
			background: gradientPalette[loginColorIndex],
			color: "white",
			boxShadow: "0 8px 24px rgba(99, 102, 241, 0.3), 0 0 20px rgba(139, 92, 246, 0.15)",
			transform: "translateY(0)",
			transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		});
	}

	function handleRegisterMouseEnter() {
		setIsRegisterHovered(true);
		const nextIndex = (registerColorIndex + 1) % gradientPalette.length;
		setRegisterColorIndex(nextIndex);
		setRegisterStyle({
			background: gradientPalette[nextIndex],
			color: "white",
			boxShadow: "0 12px 32px rgba(99, 102, 241, 0.4), 0 0 30px rgba(139, 92, 246, 0.25)",
			borderColor: "transparent",
			transform: "translateY(-3px)",
			transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		});
	}

	function handleRegisterMouseLeave() {
		setIsRegisterHovered(false);
		setRegisterStyle({
			background: gradientPalette[registerColorIndex],
			color: "white",
			boxShadow: "0 8px 24px rgba(99, 102, 241, 0.3), 0 0 20px rgba(139, 92, 246, 0.15)",
			borderColor: "transparent",
			transform: "translateY(0)",
			transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		});
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
