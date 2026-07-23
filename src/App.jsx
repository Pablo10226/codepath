import { useState, useRef, useEffect } from "react";

const LESSONS = {
  python: [
    {
      id: "py1", title: "Variables y tipos", level: "Básico",
      theory: `Una **variable** es como una caja etiquetada donde guardas información.\n\nEn Python no necesitas declarar el tipo — Python lo detecta solo.\n\n\`\`\`python\nnombre = "Ana"        # texto (str)\nedad   = 25           # número entero (int)\naltura = 1.68         # número decimal (float)\nactivo = True         # verdadero/falso (bool)\n\`\`\`\n\nPuedes ver el tipo con \`type()\`:\n\`\`\`python\nprint(type(nombre))   # <class 'str'>\n\`\`\``,
      starter: `# Crea tus propias variables\nnombre = "Tu nombre aquí"\nedad = 0\nciudad = "Tu ciudad"\n\n# Muéstralas en pantalla\nprint("Hola, soy", nombre)\nprint("Tengo", edad, "años")\nprint("Vivo en", ciudad)`,
      solution: `nombre = "Ana"\nedad = 25\nciudad = "Madrid"\nprint("Hola, soy", nombre)\nprint("Tengo", edad, "años")\nprint("Vivo en", ciudad)`,
    },
    {
      id: "py2", title: "Condicionales if/else", level: "Básico",
      theory: `Un **condicional** permite que tu programa tome decisiones.\n\n\`\`\`python\nif condición:\n    # se ejecuta si es True\nelse:\n    # se ejecuta si es False\n\`\`\`\n\nLa **indentación** (los espacios) es obligatoria en Python.\n\n\`\`\`python\nedad = 18\nif edad >= 18:\n    print("Eres mayor de edad")\nelse:\n    print("Eres menor de edad")\n\`\`\``,
      starter: `edad = 20\n\n# Escribe un if/else que diga si la persona\n# puede votar (necesita tener 18 o más)\n`,
      solution: `edad = 20\nif edad >= 18:\n    print("Puedes votar")\nelse:\n    print("Aún no puedes votar")`,
    },
    {
      id: "py3", title: "Bucles for", level: "Básico",
      theory: `Un **bucle for** repite código un número determinado de veces.\n\n\`\`\`python\nfor i in range(5):\n    print(i)   # imprime 0, 1, 2, 3, 4\n\`\`\`\n\nTambién puedes recorrer listas:\n\`\`\`python\nfrutas = ["manzana", "pera", "uva"]\nfor fruta in frutas:\n    print(fruta)\n\`\`\``,
      starter: `# Imprime los números del 1 al 10\n# Pista: range(1, 11) va de 1 a 10\n\n`,
      solution: `for i in range(1, 11):\n    print(i)`,
    },
    {
      id: "py4", title: "Funciones", level: "Intermedio",
      theory: `Una **función** es un bloque de código reutilizable con nombre propio.\n\n\`\`\`python\ndef saludar(nombre):\n    return "Hola, " + nombre\n\nmensaje = saludar("Ana")\nprint(mensaje)   # Hola, Ana\n\`\`\`\n\n- \`def\` define la función\n- Los parámetros van entre paréntesis\n- \`return\` devuelve un valor`,
      starter: `# Crea una función llamada 'sumar'\n# que reciba dos números y devuelva su suma\n\ndef sumar(a, b):\n    # tu código aquí\n    pass\n\nprint(sumar(3, 7))   # debe imprimir 10\n`,
      solution: `def sumar(a, b):\n    return a + b\n\nprint(sumar(3, 7))`,
    },
  ],
  javascript: [
    {
      id: "js1", title: "Variables y tipos", level: "Básico",
      theory: `En JavaScript usas \`let\` o \`const\` para declarar variables.\n\n\`\`\`javascript\nlet nombre = "Ana";       // puede cambiar\nconst PI = 3.14159;       // no puede cambiar\n\nlet edad = 25;            // número\nlet activo = true;        // booleano\nlet vacio = null;         // vacío intencionado\n\`\`\`\n\nUsa \`console.log()\` para imprimir en pantalla:\n\`\`\`javascript\nconsole.log("Hola", nombre);\n\`\`\``,
      starter: `// Crea variables con tu información\nlet nombre = "Tu nombre";\nlet edad = 0;\nconst lenguaje = "JavaScript";\n\n// Muéstralas\nconsole.log("Me llamo", nombre);\nconsole.log("Tengo", edad, "años");\nconsole.log("Aprendo", lenguaje);`,
      solution: `let nombre = "Ana";\nlet edad = 25;\nconst lenguaje = "JavaScript";\nconsole.log("Me llamo", nombre);\nconsole.log("Tengo", edad, "años");\nconsole.log("Aprendo", lenguaje);`,
    },
    {
      id: "js2", title: "Condicionales if/else", level: "Básico",
      theory: `Los condicionales en JavaScript funcionan igual que en Python, pero con llaves \`{}\`.\n\n\`\`\`javascript\nif (condición) {\n    // se ejecuta si es true\n} else {\n    // se ejecuta si es false\n}\n\`\`\`\n\nEjemplo:\n\`\`\`javascript\nlet hora = 14;\nif (hora < 12) {\n    console.log("Buenos días");\n} else {\n    console.log("Buenas tardes");\n}\n\`\`\``,
      starter: `let nota = 75;\n\n// Escribe un if/else que diga:\n// si nota >= 60 → "Aprobado"\n// si no → "Suspendido"\n`,
      solution: `let nota = 75;\nif (nota >= 60) {\n    console.log("Aprobado");\n} else {\n    console.log("Suspendido");\n}`,
    },
    {
      id: "js3", title: "Bucles for", level: "Básico",
      theory: `El bucle \`for\` en JavaScript tiene tres partes: inicio, condición e incremento.\n\n\`\`\`javascript\nfor (let i = 0; i < 5; i++) {\n    console.log(i);   // 0, 1, 2, 3, 4\n}\n\`\`\`\n\nPara recorrer arrays:\n\`\`\`javascript\nconst frutas = ["manzana", "pera", "uva"];\nfor (let fruta of frutas) {\n    console.log(fruta);\n}\n\`\`\``,
      starter: `// Imprime los números del 1 al 10\n\n`,
      solution: `for (let i = 1; i <= 10; i++) {\n    console.log(i);\n}`,
    },
    {
      id: "js4", title: "Funciones", level: "Intermedio",
      theory: `En JavaScript hay varias formas de definir funciones:\n\n**Función tradicional:**\n\`\`\`javascript\nfunction saludar(nombre) {\n    return "Hola, " + nombre;\n}\n\`\`\`\n\n**Función flecha (moderna):**\n\`\`\`javascript\nconst saludar = (nombre) => {\n    return "Hola, " + nombre;\n};\n\`\`\`\n\nAmbas hacen lo mismo; las flechas son más comunes hoy en día.`,
      starter: `// Crea una función 'multiplicar' que reciba\n// dos números y devuelva su producto\n\nfunction multiplicar(a, b) {\n    // tu código aquí\n}\n\nconsole.log(multiplicar(4, 5));   // debe imprimir 20\n`,
      solution: `function multiplicar(a, b) {\n    return a * b;\n}\n\nconsole.log(multiplicar(4, 5));`,
    },
  ],
};

