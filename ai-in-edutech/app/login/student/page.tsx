"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

const colorSets = [
  ["#6366f1", "#6366f1"],
  ["#f43f5e", "#f59e42"],
  ["#10b981", "#34d399"],
  ["#fbbf24", "#f59e42"],
  ["#3b82f6", "#06b6d4"],
  ["#ef4444", "#f43f5e"],
  ["#a21caf", "#8b5cf6"],
];

function getRandomColorSet() {
  return colorSets[Math.floor(Math.random() * colorSets.length)];
}

export default function StudentLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    class: "",
    div: "",
    parentMobile: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buttonColors, setButtonColors] = useState(colorSets[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleButtonHover = () => {
    setButtonColors(getRandomColorSet());
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.class || !form.div || !form.parentMobile) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }
    
    setSuccess("Login successful! Welcome, " + form.name + ".");
    setError("");
   
  };


  const handleRegister = () => {
    router.push("/login/student/register");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.title}>Student Login</div>
        <div className={styles.subtitle}>
          Enter your credentials to access your dashboard
        </div>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.row}>
            <span>
              <label className={styles.label} htmlFor="name">Student Name</label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </span>
            <span>
              <label className={styles.label} htmlFor="class">Class</label>
              <input
                className={styles.input}
                type="text"
                id="class"
                name="class"
                placeholder="e.g. 10"
                value={form.class}
                onChange={handleChange}
                autoComplete="off"
              />
            </span>
          </div>
          <div className={styles.row}>
            <span>
              <label className={styles.label} htmlFor="div">Division</label>
              <input
                className={styles.input}
                type="text"
                id="div"
                name="div"
                placeholder="e.g. A"
                value={form.div}
                onChange={handleChange}
                autoComplete="off"
              />
            </span>
            <span>
              <label className={styles.label} htmlFor="parentMobile">Parent's Mobile</label>
              <input
                className={styles.input}
                type="tel"
                id="parentMobile"
                name="parentMobile"
                placeholder="Enter parent's mobile number"
                value={form.parentMobile}
                onChange={handleChange}
                autoComplete="off"
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </span>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.loginBtn}
              style={{
                background: `linear-gradient(135deg, ${buttonColors[0]} 0%, ${buttonColors[1]} 100%)`,
              }}
              onMouseEnter={handleButtonHover}
            >
              Login
            </button>
            <button
              type="button"
              className={styles.registerBtn}
              style={{
                background: `linear-gradient(135deg, ${buttonColors[0]} 0%, ${buttonColors[1]} 100%)`,
                color: "#fff",
                border: "none",
              }}
              onClick={handleRegister}
              onMouseEnter={handleButtonHover}
            >
              Not Registered? Register
            </button>
          </div>
          {success && <div className={styles.success}>{success}</div>}
        </form>
      </div>
    </div>
  );
}
