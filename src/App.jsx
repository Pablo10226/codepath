import { useState, useRef, useEffect } from "react";

// ── Paleta y tipografía ──────────────────────────────────────────────────────
// Fondo: #0F1117 (casi negro azulado)  Surface: #1A1D2E  Card: #232640
// Acento Python: #3B82F6 (azul)        Acento JS: #F59E0B (ámbar)
// Texto: #E2E8F0                        Muted: #64748B
// Firma: el cursor parpadeante gigante en la pantalla de bienvenida

// ── Datos de lecciones ────────────────────────────────────────────────────────
const LESSONS = {
  python: [
    {
      id: "py1",
      title: "Variables y tipos",
      level: "Básico",
      theory: `Una **variable** es como una caja etiquetada donde guardas información.

En Python no necesitas declarar el tipo — Python lo detecta solo.

\`\`\`python
nombre = "Pablo"        # texto (str)
edad   = 24           # número entero (int)
altura = 1.81         # número decimal (float)
activo = True         # verdadero/falso (bool)
\`\`\`

Puedes ver el tipo de cualquier variable con \`type()\`:
\`\`\`python
print(type(nombre))   # <class 'str'>
\`\`\``,
      starter: `# Crea tus propias variables
nombre = "Tu nombre aquí"
edad = 0
ciudad = "Tu ciudad"

# Muéstralas en pantalla
print("Hola, soy", nombre)
print("Tengo", edad, "años")
print("Vivo en", ciudad)`,
      solution: `nombre = "Pablo"\nedad = 24\nciudad = "Almeria"\nprint("Hola, soy", nombre)\nprint("Tengo", edad, "años")\nprint("Vivo en", ciudad)`,
    },
    {
      id: "py2",
      title: "Condicionales if/else",
      level: "Básico",
      theory: `Un **condicional** permite que tu programa tome decisiones.

\`\`\`python
if condición:
    # se ejecuta si es True
else:
    # se ejecuta si es False
\`\`\`

La **indentación** (los espacios) es obligatoria en Python — es parte de la sintaxis.

\`\`\`python
edad = 18
if edad >= 18:
    print("Eres mayor de edad")
else:
    print("Eres menor de edad")
\`\`\``,
      starter: `edad = 20

# Escribe un if/else que diga si la persona
# puede votar (necesita tener 18 o más)
`,
      solution: `edad = 20\nif edad >= 18:\n    print("Puedes votar")\nelse:\n    print("Aún no puedes votar")`,
    },
    {
      id: "py3",
      title: "Bucles for",
      level: "Básico",
      theory: `Un **bucle for** repite código un número determinado de veces.

\`\`\`python
for i in range(5):
    print(i)   # imprime 0, 1, 2, 3, 4
\`\`\`

También puedes recorrer listas:
\`\`\`python
frutas = ["manzana", "pera", "uva"]
for fruta in frutas:
    print(fruta)
\`\`\``,
      starter: `# Imprime los números del 1 al 10
# Pista: range(1, 11) va de 1 a 10

`,
      solution: `for i in range(1, 11):\n    print(i)`,
    },
    {
      id: "py4",
      title: "Funciones",
      level: "Intermedio",
      theory: `Una **función** es un bloque de código reutilizable con nombre propio.

\`\`\`python
def saludar(nombre):
    return "Hola, " + nombre

mensaje = saludar("Ana")
print(mensaje)   # Hola, Ana
\`\`\`

- \`def\` define la función
- Los parámetros van entre paréntesis
- \`return\` devuelve un valor`,
      starter: `# Crea una función llamada 'sumar'
# que reciba dos números y devuelva su suma

def sumar(a, b):
    # tu código aquí
    pass

print(sumar(3, 7))   # debe imprimir 10
`,
      solution: `def sumar(a, b):\n    return a + b\n\nprint(sumar(3, 7))`,
    },
  ],
  javascript: [
    {
      id: "js1",
      title: "Variables y tipos",
      level: "Básico",
      theory: `En JavaScript usas \`let\` o \`const\` para declarar variables.

\`\`\`javascript
let nombre = "Ana";       // puede cambiar
const PI = 3.14159;       // no puede cambiar

let edad = 25;            // número
let activo = true;        // booleano
let vacio = null;         // vacío intencionado
\`\`\`

Usa \`console.log()\` para imprimir en pantalla:
\`\`\`javascript
console.log("Hola", nombre);
\`\`\``,
      starter: `// Crea variables con tu información
let nombre = "Tu nombre";
let edad = 0;
const lenguaje = "JavaScript";

// Muéstralas
console.log("Me llamo", nombre);
console.log("Tengo", edad, "años");
console.log("Aprendo", lenguaje);`,
      solution: `let nombre = "Ana";\nlet edad = 25;\nconst lenguaje = "JavaScript";\nconsole.log("Me llamo", nombre);\nconsole.log("Tengo", edad, "años");\nconsole.log("Aprendo", lenguaje);`,
    },
    {
      id: "js2",
      title: "Condicionales if/else",
      level: "Básico",
      theory: `Los condicionales en JavaScript funcionan igual que en Python, pero con llaves \`{}\`.

\`\`\`javascript
if (condición) {
    // se ejecuta si es true
} else {
    // se ejecuta si es false
}
\`\`\`

Ejemplo:
\`\`\`javascript
let hora = 14;
if (hora < 12) {
    console.log("Buenos días");
} else {
    console.log("Buenas tardes");
}
\`\`\``,
      starter: `let nota = 75;

// Escribe un if/else que diga:
// si nota >= 60 → "Aprobado"
// si no → "Suspendido"
`,
      solution: `let nota = 75;\nif (nota >= 60) {\n    console.log("Aprobado");\n} else {\n    console.log("Suspendido");\n}`,
    },
    {
      id: "js3",
      title: "Bucles for",
      level: "Básico",
      theory: `El bucle \`for\` en JavaScript tiene tres partes: inicio, condición e incremento.

\`\`\`javascript
for (let i = 0; i < 5; i++) {
    console.log(i);   // 0, 1, 2, 3, 4
}
\`\`\`

Para recorrer arrays:
\`\`\`javascript
const frutas = ["manzana", "pera", "uva"];
for (let fruta of frutas) {
    console.log(fruta);
}
\`\`\``,
      starter: `// Imprime los números del 1 al 10

`,
      solution: `for (let i = 1; i <= 10; i++) {\n    console.log(i);\n}`,
    },
    {
      id: "js4",
      title: "Funciones",
      level: "Intermedio",
      theory: `En JavaScript hay varias formas de definir funciones:

**Función tradicional:**
\`\`\`javascript
function saludar(nombre) {
    return "Hola, " + nombre;
}
\`\`\`

**Función flecha (moderna):**
\`\`\`javascript
const saludar = (nombre) => {
    return "Hola, " + nombre;
};
\`\`\`

Ambas hacen lo mismo; las flechas son más comunes hoy en día.`,
      starter: `// Crea una función 'multiplicar' que reciba
// dos números y devuelva su producto

function multiplicar(a, b) {
    // tu código aquí
}

console.log(multiplicar(4, 5));   // debe imprimir 20
`,
      solution: `function multiplicar(a, b) {\n    return a * b;\n}\n\nconsole.log(multiplicar(4, 5));`,
    },
  ],
};

