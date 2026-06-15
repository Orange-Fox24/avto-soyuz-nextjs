// src/components/ui/PhoneInput.tsx
"use client";

import { useState } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "+7 (___) ___-__-__",
  required = false,
  disabled = false,
  className,
  label,
}: PhoneInputProps) {
  const formatPhone = (input: string): string => {
    // Оставляем только цифры
    let digits = input.replace(/\D/g, "");
    
    // Убираем 7 или 8 в начале (оставляем остальные цифры)
    if (digits.startsWith("7") || digits.startsWith("8")) {
      digits = digits.substring(1);
    }
    
    // Ограничиваем 10 цифрами
    digits = digits.substring(0, 10);
    
    // Форматируем
    if (digits.length === 0) return "";
    if (digits.length <= 3) return `+7 (${digits}`;
    if (digits.length <= 6) return `+7 (${digits.substring(0, 3)}) ${digits.substring(3)}`;
    if (digits.length <= 8) return `+7 (${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
    return `+7 (${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6, 8)}-${digits.substring(8, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onChange(formatted);
  };

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
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={className}
        autoComplete="tel"
        style={className ? undefined : {
          width: "100%",
          padding: "0.875rem 1rem",
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
    </div>
  );
}