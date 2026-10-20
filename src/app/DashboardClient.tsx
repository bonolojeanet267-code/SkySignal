"use client"

import { useState } from "react"
import {
  Bell,
  CalendarDays,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Sun,
  Wind,
} from "lucide-react"

type WeatherKind = "sun" | "partly-cloudy" | "cloud" | "rain" | "drizzle" | "wind"

type ForecastDay = {
  day: string
  kind: WeatherKind
  high: number
  low: number
  rainChance: number
}

type WeatherArea = {
  name: string
  province: string
  temperature: number
  feelsLike: number
  condition: string
  kind: WeatherKind
  high: number
  low: number
  humidity: number
  wind: number
  rainChance: number
  summary: string
  alertTitle: string
  alertDetail: string
  alertLevel: "Advisory" | "Watch"
  outlook: ForecastDay[]
}

const iconForWeather: Record<WeatherKind, typeof Sun> = {
  sun: Sun,
  "partly-cloudy": CloudSun,
  cloud: Cloud,
  rain: CloudRain,
  drizzle: CloudDrizzle,
  wind: Wind,
}

const areas: WeatherArea[] = [
  {
    name: "Johannesburg",
    province: "Gauteng",
    temperature: 24,
    feelsLike: 25,
    condition: "Partly cloudy",
    kind: "partly-cloudy",
    high: 27,
    low: 16,
    humidity: 58,
    wind: 18,
    rainChance: 40,
    summary: "Cloud build-up later, with a chance of an afternoon shower.",
    alertTitle: "Afternoon showers possible",
    alertDetail: "Keep an eye on changing conditions and allow extra travel time if rain develops.",
    alertLevel: "Advisory",
    outlook: [
      { day: "Day 1", kind: "partly-cloudy", high: 27, low: 16, rainChance: 40 },
      { day: "Day 2", kind: "rain", high: 23, low: 15, rainChance: 75 },
      { day: "Day 3", kind: "drizzle", high: 21, low: 14, rainChance: 55 },
      { day: "Day 4", kind: "sun", high: 26, low: 15, rainChance: 10 },
      { day: "Day 5", kind: "partly-cloudy", high: 25, low: 16, rainChance: 25 },
    ],
  },
  {
    name: "Cape Town",
    province: "Western Cape",
    temperature: 19,
    feelsLike: 18,
    condition: "Breezy with showers",
    kind: "rain",
    high: 21,
    low: 14,
    humidity: 72,
    wind: 31,
    rainChance: 65,
    summary: "Showers may pass through with fresh coastal winds.",
    alertTitle: "Fresh coastal winds",
    alertDetail: "Secure loose outdoor items and take care near exposed coastal areas.",
    alertLevel: "Watch",
    outlook: [
      { day: "Day 1", kind: "rain", high: 21, low: 14, rainChance: 65 },
      { day: "Day 2", kind: "wind", high: 20, low: 13, rainChance: 25 },
      { day: "Day 3", kind: "partly-cloudy", high: 22, low: 14, rainChance: 20 },
      { day: "Day 4", kind: "sun", high: 24, low: 15, rainChance: 5 },
      { day: "Day 5", kind: "cloud", high: 21, low: 14, rainChance: 35 },
    ],
  },
  {
    name: "Durban",
    province: "KwaZulu-Natal",
    temperature: 27,
    feelsLike: 30,
    condition: "Humid, chance of rain",
    kind: "drizzle",
    high: 29,
    low: 21,
    humidity: 78,
    wind: 16,
    rainChance: 55,
    summary: "Warm and humid, with scattered showers possible.",
    alertTitle: "Showers possible along the coast",
    alertDetail: "Brief heavy showers can reduce visibility. Check conditions before travelling.",
    alertLevel: "Advisory",
    outlook: [
      { day: "Day 1", kind: "drizzle", high: 29, low: 21, rainChance: 55 },
      { day: "Day 2", kind: "rain", high: 27, low: 21, rainChance: 70 },
      { day: "Day 3", kind: "cloud", high: 28, low: 20, rainChance: 35 },
      { day: "Day 4", kind: "partly-cloudy", high: 29, low: 20, rainChance: 20 },
      { day: "Day 5", kind: "rain", high: 26, low: 20, rainChance: 60 },
    ],
  },
  {
    name: "Gqeberha",
    province: "Eastern Cape",
    temperature: 22,
    feelsLike: 21,
    condition: "Partly cloudy",
    kind: "partly-cloudy",
    high: 24,
    low: 15,
    humidity: 61,
    wind: 23,
    rainChance: 20,
    summary: "Mostly dry, with a moderate breeze from the coast.",
    alertTitle: "No significant weather alert",
    alertDetail: "Conditions may change. Check official updates before making weather-sensitive plans.",
    alertLevel: "Advisory",
    outlook: [
      { day: "Day 1", kind: "partly-cloudy", high: 24, low: 15, rainChance: 20 },
      { day: "Day 2", kind: "sun", high: 25, low: 15, rainChance: 5 },
      { day: "Day 3", kind: "wind", high: 22, low: 14, rainChance: 10 },
      { day: "Day 4", kind: "cloud", high: 21, low: 14, rainChance: 20 },
      { day: "Day 5", kind: "partly-cloudy", high: 23, low: 15, rainChance: 15 },
    ],
  },
]