const CHALLENGES = [
  { id: "c1", lang: "python", title: "FizzBuzz", difficulty: "Fácil", points: 100,
    description: "Imprime los números del 1 al 20. Para múltiplos de 3 imprime 'Fizz', para múltiplos de 5 imprime 'Buzz', y para múltiplos de ambos imprime 'FizzBuzz'.",
    starter: "for i in range(1, 21):\n    # tu código aquí\n    pass",
    hint: "Usa el operador % (módulo) para saber si un número es divisible. Ej: 9 % 3 == 0 es True." },
  { id: "c2", lang: "javascript", title: "Suma de array", difficulty: "Fácil", points: 100,
    description: "Crea una función que reciba un array de números y devuelva la suma de todos ellos.",
    starter: "function sumaArray(numeros) {\n    // tu código aquí\n}\n\nconsole.log(sumaArray([1, 2, 3, 4, 5])); // 15",
    hint: "Puedes usar un bucle for o el método reduce(). Con for: empieza con total=0 y ve sumando cada elemento." },
  { id: "c3", lang: "python", title: "Palíndromo", difficulty: "Medio", points: 200,
    description: "Crea una función que reciba una palabra y devuelva True si es un palíndromo (se lee igual al revés), False si no.",
    starter: "def es_palindromo(palabra):\n    # tu código aquí\n    pass\n\nprint(es_palindromo('radar'))  # True\nprint(es_palindromo('casa'))   # False",
    hint: "En Python puedes invertir un string con slicing: palabra[::-1]" },
  { id: "c4", lang: "javascript", title: "Número mayor", difficulty: "Medio", points: 200,
    description: "Crea una función que reciba tres números y devuelva el mayor de los tres.",
    starter: "function mayorDeTres(a, b, c) {\n    // tu código aquí\n}\n\nconsole.log(mayorDeTres(3, 9, 5)); // 9",
    hint: "Puedes usar Math.max(a, b, c) o comparar con if/else." },
];

