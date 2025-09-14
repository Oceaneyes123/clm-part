"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

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
  const [submitted, setSubmitted] = useState(false);
  const [removedMap, setRemovedMap] = useState({});
  const [theme, setTheme] = useState(null); // 'light' | 'dark' | null (system)

  useEffect(() => {
    // Initialize theme based on system preference if not set
    if (!theme) return;
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    if (theme === "light") root.classList.add("theme-light");
    if (theme === "dark") root.classList.add("theme-dark");
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function handleChange(index, e) {
    const { name, value } = e.target;
    setForms((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  }

  function handleRemove(index) {
    const ok = confirm("Remove this assignment? This will clear the form.");
    if (!ok) return;
    setForms((prev) => {
      const copy = [...prev];
      copy[index] = { ...emptyForm(), id: copy[index].id };
      return copy;
    });
    const id = forms[index]?.id;
    if (id) {
      setRemovedMap((m) => ({ ...m, [id]: true }));
      setTimeout(() => setRemovedMap((m) => ({ ...m, [id]: false })), 4000);
    }
  }

  function duplicateForm(index) {
    setForms((prev) => {
      const copy = [...prev];
      const source = copy[index] || emptyForm();
      const newForm = { ...source, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8) };
      copy.push(newForm);
      return copy;
    });
  }

  function duplicateLast() {
    setForms((prev) => {
      const copy = [...prev];
      const source = copy[copy.length - 1] || emptyForm();
      const newForm = { ...source, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8) };
      copy.push(newForm);
      return copy;
    });
  }

  return (
    <div className="font-sans min-h-screen p-6 sm:p-12 bg-transparent">
      {/* Font Awesome stylesheet for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        crossOrigin="anonymous"
      />

      <header className="flex items-center justify-between w-full max-w-4xl mx-auto mb-6">
        <h1 className="text-lg font-semibold">Counsel Assignment</h1>
        <div className="flex items-center gap-3">
          {/* Toggle switch */}
          <button
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Toggle theme"
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
              theme === "dark" ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                theme === "dark" ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto">
        {/* Single form layout: card + plus button on the right */}
        {forms.length === 1 ? (
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="bg-gradient-to-br from-white/60 to-gray-50 dark:from-gray-900/60 dark:to-gray-900/40 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                {/* Card content for forms[0] */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col text-sm">
                    <span className="mb-1 font-medium">Name</span>
                    <div className="relative">
                        <input
                        name="name"
                        value={forms[0].name}
                        onChange={(e) => handleChange(0, e)}
                        required
                        className="px-3 py-2 rounded-lg focus:outline-none form-input w-full"
                        placeholder="Enter name"
                        autoComplete="off"
                      />
                      {forms[0].name && (
                        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md max-h-40 overflow-auto text-sm">
                          {suggestNames(forms[0].name).map((s) => (
                            <li
                              key={s}
                              onClick={() => handleChange(0, { target: { name: "name", value: s } })}
                              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </label>

                  <label className="flex flex-col text-sm">
                    <span className="mb-1 font-medium">Assistant</span>
                    <div className="relative">
                        <input
                        name="assistant"
                        value={forms[0].assistant}
                        onChange={(e) => handleChange(0, e)}
                        className="px-3 py-2 rounded-lg focus:outline-none form-input w-full"
                        placeholder="Assistant name"
                        autoComplete="off"
                      />
                      {forms[0].assistant && (
                        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md max-h-40 overflow-auto text-sm">
                          {suggestNames(forms[0].assistant).map((s) => (
                            <li
                              key={s}
                              onClick={() => handleChange(0, { target: { name: "assistant", value: s } })}
                              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </label>

                  <label className="flex flex-col text-sm">
                    <span className="mb-1 font-medium">Date</span>
                    <input
                      type="date"
                      name="date"
                      value={forms[0].date}
                        onChange={(e) => handleChange(0, e)}
                        className="px-3 py-2 rounded-lg focus:outline-none w-full"
                    />
                  </label>

                  <label className="flex flex-col text-sm">
                    <span className="mb-1 font-medium">To be Given in</span>
                    <select
                      name="location"
                      value={forms[0].location}
                        onChange={(e) => handleChange(0, e)}
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
                      value={forms[0].counselPoint}
                      onChange={(e) => handleChange(0, e)}
                      rows={3}
                      className="px-3 py-2 rounded-lg focus:outline-none"
                      placeholder="Enter the counsel point"
                    />
                  </label>

                  <label className="flex flex-col text-sm">
                    <span className="mb-1 font-medium">Assignment</span>
                    <textarea
                      name="assignment"
                      value={forms[0].assignment}
                      onChange={(e) => handleChange(0, e)}
                      rows={3}
                      className="px-3 py-2 rounded-lg focus:outline-none"
                      placeholder="Describe the assignment"
                    />
                  </label>
                </div>

                <div className="mt-5 flex items-center justify-end gap-4">
                  {removedMap[forms[0].id] && <div className="text-sm text-red-600 mr-auto">Removed</div>}

                  <button
                    type="button"
                    onClick={() => handleRemove(0)}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 text-white px-4 py-2 font-medium hover:bg-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center">
                <button
                  onClick={() => duplicateForm(0)}
                  aria-label="Duplicate form"
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
                >
                  <i className="fa-solid fa-plus" aria-hidden="true" />
                  <span>New Form</span>
                </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forms.map((f, i) => (
                <div key={f.id} className="bg-gradient-to-br from-white/60 to-gray-50 dark:from-gray-900/60 dark:to-gray-900/40 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col text-sm">
                      <span className="mb-1 font-medium">Name</span>
                      <div className="relative">
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

                    <label className="flex flex-col text-sm">
                      <span className="mb-1 font-medium">Assistant</span>
                      <div className="relative">
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

                    <label className="flex flex-col text-sm">
                      <span className="mb-1 font-medium">Date</span>
                      <input
                        type="date"
                        name="date"
                        value={f.date}
                          onChange={(e) => handleChange(i, e)}
                          className="px-3 py-2 rounded-lg focus:outline-none w-full"
                      />
                    </label>

                    <label className="flex flex-col text-sm">
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
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={duplicateLast}
                aria-label="Duplicate last form"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
              >
                <i className="fa-solid fa-plus" aria-hidden="true" />
                <span>New Form</span>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
