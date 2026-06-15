// src/app/api/geocode/suggest/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  if (query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const res = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token 939374d9d002040d34fd079dcc6191f993a6e449",
      },
      body: JSON.stringify({
        query,
        from_bound: { value: "city" },
        to_bound: { value: "city" },
        locations: [{ country: "*" }],
        count: 8,
      }),
    });

    const data = await res.json();
    const suggestions = data.suggestions.map((s: any) => s.value);
    return NextResponse.json({ suggestions });
  } catch (error) {
    const cities = [
      "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
      "Красноярск", "Иркутск", "Владивосток", "Сочи", "Калининград",
      "Краснодар", "Омск", "Челябинск", "Уфа", "Самара",
    ];
    const suggestions = cities.filter((c) => c.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
    return NextResponse.json({ suggestions });
  }
}