// ── Ejecutor de código (simulado para JS, explicado para Python) ──────────────
function runJavaScript(code) {
  const logs = [];
  const fakeConsole = { log: (...args) => logs.push(args.map(String).join(" ")) };
  try {
    // eslint-disable-next-line no-new-func
    new Function("console", code)(fakeConsole);
    return { output: logs.join("\n") || "(sin salida)", error: null };
  } catch (e) {
    return { output: "", error: e.message };
  }
}

// ── Componente: Editor de código ──────────────────────────────────────────────
function CodeEditor({ code, onChange, lang, onRun, output, error, loading }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
      <textarea
        value={code}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
        style={{
          flex: 1, minHeight: 180, background: "#0d1117", color: "#e2e8f0",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          fontSize: 14, lineHeight: 1.6, padding: 16, border: "1px solid #2d3748",
          borderRadius: 8, resize: "vertical", outline: "none",
        }}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={onRun} disabled={loading} style={{
          background: lang === "python" ? "#3B82F6" : "#F59E0B",
          color: lang === "python" ? "#fff" : "#0F1117",
          border: "none", borderRadius: 6, padding: "8px 20px",
          fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
        }}>
          {loading ? "⏳ Ejecutando..." : "▶ Ejecutar"}
        </button>
        <span style={{ color: "#64748b", fontSize: 12 }}>
          {lang === "python" ? "🐍 Python" : "⚡ JavaScript"}
        </span>
      </div>
      {(output || error) && (
        <div style={{
          background: error ? "#1a0a0a" : "#0a1a0a",
          border: `1px solid ${error ? "#7f1d1d" : "#14532d"}`,
          borderRadius: 8, padding: 12, fontFamily: "monospace", fontSize: 13,
          color: error ? "#fca5a5" : "#86efac", whiteSpace: "pre-wrap", maxHeight: 150, overflowY: "auto",
        }}>
          {error ? `❌ Error: ${error}` : `✅ Salida:\n${output}`}
        </div>
      )}
    </div>
  );
}

// ── Componente: Teoría con markdown básico ────────────────────────────────────
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

