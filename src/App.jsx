import { useState, useRef, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// DATOS: LECCIONES
// ══════════════════════════════════════════════════════════════════════════════
const LESSONS = {
  python: [
    {
      id: "py1", title: "Variables y tipos", level: "Básico",
      theory: `Una **variable** es como una caja etiquetada donde guardas información.\n\nEn Python no necesitas declarar el tipo — Python lo detecta solo.\n\n\`\`\`python\nnombre = "Ana"        # texto (str)\nedad   = 25           # número entero (int)\naltura = 1.68         # número decimal (float)\nactivo = True         # verdadero/falso (bool)\n\`\`\`\n\nPuedes ver el tipo con \`type()\`:\n\`\`\`python\nprint(type(nombre))   # <class 'str'>\n\`\`\``,
      starter: `# Crea tus propias variables\nnombre = "Tu nombre aquí"\nedad = 0\nciudad = "Tu ciudad"\n\nprint("Hola, soy", nombre)\nprint("Tengo", edad, "años")\nprint("Vivo en", ciudad)`,
      solution: `nombre = "Ana"\nedad = 25\nciudad = "Madrid"\nprint("Hola, soy", nombre)\nprint("Tengo", edad, "años")\nprint("Vivo en", ciudad)`,
    },
    {
      id: "py2", title: "Condicionales if/else", level: "Básico",
      theory: `Un **condicional** permite que tu programa tome decisiones.\n\n\`\`\`python\nif condición:\n    # se ejecuta si es True\nelse:\n    # se ejecuta si es False\n\`\`\`\n\nLa **indentación** (los espacios) es obligatoria en Python.\n\n\`\`\`python\nedad = 18\nif edad >= 18:\n    print("Mayor de edad")\nelse:\n    print("Menor de edad")\n\`\`\``,
      starter: `edad = 20\n\n# Escribe un if/else que diga si puede votar\n# (necesita 18 o más)\n`,
      solution: `edad = 20\nif edad >= 18:\n    print("Puedes votar")\nelse:\n    print("Aún no puedes votar")`,
    },
    {
      id: "py3", title: "Bucles for", level: "Básico",
      theory: `Un **bucle for** repite código un número determinado de veces.\n\n\`\`\`python\nfor i in range(5):\n    print(i)   # 0, 1, 2, 3, 4\n\`\`\`\n\nTambién puedes recorrer listas:\n\`\`\`python\nfrutas = ["manzana", "pera", "uva"]\nfor fruta in frutas:\n    print(fruta)\n\`\`\``,
      starter: `# Imprime los números del 1 al 10\n# Pista: range(1, 11) va de 1 a 10\n`,
      solution: `for i in range(1, 11):\n    print(i)`,
    },
    {
      id: "py4", title: "Funciones", level: "Intermedio",
      theory: `Una **función** es un bloque de código reutilizable con nombre propio.\n\n\`\`\`python\ndef saludar(nombre):\n    return "Hola, " + nombre\n\nmensaje = saludar("Ana")\nprint(mensaje)   # Hola, Ana\n\`\`\`\n\n- \`def\` define la función\n- Los parámetros van entre paréntesis\n- \`return\` devuelve un valor`,
      starter: `def sumar(a, b):\n    # tu código aquí\n    pass\n\nprint(sumar(3, 7))   # debe imprimir 10`,
      solution: `def sumar(a, b):\n    return a + b\n\nprint(sumar(3, 7))`,
    },
    {
      id: "py5", title: "Listas", level: "Intermedio",
      theory: `Una **lista** guarda varios valores en orden bajo un mismo nombre.\n\n\`\`\`python\nfrutas = ["manzana", "pera", "uva"]\nprint(frutas[0])   # manzana (empieza en 0)\nfrutas.append("kiwi")   # añadir al final\nprint(len(frutas))       # 4 (cuántos hay)\n\`\`\`\n\nPuedes modificar, añadir o eliminar elementos:\n\`\`\`python\nfrutas[1] = "plátano"   # reemplazar\nfrutas.remove("uva")    # eliminar\n\`\`\``,
      starter: `# Crea una lista con 3 colores favoritos\ncolores = []\n\n# Añade un color más con append()\n\n# Imprime cuántos colores hay con len()\n\n# Imprime el primer color de la lista\n`,
      solution: `colores = ["rojo", "azul", "verde"]\ncolores.append("amarillo")\nprint(len(colores))\nprint(colores[0])`,
    },
    {
      id: "py6", title: "Diccionarios", level: "Intermedio",
      theory: `Un **diccionario** guarda pares clave → valor, como un contacto en el móvil.\n\n\`\`\`python\npersona = {\n    "nombre": "Ana",\n    "edad": 25,\n    "ciudad": "Madrid"\n}\n\nprint(persona["nombre"])   # Ana\npersona["email"] = "ana@mail.com"   # añadir\n\`\`\`\n\nPuedes recorrerlo con un bucle:\n\`\`\`python\nfor clave, valor in persona.items():\n    print(clave, "→", valor)\n\`\`\``,
      starter: `# Crea un diccionario con tu información\npersona = {\n    "nombre": "Tu nombre",\n    "edad": 0,\n    "ciudad": "Tu ciudad"\n}\n\n# Imprime cada dato usando las claves\nprint(persona["nombre"])\n`,
      solution: `persona = {"nombre": "Ana", "edad": 25, "ciudad": "Madrid"}\nprint(persona["nombre"])\nprint(persona["edad"])\nprint(persona["ciudad"])`,
    },
    {
      id: "py7", title: "Manejo de errores", level: "Avanzado",
      theory: `Los errores son inevitables. Python permite **capturarlos** para que el programa no se rompa.\n\n\`\`\`python\ntry:\n    resultado = 10 / 0   # esto falla\nexcept ZeroDivisionError:\n    print("No puedes dividir entre cero")\n\`\`\`\n\nTambién puedes usar \`finally\` para código que siempre se ejecuta:\n\`\`\`python\ntry:\n    numero = int("abc")   # falla\nexcept ValueError:\n    print("Eso no es un número")\nfinally:\n    print("Esto siempre se ejecuta")\n\`\`\``,
      starter: `# Intenta convertir "hola" a número\n# y captura el error con try/except\n\ntry:\n    numero = int("hola")\nexcept:\n    # tu código aquí\n    pass\n`,
      solution: `try:\n    numero = int("hola")\nexcept ValueError:\n    print("Error: eso no es un número válido")`,
    },
  ],
  javascript: [
    {
      id: "js1", title: "Variables y tipos", level: "Básico",
      theory: `En JavaScript usas \`let\` o \`const\` para declarar variables.\n\n\`\`\`javascript\nlet nombre = "Ana";       // puede cambiar\nconst PI = 3.14159;       // no puede cambiar\n\nlet edad = 25;\nlet activo = true;\nlet vacio = null;\n\`\`\`\n\nUsa \`console.log()\` para imprimir:\n\`\`\`javascript\nconsole.log("Hola", nombre);\n\`\`\``,
      starter: `let nombre = "Tu nombre";\nlet edad = 0;\nconst lenguaje = "JavaScript";\n\nconsole.log("Me llamo", nombre);\nconsole.log("Tengo", edad, "años");\nconsole.log("Aprendo", lenguaje);`,
      solution: `let nombre = "Ana";\nlet edad = 25;\nconst lenguaje = "JavaScript";\nconsole.log("Me llamo", nombre);\nconsole.log("Tengo", edad, "años");\nconsole.log("Aprendo", lenguaje);`,
    },
    {
      id: "js2", title: "Condicionales if/else", level: "Básico",
      theory: `Los condicionales en JavaScript usan llaves \`{}\` en vez de indentación.\n\n\`\`\`javascript\nif (condición) {\n    // true\n} else {\n    // false\n}\n\`\`\`\n\nEjemplo:\n\`\`\`javascript\nlet hora = 14;\nif (hora < 12) {\n    console.log("Buenos días");\n} else {\n    console.log("Buenas tardes");\n}\n\`\`\``,
      starter: `let nota = 75;\n\n// Si nota >= 60 → "Aprobado"\n// Si no → "Suspendido"\n`,
      solution: `let nota = 75;\nif (nota >= 60) {\n    console.log("Aprobado");\n} else {\n    console.log("Suspendido");\n}`,
    },
    {
      id: "js3", title: "Bucles for", level: "Básico",
      theory: `El \`for\` en JavaScript tiene tres partes: inicio, condición e incremento.\n\n\`\`\`javascript\nfor (let i = 0; i < 5; i++) {\n    console.log(i);   // 0, 1, 2, 3, 4\n}\n\`\`\`\n\nPara recorrer arrays:\n\`\`\`javascript\nconst frutas = ["manzana", "pera", "uva"];\nfor (let fruta of frutas) {\n    console.log(fruta);\n}\n\`\`\``,
      starter: `// Imprime los números del 1 al 10\n`,
      solution: `for (let i = 1; i <= 10; i++) {\n    console.log(i);\n}`,
    },
    {
      id: "js4", title: "Funciones", level: "Intermedio",
      theory: `Hay dos formas principales de definir funciones en JavaScript:\n\n**Función tradicional:**\n\`\`\`javascript\nfunction saludar(nombre) {\n    return "Hola, " + nombre;\n}\n\`\`\`\n\n**Función flecha (moderna):**\n\`\`\`javascript\nconst saludar = (nombre) => {\n    return "Hola, " + nombre;\n};\n\`\`\``,
      starter: `function multiplicar(a, b) {\n    // tu código aquí\n}\n\nconsole.log(multiplicar(4, 5));   // 20`,
      solution: `function multiplicar(a, b) {\n    return a * b;\n}\nconsole.log(multiplicar(4, 5));`,
    },
    {
      id: "js5", title: "Arrays", level: "Intermedio",
      theory: `Un **array** es una lista ordenada de valores.\n\n\`\`\`javascript\nconst frutas = ["manzana", "pera", "uva"];\nconsole.log(frutas[0]);      // manzana\nfrutas.push("kiwi");         // añadir al final\nconsole.log(frutas.length);  // 4\n\`\`\`\n\nMétodos útiles:\n\`\`\`javascript\nfrutas.pop();          // elimina el último\nfrutas.includes("pera"); // true/false\n\`\`\``,
      starter: `const numeros = [10, 20, 30];\n\n// Añade el número 40 con push()\n\n// Imprime cuántos hay con length\n\n// Imprime el último elemento\n`,
      solution: `const numeros = [10, 20, 30];\nnumeros.push(40);\nconsole.log(numeros.length);\nconsole.log(numeros[numeros.length - 1]);`,
    },
    {
      id: "js6", title: "Objetos", level: "Intermedio",
      theory: `Un **objeto** guarda pares clave: valor, como un diccionario de Python.\n\n\`\`\`javascript\nconst persona = {\n    nombre: "Ana",\n    edad: 25,\n    ciudad: "Madrid"\n};\n\nconsole.log(persona.nombre);   // Ana\npersona.email = "ana@mail.com"; // añadir\n\`\`\`\n\nPuedes recorrerlo con \`for...in\`:\n\`\`\`javascript\nfor (let clave in persona) {\n    console.log(clave, "→", persona[clave]);\n}\n\`\`\``,
      starter: `const persona = {\n    nombre: "Tu nombre",\n    edad: 0,\n    ciudad: "Tu ciudad"\n};\n\n// Imprime cada dato\nconsole.log(persona.nombre);\n`,
      solution: `const persona = { nombre: "Ana", edad: 25, ciudad: "Madrid" };\nconsole.log(persona.nombre);\nconsole.log(persona.edad);\nconsole.log(persona.ciudad);`,
    },
    {
      id: "js7", title: "Manejo de errores", level: "Avanzado",
      theory: `JavaScript usa \`try/catch\` para manejar errores sin romper el programa.\n\n\`\`\`javascript\ntry {\n    let x = JSON.parse("esto no es JSON");\n} catch (error) {\n    console.log("Error:", error.message);\n}\n\`\`\`\n\nTambién puedes lanzar tus propios errores:\n\`\`\`javascript\nfunction dividir(a, b) {\n    if (b === 0) throw new Error("División entre cero");\n    return a / b;\n}\n\`\`\``,
      starter: `// Intenta parsear este texto inválido como JSON\n// y captura el error\n\ntry {\n    let datos = JSON.parse("esto no es json");\n} catch (error) {\n    // tu código aquí\n}\n`,
      solution: `try {\n    let datos = JSON.parse("esto no es json");\n} catch (error) {\n    console.log("Error capturado:", error.message);\n}`,
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// DATOS: RETOS
// ══════════════════════════════════════════════════════════════════════════════
const CHALLENGES = [
  { id: "c1", lang: "python", title: "FizzBuzz", difficulty: "Fácil", points: 100,
    description: "Imprime los números del 1 al 20. Para múltiplos de 3 imprime 'Fizz', para múltiplos de 5 'Buzz', y para múltiplos de ambos 'FizzBuzz'.",
    starter: "for i in range(1, 21):\n    # tu código aquí\n    pass",
    hint: "Comprueba primero si es múltiplo de ambos (i % 15 == 0), luego de 3, luego de 5." },
  { id: "c2", lang: "javascript", title: "Suma de array", difficulty: "Fácil", points: 100,
    description: "Crea una función que reciba un array de números y devuelva la suma de todos ellos.",
    starter: "function sumaArray(numeros) {\n    // tu código aquí\n}\nconsole.log(sumaArray([1, 2, 3, 4, 5])); // 15",
    hint: "Empieza con total=0 y usa un bucle for para ir sumando cada elemento." },
  { id: "c3", lang: "python", title: "Palíndromo", difficulty: "Medio", points: 200,
    description: "Crea una función que devuelva True si una palabra es un palíndromo (se lee igual al revés), False si no.",
    starter: "def es_palindromo(palabra):\n    pass\n\nprint(es_palindromo('radar'))  # True\nprint(es_palindromo('casa'))   # False",
    hint: "En Python puedes invertir un string con slicing: palabra[::-1]" },
  { id: "c4", lang: "javascript", title: "Número mayor", difficulty: "Medio", points: 200,
    description: "Crea una función que reciba tres números y devuelva el mayor de los tres.",
    starter: "function mayorDeTres(a, b, c) {\n    // tu código aquí\n}\nconsole.log(mayorDeTres(3, 9, 5)); // 9",
    hint: "Puedes usar Math.max(a, b, c) directamente." },
  { id: "c5", lang: "python", title: "Contar vocales", difficulty: "Medio", points: 200,
    description: "Crea una función que reciba una frase y devuelva cuántas vocales tiene.",
    starter: "def contar_vocales(frase):\n    pass\n\nprint(contar_vocales('Hola mundo'))  # 4",
    hint: "Recorre cada letra con un for y comprueba si está en la lista ['a','e','i','o','u']." },
  { id: "c6", lang: "javascript", title: "Invertir string", difficulty: "Medio", points: 200,
    description: "Crea una función que reciba una cadena de texto y la devuelva al revés.",
    starter: "function invertir(texto) {\n    // tu código aquí\n}\nconsole.log(invertir('hola')); // 'aloh'",
    hint: "Convierte el string a array con split(''), usa reverse(), luego join('')." },
  { id: "c7", lang: "python", title: "Tabla de multiplicar", difficulty: "Fácil", points: 100,
    description: "Pide un número e imprime su tabla de multiplicar del 1 al 10.",
    starter: "numero = 7\n\nfor i in range(1, 11):\n    # imprime: 7 x 1 = 7\n    pass",
    hint: "Usa f-strings: print(f'{numero} x {i} = {numero * i}')" },
  { id: "c8", lang: "javascript", title: "Números pares", difficulty: "Fácil", points: 100,
    description: "Crea una función que reciba un array de números y devuelva solo los números pares.",
    starter: "function solopares(numeros) {\n    // tu código aquí\n}\nconsole.log(soloPares([1,2,3,4,5,6])); // [2,4,6]",
    hint: "Usa filter(): numeros.filter(n => n % 2 === 0)" },
];

// ══════════════════════════════════════════════════════════════════════════════
// FLASHCARDS DE REPASO
// ══════════════════════════════════════════════════════════════════════════════
const FLASHCARDS = [
  { id: "f1", lang: "python", pregunta: "¿Cómo defines una función en Python?", respuesta: "Con la palabra clave def:\n\ndef mi_funcion(parametro):\n    return parametro" },
  { id: "f2", lang: "python", pregunta: "¿Qué hace range(1, 5)?", respuesta: "Genera los números 1, 2, 3, 4\n(el último número NO se incluye)" },
  { id: "f3", lang: "python", pregunta: "¿Cómo añades un elemento al final de una lista?", respuesta: "Con el método append():\n\nmi_lista.append('nuevo')" },
  { id: "f4", lang: "python", pregunta: "¿Qué operador usas para saber el resto de una división?", respuesta: "El operador % (módulo):\n\n10 % 3 = 1\n15 % 5 = 0" },
  { id: "f5", lang: "python", pregunta: "¿Cuál es la diferencia entre = y ==?", respuesta: "= asigna un valor a una variable\n== compara si dos valores son iguales" },
  { id: "f6", lang: "javascript", pregunta: "¿Cuál es la diferencia entre let y const?", respuesta: "let puede cambiar su valor\nconst no puede cambiar (es constante)" },
  { id: "f7", lang: "javascript", pregunta: "¿Cómo añades un elemento al final de un array?", respuesta: "Con push():\n\nmiArray.push('nuevo')" },
  { id: "f8", lang: "javascript", pregunta: "¿Qué devuelve typeof 'hola'?", respuesta: "'string'\n\ntypeof también puede devolver:\n'number', 'boolean', 'object', 'undefined'" },
  { id: "f9", lang: "javascript", pregunta: "¿Cómo conviertes un string a número?", respuesta: "Con Number() o parseInt():\n\nNumber('42')    → 42\nparseInt('42px') → 42" },
  { id: "f10", lang: "python", pregunta: "¿Cómo inviertes un string en Python?", respuesta: "Con slicing:\n\ntexto = 'hola'\nprint(texto[::-1])  # 'aloh'" },
];

// ══════════════════════════════════════════════════════════════════════════════
// UTILIDADES
// ══════════════════════════════════════════════════════════════════════════════

// Ejecutor de JavaScript en el navegador
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

// Abrir Claude.ai con el código preparado
function askClaude({ code, lang, output, error, context }) {
  let msg = `Estoy aprendiendo a programar en ${lang === "python" ? "Python" : "JavaScript"} con una app llamada CodePath.\n\n`;
  if (context) msg += `Contexto: ${context}\n\n`;
  msg += `Este es mi código:\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
  if (error) msg += `Me da este error:\n${error}\n\n¿Puedes explicarme qué está mal y cómo arreglarlo?`;
  else if (output) msg += `La salida es:\n${output}\n\n¿Puedes explicarme cómo funciona paso a paso?`;
  else msg += `¿Puedes revisarlo y decirme si está bien o cómo mejorarlo?`;
  window.open(`https://claude.ai/new?q=${encodeURIComponent(msg)}`, "_blank");
}

// Hook: guardar y cargar progreso con localStorage
function useProgress() {
  const [completedLessons, setCompletedLessonsRaw] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("cp_lessons") || "[]")); }
    catch { return new Set(); }
  });
  const [completedChallenges, setCompletedChallengesRaw] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("cp_challenges") || "[]")); }
    catch { return new Set(); }
  });
  const [points, setPointsRaw] = useState(() => {
    try { return parseInt(localStorage.getItem("cp_points") || "0"); }
    catch { return 0; }
  });

  const completeLesson = (id) => {
    setCompletedLessonsRaw(prev => {
      const next = new Set([...prev, id]);
      localStorage.setItem("cp_lessons", JSON.stringify([...next]));
      return next;
    });
  };

  const completeChallenge = (id, pts) => {
    setCompletedChallengesRaw(prev => {
      if (prev.has(id)) return prev;
      const next = new Set([...prev, id]);
      localStorage.setItem("cp_challenges", JSON.stringify([...next]));
      setPointsRaw(p => {
        const np = p + pts;
        localStorage.setItem("cp_points", String(np));
        return np;
      });
      return next;
    });
  };

  const resetProgress = () => {
    localStorage.removeItem("cp_lessons");
    localStorage.removeItem("cp_challenges");
    localStorage.removeItem("cp_points");
    setCompletedLessonsRaw(new Set());
    setCompletedChallengesRaw(new Set());
    setPointsRaw(0);
  };

  return { completedLessons, completedChallenges, points, completeLesson, completeChallenge, resetProgress };
}

