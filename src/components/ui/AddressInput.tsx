// src/components/ui/AddressInput.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export default function AddressInput({
  value,
  onChange,
  placeholder = "Начните вводить город...",
  required = false,
  disabled = false,
  className,
  label,
}: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Закрыть подсказки при клике вне
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      // Используем наше API геокодинга
      const res = await fetch(`/api/geocode/suggest?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Ошибка подсказок:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      {label && (
        <label style={{
          fontFamily: '"Actay Wide", "Actay", Arial, Helvetica, sans-serif',
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#0f0f0f",
          marginBottom: "0.5rem",
          display: "block",
        }}>
          {label}
          {required && <span style={{ color: "#ff0000", marginLeft: "0.25rem" }}>*</span>}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        onFocus={() => value.length >= 2 && fetchSuggestions(value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={className}
        autoComplete="off"
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
      {loading && (
        <div style={{
          position: "absolute",
          right: "12px",
          top: label ? "42px" : "12px",
          width: "20px",
          height: "20px",
        }}>
          ...
        </div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          marginTop: "4px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          listStyle: "none",
          padding: "0.5rem 0",
          maxHeight: "200px",
          overflowY: "auto",
        }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              style={{
                padding: "0.6rem 1rem",
                fontFamily: '"Actay", Arial, Helvetica, sans-serif',
                fontSize: "0.9rem",
                color: "#0f0f0f",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}