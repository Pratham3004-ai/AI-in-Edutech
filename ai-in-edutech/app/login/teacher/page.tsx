"use client"

import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function TeacherLoginPage() {
  const [form, setForm] = useState({ name: "", className: "", div: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [btnStyle, setBtnStyle] = useState<React.CSSProperties | undefined>(undefined);
  const [btnColorIndex, setBtnColorIndex] = useState(0);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Teacher name is required";
    if (!form.className.trim()) err.className = "Class is required";
    if (!form.div.trim()) err.div = "Division is required";
    return err;
  }

  function handleMouseEnter() {
    const nextIndex = (btnColorIndex + 1) % gradients.length;
    setBtnColorIndex(nextIndex);
    const gradient = gradients[nextIndex];
    setBtnStyle({
      background: gradient,
      color: "white",
      boxShadow: "0 15px 40px rgba(102, 126, 234, 0.4)",
      transform: "translateY(-2px)",
    });
  }

  function handleMouseLeave() {
    setBtnStyle({
      background: gradients[btnColorIndex],
      color: "white",
      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.2)",
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSuccess(true);
      setMessage(`Welcome back, ${form.name}! 🎉`);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 3000);
    } else {
      setSuccess(false);
      setMessage("");
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.decorativeBlob1}></div>
      <div className={styles.decorativeBlob2}></div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconCircle}>
            <span className={styles.icon}>👨‍🏫</span>
          </div>
          <h1 className={styles.title}>Teacher Login</h1>
          <p className={styles.subtitle}>Welcome back! Access your dashboard</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              <span className={styles.labelIcon}>👤</span> Teacher Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              placeholder="e.g. Mr. Ramesh Kumar"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="className" className={styles.label}>
                <span className={styles.labelIcon}>📚</span> Class
              </label>
              <input
                id="className"
                name="className"
                type="text"
                value={form.className}
                onChange={handleChange}
                className={`${styles.input} ${errors.className ? styles.inputError : ""}`}
                placeholder="e.g. 10, 12, 9A"
              />
              {errors.className && <span className={styles.error}>{errors.className}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="div" className={styles.label}>
                <span className={styles.labelIcon}>🎓</span> Division
              </label>
              <input
                id="div"
                name="div"
                type="text"
                value={form.div}
                onChange={handleChange}
                className={`${styles.input} ${errors.div ? styles.inputError : ""}`}
                placeholder="e.g. A, B, C"
              />
              {errors.div && <span className={styles.error}>{errors.div}</span>}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              ref={btnRef}
              type="submit"
              className={styles.loginBtn}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={btnStyle}
            >
              <span className={styles.buttonText}>Login</span>
              <span className={styles.buttonIcon}>→</span>
            </button>
          </div>

          <div className={styles.divider}>
            <span>New user?</span>
          </div>

          <Link href="/login/teacher/register" className={styles.registerBtn}>
            <span className={styles.registerIcon}>✨</span>
            Create Account
          </Link>

          {message && (
            <div className={`${styles.message} ${success ? styles.messageSuccess : styles.messageError}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