const CHALLENGES = [
  { id: "c1", lang: "python", title: "FizzBuzz", difficulty: "Fácil", points: 100,
    description: "Imprime los números del 1 al 20. Para múltiplos de 3 imprime 'Fizz', para múltiplos de 5 'Buzz', y para múltiplos de ambos 'FizzBuzz'.",
    starter: "for i in range(1, 21):\n    # tu código aquí\n    pass",
    hint: "Usa el operador % (módulo). Ej: 9 % 3 == 0 es True. Comprueba primero si es múltiplo de ambos (15)." },
  { id: "c2", lang: "javascript", title: "Suma de array", difficulty: "Fácil", points: 100,
    description: "Crea una función que reciba un array de números y devuelva la suma de todos ellos.",
    starter: "function sumaArray(numeros) {\n    // tu código aquí\n}\n\nconsole.log(sumaArray([1, 2, 3, 4, 5])); // 15",
    hint: "Empieza con total=0 y usa un bucle for para ir sumando cada elemento." },
  { id: "c3", lang: "python", title: "Palíndromo", difficulty: "Medio", points: 200,
    description: "Crea una función que reciba una palabra y devuelva True si es un palíndromo (se lee igual al revés), False si no.",
    starter: "def es_palindromo(palabra):\n    # tu código aquí\n    pass\n\nprint(es_palindromo('radar'))  # True\nprint(es_palindromo('casa'))   # False",
    hint: "En Python puedes invertir un string con slicing: palabra[::-1]" },
  { id: "c4", lang: "javascript", title: "Número mayor", difficulty: "Medio", points: 200,
    description: "Crea una función que reciba tres números y devuelva el mayor de los tres.",
    starter: "function mayorDeTres(a, b, c) {\n    // tu código aquí\n}\n\nconsole.log(mayorDeTres(3, 9, 5)); // 9",
    hint: "Puedes usar Math.max(a, b, c) directamente." },
];