// Hook: cargar Pyodide (Python en el navegador)
function usePyodide() {
  const [pyodide, setPyodide] = useState(null);
  const [pyStatus, setPyStatus] = useState("idle");

  const load = async () => {
    if (pyStatus !== "idle") return;
    setPyStatus("loading");
    try {
      await new Promise((resolve, reject) => {
        if (window.loadPyodide) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      const py = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/" });
      setPyodide(py);
      setPyStatus("ready");
    } catch { setPyStatus("error"); }
  };

  return { pyodide, pyStatus, load };
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTES
// ══════════════════════════════════════════════════════════════════════════════

// Bloque de teoría con markdown básico
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

// Editor de código con resaltado de sintaxis básico y botón de ayuda
function CodeEditor({ code, onChange, lang, onRun, output, error, loading, pyStatus, onLoadPython, onAskClaude, context }) {
  const isPython = lang === "python";
  const accentColor = isPython ? "#3B82F6" : "#F59E0B";

  // Resaltado de sintaxis simple sobre un div superpuesto al textarea
  const highlight = (code) => {
    const keywords = isPython
      ? ["def", "return", "if", "else", "elif", "for", "while", "in", "range", "print", "True", "False", "None", "and", "or", "not", "import", "from", "class", "try", "except", "finally", "pass", "len", "append", "type"]
      : ["function", "const", "let", "var", "return", "if", "else", "for", "while", "of", "in", "console", "log", "true", "false", "null", "undefined", "new", "class", "try", "catch", "throw", "typeof", "push", "length", "Math"];

    return code
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span style="color:#86efac">$&</span>')
      .replace(/#.*/g, '<span style="color:#64748b">$&</span>')
      .replace(/\/\/.*/g, '<span style="color:#64748b">$&</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#fb923c">$1</span>')
      .replace(new RegExp(`\\b(${keywords.join("|")})\\b`, "g"), '<span style="color:#c4b5fd">$1</span>');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Editor con resaltado */}
      <div style={{ position: "relative", fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 13, lineHeight: 1.6 }}>
        <div
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlight(code) + "\n" }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            padding: 14, background: "#0d1117", borderRadius: 8,
            border: "1px solid transparent", whiteSpace: "pre-wrap",
            wordBreak: "break-word", pointerEvents: "none", color: "#e2e8f0",
            overflowY: "auto",
          }}
        />
        <textarea
          value={code}
          onChange={e => onChange(e.target.value)}
          spellCheck={false}
          style={{
            position: "relative", width: "100%", minHeight: 160,
            background: "transparent", color: "transparent", caretColor: "#e2e8f0",
            fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit",
            padding: 14, border: "1px solid #2d3748", borderRadius: 8,
            resize: "vertical", outline: "none", boxSizing: "border-box",
            zIndex: 1,
          }}
        />
      </div>

      {isPython && pyStatus === "idle" && (
        <button onClick={onLoadPython} style={{ background: "#1d3461", border: "1px solid #3B82F6", borderRadius: 6, padding: "9px 16px", color: "#93c5fd", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          🐍 Cargar Python (necesario la primera vez)
        </button>
      )}
      {isPython && pyStatus === "loading" && (
        <div style={{ background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 8, padding: 12, color: "#94a3b8", fontSize: 13 }}>
          ⏳ Cargando Python en tu navegador... puede tardar unos segundos
        </div>
      )}
      {isPython && pyStatus === "error" && (
        <div style={{ background: "#1a0a0a", border: "1px solid #7f1d1d", borderRadius: 8, padding: 12, color: "#fca5a5", fontSize: 13 }}>
          ❌ No se pudo cargar Python. Revisa tu conexión.
        </div>
      )}

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={onRun} disabled={loading || (isPython && pyStatus !== "ready")} style={{
          background: accentColor, color: isPython ? "#fff" : "#0F1117",
          border: "none", borderRadius: 6, padding: "9px 20px", fontWeight: 700, fontSize: 14,
          cursor: (loading || (isPython && pyStatus !== "ready")) ? "not-allowed" : "pointer",
          opacity: (loading || (isPython && pyStatus !== "ready")) ? 0.5 : 1,
        }}>
          {loading ? "⏳ Ejecutando..." : "▶ Ejecutar"}
        </button>
        <button onClick={() => onAskClaude({ code, lang, output, error, context })} style={{
          background: "#1e1b2e", border: "1px solid #6d28d9", borderRadius: 6,
          padding: "9px 14px", color: "#c4b5fd", fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>
          🤖 Pedir ayuda
        </button>
        <span style={{ color: "#64748b", fontSize: 12 }}>{isPython ? "🐍 Python" : "⚡ JS"}</span>
        {isPython && pyStatus === "ready" && <span style={{ color: "#22c55e", fontSize: 12 }}>● listo</span>}
      </div>

      {(output || error) && (
        <div style={{
          background: error ? "#1a0a0a" : "#0a1a0a",
          border: `1px solid ${error ? "#7f1d1d" : "#14532d"}`,
          borderRadius: 8, padding: 12, fontFamily: "monospace", fontSize: 13,
          color: error ? "#fca5a5" : "#86efac", whiteSpace: "pre-wrap", maxHeight: 160, overflowY: "auto",
        }}>
          {error ? `❌ Error:\n${error}` : `✅ Salida:\n${output}`}
        </div>
      )}
    </div>
  );
}

// Tarjeta de repaso (flashcard)
function Flashcard({ card, onNext }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => setRevealed(false), [card]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "20px 0" }}>
      <div style={{ background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 16, padding: 28, width: "100%", maxWidth: 500, textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
          {card.lang === "python" ? "🐍 Python" : "⚡ JavaScript"}
        </div>
        <p style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", margin: "0 0 20px" }}>{card.pregunta}</p>
        {!revealed ? (
          <button onClick={() => setRevealed(true)} style={{ background: "#232640", border: "1px solid #2d3748", borderRadius: 8, padding: "10px 24px", color: "#94a3b8", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>
            Ver respuesta
          </button>
        ) : (
          <pre style={{ background: "#0d1117", border: "1px solid #2d3748", borderRadius: 8, padding: 14, fontSize: 13, color: "#86efac", textAlign: "left", whiteSpace: "pre-wrap", margin: 0 }}>
            {card.respuesta}
          </pre>
        )}
      </div>
      {revealed && (
        <button onClick={onNext} style={{ background: "#3B82F6", border: "none", borderRadius: 8, padding: "10px 28px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Siguiente →
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
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
  const [showHint, setShowHint] = useState(false);
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashLang, setFlashLang] = useState("todos");
  const [showReset, setShowReset] = useState(false);

  const { completedLessons, completedChallenges, points, completeLesson, completeChallenge, resetProgress } = useProgress();
  const { pyodide, pyStatus, load: loadPython } = usePyodide();

  const lessons = LESSONS[lang];
  const lesson = lessons[lessonIdx];

  useEffect(() => { setCode(lesson.starter); setOutput(""); setCodeError(""); }, [lessonIdx, lang]);
  useEffect(() => { if (challenge) { setChallengeCode(challenge.starter); setChallengeOut(""); setChallengeErr(""); setShowHint(false); } }, [challenge]);

  const filteredCards = FLASHCARDS.filter(f => flashLang === "todos" || f.lang === flashLang);
  const currentCard = filteredCards[flashIdx % filteredCards.length];

  // ── Ejecutar código ────────────────────────────────────────────────────────
  const runCode = async (codeToRun, isChallenge = false) => {
    const setOut = isChallenge ? setChallengeOut : setOutput;
    const setErr = isChallenge ? setChallengeErr : setCodeError;
    const currentLang = isChallenge ? challenge.lang : lang;
    setRunLoading(true); setOut(""); setErr("");

    if (currentLang === "javascript") {
      const { output: o, error: e } = runJavaScript(codeToRun);
      setOut(o); setErr(e || "");
      if (!e) {
        if (!isChallenge) completeLesson(lesson.id);
        else completeChallenge(challenge.id, challenge.points);
      }
    } else if (pyodide) {
      try {
        pyodide.runPython(`import sys, io\nsys.stdout = io.StringIO()`);
        pyodide.runPython(codeToRun);
        const captured = pyodide.runPython("sys.stdout.getvalue()");
        setOut(captured || "(sin salida)");
        if (!isChallenge) completeLesson(lesson.id);
        else completeChallenge(challenge.id, challenge.points);
      } catch (e) {
        const lines = (e.message || String(e)).split("\n");
        setErr(lines.slice(-3).join("\n"));
      } finally {
        try { pyodide.runPython("sys.stdout = sys.__stdout__"); } catch {}
      }
    }
    setRunLoading(false);
  };

  // ── Estilos reutilizables ──────────────────────────────────────────────────
  const card = { background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 12, padding: 16, marginBottom: 14 };
  const badge = (color) => ({ background: color + "22", color, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 });
  const accentColor = lang === "python" ? "#3B82F6" : "#F59E0B";

  const progressPy = Math.round((LESSONS.python.filter(l => completedLessons.has(l.id)).length / LESSONS.python.length) * 100);
  const progressJs = Math.round((LESSONS.javascript.filter(l => completedLessons.has(l.id)).length / LESSONS.javascript.length) * 100);
  const totalLessons = LESSONS.python.length + LESSONS.javascript.length;
  const totalChallenges = CHALLENGES.length;

  const NAV_ITEMS = [
    { key: "lecciones", icon: "📚", label: "Lecciones" },
    { key: "editor",    icon: "💻", label: "Editor" },
    { key: "retos",     icon: "🏆", label: "Retos" },
    { key: "repaso",    icon: "🃏", label: "Repaso" },
  ];

  const LangSwitch = ({ value, onChange }) => (
    <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
      {[["python","🐍 Python"],["javascript","⚡ JavaScript"]].map(([l, label]) => (
        <button key={l} onClick={() => onChange(l)} style={{
          flex: 1, padding: "10px 0", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer",
          background: value === l ? (l === "python" ? "#1d3461" : "#3d2a00") : "#1A1D2E",
          color: value === l ? (l === "python" ? "#93c5fd" : "#fcd34d") : "#64748b",
          border: `1px solid ${value === l ? (l === "python" ? "#3B82F6" : "#F59E0B") : "#2d3748"}`,
        }}>{label}</button>
      ))}
    </div>
  );

  return (
    <div style={{ background: "#0F1117", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "#1A1D2E", borderBottom: "1px solid #2d3748", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 800 }}>⌨️ CodePath</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#0F1117", borderRadius: 20, padding: "4px 12px" }}>
            <span style={{ color: "#f59e0b", fontSize: 14 }}>⭐</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>{points} pts</span>
          </div>
        </div>
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
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: 80 }}>

        {/* ════ LECCIONES ════ */}
        {tab === "lecciones" && (
          <div style={{ width: "100%" }}>
            <LangSwitch value={lang} onChange={(l) => { setLang(l); setLessonIdx(0); }} />

            {/* Progreso */}
            <div style={{ ...card, padding: 12, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[["🐍 Python", progressPy, "#3B82F6", LESSONS.python.filter(l => completedLessons.has(l.id)).length, LESSONS.python.length],
                ["⚡ JS", progressJs, "#F59E0B", LESSONS.javascript.filter(l => completedLessons.has(l.id)).length, LESSONS.javascript.length]].map(([name, pct, color, done, total]) => (
                <div key={name} style={{ flex: 1, minWidth: 120 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>
                    <span>{name}</span><span style={{ color }}>{done}/{total}</span>
                  </div>
                  <div style={{ height: 5, background: "#2d3748", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
              <button onClick={() => setShowReset(true)} style={{ background: "none", border: "none", color: "#475569", fontSize: 11, cursor: "pointer", padding: 0, alignSelf: "flex-end" }}>
                Reiniciar progreso
              </button>
            </div>

            {/* Modal reinicio */}
            {showReset && (
              <div style={{ position: "fixed", inset: 0, background: "#00000088", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 12, padding: 24, maxWidth: 320, width: "90%", textAlign: "center" }}>
                  <p style={{ margin: "0 0 16px", fontWeight: 700 }}>¿Reiniciar todo el progreso?</p>
                  <p style={{ margin: "0 0 20px", color: "#94a3b8", fontSize: 14 }}>Se borrarán las lecciones completadas, retos y puntos. No se puede deshacer.</p>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                    <button onClick={() => setShowReset(false)} style={{ background: "#232640", border: "none", borderRadius: 8, padding: "9px 20px", color: "#fff", cursor: "pointer" }}>Cancelar</button>
                    <button onClick={() => { resetProgress(); setShowReset(false); }} style={{ background: "#dc2626", border: "none", borderRadius: 8, padding: "9px 20px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Reiniciar</button>
                  </div>
                </div>
              </div>
            )}

            {/* Selector lección móvil */}
            <button onClick={() => setShowLessonList(v => !v)} className="mobile-only" style={{
              width: "100%", background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 8,
              padding: "12px 16px", color: "#f1f5f9", fontSize: 14, fontWeight: 600,
              display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: 10,
            }}>
              <span>{lesson.title} <span style={{ color: "#64748b", fontWeight: 400 }}>— {lesson.level}</span></span>
              <span>{showLessonList ? "▲" : "▼"}</span>
            </button>

            <div style={{ display: "flex", gap: 14, position: "relative" }}>
              {/* Sidebar escritorio */}
              <div className="lesson-sidebar" style={{ width: 200, flexShrink: 0 }}>
                {lessons.map((l, i) => (
                  <div key={l.id} onClick={() => setLessonIdx(i)} style={{
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
                <div className="mobile-lesson-dropdown" style={{ position: "absolute", left: 0, right: 0, top: 0, background: "#1A1D2E", border: "1px solid #2d3748", borderRadius: 10, zIndex: 50, padding: 8 }}>
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

              {/* Contenido lección */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>{lesson.title}</h2>
                      <span style={badge(accentColor)}>{lesson.level}</span>
                      {completedLessons.has(lesson.id) && <span style={{ ...badge("#22c55e"), marginLeft: 6 }}>✓ Completada</span>}
                    </div>
                    <button onClick={() => setCode(lesson.solution)} style={{ background: "#232640", border: "1px solid #2d3748", borderRadius: 6, padding: "6px 12px", color: "#94a3b8", fontSize: 12, cursor: "pointer" }}>Ver solución</button>
                  </div>
                  <TheoryBlock text={lesson.theory} />
                </div>

                <div style={card}>
                  <h4 style={{ margin: "0 0 12px", color: "#94a3b8", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>✏️ Practica</h4>
                  <CodeEditor code={code} onChange={setCode} lang={lang}
                    onRun={() => runCode(code)} output={output} error={codeError}
                    loading={runLoading} pyStatus={pyStatus} onLoadPython={loadPython}
                    onAskClaude={askClaude} context={`Lección: ${lesson.title}`} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button disabled={lessonIdx === 0} onClick={() => setLessonIdx(i => i - 1)} style={{ background: "#232640", border: "none", borderRadius: 8, padding: "10px 18px", color: "#fff", fontWeight: 700, cursor: "pointer", opacity: lessonIdx === 0 ? 0.4 : 1 }}>← Anterior</button>
                  <button disabled={lessonIdx === lessons.length - 1} onClick={() => setLessonIdx(i => i + 1)} style={{ background: accentColor, border: "none", borderRadius: 8, padding: "10px 18px", color: lang === "python" ? "#fff" : "#0F1117", fontWeight: 700, cursor: "pointer", opacity: lessonIdx === lessons.length - 1 ? 0.4 : 1 }}>Siguiente →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ EDITOR ════ */}
        {tab === "editor" && (
          <div style={{ width: "100%" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 20, fontWeight: 800 }}>💻 Editor libre</h2>
            <LangSwitch value={lang} onChange={setLang} />
            <div style={card}>
              <p style={{ margin: "0 0 14px", color: "#64748b", fontSize: 14 }}>Escribe cualquier código y ejecútalo libremente. Perfecto para experimentar.</p>
              <CodeEditor code={code} onChange={setCode} lang={lang}
                onRun={() => runCode(code)} output={output} error={codeError}
                loading={runLoading} pyStatus={pyStatus} onLoadPython={loadPython}
                onAskClaude={askClaude} context="Editor libre" />
            </div>
          </div>
        )}

        {/* ════ RETOS ════ */}
        {tab === "retos" && !challenge && (
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>🏆 Retos</h2>
              <span style={{ color: "#64748b", fontSize: 13 }}>{completedChallenges.size}/{totalChallenges} completados · ⭐ {points} pts</span>
            </div>
            <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: 14 }}>Pon a prueba lo aprendido. El progreso se guarda automáticamente.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {CHALLENGES.map(c => {
                const done = completedChallenges.has(c.id);
                return (
                  <div key={c.id} onClick={() => setChallenge(c)} style={{ ...card, cursor: "pointer", marginBottom: 0, borderColor: done ? "#22c55e" : "#2d3748", position: "relative", overflow: "hidden" }}>
                    {done && <div style={{ position: "absolute", top: 0, right: 0, background: "#22c55e", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderBottomLeftRadius: 8 }}>COMPLETADO</div>}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={badge(c.lang === "python" ? "#3B82F6" : "#F59E0B")}>{c.lang === "python" ? "🐍 Python" : "⚡ JS"}</span>
                      <span style={badge(c.difficulty === "Fácil" ? "#22c55e" : "#f59e0b")}>{c.difficulty}</span>
                    </div>
                    <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700 }}>{c.title}</h3>
                    <p style={{ margin: "0 0 12px", color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{c.description}</p>
                    <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 700 }}>⭐ {c.points} pts</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "retos" && challenge && (
          <div style={{ width: "100%" }}>
            <button onClick={() => setChallenge(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 14, marginBottom: 14, padding: 0 }}>← Volver a retos</button>
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
              <CodeEditor code={challengeCode} onChange={setChallengeCode} lang={challenge.lang}
                onRun={() => runCode(challengeCode, true)} output={challengeOut} error={challengeErr}
                loading={runLoading} pyStatus={pyStatus} onLoadPython={loadPython}
                onAskClaude={askClaude} context={`Reto: ${challenge.title} — ${challenge.description}`} />
            </div>
            {completedChallenges.has(challenge.id) && (
              <div style={{ background: "#0a1a0a", border: "1px solid #22c55e", borderRadius: 10, padding: 16, textAlign: "center", color: "#86efac", fontWeight: 700, fontSize: 16 }}>
                🎉 ¡Reto completado! Has ganado {challenge.points} puntos.
              </div>
            )}
          </div>
        )}

        {/* ════ REPASO (FLASHCARDS) ════ */}
        {tab === "repaso" && (
          <div style={{ width: "100%", maxWidth: 560, margin: "0 auto" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800 }}>🃏 Repaso rápido</h2>
            <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: 14 }}>Tarjetas de memoria para repasar cuando tengas un momento libre.</p>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[["todos","Todos"],["python","🐍 Python"],["javascript","⚡ JS"]].map(([val, label]) => (
                <button key={val} onClick={() => { setFlashLang(val); setFlashIdx(0); }} style={{
                  flex: 1, padding: "8px 0", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer",
                  background: flashLang === val ? "#232640" : "#1A1D2E",
                  color: flashLang === val ? "#f1f5f9" : "#64748b",
                  border: `1px solid ${flashLang === val ? "#3B82F6" : "#2d3748"}`,
                }}>{label}</button>
              ))}
            </div>

            <div style={{ textAlign: "center", color: "#64748b", fontSize: 13, marginBottom: 8 }}>
              Tarjeta {(flashIdx % filteredCards.length) + 1} de {filteredCards.length}
            </div>

            <Flashcard
              card={currentCard}
              onNext={() => setFlashIdx(i => i + 1)}
            />
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
            {tab === key && <div style={{ width: 20, height: 2, background: "#3B82F6", borderRadius: 2, marginTop: 2 }} />}
          </button>
        ))}
      </nav>

      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        textarea:focus { border-color: #3B82F6 !important; }
        input:focus { border-color: #3B82F6 !important; outline: none; }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .lesson-sidebar { display: none !important; }
          .mobile-only { display: flex !important; }
          .mobile-lesson-dropdown { display: block !important; }
        }
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
