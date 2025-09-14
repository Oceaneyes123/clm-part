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
    showNameDropdown: false,
    showAssistantDropdown: false,
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

  // Generate PDF, render to PNG (3:4 ratio), download PNG or ZIP if multiple
  const handleExportPNGs = async () => {
    if (!forms || forms.length === 0) return;

    // Load pdfjs-dist dynamically from CDN to avoid npm build issues
    if (!window.pdfjsLib) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js';
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    // dynamic import for jsPDF and JSZip
    const [{ jsPDF }, JSZip] = await Promise.all([
      import('jspdf'),
      import('jszip'),
    ]);

    // Helper: create a PDF document for a single form
    const createPdfBlob = (f) => {
      const doc = new jsPDF({ unit: 'pt', format: [216, 324] }); // 3 inches x 4.5 inches

      // Draw title centered, on two lines
      const pageWidth = doc.internal.pageSize.getWidth();
      let y = 30;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      const titleLine1 = 'Our Christian Life and Ministry';
      const titleLine2 = 'Meeting Assignment';
      doc.text(titleLine1, pageWidth / 2, y, { align: 'center' });
      y += 15;
      doc.text(titleLine2, pageWidth / 2, y, { align: 'center' });

      doc.setFontSize(12);
      y += 30; // More margin at bottom of title

      // Each field: label on one line, value indented on next
      const lineHeight = 13;
      const blockSpacing = 30;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Name:', 20, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(f.name || 'John Doe', 40, y);
      y += blockSpacing;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Assistant:', 20, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(f.assistant || 'Jane Doe', 40, y);
      y += blockSpacing;

      // format date as MM-DD-YYYY
      const formatDate = (d) => {
        if (!d) return new Date().toLocaleDateString('en-US');
        // if input is YYYY-MM-DD (from <input type=date>), convert
        const parts = d.split('-');
        if (parts.length === 3) return `${parts[1]}-${parts[2]}-${parts[0]}`;
        return d;
      };
      const dateStr = formatDate(f.date);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Date:', 20, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(dateStr, 40, y);
      y += blockSpacing;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('To Be Given In:', 20, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(f.location || 'Main Hall', 40, y);
      y += blockSpacing;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Counsel Point:', 20, y);
      y += lineHeight;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const counselLines = doc.splitTextToSize(f.counselPoint || 'Lorem Ipsum', pageWidth - 60);
      doc.text(counselLines, 40, y);
      y += blockSpacing;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Assignment:', 20, y);
      y += lineHeight;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const assignmentLines = doc.splitTextToSize(f.assignment || 'Lorem Ipsum', pageWidth - 60);
      doc.text(assignmentLines, 40, y);

      return doc.output('blob');
    };

    // Render PDF blob first page into PNG with 3:4 ratio
    const renderPdfBlobToPng = async (pdfBlob) => {
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      // Desired ratio 3:4.5 (width:height). We'll pick a reasonable width for high quality
      const canvasWidth = 900; // 3 parts
      const canvasHeight = Math.round((canvasWidth * 4.5) / 3); // 4.5 parts

      // Get viewport at scale=1 to compute natural size, then compute scale to fit into our target
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(canvasWidth / viewport.width, canvasHeight / viewport.height);
      const scaledViewport = page.getViewport({ scale });

      const drawWidth = Math.round(scaledViewport.width);
      const drawHeight = Math.round(scaledViewport.height);

      // Render into a temporary canvas exactly the size of the rendered PDF page
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = drawWidth;
      tmpCanvas.height = drawHeight;
      const tmpCtx = tmpCanvas.getContext('2d');

      await page.render({ canvasContext: tmpCtx, viewport: scaledViewport }).promise;

      // Final canvas with desired 3:4 ratio and white background
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw the rendered PDF page centered on the final canvas
      const offsetX = Math.round((canvasWidth - drawWidth) / 2);
      const offsetY = Math.round((canvasHeight - drawHeight) / 2);
      ctx.drawImage(tmpCanvas, offsetX, offsetY, drawWidth, drawHeight);

      // Export to PNG
      return new Promise((resolve) => {
        canvas.toBlob((b) => resolve(b), 'image/png', 0.95);
      });
    };

    // Process all forms sequentially and collect PNG blobs
    const pngs = [];
    for (let f of forms) {
      const pdfBlob = await createPdfBlob(f);
      const pngBlob = await renderPdfBlobToPng(pdfBlob);
      pngs.push({ name: `${(f.name||'form').replace(/[^a-z0-9]/gi,'_') || 'form'}.png`, blob: pngBlob });
    }

    if (pngs.length === 1) {
      const url = URL.createObjectURL(pngs[0].blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pngs[0].name;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    // Multiple: create zip
  const ZipClass = JSZip.default || JSZip;
  const zip = new ZipClass();
    pngs.forEach((p) => zip.file(p.name, p.blob));
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'forms_pngs.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <main className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Counsel Assignment</h1>
          <div className="flex items-center gap-3">
              <button onClick={handleExportPNGs} className="text-sm px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                <i className="fa-solid fa-file-export mr-2" /> Export PNG(s)
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
                      onFocus={() => setForms(prev => { const copy = [...prev]; copy[i].showNameDropdown = true; return copy; })}
                      onBlur={() => setTimeout(() => setForms(prev => { const copy = [...prev]; copy[i].showNameDropdown = false; return copy; }), 150)}
                      required
                      className="px-3 py-2 rounded-lg focus:outline-none form-input w-full"
                      placeholder="Enter name"
                      autoComplete="off"
                    />
                    {f.showNameDropdown && f.name && (
                      <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md max-h-40 overflow-auto text-sm">
                        {suggestNames(f.name).map((s) => (
                          <li
                            key={s}
                            onClick={() => {
                              handleChange(i, { target: { name: "name", value: s } });
                              setForms(prev => { const copy = [...prev]; copy[i].showNameDropdown = false; return copy; });
                            }}
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
                      onFocus={() => setForms(prev => { const copy = [...prev]; copy[i].showAssistantDropdown = true; return copy; })}
                      onBlur={() => setTimeout(() => setForms(prev => { const copy = [...prev]; copy[i].showAssistantDropdown = false; return copy; }), 150)}
                      className="px-3 py-2 rounded-lg focus:outline-none form-input w-full"
                      placeholder="Assistant name"
                      autoComplete="off"
                    />
                    {f.showAssistantDropdown && f.assistant && (
                      <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md max-h-40 overflow-auto text-sm">
                        {suggestNames(f.assistant).map((s) => (
                          <li
                            key={s}
                            onClick={() => {
                              handleChange(i, { target: { name: "assistant", value: s } });
                              setForms(prev => { const copy = [...prev]; copy[i].showAssistantDropdown = false; return copy; });
                            }}
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