// ── App principal ─────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("lecciones");
  const [lang, setLang] = useState("python");
  const [lessonIdx, setLessonIdx] = useState(0);
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

  // Sync code when lesson changes
  useEffect(() => {
    setCode(lesson.starter);
    setOutput(""); setCodeError("");
  }, [lessonIdx, lang]);

  // Sync challenge code
  useEffect(() => {
    if (challenge) { setChallengeCode(challenge.starter); setChallengeOut(""); setChallengeErr(""); setShowHint(false); }
  }, [challenge]);

  useEffect(() => { chatBottom.current?.scrollIntoView({ behavior: "smooth" }); }, [aiMessages]);

  // Ejecutar código
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
      // Para Python: usamos la IA para simular la ejecución
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 400,
            system: `Eres un intérprete de Python. El usuario te envía código Python y tú debes:
1. Ejecutarlo mentalmente con precisión
2. Responder ÚNICAMENTE con la salida que produciría print() o el error si hay uno
3. Si hay un error, empieza tu respuesta con "ERROR:" seguido del tipo de error y mensaje
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

  // Chat IA
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
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Eres un tutor de programación experto y paciente. El alumno tiene conocimientos básicos y está aprendiendo Python y JavaScript.
- Responde siempre en español
- Usa ejemplos de código cuando sea útil, con bloques \`\`\`python o \`\`\`javascript
- Explica conceptos de forma simple y con analogías del mundo real
- Sé alentador y positivo
- Si el alumno comparte código, analízalo, señala errores con amabilidad y sugiere mejoras
- Máximo 300 palabras por respuesta, preferiblemente menos`,
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

  // ── Estilos base ──────────────────────────────────────────────────────────
  const s = {
    app: { background: "#0F1117", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column" },
    header: { background: "#1A1D2E", borderBottom: "1px solid #2d3748", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 },
    logo: { fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#f1f5f9" },
    nav: { display: "flex", gap: 4, background: "#0F1117", borderRadius: 8, padding: 4 },
    navBtn: (active) => ({ background: active ? "#232640" : "transparent", color: active ? "#f1f5f9" : "#64748b", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: active ? 600 : 400, cursor: "pointer", fontSize: 13, transition: "all 0.15s" }),
    langSwitch: { display: "flex", gap: 6 },
    langBtn: (active, l) => ({ background: active ? (l === "python" ? "#1d3461" : "#3d2a00") : "#1A1D2E", color: active ? (l === "python" ? "#93c5fd" : "#fcd34d") : "#64748b", border: `1px solid ${active ? (l === "python" ? "#3B82F6" : "#F59E0B") : "#2d3748"}`, borderRadius: 6, padding: "5px 14px", fontWeight: 600, cursor: "pointer", fontSize: 13, transition: "all 0.15s" }),
    main: { flex: 1, padding: "20px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" },
    card: { background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 12, padding: 20, marginBottom: 16 },
    sidePanel: { display: "flex", gap: 16, flexWrap: "wrap" },
    lessonList: { width: 220, minWidth: 180, flexShrink: 0 },
    lessonContent: { flex: 1, minWidth: 0 },
    lessonItem: (active, done) => ({ padding: "10px 14px", borderRadius: 8, cursor: "pointer", marginBottom: 6, background: active ? "#232640" : "transparent", border: `1px solid ${active ? "#3B82F6" : "transparent"}`, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.15s" }),
    badge: (color) => ({ background: color + "22", color, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 }),
    progressBar: (pct, color) => ({ height: 4, background: "#2d3748", borderRadius: 4, overflow: "hidden", position: "relative", marginTop: 6 }),
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, "@media(max-width:600px)": { gridTemplateColumns: "1fr" } },
    chatMsg: (role) => ({ display: "flex", justifyContent: role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }),
    bubble: (role) => ({ background: role === "user" ? "#1d3461" : "#232640", color: "#e2e8f0", borderRadius: role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 14px", maxWidth: "80%", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word" }),
    input: { background: "#0d1117", border: "1px solid #2d3748", borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, outline: "none", flex: 1 },
    btn: (color) => ({ background: color, border: "none", borderRadius: 8, padding: "10px 18px", color: color === "#F59E0B" ? "#0F1117" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }),
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={s.app}>
      {/* Header */}
      <div style={s.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={s.logo}>⌨️ CodePath</span>
          <span style={{ color: "#64748b", fontSize: 12 }}>Tu tutor de programación</span>
        </div>
        <div style={s.nav}>
          {[["lecciones","📚 Lecciones"],["editor","💻 Editor"],["retos","🏆 Retos"],["asistente","🤖 Asistente"]].map(([key, label]) => (
            <button key={key} style={s.navBtn(tab === key)} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>
      </div>

      <div style={s.main}>

        {/* ── TAB: LECCIONES ── */}
        {tab === "lecciones" && (
          <div>
            <div style={{ marginBottom: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Lecciones</h2>
              <div style={s.langSwitch}>
                <button style={s.langBtn(lang === "python", "python")} onClick={() => { setLang("python"); setLessonIdx(0); }}>🐍 Python</button>
                <button style={s.langBtn(lang === "javascript", "javascript")} onClick={() => { setLang("javascript"); setLessonIdx(0); }}>⚡ JavaScript</button>
              </div>
            </div>

            {/* Progreso */}
            <div style={{ ...s.card, padding: 14, marginBottom: 16, display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[["🐍 Python", progressPy, "#3B82F6"], ["⚡ JavaScript", progressJs, "#F59E0B"]].map(([name, pct, color]) => (
                <div key={name} style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#94a3b8" }}>
                    <span>{name}</span><span style={{ color }}>{pct}%</span>
                  </div>
                  <div style={s.progressBar(pct, color)}>
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.4s" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {/* Lista lecciones */}
              <div style={{ width: 200, flexShrink: 0 }}>
                {lessons.map((l, i) => (
                  <div key={l.id} style={s.lessonItem(i === lessonIdx, completedLessons.has(l.id))} onClick={() => setLessonIdx(i)}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: i === lessonIdx ? 700 : 400, color: i === lessonIdx ? "#f1f5f9" : "#94a3b8" }}>{l.title}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{l.level}</div>
                    </div>
                    {completedLessons.has(l.id) && <span style={{ color: "#22c55e", fontSize: 16 }}>✓</span>}
                  </div>
                ))}
              </div>

              {/* Contenido lección */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{lesson.title}</h3>
                      <span style={s.badge(lang === "python" ? "#3B82F6" : "#F59E0B")}>{lesson.level}</span>
                    </div>
                    <button onClick={() => { setCode(lesson.solution); }} style={{ background: "#232640", border: "1px solid #2d3748", borderRadius: 6, padding: "6px 12px", color: "#94a3b8", fontSize: 12, cursor: "pointer" }}>Ver solución</button>
                  </div>
                  <TheoryBlock text={lesson.theory} />
                </div>

                <div style={s.card}>
                  <h4 style={{ margin: "0 0 12px", color: "#94a3b8", fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>✏️ Practica</h4>
                  <CodeEditor code={code} onChange={setCode} lang={lang} onRun={() => runCode(code)} output={output} error={codeError} loading={runLoading} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button disabled={lessonIdx === 0} onClick={() => setLessonIdx(i => i - 1)} style={{ ...s.btn("#232640"), opacity: lessonIdx === 0 ? 0.4 : 1 }}>← Anterior</button>
                  <button disabled={lessonIdx === lessons.length - 1} onClick={() => setLessonIdx(i => i + 1)} style={{ ...s.btn(lang === "python" ? "#3B82F6" : "#F59E0B"), opacity: lessonIdx === lessons.length - 1 ? 0.4 : 1 }}>Siguiente →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: EDITOR LIBRE ── */}
        {tab === "editor" && (
          <div>
            <div style={{ marginBottom: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Editor libre</h2>
              <div style={s.langSwitch}>
                <button style={s.langBtn(lang === "python", "python")} onClick={() => setLang("python")}>🐍 Python</button>
                <button style={s.langBtn(lang === "javascript", "javascript")} onClick={() => setLang("javascript")}>⚡ JavaScript</button>
              </div>
            </div>
            <div style={s.card}>
              <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: 14 }}>Escribe cualquier código y ejecútalo. Perfecto para experimentar y practicar libremente.</p>
              <CodeEditor
                code={code}
                onChange={setCode}
                lang={lang}
                onRun={() => runCode(code)}
                output={output}
                error={codeError}
                loading={runLoading}
              />
            </div>
            <div style={{ ...s.card, background: "#0d1117" }}>
              <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>
                💡 <strong style={{ color: "#94a3b8" }}>Tip:</strong> Si tienes dudas sobre tu código, ve al <button onClick={() => setTab("asistente")} style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer", padding: 0, fontSize: 13 }}>Asistente IA</button> y pégalo ahí para que te lo explique.
              </p>
            </div>
          </div>
        )}

        {/* ── TAB: RETOS ── */}
        {tab === "retos" && !challenge && (
          <div>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Retos</h2>
            <p style={{ margin: "0 0 20px", color: "#64748b", fontSize: 14 }}>Pon a prueba lo que has aprendido. Resuelve el reto y gana puntos.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {CHALLENGES.map(c => (
                <div key={c.id} style={{ ...s.card, cursor: "pointer", transition: "border-color 0.15s", borderColor: completedChallenges.has(c.id) ? "#22c55e" : "#2d3748" }} onClick={() => setChallenge(c)}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={s.badge(c.lang === "python" ? "#3B82F6" : "#F59E0B")}>{c.lang === "python" ? "🐍 Python" : "⚡ JS"}</span>
                    <span style={s.badge(c.difficulty === "Fácil" ? "#22c55e" : "#f59e0b")}>{c.difficulty}</span>
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700 }}>{c.title}</h3>
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
          <div>
            <button onClick={() => setChallenge(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 14, marginBottom: 16, padding: 0 }}>← Volver a retos</button>
            <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center", flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{challenge.title}</h2>
              <span style={s.badge(challenge.difficulty === "Fácil" ? "#22c55e" : "#f59e0b")}>{challenge.difficulty}</span>
              <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 700 }}>⭐ {challenge.points} pts</span>
            </div>
            <div style={s.card}>
              <p style={{ margin: "0 0 16px", color: "#cbd5e1", lineHeight: 1.7 }}>{challenge.description}</p>
              <button onClick={() => setShowHint(h => !h)} style={{ background: "none", border: "1px solid #2d3748", borderRadius: 6, padding: "6px 12px", color: "#64748b", fontSize: 13, cursor: "pointer", marginBottom: showHint ? 10 : 0 }}>
                {showHint ? "Ocultar pista" : "💡 Ver pista"}
              </button>
              {showHint && <div style={{ background: "#1e2a1e", border: "1px solid #14532d", borderRadius: 8, padding: 12, color: "#86efac", fontSize: 13 }}>{challenge.hint}</div>}
            </div>
            <div style={s.card}>
              <CodeEditor code={challengeCode} onChange={setChallengeCode} lang={challenge.lang} onRun={() => runCode(challengeCode, true)} output={challengeOut} error={challengeErr} loading={runLoading} />
            </div>
            {completedChallenges.has(challenge.id) && (
              <div style={{ background: "#0a1a0a", border: "1px solid #22c55e", borderRadius: 10, padding: 16, textAlign: "center", color: "#86efac", fontWeight: 700 }}>
                🎉 ¡Reto completado! Has ganado {challenge.points} puntos.
              </div>
            )}
          </div>
        )}

        {/* ── TAB: ASISTENTE IA ── */}
        {tab === "asistente" && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)", minHeight: 400 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 22, fontWeight: 800 }}>🤖 Asistente IA</h2>
            <div style={{ ...s.card, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 0 }}>
              {aiMessages.map((m, i) => (
                <div key={i} style={s.chatMsg(m.role)}>
                  <div style={s.bubble(m.role)}>
                    {m.content.split(/(```[\s\S]*?```)/g).map((part, j) => {
                      if (part.startsWith("```") && part.endsWith("```")) {
                        const code = part.slice(3, -3).replace(/^[a-z]+\n/, "");
                        return <pre key={j} style={{ background: "#0d1117", borderRadius: 6, padding: 10, fontSize: 12, overflowX: "auto", margin: "8px 0" }}>{code}</pre>;
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div style={s.chatMsg("assistant")}>
                  <div style={s.bubble("assistant")}>
                    <span style={{ color: "#64748b" }}>Escribiendo</span>
                    <span style={{ animation: "blink 1s infinite" }}> ▋</span>
                  </div>
                </div>
              )}
              <div ref={chatBottom} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <input
                style={s.input}
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendAiMessage()}
                placeholder="Escribe tu pregunta o pega tu código aquí..."
              />
              <button onClick={sendAiMessage} disabled={aiLoading || !aiInput.trim()} style={{ ...s.btn("#3B82F6"), opacity: aiLoading || !aiInput.trim() ? 0.5 : 1 }}>
                Enviar
              </button>
            </div>
            <p style={{ color: "#475569", fontSize: 11, margin: "6px 0 0", textAlign: "center" }}>Puedes preguntar conceptos, pegar código para revisarlo o pedir ejemplos.</p>
          </div>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        textarea:focus { border-color: #3B82F6 !important; }
        input:focus { border-color: #3B82F6 !important; outline: none; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (max-width: 600px) {
          .nav-label { display: none; }
        }
      `}</style>
    </div>
  );
}
