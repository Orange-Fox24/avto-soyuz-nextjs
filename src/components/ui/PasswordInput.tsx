// src/components/ui/PasswordInput.tsx
"use client";

import { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  showValidation?: boolean;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Минимум 8 символов",
  required = false,
  disabled = false,
  className,
  label,
  showValidation = false,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  const checks = {
    length: value.length >= 8,
    uppercase: /[A-ZА-Я]/.test(value),
    lowercase: /[a-zа-я]/.test(value),
    number: /[0-9]/.test(value),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
  };

  const strength = Object.values(checks).filter(Boolean).length;
  const strengthPercent = (strength / 5) * 100;

  const strengthColor =
    strength <= 2 ? "#ef4444" : strength <= 3 ? "#f59e0b" : strength <= 4 ? "#22c55e" : "#10b981";

  const strengthLabel =
    strength <= 2 ? "Слабый" : strength <= 3 ? "Средний" : strength <= 4 ? "Хороший" : "Отличный";

  const checkItems = [
    { label: "8+ символов", pass: checks.length },
    { label: "Заглавная буква", pass: checks.uppercase },
    { label: "Строчная буква", pass: checks.lowercase },
    { label: "Цифра", pass: checks.number },
    { label: "Спецсимвол", pass: checks.special },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
      {label && (
        <label style={{
          fontFamily: '"Actay Wide", "Actay", Arial, Helvetica, sans-serif',
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#0f0f0f",
        }}>
          {label}
          {required && <span style={{ color: "#ff0000", marginLeft: "0.25rem" }}>*</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={className}
          autoComplete="new-password"
          suppressHydrationWarning
          style={className ? undefined : {
            width: "100%",
            padding: "0.875rem 3rem 0.875rem 1rem",
            fontFamily: '"Actay", Arial, Helvetica, sans-serif',
            fontSize: "1rem",
            color: "#0f0f0f",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            outline: "none",
            transition: "all 0.2s ease",
          }}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            lineHeight: 1,
            opacity: 0.4,
          }}
          tabIndex={-1}
        >
          {show ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {showValidation && value && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{
            height: "4px",
            borderRadius: "2px",
            backgroundColor: "#e5e7eb",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${strengthPercent}%`,
              backgroundColor: strengthColor,
              borderRadius: "2px",
              transition: "width 0.3s, background-color 0.3s",
            }} />
          </div>
          <span style={{
            fontFamily: '"Actay", Arial, Helvetica, sans-serif',
            fontSize: "0.8rem",
            color: strengthColor,
            fontWeight: 600,
          }}>
            {strengthLabel}
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem" }}>
            {checkItems.map((check, i) => (
              <span key={i} style={{
                fontFamily: '"Actay", Arial, Helvetica, sans-serif',
                fontSize: "0.8rem",
                color: check.pass ? "#10b981" : "#9ca3af",
                transition: "color 0.3s",
              }}>
                {check.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}