export default function Dashboard() {
  const [areaName, setAreaName] = useState(areas[0].name)
  const [alertsEnabled, setAlertsEnabled] = useState(false)
  const area = areas.find((item) => item.name === areaName) ?? areas[0]
  const CurrentWeatherIcon = iconForWeather[area.kind]

  return (
    <main className="min-h-screen bg-[#f5f7f4] pb-12 text-[#19372e]">
      <header className="sticky top-0 z-20 border-b border-[#dfe7de] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#weather" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf3ec] text-[#36705b]">
              <CloudSun size={22} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-extrabold leading-tight">SkySignal<span className="text-[#88a852]">.</span></span>
              <span className="block text-[0.62rem] font-bold tracking-[0.1em] text-[#71847a]">LOCAL WEATHER, MADE CLEAR</span>
            </span>
          </a>

          <label className="flex min-w-52 items-center gap-2 rounded-xl border border-[#dbe5dc] bg-white px-3 py-2 text-sm font-semibold">
            <MapPin size={16} className="shrink-0 text-[#36705b]" aria-hidden="true" />
            <span className="sr-only">Choose a South African city</span>
            <select value={area.name} onChange={(event) => setAreaName(event.target.value)} className="min-w-0 border-0 bg-transparent p-0 pr-6 text-sm font-semibold shadow-none focus:ring-0">
              {areas.map((option) => <option key={option.name} value={option.name}>{option.name}, {option.province}</option>)}
            </select>
          </label>
        </div>
      </header>

      <div id="weather" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#638174]">South Africa weather</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Weather in {area.name}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-[#708179]"><MapPin size={15} />{area.province} <span aria-hidden="true">·</span> 5-day outlook</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#e1e8df] bg-white px-3 py-2 text-xs font-semibold text-[#708179]">
            <span className="h-2 w-2 rounded-full bg-[#e4a23e]" />
            Sample forecast preview · not live data
          </div>
        </div>

        <section aria-label={`Weather overview for ${area.name}`} className="overflow-hidden rounded-3xl bg-[#173a30] text-white shadow-lg shadow-[#183a3020]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-9">
              <p className="text-sm font-semibold text-white/65">Current conditions · sample</p>
              <div className="mt-5 flex items-center gap-5">
                <CurrentWeatherIcon size={72} strokeWidth={1.5} className="text-[#d9f07c]" aria-hidden="true" />
                <div>
                  <p className="text-6xl font-extrabold tracking-tight">{area.temperature}°</p>
                  <p className="mt-1 text-base font-semibold text-white/85">{area.condition}</p>
                </div>
              </div>
              <p className="mt-5 max-w-lg text-sm leading-6 text-white/70">{area.summary}</p>
              <p className="mt-2 text-xs text-white/50">Feels like {area.feelsLike}° · High {area.high}° · Low {area.low}°</p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/10">
              <div className="bg-white/[0.04] p-5 sm:p-6">
                <Droplets size={19} className="mb-5 text-[#bfe2ff]" aria-hidden="true" />
                <p className="text-xs font-semibold text-white/55">Chance of rain</p>
                <p className="mt-1 text-2xl font-extrabold">{area.rainChance}%</p>
              </div>
              <div className="bg-white/[0.04] p-5 sm:p-6">
                <Wind size={19} className="mb-5 text-[#d9f07c]" aria-hidden="true" />
                <p className="text-xs font-semibold text-white/55">Wind</p>
                <p className="mt-1 text-2xl font-extrabold">{area.wind} <span className="text-sm font-semibold">km/h</span></p>
              </div>
              <div className="bg-white/[0.04] p-5 sm:p-6">
                <Cloud size={19} className="mb-5 text-[#d9f07c]" aria-hidden="true" />
                <p className="text-xs font-semibold text-white/55">Humidity</p>
                <p className="mt-1 text-2xl font-extrabold">{area.humidity}%</p>
              </div>
              <div className="bg-white/[0.04] p-5 sm:p-6">
                <Sun size={19} className="mb-5 text-[#ffdda0]" aria-hidden="true" />
                <p className="text-xs font-semibold text-white/55">Feels like</p>
                <p className="mt-1 text-2xl font-extrabold">{area.feelsLike}°</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <section aria-labelledby="forecast-title" className="rounded-3xl border border-[#e2e9e1] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#638174]">Plan ahead</p>
                <h2 id="forecast-title" className="mt-1 text-xl font-extrabold">5-day forecast</h2>
              </div>
              <CalendarDays size={20} className="text-[#638174]" aria-hidden="true" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {area.outlook.map((day) => {
                const Icon = iconForWeather[day.kind]
                return (
                  <article key={day.day} className="rounded-2xl border border-[#edf0ec] bg-[#fbfcfa] p-3.5 text-center">
                    <p className="text-xs font-bold text-[#52695e]">{day.day}</p>
                    <Icon size={27} className="mx-auto my-4 text-[#52806a]" aria-hidden="true" />
                    <p className="text-sm font-extrabold">{day.high}° <span className="font-semibold text-[#87958c]">{day.low}°</span></p>
                    <p className="mt-2 flex items-center justify-center gap-1 text-[0.7rem] font-semibold text-[#638174]"><Droplets size={12} />{day.rainChance}%</p>
                  </article>
                )
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-[#849188]">All forecast values on this screen are sample data for a prototype, not operational weather guidance.</p>
          </section>

          <section aria-labelledby="alerts-title" className="rounded-3xl border border-[#e2e9e1] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#638174]">Weather watch</p>
                <h2 id="alerts-title" className="mt-1 text-xl font-extrabold">Local weather alert</h2>
              </div>
              <Bell size={20} className="text-[#638174]" aria-hidden="true" />
            </div>

            <article className={`mt-5 rounded-2xl border p-4 ${area.alertLevel === "Watch" ? "border-[#f0d5a2] bg-[#fff8e9]" : "border-[#dce8df] bg-[#f1f7f1]"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-wide ${area.alertLevel === "Watch" ? "bg-[#f5e7c6] text-[#815a18]" : "bg-[#e0eee2] text-[#426b4c]"}`}>{area.alertLevel}</span>
                <span className="text-[0.65rem] font-bold text-[#849188]">SAMPLE</span>
              </div>
              <h3 className="mt-3 text-base font-extrabold">{area.alertTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-[#63756b]">{area.alertDetail}</p>
              <p className="mt-3 text-xs text-[#849188]">{area.name}, {area.province}</p>
            </article>

            <button
              type="button"
              aria-pressed={alertsEnabled}
              onClick={() => setAlertsEnabled((enabled) => !enabled)}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${alertsEnabled ? "bg-[#e6f1e7] text-[#315d41] hover:bg-[#dbeadb]" : "bg-[#244f40] text-white hover:bg-[#19372e]"}`}
            >
              <Bell size={16} /> {alertsEnabled ? "Preview alerts selected" : "Get weather alerts"}
            </button>
            {alertsEnabled && <p role="status" className="mt-2 text-center text-xs text-[#708179]">Alert preferences are a visual preview only; no notifications are sent.</p>}
          </section>
        </div>

        <section className="mt-5 rounded-2xl border border-[#e2e9e1] bg-[#eaf1e9] px-4 py-4 sm:px-5">
          <p className="text-sm font-bold text-[#315d41]">For current warnings, check official sources.</p>
          <p className="mt-1 text-xs leading-5 text-[#63756b]">SkySignal is a prototype and is not connected to live forecasts or emergency services. Follow the South African Weather Service and local authorities for verified information.</p>
          <a href="https://www.weathersa.co.za/" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold text-[#315d41] underline underline-offset-2 hover:text-[#19372e]">
            South African Weather Service <span aria-hidden="true">↗</span>
          </a>
        </section>

        <footer className="mt-7 border-t border-[#dfe7de] pt-5 text-center text-xs text-[#849188]">
          SkySignal · Local weather, made clear · Sample data, not a live forecast.
        </footer>
      </div>
    </main>
  )
}
