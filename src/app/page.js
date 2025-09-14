"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const emptyForm = () => ({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: "",
    assistant: "",
    date: "",
    counselPoint: "",
    assignment: "",
    location: "Main Hall",
  });

  const NAMES = [
    "Abel Damaso",
    "Acel Bustamante",
    "Adrian Aberde",
    "Andrea Bustamante",
    "Andrew Villanueva",
    "Andrie Bustamante",
    "Bartolome Dela Cerna",
    "Bezalel Fabro",
    "Carl Pechera",
    "Carl Drake Gallego",
    "Carlito Bustamante Jr.",
    "Carmelita Estilo",
    "Castil Bustamante",
    "Cenny Gallego",
    "Charles Pechera",
    "Charms Pechera",
    "Christian Drilon",
    "Christian Damaso",
    "Christine Dela Cerna",
    "Christopher Dela Cerna",
    "Clariza Dela Cerna",
    "Claudia Dela Cerna",
    "Cynthia Damaso",
    "Danny Gallego",
    "Debie Latumbo",
    "Denise Asong",
    "Dennis Sondia",
    "Dhesa Sandoval",
    "Elena Supapo",
    "Erica Sandoval",
    "Eunice Bustamante",
    "Expedito Latumbo Jr.",
    "Freza Fabro",
    "Gemma Villanueva",
    "Geode Damaso",
    "Ilyza Sandoval",
    "Janine Nillos",
    "Jean Sondia",
    "Jelou Virayo",
    "Jocelyn Sondia",
    "Joel Estilo",
    "Jomilyn Sionosa",
    "Jona Villamor",
    "Jonas Drilon",
    "Jonelyn Aberde",
    "Josper Guardiano",
    "Joy Panela",
    "Juana Demetillo",
    "Judah Huervana",
    "Judith Drilon",
    "Jun Drilon Sr.",
    "Jun Drilon Jr.",
    "Justine Fabro",
    "Keziah Hena",
    "Leannie Bustamante",
    "Leonardo Fabay",
    "Leonisa Bustamante",
    "Liezel Jaleco",
    "Limar Hena",
    "Loren Huervana",
    "Louie Jee Virayo",
    "Macdevon Sandoval",
    "Marcial Pechera",
    "Maribeth Asong",
    "Mario Villamor",
    "Marisse Asong",
    "Maryjean Domingo",
    "May Jadulos",
    "Merian Helera",
    "Merlie Gallego",
    "Mica Trisha Panela",
    "Michael Panela",
    "Micky Hope Panela",
    "Mikyla Flores",
    "Nelly Pechera",
    "Nilo Valentino",
    "Nimfa Fabay",
    "Noly Damaso",
    "Pearl Drilon",
    "Rebecca Valentino",
    "Renalyn Salinas",
    "Retchil Sandoval",
    "Reymank Villamor",
    "Rohama Fabro",
    "Rolly Sandoval",
    "Rosana Virayo",
    "Ryan Guardiano",
    "Shara Fabro",
    "Sheena Bustamante",
    "Sherlyn Emnas",
    "Shiela Bustamante",
    "Tirzah Fabro",
    "Zhamique Damaso",
  ];

  function suggestNames(value) {
    if (!value) return [];
    const v = value.toLowerCase();
    return NAMES.filter((n) => n.toLowerCase().includes(v)).slice(0, 8);
  }

  const [forms, setForms] = useState([emptyForm()]);
  const [removedMap, setRemovedMap] = useState({});
  const [theme, setTheme] = useState(null); // 'light' | 'dark' | null(system)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) setTheme(stored);
      else setTheme(window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    } catch (e) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(theme === "light" ? "theme-light" : "theme-dark");
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setForms((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const handleRemove = (index) => {
    setForms((prev) => {
      if (prev.length <= 1) return [emptyForm()];
      const copy = prev.slice();
      copy.splice(index, 1);
      return copy;
    });
  };

  const duplicateForm = (index) => {
    setForms((prev) => {
      const copy = [...prev];
      const toDup = copy[index] ? { ...copy[index], id: Date.now().toString(36) } : emptyForm();
      copy.splice(index + 1, 0, toDup);
      return copy;
    });
  };

  const duplicateLast = () => setForms((prev) => [...prev, emptyForm()]);

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(forms, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "forms.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <main className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Counsel Assignment</h1>
          <div className="flex items-center gap-3">
              <button onClick={handleDownload} className="text-sm px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                <i className="fa-solid fa-download mr-2" /> Download
              </button>

              {/* Theme toggle switch: sun / moon with sliding knob */}
              <button
                role="switch"
                aria-checked={theme === "light"}
                onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors focus:outline-none ${theme === "light" ? "bg-yellow-200" : "bg-gray-600"}`}
              >
                {/* Sun icon (left) */}
                <span className="absolute left-2 text-yellow-500">
                  <i className="fa-solid fa-sun" aria-hidden="true" />
                </span>
                {/* Moon icon (right) */}
                <span className="absolute right-2 text-white/80">
                  <i className="fa-solid fa-moon" aria-hidden="true" />
                </span>
                {/* Knob */}
                <span className={`block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${theme === "light" ? "translate-x-8" : "translate-x-1"}`} />
              </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forms.map((f, i) => (
            <div key={f.id} className="bg-gradient-to-br from-white/60 to-gray-50 dark:from-gray-900/60 dark:to-gray-900/40 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm w-full">
                  <span className="mb-1 font-medium">Name</span>
                  <div className="relative w-full">
                    <input
                      name="name"
                      value={f.name}
                      onChange={(e) => handleChange(i, e)}
                      required
                      className="px-3 py-2 rounded-lg focus:outline-none form-input w-full"
                      placeholder="Enter name"
                      autoComplete="off"
                    />
                    {f.name && (
                      <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md max-h-40 overflow-auto text-sm">
                        {suggestNames(f.name).map((s) => (
                          <li
                            key={s}
                            onClick={() => handleChange(i, { target: { name: "name", value: s } })}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </label>

                <label className="flex flex-col text-sm w-full">
                  <span className="mb-1 font-medium">Assistant</span>
                  <div className="relative w-full">
                    <input
                      name="assistant"
                      value={f.assistant}
                      onChange={(e) => handleChange(i, e)}
                      className="px-3 py-2 rounded-lg focus:outline-none form-input w-full"
                      placeholder="Assistant name"
                      autoComplete="off"
                    />
                    {f.assistant && (
                      <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md max-h-40 overflow-auto text-sm">
                        {suggestNames(f.assistant).map((s) => (
                          <li
                            key={s}
                            onClick={() => handleChange(i, { target: { name: "assistant", value: s } })}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </label>

                <label className="flex flex-col text-sm w-full">
                  <span className="mb-1 font-medium">Date</span>
                  <input
                    type="date"
                    name="date"
                    value={f.date}
                    onChange={(e) => handleChange(i, e)}
                    className="px-3 py-2 rounded-lg focus:outline-none w-full"
                  />
                </label>

                <label className="flex flex-col text-sm w-full">
                  <span className="mb-1 font-medium">To be Given in</span>
                  <select
                    name="location"
                    value={f.location}
                    onChange={(e) => handleChange(i, e)}
                    className="px-3 py-2 rounded-lg focus:outline-none w-full"
                  >
                    <option>Main Hall</option>
                    <option>Auxiliary Classroom 1</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <label className="flex flex-col text-sm">
                  <span className="mb-1 font-medium">Counsel Point</span>
                  <textarea
                    name="counselPoint"
                    value={f.counselPoint}
                    onChange={(e) => handleChange(i, e)}
                    rows={3}
                    className="px-3 py-2 rounded-lg focus:outline-none"
                    placeholder="Enter the counsel point"
                  />
                </label>

                <label className="flex flex-col text-sm">
                  <span className="mb-1 font-medium">Assignment</span>
                  <textarea
                    name="assignment"
                    value={f.assignment}
                    onChange={(e) => handleChange(i, e)}
                    rows={3}
                    className="px-3 py-2 rounded-lg focus:outline-none"
                    placeholder="Describe the assignment"
                  />
                </label>
              </div>

              <div className="mt-5 flex items-center justify-end gap-4">
                {removedMap[f.id] && <div className="text-sm text-red-600 mr-auto">Removed</div>}

                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 text-white px-4 py-2 font-medium hover:bg-red-700 focus:outline-none"
                >
                  Remove
                </button>
                {/* removed the small empty duplicate button */}
              </div>
            </div>
          ))}

          {/* If odd number of forms, show New Form button in the empty right cell (md+) */}
          {forms.length % 2 === 1 && (
            <div className="hidden md:flex items-center justify-center">
              <button
                onClick={duplicateLast}
                aria-label="Duplicate last form"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
              >
                <i className="fa-solid fa-plus mr-2" aria-hidden="true" />
                <span>New Form</span>
              </button>
            </div>
          )}
        </div>

        {/* If even number of forms, show centered New Form button below */}
        {forms.length % 2 === 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={duplicateLast}
              aria-label="Duplicate last form"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
            >
              <i className="fa-solid fa-plus mr-2" aria-hidden="true" />
              <span>New Form</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