function runJavaScript(code) {
  const logs = [];
  const fakeConsole = { log: (...args) => logs.push(args.map(String).join(" ")) };
  try {
    new Function("console", code)(fakeConsole);
    return { output: logs.join("\n") || "(sin salida)", error: null };
  } catch (e) {
    return { output: "", error: e.message };
  }
}

function TheoryBlock({ text }) {
  const parts = text.split(/(```[\s\S]*?```|`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <div style={{ color: "#cbd5e1", lineHeight: 1.8, fontSize: 15 }}>
      {parts.map((p, i) => {
        if (p.startsWith("```") && p.endsWith("```")) {
          const code = p.slice(3, -3).replace(/^[a-z]+\n/, "");
          return <pre key={i} style={{ background: "#0d1117", border: "1px solid #2d3748", borderRadius: 8, padding: 14, overflowX: "auto", fontSize: 13, color: "#e2e8f0", margin: "12px 0" }}>{code}</pre>;
        }
        if (p.startsWith("`") && p.endsWith("`")) return <code key={i} style={{ background: "#1e293b", borderRadius: 4, padding: "2px 6px", fontSize: 13, color: "#93c5fd" }}>{p.slice(1, -1)}</code>;
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} style={{ color: "#f1f5f9" }}>{p.slice(2, -2)}</strong>;
        return <span key={i}>{p}</span>;
      })}
    </div>
  );
}

function CodeEditor({ code, onChange, lang, onRun, output, error, loading }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <textarea
        value={code}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%", minHeight: 160, background: "#0d1117", color: "#e2e8f0",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 13, lineHeight: 1.6, padding: 14, border: "1px solid #2d3748",
          borderRadius: 8, resize: "vertical", outline: "none", boxSizing: "border-box",
        }}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={onRun} disabled={loading} style={{
          background: lang === "python" ? "#3B82F6" : "#F59E0B",
          color: lang === "python" ? "#fff" : "#0F1117",
          border: "none", borderRadius: 6, padding: "9px 20px",
          fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? "⏳ Ejecutando..." : "▶ Ejecutar"}
        </button>
        <span style={{ color: "#64748b", fontSize: 12 }}>{lang === "python" ? "🐍 Python" : "⚡ JavaScript"}</span>
      </div>
      {(output || error) && (
        <div style={{
          background: error ? "#1a0a0a" : "#0a1a0a",
          border: `1px solid ${error ? "#7f1d1d" : "#14532d"}`,
          borderRadius: 8, padding: 12, fontFamily: "monospace", fontSize: 13,
          color: error ? "#fca5a5" : "#86efac", whiteSpace: "pre-wrap", maxHeight: 140, overflowY: "auto",
        }}>
          {error ? `❌ Error: ${error}` : `✅ Salida:\n${output}`}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("lecciones");
  const [lang, setLang] = useState("python");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [showLessonList, setShowLessonList] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [runLoading, setRunLoading] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [challengeCode, setChallengeCode] = useState("");
  const [challengeOut, setChallengeOut] = useState("");
  const [challengeErr, setChallengeErr] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "¡Hola! Soy tu asistente de programación 👋\n\nPuedo explicarte conceptos, revisar tu código o responder cualquier duda sobre Python y JavaScript. ¿En qué te ayudo?" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const chatBottom = useRef(null);

  const lessons = LESSONS[lang];
  const lesson = lessons[lessonIdx];

  useEffect(() => { setCode(lesson.starter); setOutput(""); setCodeError(""); }, [lessonIdx, lang]);
  useEffect(() => { if (challenge) { setChallengeCode(challenge.starter); setChallengeOut(""); setChallengeErr(""); setShowHint(false); } }, [challenge]);
  useEffect(() => { chatBottom.current?.scrollIntoView({ behavior: "smooth" }); }, [aiMessages]);

  const runCode = async (codeToRun, isChallenge = false) => {
    const setOut = isChallenge ? setChallengeOut : setOutput;
    const setErr = isChallenge ? setChallengeErr : setCodeError;
    const currentLang = isChallenge ? challenge.lang : lang;
    setRunLoading(true); setOut(""); setErr("");
    if (currentLang === "javascript") {
      const { output: o, error: e } = runJavaScript(codeToRun);
      setOut(o); setErr(e || "");
      if (!e && !isChallenge) setCompletedLessons(s => new Set([...s, lesson.id]));
      if (!e && isChallenge) setCompletedChallenges(s => new Set([...s, challenge.id]));
    } else {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 400,
            system: `Eres un intérprete de Python. El usuario te envía código Python y tú debes:
1. Ejecutarlo mentalmente con precisión
2. Responder ÚNICAMENTE con la salida que produciría print() o el error si hay uno
3. Si hay un error, empieza con "ERROR:" seguido del tipo de error y mensaje
4. No añadas explicaciones, solo la salida exacta o el error
5. Si no hay salida (ningún print), responde exactamente: "(sin salida)"`,
            messages: [{ role: "user", content: `Ejecuta este código Python:\n\`\`\`python\n${codeToRun}\n\`\`\`` }],
          }),
        });
        const data = await res.json();
        const result = data.content?.[0]?.text || "";
        if (result.startsWith("ERROR:")) { setErr(result.replace("ERROR:", "").trim()); }
        else { setOut(result); if (!isChallenge) setCompletedLessons(s => new Set([...s, lesson.id])); else setCompletedChallenges(s => new Set([...s, challenge.id])); }
      } catch { setErr("No se pudo ejecutar. Revisa tu conexión."); }
    }
    setRunLoading(false);
  };

  const sendAiMessage = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = { role: "user", content: aiInput };
    const newMsgs = [...aiMessages, userMsg];
    setAiMessages(newMsgs); setAiInput(""); setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `Eres un tutor de programación experto y paciente. El alumno tiene conocimientos básicos y está aprendiendo Python y JavaScript.
- Responde siempre en español
- Usa ejemplos de código cuando sea útil, con bloques \`\`\`python o \`\`\`javascript
- Explica conceptos de forma simple y con analogías del mundo real
- Sé alentador y positivo
- Si el alumno comparte código, analízalo, señala errores con amabilidad y sugiere mejoras
- Máximo 300 palabras por respuesta`,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "No pude responder. Intenta de nuevo.";
      setAiMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch { setAiMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Inténtalo de nuevo." }]); }
    setAiLoading(false);
  };

  const progressPy = Math.round((LESSONS.python.filter(l => completedLessons.has(l.id)).length / LESSONS.python.length) * 100);
  const progressJs = Math.round((LESSONS.javascript.filter(l => completedLessons.has(l.id)).length / LESSONS.javascript.length) * 100);

  const card = { background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 12, padding: 16, marginBottom: 14 };
  const badge = (color) => ({ background: color + "22", color, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 });
  const accentColor = lang === "python" ? "#3B82F6" : "#F59E0B";

  const NAV_ITEMS = [
    { key: "lecciones", icon: "📚", label: "Lecciones" },
    { key: "editor",    icon: "💻", label: "Editor" },
    { key: "retos",     icon: "🏆", label: "Retos" },
    { key: "asistente", icon: "🤖", label: "Asistente" },
  ];

  return (
    <div style={{ background: "#0F1117", minHeight: "100vh", minHeight: "100dvh", color: "#e2e8f0", fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "#1A1D2E", borderBottom: "1px solid #2d3748", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>⌨️ CodePath</span>
        {/* Nav escritorio */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 4, background: "#0F1117", borderRadius: 8, padding: 4 }}>
          {NAV_ITEMS.map(({ key, icon, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              background: tab === key ? "#232640" : "transparent",
              color: tab === key ? "#f1f5f9" : "#64748b",
              border: "none", borderRadius: 6, padding: "7px 14px",
              fontWeight: tab === key ? 600 : 400, cursor: "pointer", fontSize: 13,
            }}>{icon} {label}</button>
          ))}
        </nav>
      </div>

      {/* ── CONTENIDO ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: 80 }} className="main-scroll">

        {/* LECCIONES */}
        {tab === "lecciones" && (
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            {/* Selector de lenguaje */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[["python","🐍 Python"],["javascript","⚡ JavaScript"]].map(([l, label]) => (
                <button key={l} onClick={() => { setLang(l); setLessonIdx(0); }} style={{
                  flex: 1, padding: "10px 0", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  background: lang === l ? (l === "python" ? "#1d3461" : "#3d2a00") : "#1A1D2E",
                  color: lang === l ? (l === "python" ? "#93c5fd" : "#fcd34d") : "#64748b",
                  border: `1px solid ${lang === l ? (l === "python" ? "#3B82F6" : "#F59E0B") : "#2d3748"}`,
                }}>{label}</button>
              ))}
            </div>

            {/* Progreso */}
            <div style={{ ...card, padding: 12, display: "flex", gap: 16 }}>
              {[["🐍 Python", progressPy, "#3B82F6"], ["⚡ JS", progressJs, "#F59E0B"]].map(([name, pct, color]) => (
                <div key={name} style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>
                    <span>{name}</span><span style={{ color }}>{pct}%</span>
                  </div>
                  <div style={{ height: 4, background: "#2d3748", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.4s" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Selector de lección (móvil: desplegable) */}
            <button onClick={() => setShowLessonList(v => !v)} className="mobile-only" style={{
              width: "100%", background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 8,
              padding: "12px 16px", color: "#f1f5f9", fontSize: 14, fontWeight: 600,
              display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: 10,
            }}>
              <span>{lesson.title} <span style={{ color: "#64748b", fontWeight: 400 }}>— {lesson.level}</span></span>
              <span>{showLessonList ? "▲" : "▼"}</span>
            </button>

            <div style={{ display: "flex", gap: 14 }}>
              {/* Lista lecciones escritorio / desplegable móvil */}
              <div className="lesson-sidebar" style={{ width: 190, flexShrink: 0 }}>
                {lessons.map((l, i) => (
                  <div key={l.id} onClick={() => { setLessonIdx(i); setShowLessonList(false); }} style={{
                    padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 6,
                    background: i === lessonIdx ? "#232640" : "transparent",
                    border: `1px solid ${i === lessonIdx ? accentColor : "transparent"}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: i === lessonIdx ? 700 : 400, color: i === lessonIdx ? "#f1f5f9" : "#94a3b8" }}>{l.title}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{l.level}</div>
                    </div>
                    {completedLessons.has(l.id) && <span style={{ color: "#22c55e" }}>✓</span>}
                  </div>
                ))}
              </div>

              {/* Desplegable móvil */}
              {showLessonList && (
                <div className="mobile-lesson-dropdown" style={{ position: "absolute", left: 16, right: 16, background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 10, zIndex: 50, padding: 8 }}>
                  {lessons.map((l, i) => (
                    <div key={l.id} onClick={() => { setLessonIdx(i); setShowLessonList(false); }} style={{
                      padding: "12px 14px", borderRadius: 8, cursor: "pointer",
                      background: i === lessonIdx ? "#232640" : "transparent",
                      display: "flex", justifyContent: "space-between",
                    }}>
                      <span style={{ fontSize: 14, color: i === lessonIdx ? "#f1f5f9" : "#94a3b8" }}>{l.title}</span>
                      {completedLessons.has(l.id) && <span style={{ color: "#22c55e" }}>✓</span>}
                    </div>
                  ))}
                </div>
              )}

              {/* Contenido */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>{lesson.title}</h2>
                      <span style={badge(accentColor)}>{lesson.level}</span>
                    </div>
                    <button onClick={() => setCode(lesson.solution)} style={{ background: "#232640", border: "1px solid #2d3748", borderRadius: 6, padding: "6px 12px", color: "#94a3b8", fontSize: 12, cursor: "pointer" }}>Ver solución</button>
                  </div>
                  <TheoryBlock text={lesson.theory} />
                </div>

                <div style={card}>
                  <h4 style={{ margin: "0 0 12px", color: "#94a3b8", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>✏️ Practica</h4>
                  <CodeEditor code={code} onChange={setCode} lang={lang} onRun={() => runCode(code)} output={output} error={codeError} loading={runLoading} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button disabled={lessonIdx === 0} onClick={() => setLessonIdx(i => i - 1)} style={{ background: "#232640", border: "none", borderRadius: 8, padding: "10px 18px", color: "#fff", fontWeight: 700, cursor: "pointer", opacity: lessonIdx === 0 ? 0.4 : 1 }}>← Anterior</button>
                  <button disabled={lessonIdx === lessons.length - 1} onClick={() => setLessonIdx(i => i + 1)} style={{ background: accentColor, border: "none", borderRadius: 8, padding: "10px 18px", color: lang === "python" ? "#fff" : "#0F1117", fontWeight: 700, cursor: "pointer", opacity: lessonIdx === lessons.length - 1 ? 0.4 : 1 }}>Siguiente →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDITOR */}
        {tab === "editor" && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 20, fontWeight: 800 }}>💻 Editor libre</h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[["python","🐍 Python"],["javascript","⚡ JavaScript"]].map(([l, label]) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  flex: 1, padding: "9px 0", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
                  background: lang === l ? (l === "python" ? "#1d3461" : "#3d2a00") : "#1A1D2E",
                  color: lang === l ? (l === "python" ? "#93c5fd" : "#fcd34d") : "#64748b",
                  border: `1px solid ${lang === l ? (l === "python" ? "#3B82F6" : "#F59E0B") : "#2d3748"}`,
                }}>{label}</button>
              ))}
            </div>
            <div style={card}>
              <p style={{ margin: "0 0 14px", color: "#64748b", fontSize: 14 }}>Escribe cualquier código y ejecútalo libremente.</p>
              <CodeEditor code={code} onChange={setCode} lang={lang} onRun={() => runCode(code)} output={output} error={codeError} loading={runLoading} />
            </div>
          </div>
        )}

        {/* RETOS */}
        {tab === "retos" && !challenge && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800 }}>🏆 Retos</h2>
            <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: 14 }}>Pon a prueba lo aprendido y gana puntos.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {CHALLENGES.map(c => (
                <div key={c.id} onClick={() => setChallenge(c)} style={{ ...card, cursor: "pointer", marginBottom: 0, borderColor: completedChallenges.has(c.id) ? "#22c55e" : "#2d3748" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={badge(c.lang === "python" ? "#3B82F6" : "#F59E0B")}>{c.lang === "python" ? "🐍 Python" : "⚡ JS"}</span>
                    <span style={badge(c.difficulty === "Fácil" ? "#22c55e" : "#f59e0b")}>{c.difficulty}</span>
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700 }}>{c.title}</h3>
                  <p style={{ margin: "0 0 12px", color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{c.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 700 }}>⭐ {c.points} pts</span>
                    {completedChallenges.has(c.id) && <span style={{ color: "#22c55e", fontSize: 13 }}>✓ Completado</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "retos" && challenge && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <button onClick={() => setChallenge(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver</button>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{challenge.title}</h2>
              <span style={badge(challenge.difficulty === "Fácil" ? "#22c55e" : "#f59e0b")}>{challenge.difficulty}</span>
              <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 700 }}>⭐ {challenge.points} pts</span>
            </div>
            <div style={card}>
              <p style={{ margin: "0 0 14px", color: "#cbd5e1", lineHeight: 1.7 }}>{challenge.description}</p>
              <button onClick={() => setShowHint(h => !h)} style={{ background: "none", border: "1px solid #2d3748", borderRadius: 6, padding: "6px 12px", color: "#64748b", fontSize: 13, cursor: "pointer" }}>
                {showHint ? "Ocultar pista" : "💡 Ver pista"}
              </button>
              {showHint && <div style={{ marginTop: 10, background: "#1e2a1e", border: "1px solid #14532d", borderRadius: 8, padding: 12, color: "#86efac", fontSize: 13 }}>{challenge.hint}</div>}
            </div>
            <div style={card}>
              <CodeEditor code={challengeCode} onChange={setChallengeCode} lang={challenge.lang} onRun={() => runCode(challengeCode, true)} output={challengeOut} error={challengeErr} loading={runLoading} />
            </div>
            {completedChallenges.has(challenge.id) && (
              <div style={{ background: "#0a1a0a", border: "1px solid #22c55e", borderRadius: 10, padding: 16, textAlign: "center", color: "#86efac", fontWeight: 700 }}>
                🎉 ¡Reto completado! Has ganado {challenge.points} puntos.
              </div>
            )}
          </div>
        )}

        {/* ASISTENTE */}
        {tab === "asistente" && (
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 160px)", minHeight: 400 }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 800 }}>🤖 Asistente IA</h2>
            <div style={{ ...card, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {aiMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                  <div style={{
                    background: m.role === "user" ? "#1d3461" : "#232640", color: "#e2e8f0",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: "10px 14px", maxWidth: "85%", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word",
                  }}>
                    {m.content.split(/(```[\s\S]*?```)/g).map((part, j) => {
                      if (part.startsWith("```") && part.endsWith("```")) {
                        const c = part.slice(3, -3).replace(/^[a-z]+\n/, "");
                        return <pre key={j} style={{ background: "#0d1117", borderRadius: 6, padding: 10, fontSize: 12, overflowX: "auto", margin: "8px 0" }}>{c}</pre>;
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
                  <div style={{ background: "#232640", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", fontSize: 14 }}>
                    <span style={{ color: "#64748b" }}>Escribiendo ▋</span>
                  </div>
                </div>
              )}
              <div ref={chatBottom} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <input
                style={{ flex: 1, background: "#0d1117", border: "1px solid #2d3748", borderRadius: 8, padding: "11px 14px", color: "#e2e8f0", fontSize: 14, outline: "none" }}
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendAiMessage()}
                placeholder="Pregunta algo o pega tu código..."
              />
              <button onClick={sendAiMessage} disabled={aiLoading || !aiInput.trim()} style={{ background: "#3B82F6", border: "none", borderRadius: 8, padding: "11px 18px", color: "#fff", fontWeight: 700, cursor: "pointer", opacity: aiLoading || !aiInput.trim() ? 0.5 : 1 }}>
                ➤
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── NAV INFERIOR MÓVIL ── */}
      <nav className="mobile-nav" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1A1D2E", borderTop: "1px solid #2d3748", display: "flex", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom)" }}>
        {NAV_ITEMS.map(({ key, icon, label }) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer",
            color: tab === key ? "#f1f5f9" : "#64748b", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: tab === key ? 700 : 400 }}>{label}</span>
            {tab === key && <div style={{ width: 20, height: 2, background: "#3B82F6", borderRadius: 2 }} />}
          </button>
        ))}
      </nav>

      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        textarea:focus { border-color: #3B82F6 !important; }
        input:focus { border-color: #3B82F6 !important; outline: none; }

        /* Móvil: ocultar nav de escritorio, mostrar nav inferior */
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .lesson-sidebar { display: none !important; }
          .mobile-only { display: flex !important; }
          .mobile-lesson-dropdown { display: block !important; }
        }
        /* Escritorio: ocultar nav inferior y controles móvil */
        @media (min-width: 641px) {
          .mobile-nav { display: none !important; }
          .mobile-only { display: none !important; }
          .mobile-lesson-dropdown { display: none !important; }
          .lesson-sidebar { display: block !important; }
        }
      `}</style>
    </div>
  );
}
