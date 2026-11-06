export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  questions: Question[];
}

export const QUIZZES_4ESO: Quiz[] = [
  // 1. NÚMEROS REALES Y PORCENTAJES
  {
    id: 'quiz-4eso-numeros-reales-y-porcentajes',
    topicId: 'numeros-reales-y-porcentajes',
    title: 'Autoevaluación: Números Reales y Porcentajes',
    description: '20 preguntas sobre números reales, intervalos, potencias, radicales, porcentajes y errores.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'El conjunto de los Números Reales (R) es la unión de:', options: ['Q e I', 'N y Z', 'Z y Q', 'Solo irracionales'], correctAnswer: 0, explanation: 'R es la unión de los números Racionales (Q) e Irracionales (I).' },
      { id: 'q2', text: 'El intervalo [2, 5) representa a los números x tales que:', options: ['2 ≤ x < 5', '2 < x ≤ 5', '2 ≤ x ≤ 5', '2 < x < 5'], correctAnswer: 0, explanation: 'Corchete incluye el 2 (≤) y paréntesis excluye el 5 (<).' },
      { id: 'q3', text: 'Expresa 0,0000034 en notación científica:', options: ['3,4 · 10⁻⁶', '3,4 · 10⁻⁵', '34 · 10⁻⁷', '0,34 · 10⁻⁵'], correctAnswer: 0, explanation: 'Desplazamos la coma 6 lugares a la derecha: 3,4 · 10⁻⁶.' },
      { id: 'q4', text: 'Simplifica el radical √12:', options: ['2√3', '3√2', '4√3', '6'], correctAnswer: 0, explanation: '√12 = √(4·3) = 2√3.' },
      { id: 'q5', text: 'Racionaliza la fracción 1 / √2:', options: ['√2 / 2', '2 / √2', '√2', '1/2'], correctAnswer: 0, explanation: 'Multiplicando numerador y denominador por √2 se obtiene √2 / 2.' },
      { id: 'q6', text: 'Calcula el valor absoluto |-7|:', options: ['7', '-7', '0', '1/7'], correctAnswer: 0, explanation: 'La distancia al origen siempre es positiva.' },
      { id: 'q7', text: 'Un producto de 80€ sube un 10% y luego baja un 10%. Su precio final es:', options: ['79,20 €', '80 €', '78 €', '81 €'], correctAnswer: 0, explanation: '80 · 1,10 · 0,90 = 79,20 €.' },
      { id: 'q8', text: 'Calcula la potencia con exponente fraccionario 27^(2/3):', options: ['9', '3', '18', '81'], correctAnswer: 0, explanation: '(∛27)² = 3² = 9.' },
      { id: 'q9', text: 'El error relativo es el cociente entre:', options: ['Error absoluto y valor real', 'Valor real y error absoluto', 'Error absoluto y 100', 'Valor aproximado y real'], correctAnswer: 0, explanation: 'Definición de error relativo: E_r = |E_a / V_real|.' },
      { id: 'q10', text: '¿Cuál es el índice del radical equivalentemente simplificado ⁴√x²?', options: ['√x', '∛x', 'x²', '⁴√x'], correctAnswer: 0, explanation: 'x^(2/4) = x^(1/2) = √x.' },
      { id: 'q11', text: '¿Cuál de los siguientes es un número irracional?', options: ['√3', '0,333...', '3/4', '-5'], correctAnswer: 0, explanation: '√3 es un decimal infinito no periódico.' },
      { id: 'q12', text: 'Si depositamos 1000€ al 5% de interés simple anual durante 3 años, los intereses son:', options: ['150 €', '15 €', '1500 €', '50 €'], correctAnswer: 0, explanation: 'I = C · r · t = 1000 · 0,05 · 3 = 150 €.' },
      { id: 'q13', text: 'Simplifica la expresión √a · ∛a:', options: ['⁶√a⁵', '⁶√a⁶', '√a³', '∛a²'], correctAnswer: 0, explanation: 'a^(1/2) · a^(1/3) = a^(1/2 + 1/3) = a^(5/6) = ⁶√a⁵.' },
      { id: 'q14', text: 'La intersección de los intervalos (-2, 4] y [1, 6) es:', options: ['[1, 4]', '(-2, 6)', '[1, 4)', '(-2, 1]'], correctAnswer: 0, explanation: 'Los elementos comunes van desde el 1 (incluido) hasta el 4 (incluido).' },
      { id: 'q15', text: 'El redondeo a las milésimas de 0,1236 es:', options: ['0,124', '0,123', '0,12', '0,1240'], correctAnswer: 0, explanation: 'La cuarta cifra es 6 (≥5), sumamos 1 a la milésima: 0,124.' },
      { id: 'q16', text: '¿Cuál es el valor de 2⁻³?', options: ['1/8', '-8', '-6', '1/6'], correctAnswer: 0, explanation: '2⁻³ = 1 / 2³ = 1/8.' },
      { id: 'q17', text: 'En el interés compuesto, el capital final C_f tras t años se calcula mediante:', options: ['C_f = C_i · (1 + r)^t', 'C_f = C_i · (1 + r · t)', 'C_f = C_i · r^t', 'C_f = C_i + r · t'], correctAnswer: 0, explanation: 'Fórmula del interés compuesto acumulado.' },
      { id: 'q18', text: 'Trunca a las centésimas el número 4,8792:', options: ['4,87', '4,88', '4,8', '4,90'], correctAnswer: 0, explanation: 'El truncamiento elimina todas las cifras a partir de las centésimas sin redondear.' },
      { id: 'q19', text: 'El error absoluto es:', options: ['La diferencia positiva entre el valor real y el aproximado', 'El cociente entre real y aproximado', 'Un porcentaje de error', 'El valor real dividido entre 100'], correctAnswer: 0, explanation: 'E_a = |V_real - V_aprox|.' },
      { id: 'q20', text: 'Expresa el decimal periódico puro 0,333... en forma de fracción irreducible:', options: ['1/3', '3/10', '3/99', '33/100'], correctAnswer: 0, explanation: '0,333... = 3/9 = 1/3.' }
    ]
  },

  // 2. LOGARITMOS
  {
    id: 'quiz-4eso-logaritmos',
    topicId: 'logaritmos',
    title: 'Autoevaluación: Logaritmos',
    description: '20 preguntas dedicadas a la definición, propiedades, cambio de base y ecuaciones logarítmicas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Calcula log₂ 8:', options: ['3', '4', '2', '8'], correctAnswer: 0, explanation: '2³ = 8, por lo tanto el logaritmo en base 2 de 8 es 3.' },
      { id: 'q2', text: 'Calcula log₁₀ 0,01:', options: ['-2', '2', '-1', '0,1'], correctAnswer: 0, explanation: '10⁻² = 0,01.' },
      { id: 'q3', text: 'A qué equivale la suma log a + log b:', options: ['log (a · b)', 'log (a + b)', 'log (a / b)', 'log (aᵇ)'], correctAnswer: 0, explanation: 'Propiedad del producto: la suma de logaritmos es el logaritmo del producto.' },
      { id: 'q4', text: 'A qué equivale la resta log a - log b:', options: ['log (a / b)', 'log (a - b)', 'log (a · b)', 'log a / log b'], correctAnswer: 0, explanation: 'Propiedad del cociente: la diferencia de logaritmos es el logaritmo del cociente.' },
      { id: 'q5', text: 'A qué equivale la expresión log (aᵇ):', options: ['b · log a', 'a · log b', '(log a)ᵇ', 'log a + b'], correctAnswer: 0, explanation: 'Propiedad de la potencia: el exponente pasa multiplicando al logaritmo.' },
      { id: 'q6', text: '¿Cuál es el valor de log_a (a) para cualquier base a > 0 (a ≠ 1)?', options: ['1', '0', 'a', 'Indefinido'], correctAnswer: 0, explanation: 'a¹ = a.' },
      { id: 'q7', text: '¿Cuál es el valor de log_a (1) para cualquier base a > 0 (a ≠ 1)?', options: ['0', '1', 'a', '-1'], correctAnswer: 0, explanation: 'a⁰ = 1.' },
      { id: 'q8', text: 'Resuelve la ecuación logarítmica log x = 2:', options: ['x = 100', 'x = 10', 'x = 20', 'x = 2'], correctAnswer: 0, explanation: 'En base 10 implícita, 10² = 100.' },
      { id: 'q9', text: 'Resuelve log₂ x = 5:', options: ['x = 32', 'x = 10', 'x = 25', 'x = 64'], correctAnswer: 0, explanation: '2⁵ = 32.' },
      { id: 'q10', text: 'Resuelve la ecuación log (x + 1) = 1:', options: ['x = 9', 'x = 10', 'x = 0', 'x = 1'], correctAnswer: 0, explanation: 'x + 1 = 10¹ → x = 9.' },
      { id: 'q11', text: 'La fórmula del cambio de base de log_b (a) a base c es:', options: ['log_c (a) / log_c (b)', 'log_c (b) / log_c (a)', 'log_c (a) · log_c (b)', 'log_c (a - b)'], correctAnswer: 0, explanation: 'Fórmula fundamental del cambio de base.' },
      { id: 'q12', text: 'Calcula log₃ 81:', options: ['4', '3', '9', '27'], correctAnswer: 0, explanation: '3⁴ = 81.' },
      { id: 'q13', text: 'Calcula el logaritmo neperiano ln (e³):', options: ['3', 'e', '1', '0'], correctAnswer: 0, explanation: 'ln es en base e, por lo que ln(e³) = 3.' },
      { id: 'q14', text: 'Resuelve log x + log 2 = log 10:', options: ['x = 5', 'x = 8', 'x = 2', 'x = 20'], correctAnswer: 0, explanation: 'log (2x) = log 10 → 2x = 10 → x = 5.' },
      { id: 'q15', text: 'Calcula log 1000:', options: ['3', '100', '10', '4'], correctAnswer: 0, explanation: '10³ = 1000.' },
      { id: 'q16', text: 'Calcula log₅ (1/25):', options: ['-2', '2', '-1/2', '1/5'], correctAnswer: 0, explanation: '5⁻² = 1/25.' },
      { id: 'q17', text: 'Si log x = 0, ¿cuánto vale x?', options: ['x = 1', 'x = 0', 'x = 10', 'No existe'], correctAnswer: 0, explanation: '10⁰ = 1.' },
      { id: 'q18', text: 'Resuelve 2 · log x = log 9:', options: ['x = 3', 'x = 4,5', 'x = 81', 'x = 9'], correctAnswer: 0, explanation: 'log (x²) = log 9 → x² = 9 → x = 3 (solución positiva).' },
      { id: 'q19', text: 'La escala Richter utilizada para medir la magnitud de terremotos es una escala:', options: ['Logarítmica', 'Lineal', 'Cuadrática', 'Exponencial decreciente'], correctAnswer: 0, explanation: 'Utiliza logaritmos en base 10 para representar amplitudes de onda.' },
      { id: 'q20', text: 'Resuelve log (2x) = 2:', options: ['x = 50', 'x = 100', 'x = 25', 'x = 5'], correctAnswer: 0, explanation: '2x = 10² = 100 → x = 50.' }
    ]
  },

  // 3. POLINOMIOS Y FRACCIONES ALGEBRAICAS
  {
    id: 'quiz-4eso-polinomios-y-fracciones-algebraicas',
    topicId: 'polinomios-y-fracciones-algebraicas',
    title: 'Autoevaluación: Polinomios y Fracciones Algebraicas',
    description: '20 preguntas sobre división de polinomios, regla de Ruffini, raíces y simplificación.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: '¿Cuál es el resto de dividir P(x) = x³ - 2x + 1 entre (x - 1)?', options: ['0', '1', '-1', '2'], correctAnswer: 0, explanation: 'Por el Teorema del Resto: P(1) = 1³ - 2(1) + 1 = 0.' },
      { id: 'q2', text: 'Si P(a) = 0, entonces x = a es una:', options: ['Raíz del polinomio P(x)', 'Ordenada del polinomio', 'División del polinomio', 'Asíntota'], correctAnswer: 0, explanation: 'Definición fundamental de raíz o cero de un polinomio.' },
      { id: 'q3', text: 'Simplifica la fracción algebraica (x² - 1) / (x - 1):', options: ['x + 1', 'x - 1', 'x', '1'], correctAnswer: 0, explanation: '(x + 1)(x - 1) / (x - 1) = x + 1.' },
      { id: 'q4', text: 'Factoriza completamente x² - 6x + 9:', options: ['(x - 3)²', '(x + 3)²', '(x - 9)(x + 1)', '(x - 3)(x + 3)'], correctAnswer: 0, explanation: 'Identidad notable: cuadrado de una diferencia (x - 3)².' },
      { id: 'q5', text: 'Según el Teorema del Factor, si x = 2 es raíz de P(x), P(x) es divisible por:', options: ['(x - 2)', '(x + 2)', 'x', '2x'], correctAnswer: 0, explanation: 'Si a es raíz, (x - a) es un factor del polinomio.' },
      { id: 'q6', text: 'Las posibles raíces enteras de P(x) = x³ - 3x + 2 son divisores de:', options: ['2', '3', '-3', '1'], correctAnswer: 0, explanation: 'Las raíces enteras son divisores del término independiente (2).' },
      { id: 'q7', text: 'Desarrolla el cubo de un binomio (x + 1)³:', options: ['x³ + 3x² + 3x + 1', 'x³ + 1', 'x³ + 3x + 1', 'x³ + x² + x + 1'], correctAnswer: 0, explanation: 'x³ + 3·x²·1 + 3·x·1² + 1³ = x³ + 3x² + 3x + 1.' },
      { id: 'q8', text: 'Calcula el valor numérico de P(x) = 2x³ - x² + 3 para x = -1:', options: ['0', '4', '-2', '2'], correctAnswer: 0, explanation: '2(-1)³ - (-1)² + 3 = -2 - 1 + 3 = 0.' },
      { id: 'q9', text: 'Simplifica la fracción 2x / (x² + x):', options: ['2 / (x + 1)', '2 / x', '2x / (x + 1)', '1 / (x + 1)'], correctAnswer: 0, explanation: '2x / [x(x + 1)] = 2 / (x + 1).' },
      { id: 'q10', text: 'Calcula: (1 / x) + (1 / (2x))', options: ['3 / (2x)', '2 / (3x)', '1 / (3x)', '2 / x²'], correctAnswer: 0, explanation: '2/(2x) + 1/(2x) = 3/(2x).' },
      { id: 'q11', text: '¿Para qué valores de x no está definida la fracción 1 / (x² - 4)?', options: ['x = ±2', 'x = 2', 'x = 4', 'x = 0'], correctAnswer: 0, explanation: 'El denominador se anula en x² - 4 = 0 → x = ±2.' },
      { id: 'q12', text: 'El mínimo común múltiplo (m.c.m.) de (x - 1) y (x² - 1) es:', options: ['x² - 1', 'x - 1', '(x - 1)²', '(x + 1)'], correctAnswer: 0, explanation: 'x² - 1 = (x - 1)(x + 1), que ya contiene a (x - 1).' },
      { id: 'q13', text: 'Multiplica las fracciones algebraicas: (x / 2) · (4 / x²)', options: ['2 / x', 'x / 2', '2x', '4 / x'], correctAnswer: 0, explanation: '4x / (2x²) = 2 / x.' },
      { id: 'q14', text: 'Divide las fracciones algebraicas: (x / 3) : (x / 6)', options: ['2', '1/2', 'x / 2', '2x'], correctAnswer: 0, explanation: '(x · 6) / (3 · x) = 6 / 3 = 2.' },
      { id: 'q15', text: '¿Cuál es el grado del producto P(x) · Q(x) si grado(P)=3 y grado(Q)=2?', options: ['5', '6', '3', '2'], correctAnswer: 0, explanation: 'Los grados se suman en la multiplicación de polinomios.' },
      { id: 'q16', text: 'Factoriza x³ - 4x extrayendo factor común y diferencias de cuadrados:', options: ['x(x - 2)(x + 2)', 'x(x - 4)²', 'x²(x - 4)', '(x - 2)³'], correctAnswer: 0, explanation: 'x(x² - 4) = x(x - 2)(x + 2).' },
      { id: 'q17', text: 'En la división P(x) = D(x) · C(x) + R(x), el grado del resto R(x) debe ser:', options: ['Menor que el grado del divisor D(x)', 'Igual al divisor', 'Mayor que el divisor', 'Siempre cero'], correctAnswer: 0, explanation: 'Condición básica de parada de la división algebraica.' },
      { id: 'q18', text: 'Resuelve x³ - 3x² + 2x = 0 hallando sus raíces:', options: ['x = 0, x = 1, x = 2', 'x = 1, x = 2', 'x = 0, x = -1, x = -2', 'x = 0, x = 3'], correctAnswer: 0, explanation: 'x(x² - 3x + 2) = 0 → x=0 o raíces de x²-3x+2=0 que son 1 y 2.' },
      { id: 'q19', text: 'Simplifica (x² - 4) / (x² + 4x + 4):', options: ['(x - 2) / (x + 2)', '(x + 2) / (x - 2)', '-2 / 4', '1 / (4x)'], correctAnswer: 0, explanation: '(x - 2)(x + 2) / (x + 2)² = (x - 2) / (x + 2).' },
      { id: 'q20', text: 'Calcula el resto de dividir x⁴ - 1 entre (x + 1):', options: ['0', '2', '-2', '1'], correctAnswer: 0, explanation: 'P(-1) = (-1)⁴ - 1 = 1 - 1 = 0.' }
    ]
  },

  // 4. ECUACIONES Y SISTEMAS
  {
    id: 'quiz-4eso-ecuaciones-y-sistemas',
    topicId: 'ecuaciones-y-sistemas',
    title: 'Autoevaluación: Ecuaciones y Sistemas',
    description: '20 preguntas sobre ecuaciones bicuadradas, irracionales, racionales, exponenciales y sistemas no lineales.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Resuelve la ecuación bicuadrada x⁴ - 5x² + 4 = 0:', options: ['x = ±1 y x = ±2', 'x = 1 y x = 4', 'x = ±2', 'x = ±4'], correctAnswer: 0, explanation: 'Haciendo z = x²: z² - 5z + 4 = 0 → z = 1 y z = 4 → x = ±1, x = ±2.' },
      { id: 'q2', text: 'Resuelve la ecuación irracional √(x + 2) = 3:', options: ['x = 7', 'x = 9', 'x = 1', 'x = 11'], correctAnswer: 0, explanation: 'Elevando al cuadrado: x + 2 = 9 → x = 7.' },
      { id: 'q3', text: 'Resuelve el sistema no lineal: x + y = 5 ; x · y = 6', options: ['(2,3) y (3,2)', '(1,6) y (6,1)', '(0,5) y (5,0)', '(4,1) y (1,4)'], correctAnswer: 0, explanation: 'Números que suman 5 y multiplican 6 son 2 y 3.' },
      { id: 'q4', text: 'Resuelve la ecuación exponencial 2ⁿ = 16:', options: ['n = 4', 'n = 8', 'n = 2', 'n = 5'], correctAnswer: 0, explanation: '2⁴ = 16.' },
      { id: 'q5', text: 'Resuelve la ecuación racional (1 / x) + (1 / 2) = 1:', options: ['x = 2', 'x = 1', 'x = 1/2', 'x = 4'], correctAnswer: 0, explanation: '1/x = 1/2 → x = 2.' },
      { id: 'q6', text: 'Soluciones de la ecuación factorizada (x - 1)(x + 3)(x - 5) = 0:', options: ['x = 1, x = -3, x = 5', 'x = -1, x = 3, x = -5', 'x = 0, x = 1, x = 5', 'x = 15'], correctAnswer: 0, explanation: 'Igualando a cero cada factor.' },
      { id: 'q7', text: 'Al resolver una ecuación irracional es OBLIGATORIO:', options: ['Comprobar las soluciones en la ecuación inicial', 'Usar la regla de Ruffini', 'Multiplicar por -1', 'Sacar logaritmos'], correctAnswer: 0, explanation: 'Al elevar al cuadrado pueden aparecer soluciones falsas o "extrañas".' },
      { id: 'q8', text: 'Resuelve x⁴ - 9 = 0 en los números reales:', options: ['x = ±√3', 'x = ±3', 'x = 9', 'No tiene solución'], correctAnswer: 0, explanation: 'x⁴ = 9 → x² = 3 → x = ±√3.' },
      { id: 'q9', text: 'Resuelve 3ˣ⁺¹ = 9:', options: ['x = 1', 'x = 2', 'x = 0', 'x = 3'], correctAnswer: 0, explanation: '3ˣ⁺¹ = 3² → x + 1 = 2 → x = 1.' },
      { id: 'q10', text: '¿Cuántas soluciones reales tiene la ecuación bicuadrada x⁴ + 5x² + 4 = 0?', options: ['Ninguna', 'Dos', 'Cuatro', 'Una'], correctAnswer: 0, explanation: 'z² + 5z + 4 = 0 da z = -1 y z = -4. x² = -1 no da soluciones reales.' },
      { id: 'q11', text: 'Resuelve el sistema: x - y = 2 ; x² + y² = 10', options: ['(3,1) y (-1,-3)', '(3,1)', '(2,0)', '(4,2) y (-2,-4)'], correctAnswer: 0, explanation: 'Sustituyendo x = y + 2: (y+2)² + y² = 10 → 2y² + 4y - 6 = 0 → y=1 o y=-3.' },
      { id: 'q12', text: 'En una ecuación de segundo grado ax² + bx + c = 0, si b² - 4ac = 0:', options: ['Existe una solución real doble', 'Hay dos soluciones distintas', 'No hay solución real', 'Infinitas soluciones'], correctAnswer: 0, explanation: 'Discriminante nulo implica raíz doble.' },
      { id: 'q13', text: 'Resuelve: √(2x + 1) = x - 1', options: ['x = 4', 'x = 0', 'x = 4 y x = 0', 'x = 1'], correctAnswer: 0, explanation: '2x + 1 = (x - 1)² → x² - 4x = 0 → x=4 (x=0 no valida).' },
      { id: 'q14', text: 'Las soluciones de ax² + bx + c = 0 se obtienen con la fórmula:', options: ['x = (-b ± √(b² - 4ac)) / (2a)', 'x = (b ± √(b² - 4ac)) / (2a)', 'x = (-b ± √(b² + 4ac)) / a', 'x = -b / (2a)'], correctAnswer: 0, explanation: 'Fórmula general de la ecuación de 2º grado.' },
      { id: 'q15', text: 'Resuelve la ecuación bicuadrada x⁴ - 13x² + 36 = 0:', options: ['x = ±2, x = ±3', 'x = 4, x = 9', 'x = ±4, x = ±9', 'x = ±1, x = ±6'], correctAnswer: 0, explanation: 'z² - 13z + 36 = 0 → z = 4 y z = 9 → x = ±2, x = ±3.' },
      { id: 'q16', text: 'Resuelve 5²ˣ⁻¹ = 125:', options: ['x = 2', 'x = 1', 'x = 3', 'x = 5'], correctAnswer: 0, explanation: '5²ˣ⁻¹ = 5³ → 2x - 1 = 3 → 2x = 4 → x = 2.' },
      { id: 'q17', text: 'Resuelve la ecuación racional 2/x = x/2:', options: ['x = ±2', 'x = 2', 'x = 4', 'x = 1'], correctAnswer: 0, explanation: 'x² = 4 → x = ±2.' },
      { id: 'q18', text: 'En un sistema Gaussiano / lineal de 2 ecuaciones con 2 incógnitas sin solución, las rectas son:', options: ['Paralelas', 'Secantes', 'Coincidentes', 'Perpendiculares'], correctAnswer: 0, explanation: 'Un sistema incompatible geométricamente representa dos rectas paralelas.' },
      { id: 'q19', text: 'Resuelve la ecuación irracional √(x - 1) + 1 = x:', options: ['x = 1 y x = 2', 'x = 1', 'x = 2', 'x = 0'], correctAnswer: 0, explanation: '√(x-1) = x - 1 → x - 1 = (x-1)² → x - 1 = x² - 2x + 1 → x² - 3x + 2 = 0 → x=1, x=2.' },
      { id: 'q20', text: 'Dada la ecuación x² - Sx + P = 0, S y P representan:', options: ['Suma y Producto de las raíces', 'Sustracción y Potencia', 'Secante y Pendiente', 'Suma y Polinomio'], correctAnswer: 0, explanation: 'Relaciones entre coeficientes y raíces de una ecuación cuadrática.' }
    ]
  },

  // 5. INECUACIONES
  {
    id: 'quiz-4eso-inecuaciones',
    topicId: 'inecuaciones',
    title: 'Autoevaluación: Inecuaciones',
    description: '20 preguntas sobre inecuaciones de 1º y 2º grado, racionales, con valor absoluto y sistemas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Resuelve la inecuación de primer grado: 2x - 4 > 6', options: ['x > 5', 'x < 5', 'x > 1', 'x > 2'], correctAnswer: 0, explanation: '2x > 10 → x > 5.' },
      { id: 'q2', text: 'La solución de la inecuación x² - 4 < 0 en forma de intervalo es:', options: ['(-2, 2)', '[-2, 2]', '(-∞, -2) ∪ (2, ∞)', '(0, 2)'], correctAnswer: 0, explanation: 'Parábola convexa negativa entre sus raíces x = -2 y x = 2.' },
      { id: 'q3', text: 'Si multiplicamos los dos miembros de una inecuación por un número negativo:', options: ['Cambia el sentido de la desigualdad', 'Se mantiene igual', 'Se convierte en igualdad', 'No se puede hacer'], correctAnswer: 0, explanation: 'Regla fundamental para operar con inecuaciones.' },
      { id: 'q4', text: 'Resuelve la inecuación con valor absoluto |x| < 3:', options: ['(-3, 3)', '[-3, 3]', 'x > 3', '(-∞, -3) ∪ (3, ∞)'], correctAnswer: 0, explanation: '|x| < 3 equivale a -3 < x < 3.' },
      { id: 'q5', text: 'Resuelve el sistema de inecuaciones: x > 1 ; x ≤ 4', options: ['(1, 4]', '[1, 4]', '(1, 4)', '[1, 4)'], correctAnswer: 0, explanation: 'Conjunto solución: números mayores que 1 y menores o iguales a 4.' },
      { id: 'q6', text: 'Resuelve la inecuación racional (x - 2) / (x + 1) > 0:', options: ['(-∞, -1) ∪ (2, ∞)', '(-1, 2)', '[-1, 2]', '(2, ∞)'], correctAnswer: 0, explanation: 'Estudiando el signo del cociente, resulta positivo en (-∞, -1) y en (2, ∞).' },
      { id: 'q7', text: 'Resuelve 5 - 2x ≤ 1:', options: ['x ≥ 2', 'x ≤ 2', 'x ≥ -2', 'x ≤ 3'], correctAnswer: 0, explanation: '-2x ≤ -4 → x ≥ 2 (se invierte el sentido al dividir por -2).' },
      { id: 'q8', text: 'Resuelve la inecuación 3x + 2 ≤ 11:', options: ['x ≤ 3', 'x ≥ 3', 'x < 3', 'x ≤ 9'], correctAnswer: 0, explanation: '3x ≤ 9 → x ≤ 3.' },
      { id: 'q9', text: 'Resuelve la inecuación cuadrática x² - 5x + 6 ≥ 0:', options: ['(-∞, 2] ∪ [3, ∞)', '[2, 3]', '(2, 3)', '(-∞, 2)'], correctAnswer: 0, explanation: 'Raíces x = 2 y x = 3. Positiva fuera del intervalo de raíces.' },
      { id: 'q10', text: 'La desigualdad x ≥ -1 en forma de intervalo es:', options: ['[-1, ∞)', '(-1, ∞)', '(-∞, -1]', '[-1, 1]'], correctAnswer: 0, explanation: 'Incluye al -1 hasta el infinito positivo.' },
      { id: 'q11', text: 'Resuelve |x - 2| ≥ 4:', options: ['(-∞, -2] ∪ [6, ∞)', '[-2, 6]', '[2, 4]', '(-∞, 6]'], correctAnswer: 0, explanation: 'x - 2 ≥ 4 → x ≥ 6  o  x - 2 ≤ -4 → x ≤ -2.' },
      { id: 'q12', text: 'Resuelve la inecuación (x + 3) / (x - 1) ≤ 0:', options: ['[-3, 1)', '[-3, 1]', '(-3, 1)', '(-∞, -3] ∪ (1, ∞)'], correctAnswer: 0, explanation: 'El numerador se anula en x=-3 (incluido), el denominador se anula en x=1 (excluido).' },
      { id: 'q13', text: 'Resuelve el sistema de inecuaciones: 2x < 6  y  x + 4 > 2:', options: ['(-2, 3)', '[-2, 3]', '(2, 3)', '(-∞, 3)'], correctAnswer: 0, explanation: 'x < 3 y x > -2 → intervalo abierto (-2, 3).' },
      { id: 'q14', text: 'El conjunto de soluciones de una inecuación de dos variables como x + y ≤ 4 geométricamente es:', options: ['Un semiplano', 'Una recta', 'Un punto', 'Una parábola'], correctAnswer: 0, explanation: 'La recta x + y = 4 divide al plano en dos semiplanos.' },
      { id: 'q15', text: 'Las inecuaciones estrictas (con > o <) al representarse en intervalos usan:', options: ['Paréntesis (intervalos abiertos)', 'Corchetes (intervalos cerrados)', 'Llaves', 'Líneas continuas'], correctAnswer: 0, explanation: 'Los extremos no están incluidos en la solución.' },
      { id: 'q16', text: 'La solución de la inecuación x² + 1 > 0 es:', options: ['Todos los números reales (R)', 'Sin solución', 'x > 1', 'x > -1'], correctAnswer: 0, explanation: 'Cualquier número al cuadrado más 1 es siempre mayor que cero.' },
      { id: 'q17', text: 'La solución de la inecuación x² + 4 < 0 es:', options: ['Sin solución (Conjunto vacío)', 'R', 'x < -2', 'x < 2'], correctAnswer: 0, explanation: 'Un cuadrado nunca es negativo, x² + 4 siempre es ≥ 4.' },
      { id: 'q18', text: 'Resuelve la inecuación (x - 1)² > 0:', options: ['R - {1}', 'R', '(1, ∞)', 'Sin solución'], correctAnswer: 0, explanation: 'Es mayor que cero para todo x excepto en x = 1, donde se hace cero.' },
      { id: 'q19', text: 'Resuelve -x + 3 > 5:', options: ['x < -2', 'x > -2', 'x > 2', 'x < 2'], correctAnswer: 0, explanation: '-x > 2 → x < -2.' },
      { id: 'q20', text: 'Un sistema acotado por x ≥ 0, y ≥ 0, x + y ≤ 3 genera en el plano una región con forma de:', options: ['Triángulo', 'Cuadrado', 'Círculo', 'Trapecio'], correctAnswer: 0, explanation: 'Región triangular en el primer cuadrante con vértices en (0,0), (3,0) y (0,3).' }
    ]
  },

  // 6. FUNCIONES Y SUS CARACTERÍSTICAS
  {
    id: 'quiz-4eso-funciones-y-sus-caracteristicas',
    topicId: 'funciones-y-sus-caracteristicas',
    title: 'Autoevaluación: Funciones y sus Características',
    description: '20 preguntas sobre dominio, recorrido, simetrías, asíntotas y tipos de funciones.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'El Dominio de la función f(x) = √(x - 3) es:', options: ['[3, ∞)', '(3, ∞)', '(-∞, 3]', 'R - {3}'], correctAnswer: 0, explanation: 'El radicando debe ser no negativo: x - 3 ≥ 0 → x ≥ 3.' },
      { id: 'q2', text: 'El Dominio de f(x) = (x + 1) / (x² - 9) es:', options: ['R - {-3, 3}', 'R - {9}', 'R - {3}', 'R'], correctAnswer: 0, explanation: 'El denominador se anula en x² - 9 = 0 → x = ±3.' },
      { id: 'q3', text: 'Una función es simétrica PAR respecto al eje Y si cumple:', options: ['f(-x) = f(x)', 'f(-x) = -f(x)', 'f(x) = -f(x)', 'f(1/x) = f(x)'], correctAnswer: 0, explanation: 'Definición algebraica de simetría par.' },
      { id: 'q4', text: 'Una función es simétrica IMPAR (respecto al origen) si cumple:', options: ['f(-x) = -f(x)', 'f(-x) = f(x)', 'f(x) = 0', 'f(-x) = 1/f(x)'], correctAnswer: 0, explanation: 'Definición de función impar.' },
      { id: 'q5', text: 'La Tasa de Variación Media (TVM) de f(x) en [a, b] se calcula como:', options: ['[f(b) - f(a)] / (b - a)', '[f(b) + f(a)] / 2', 'f(b) - f(a)', '(b - a) / [f(b) - f(a)]'], correctAnswer: 0, explanation: 'Pendiente de la recta secante que pasa por (a, f(a)) y (b, f(b)).' },
      { id: 'q6', text: '¿Cuál es la asíntota vertical de la función f(x) = 1 / (x - 2)?', options: ['x = 2', 'y = 2', 'x = 0', 'y = 0'], correctAnswer: 0, explanation: 'La función tiende a infinito cuando x tiende a 2.' },
      { id: 'q7', text: '¿Cuál es la asíntota horizontal de f(x) = 1 / x + 3?', options: ['y = 3', 'x = 3', 'y = 0', 'x = 0'], correctAnswer: 0, explanation: 'Cuando x → ∞, 1/x → 0, por lo que f(x) → 3.' },
      { id: 'q8', text: 'Coordenada x del vértice de la parábola y = ax² + bx + c:', options: ['x = -b / (2a)', 'x = b / (2a)', 'x = -c / a', 'x = b² - 4ac'], correctAnswer: 0, explanation: 'Fórmula de la abscisa del vértice.' },
      { id: 'q9', text: 'Calcula el vértice de la parábola y = x² - 4x + 3:', options: ['(2, -1)', '(-2, 15)', '(2, 3)', '(4, 3)'], correctAnswer: 0, explanation: 'x = -(-4)/2 = 2. y = 2² - 4(2) + 3 = 4 - 8 + 3 = -1.' },
      { id: 'q10', text: 'Una función exponencial de la forma f(x) = aˣ con a > 1 es siempre:', options: ['Estrictamente creciente', 'Estrictamente decreciente', 'Constante', 'Negativa'], correctAnswer: 0, explanation: 'Si la base a > 1, la función exponencial crece en todo R.' },
      { id: 'q11', text: 'Dominio de la función logarítmica f(x) = log(x):', options: ['(0, ∞)', '[0, ∞)', 'R', 'R - {0}'], correctAnswer: 0, explanation: 'Solo se pueden calcular logaritmos de números estrictamente positivos.' },
      { id: 'q12', text: 'La gráfica de la función f(x) = k / x (k ≠ 0) es una:', options: ['Hipérbola', 'Parábola', 'Recta', 'Circunferencia'], correctAnswer: 0, explanation: 'Gráfica característica de la función de proporcionalidad inversa.' },
      { id: 'q13', text: 'Punto de corte con el eje Y de la función f(x) = 3x² - 2x + 5:', options: ['(0, 5)', '(5, 0)', '(0, 3)', '(0, -2)'], correctAnswer: 0, explanation: 'Evaluando f(0) = 5.' },
      { id: 'q14', text: 'Si trasladas la función f(x) = x² dos unidades hacia la derecha, obtienes:', options: ['g(x) = (x - 2)²', 'g(x) = x² - 2', 'g(x) = (x + 2)²', 'g(x) = x² + 2'], correctAnswer: 0, explanation: 'Desplazamiento horizontal a la derecha: f(x - c).' },
      { id: 'q15', text: 'Si trasladas la función f(x) = x² tres unidades hacia arriba, obtienes:', options: ['g(x) = x² + 3', 'g(x) = (x + 3)²', 'g(x) = x² - 3', 'g(x) = (x - 3)²'], correctAnswer: 0, explanation: 'Desplazamiento vertical hacia arriba: f(x) + c.' },
      { id: 'q16', text: 'Una función es periódica si existe un número T tal que para todo x:', options: ['f(x + T) = f(x)', 'f(x · T) = f(x)', 'f(x) + T = f(x)', 'f(T) = 0'], correctAnswer: 0, explanation: 'T es el período de la función.' },
      { id: 'q17', text: 'Calcula la TVM de f(x) = x² en el intervalo [1, 3]:', options: ['4', '2', '8', '3'], correctAnswer: 0, explanation: 'TVM = (f(3) - f(1)) / (3 - 1) = (9 - 1) / 2 = 8 / 2 = 4.' },
      { id: 'q18', text: '¿Es la función f(x) = x³ par, impar o ninguna?', options: ['Impar', 'Par', 'Ambas', 'Ninguna'], correctAnswer: 0, explanation: 'f(-x) = (-x)³ = -x³ = -f(x).' },
      { id: 'q19', text: '¿En qué punto se cortan las funciones f(x) = 2x + 1 y g(x) = x + 3?', options: ['(2, 5)', '(1, 4)', '(0, 3)', '(3, 6)'], correctAnswer: 0, explanation: '2x + 1 = x + 3 → x = 2. y = 2(2) + 1 = 5.' },
      { id: 'q20', text: 'El Recorrido o Imagen de la función f(x) = x² es:', options: ['[0, ∞)', 'R', '(0, ∞)', '(-∞, 0]'], correctAnswer: 0, explanation: 'El cuadrado de cualquier número real es siempre mayor o igual a cero.' }
    ]
  },

  // 7. TRIGONOMETRÍA
  {
    id: 'quiz-4eso-trigonometria',
    topicId: 'trigonometria',
    title: 'Autoevaluación: Trigonometría',
    description: '20 preguntas de razones trigonométricas, relaciones fundamentales, radianes y teoremas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Relación fundamental de la trigonometría:', options: ['sen² α + cos² α = 1', 'sen α + cos α = 1', 'tan α = cos α / sen α', 'sen² α - cos² α = 1'], correctAnswer: 0, explanation: 'Identidad pitagórica principal.' },
      { id: 'q2', text: 'Definición de la Tangente de un ángulo α:', options: ['tan α = sen α / cos α', 'tan α = cos α / sen α', 'tan α = 1 / sen α', 'tan α = sen α · cos α'], correctAnswer: 0, explanation: 'Cociente entre el seno y el coseno.' },
      { id: 'q3', text: '¿A cuántos radianes equivalen 180°?', options: ['π rad', '2π rad', 'π/2 rad', '3π/2 rad'], correctAnswer: 0, explanation: 'Equivalencia básica entre sexagesimales y radianes.' },
      { id: 'q4', text: '¿A cuántos grados equivalen π/2 radianes?', options: ['90°', '180°', '45°', '360°'], correctAnswer: 0, explanation: '180° / 2 = 90°.' },
      { id: 'q5', text: 'Calcula sen 30°:', options: ['1/2', '√3/2', '√2/2', '1'], correctAnswer: 0, explanation: 'Valor notable fundamental.' },
      { id: 'q6', text: 'Calcula cos 60°:', options: ['1/2', '√3/2', '√2/2', '0'], correctAnswer: 0, explanation: 'cos 60° = sen 30° = 1/2.' },
      { id: 'q7', text: 'Calcula tan 45°:', options: ['1', '0', '√3', '√3/3'], correctAnswer: 0, explanation: 'sen 45° / cos 45° = (√2/2) / (√2/2) = 1.' },
      { id: 'q8', text: 'En el segundo cuadrante (90° < α < 180°):', options: ['sen α > 0 y cos α < 0', 'sen α < 0 y cos α > 0', 'Ambos son positivos', 'Ambos son negativos'], correctAnswer: 0, explanation: 'Eje Y positivo (seno) y eje X negativo (coseno).' },
      { id: 'q9', text: 'En el tercer cuadrante (180° < α < 270°), la tangente es:', options: ['Positiva', 'Negativa', 'Cero', 'Infinita'], correctAnswer: 0, explanation: 'tan α = (-sen) / (-cos) = positivo.' },
      { id: 'q10', text: 'El Teorema del Seno establece que en cualquier triángulo:', options: ['a / sen A = b / sen B = c / sen C', 'a · sen A = b · sen B', 'a² = b² + c²', 'sen A + sen B = sen C'], correctAnswer: 0, explanation: 'Proporcionalidad entre lados y senos de los ángulos opuestos.' },
      { id: 'q11', text: 'El Teorema del Coseno establece que a² =', options: ['b² + c² - 2bc · cos A', 'b² + c² + 2bc · cos A', 'b² - c² - 2bc · sen A', 'b² + c²'], correctAnswer: 0, explanation: 'Generalización del Teorema de Pitágoras.' },
      { id: 'q12', text: 'Si sen α = 0,6 y α está en el 1er cuadrante, calcula cos α:', options: ['0,8', '0,4', '0,5', '0,7'], correctAnswer: 0, explanation: 'cos α = √(1 - 0,6²) = √(1 - 0,36) = √0,64 = 0,8.' },
      { id: 'q13', text: 'Calcula sen 90°:', options: ['1', '0', '-1', '1/2'], correctAnswer: 0, explanation: 'En la circunferencia goniométrica, la ordenada a 90° vale 1.' },
      { id: 'q14', text: 'Calcula cos 180°:', options: ['-1', '1', '0', '1/2'], correctAnswer: 0, explanation: 'En la circunferencia goniométrica, la abscisa a 180° vale -1.' },
      { id: 'q15', text: 'La cosecante es la razón inversa del:', options: ['Seno', 'Coseno', 'Tangente', 'Secante'], correctAnswer: 0, explanation: 'cosec α = 1 / sen α.' },
      { id: 'q16', text: 'La secante es la razón inversa del:', options: ['Coseno', 'Seno', 'Tangente', 'Cotangente'], correctAnswer: 0, explanation: 'sec α = 1 / cos α.' },
      { id: 'q17', text: 'Identidad secundaria: 1 + tan² α =', options: ['1 / cos² α', '1 / sen² α', '1 + cos² α', 'tan² α'], correctAnswer: 0, explanation: 'Dividiendo la relación fundamental por cos² α.' },
      { id: 'q18', text: 'Calcula la altura de un árbol que proyecta una sombra de 10 m con ángulo de elevación del Sol de 45°:', options: ['10 m', '5 m', '20 m', '10√3 m'], correctAnswer: 0, explanation: 'tan 45° = h / 10 → 1 = h / 10 → h = 10 m.' },
      { id: 'q19', text: 'Convertir 60° a radianes:', options: ['π/3 rad', 'π/6 rad', '2π/3 rad', 'π/4 rad'], correctAnswer: 0, explanation: '60° · (π / 180°) = π/3 rad.' },
      { id: 'q20', text: 'Si sen α = 1/2 con α en el 2º cuadrante, ¿cuánto vale α?', options: ['150°', '30°', '120°', '210°'], correctAnswer: 0, explanation: '180° - 30° = 150°.' }
    ]
  },

  // 8. GEOMETRÍA ANALÍTICA
  {
    id: 'quiz-4eso-geometria-analitica',
    topicId: 'geometria-analitica',
    title: 'Autoevaluación: Geometría Analítica',
    description: '20 preguntas sobre vectores, ecuaciones de la recta, posiciones relativas y distancias.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Las componentes del vector AB con extremo B(5, 7) e inicial A(2, 3) son:', options: ['(3, 4)', '(7, 10)', '(-3, -4)', '(10, 21)'], correctAnswer: 0, explanation: 'AB = B - A = (5-2, 7-3) = (3, 4).' },
      { id: 'q2', text: 'El módulo del vector u = (3, 4) es:', options: ['5', '7', '25', '1'], correctAnswer: 0, explanation: '|u| = √(3² + 4²) = √(9 + 16) = √25 = 5.' },
      { id: 'q3', text: 'El producto escalar de u = (2, 3) y v = (4, -1) es:', options: ['5', '11', '8', '3'], correctAnswer: 0, explanation: 'u · v = 2·4 + 3·(-1) = 8 - 3 = 5.' },
      { id: 'q4', text: 'Dos vectores no nulos u y v son ORTOGONALES (perpendiculares) si su producto escalar es:', options: ['0', '1', '-1', 'Igual a sus módulos'], correctAnswer: 0, explanation: 'u · v = 0 ⇔ u ⊥ v.' },
      { id: 'q5', text: 'Punto medio M del segmento AB con A(1, 2) y B(5, 6):', options: ['(3, 4)', '(6, 8)', '(2, 2)', '(4, 3)'], correctAnswer: 0, explanation: 'M = ((1+5)/2, (2+6)/2) = (3, 4).' },
      { id: 'q6', text: 'Ecuación explícita de la recta que pasa por (0, 3) con pendiente m = 2:', options: ['y = 2x + 3', 'y = 3x + 2', 'y = 2x - 3', '2x + y = 3'], correctAnswer: 0, explanation: 'y = mx + n → y = 2x + 3.' },
      { id: 'q7', text: 'Un vector director de la recta r: 2x - 3y + 5 = 0 es:', options: ['(3, 2)', '(2, -3)', '(-2, 3)', '(2, 3)'], correctAnswer: 0, explanation: 'Dada Ax + By + C = 0, el vector director es v = (-B, A) = (3, 2).' },
      { id: 'q8', text: 'Un vector normal (perpendicular) a la recta r: 4x - 5y + 1 = 0 es:', options: ['(4, -5)', '(5, 4)', '(-5, 4)', '(4, 5)'], correctAnswer: 0, explanation: 'El vector normal directo es n = (A, B) = (4, -5).' },
      { id: 'q9', text: 'La pendiente de la recta que pasa por A(1, 2) y B(3, 8) es:', options: ['3', '2', '6', '1/3'], correctAnswer: 0, explanation: 'm = (y₂ - y₁) / (x₂ - x₁) = (8 - 2) / (3 - 1) = 6 / 2 = 3.' },
      { id: 'q10', text: 'Dos rectas con pendientes m₁ y m₂ son PARALELAS si:', options: ['m₁ = m₂', 'm₁ · m₂ = -1', 'm₁ = -m₂', 'm₁ + m₂ = 0'], correctAnswer: 0, explanation: 'Tienen la misma inclinación.' },
      { id: 'q11', text: 'Dos rectas con pendientes m₁ y m₂ son PERPENDICULARES si:', options: ['m₁ · m₂ = -1', 'm₁ = m₂', 'm₁ + m₂ = 1', 'm₁ = -m₂'], correctAnswer: 0, explanation: 'Condición de perpendicularidad de pendientes.' },
      { id: 'q12', text: 'Ecuación continua de la recta que pasa por P(x₀, y₀) con vector v=(v₁, v₂):', options: ['(x - x₀)/v₁ = (y - y₀)/v₂', '(x + x₀)/v₁ = (y + y₀)/v₂', 'v₁(x - x₀) = v₂(y - y₀)', 'y - y₀ = v₁(x - x₀)'], correctAnswer: 0, explanation: 'Forma continua estándar de la ecuación de la recta.' },
      { id: 'q13', text: 'Distancia entre los puntos A(1, 1) y B(4, 5):', options: ['5', '25', '7', '√7'], correctAnswer: 0, explanation: 'd = √((4-1)² + (5-1)²) = √(3² + 4²) = √25 = 5.' },
      { id: 'q14', text: 'La recta y = -2x + 4 y la recta y = -2x - 1 son:', options: ['Paralelas', 'Perpendiculares', 'Coincidentes', 'Secantes no perpendiculares'], correctAnswer: 0, explanation: 'Tienen la misma pendiente m = -2 y distinta ordenada en el origen.' },
      { id: 'q15', text: 'La recta y = 3x + 1 y la recta y = -1/3 x + 2 son:', options: ['Perpendiculares', 'Paralelas', 'Coincidentes', 'Secantes no perpendiculares'], correctAnswer: 0, explanation: 'm₁ · m₂ = 3 · (-1/3) = -1.' },
      { id: 'q16', text: 'Ecuación paramétrica de la recta que pasa por A(1, 2) con vector u=(3, 4):', options: ['x = 1 + 3t ; y = 2 + 4t', 'x = 3 + t ; y = 4 + 2t', 'x = 1 + t ; y = 2 + t', 'x = 3t ; y = 4t'], correctAnswer: 0, explanation: '(x,y) = (x₀,y₀) + t(u₁,u₂).' },
      { id: 'q17', text: 'Punto de corte de las rectas y = 2x - 1 e y = -x + 5:', options: ['(2, 3)', '(1, 1)', '(3, 5)', '(0, 5)'], correctAnswer: 0, explanation: '2x - 1 = -x + 5 → 3x = 6 → x = 2. y = 2(2) - 1 = 3.' },
      { id: 'q18', text: 'Normaliza el vector u = (3, 4) para que sea unitario (módulo 1):', options: ['(3/5, 4/5)', '(1, 1)', '(3/25, 4/25)', '(1/3, 1/4)'], correctAnswer: 0, explanation: 'Se divide el vector entre su módulo: (3,4)/5 = (3/5, 4/5).' },
      { id: 'q19', text: 'Pasa a forma general/implícita la recta y = 2x - 3:', options: ['2x - y - 3 = 0', '2x + y - 3 = 0', 'x - 2y - 3 = 0', '2x - y + 3 = 0'], correctAnswer: 0, explanation: 'Llevando todo al mismo miembro: 2x - y - 3 = 0.' },
      { id: 'q20', text: 'Ecuación de la recta horizontal que pasa por (2, -4):', options: ['y = -4', 'x = 2', 'y = 2', 'x = -4'], correctAnswer: 0, explanation: 'Las rectas horizontales tienen pendiente m = 0 y ecuación y = constante.' }
    ]
  },

  // 9. ESTADÍSTICA Y PARÁMETROS
  {
    id: 'quiz-4eso-estadistica-y-parametros',
    topicId: 'estadistica-y-parametros',
    title: 'Autoevaluación: Estadística y Parámetros',
    description: '20 preguntas sobre medidas de centralización, dispersión, posición y diagramas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'El primer cuartil (Q₁) deja por debajo al:', options: ['25% de los datos', '50% de los datos', '75% de los datos', '10% de los datos'], correctAnswer: 0, explanation: 'Definición del cuartil 1.' },
      { id: 'q2', text: 'El segundo cuartil (Q₂) coincide con la:', options: ['Mediana', 'Media', 'Moda', 'Varianza'], correctAnswer: 0, explanation: 'Q₂ divide la distribución en dos partes iguales del 50%.' },
      { id: 'q3', text: 'El rango intercuartílico (RIC) se calcula como:', options: ['Q₃ - Q₁', 'Q₂ - Q₁', 'Máximo - Mínimo', 'Q₃ + Q₁'], correctAnswer: 0, explanation: 'Medida de dispersión dada por la diferencia entre el tercer y primer cuartil.' },
      { id: 'q4', text: 'La Varianza (s²) mide:', options: ['El promedio de los cuadrados de las desviaciones respecto a la media', 'La diferencia entre máximo y mínimo', 'El dato que más se repite', 'El 50% central'], correctAnswer: 0, explanation: 'Definición de varianza estadística.' },
      { id: 'q5', text: 'La Desviación Típica (s) es:', options: ['La raíz cuadrada de la Varianza', 'El cuadrado de la Media', 'El doble de la Varianza', 'Q₃ - Q₁'], correctAnswer: 0, explanation: 's = √s².' },
      { id: 'q6', text: 'El Coeficiente de Variación (CV) se calcula como:', options: ['s / x̄', 'x̄ / s', 's² / x̄', 'x̄ · s'], correctAnswer: 0, explanation: 'Relación entre la desviación típica y la media (medida de dispersión relativa).' },
      { id: 'q7', text: 'El CV se utiliza para:', options: ['Comparar la dispersión de dos distribuciones con distintas unidades', 'Saber el valor central', 'Medir el porcentaje acumulado', 'Calcular la moda'], correctAnswer: 0, explanation: 'Es una medida adimensional relativa.' },
      { id: 'q8', text: 'Marca de clase en un intervalo de datos [10, 20) es:', options: ['15', '10', '20', '30'], correctAnswer: 0, explanation: 'Punto medio del intervalo: (10 + 20) / 2 = 15.' },
      { id: 'q9', text: 'El percentil 80 (P₈₀) deja por debajo al:', options: ['80% de los datos', '20% de los datos', '8% de los datos', '50% de los datos'], correctAnswer: 0, explanation: 'Definición de percentil.' },
      { id: 'q10', text: 'En un diagrama de caja y bigotes (Boxplot), la caja abarca desde:', options: ['Q₁ hasta Q₃', 'El Mínimo hasta el Máximo', 'Q₁ hasta la Mediana', 'Q₂ hasta Q₃'], correctAnswer: 0, explanation: 'La caja central contiene el 50% central de los datos.' },
      { id: 'q11', text: 'La suma de todas las frecuencias relativas (fᵢ) es siempre:', options: ['1', '100', 'N', '0'], correctAnswer: 0, explanation: 'La suma de las proporciones es igual a 1.' },
      { id: 'q12', text: 'Si multiplicamos todos los datos de una distribución por 2, la media:', options: ['Se multiplica por 2', 'Se le suma 2', 'Queda igual', 'Se eleva al cuadrado'], correctAnswer: 0, explanation: 'Propiedad de la media aritmética frente a cambios de escala.' },
      { id: 'q13', text: 'Si sumamos 5 a todos los datos de una muestra, la desviación típica:', options: ['Queda igual', 'Aumenta en 5', 'Se multiplica por 5', 'Se reduce a la mitad'], correctAnswer: 0, explanation: 'La dispersión no cambia si solo se desplazan los datos (cambio de origen).' },
      { id: 'q14', text: 'Un valor atípico (outlier) es un dato que:', options: ['Se aleja significativamente del resto de los datos', 'Es igual a la media', 'Se repite muchas veces', 'Está en la mediana'], correctAnswer: 0, explanation: 'Dato anómalo muy distante de la concentración central.' },
      { id: 'q15', text: 'Un Histograma está formado por barras unidas porque la variable es:', options: ['Cuantitativa continua', 'Cualitativa', 'Cuantitativa discreta', 'Nominal'], correctAnswer: 0, explanation: 'Las barras contiguas representan intervalos de clase continuos.' },
      { id: 'q16', text: 'Calcula la media de los datos: 2, 4, 4, 6, 9:', options: ['5', '4', '6', '25'], correctAnswer: 0, explanation: '(2 + 4 + 4 + 6 + 9) / 5 = 25 / 5 = 5.' },
      { id: 'q17', text: 'Calcula la mediana de los datos: 3, 1, 7, 5, 9:', options: ['5', '7', '3', '1'], correctAnswer: 0, explanation: 'Ordenados: 1, 3, 5, 7, 9. El dato central es 5.' },
      { id: 'q18', text: 'Calcula la moda de los datos: 2, 3, 3, 4, 5, 3, 2:', options: ['3', '2', '4', '5'], correctAnswer: 0, explanation: 'El número 3 se repite 3 veces.' },
      { id: 'q19', text: 'El rango de los datos 12, 15, 8, 22, 10 es:', options: ['14', '22', '8', '10'], correctAnswer: 0, explanation: 'Máximo - Mínimo = 22 - 8 = 14.' },
      { id: 'q20', text: 'Si la varianza de una muestra es 25, la desviación típica es:', options: ['5', '625', '12,5', '50'], correctAnswer: 0, explanation: 's = √25 = 5.' }
    ]
  },

  // 10. COMBINATORIA Y PROBABILIDAD
  {
    id: 'quiz-4eso-combinatoria-y-probabilidad',
    topicId: 'combinatoria-y-probabilidad',
    title: 'Autoevaluación: Combinatoria y Probabilidad',
    description: '20 preguntas sobre permutaciones, combinaciones, variaciones, sucesos y Bayes/Laplace.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: '¿De cuántas formas distintas se pueden sentar 5 personas en una fila? (Permutaciones P₅)', options: ['120', '25', '60', '24'], correctAnswer: 0, explanation: 'P₅ = 5! = 5 · 4 · 3 · 2 · 1 = 120.' },
      { id: 'q2', text: 'En las Combinaciones C_(n,k):', options: ['NO importa el orden de los elementos', 'SÍ importa el orden de los elementos', 'Se repiten siempre los elementos', 'Siempre intervienen todos los elementos'], correctAnswer: 0, explanation: 'En las combinaciones el orden de elección no influye.' },
      { id: 'q3', text: 'En las Variaciones V_(n,k):', options: ['SÍ importa el orden y NO entran todos los elementos', 'NO importa el orden', 'Entran siempre todos los elementos', 'Son igual a n!'], correctAnswer: 0, explanation: 'Elegimos k elementos de n importando el orden.' },
      { id: 'q4', text: 'Calcula el número factorial 4!:', options: ['24', '12', '16', '10'], correctAnswer: 0, explanation: '4 · 3 · 2 · 1 = 24.' },
      { id: 'q5', text: 'Calcula el número combinatorio (5 sobre 2):', options: ['10', '20', '5', '12'], correctAnswer: 0, explanation: '5! / (2! · 3!) = (5 · 4) / 2 = 10.' },
      { id: 'q6', text: '¿Cuántos números de 3 cifras distintas se pueden formar con los dígitos 1, 2, 3, 4, 5?', options: ['60', '125', '20', '10'], correctAnswer: 0, explanation: 'V₅,₃ = 5 · 4 · 3 = 60.' },
      { id: 'q7', text: '¿Cuántas combinaciones de 2 frutas se pueden hacer con manzana, plátano y fresa?', options: ['3', '6', '9', '2'], correctAnswer: 0, explanation: 'C₃,₂ = 3! / (2!·1!) = 3.' },
      { id: 'q8', text: 'Dos sucesos A y B son INDEPENDIENTES si:', options: ['P(A ∩ B) = P(A) · P(B)', 'P(A ∩ B) = 0', 'P(A ∪ B) = P(A) + P(B)', 'P(A|B) = 0'], correctAnswer: 0, explanation: 'La ocurrencia de uno no afecta a la probabilidad del otro.' },
      { id: 'q9', text: 'Dos sucesos A y B son INCOMPATIBLES si:', options: ['P(A ∩ B) = 0', 'P(A ∩ B) = P(A)·P(B)', 'P(A) + P(B) = 1', 'P(A ∪ B) = 0'], correctAnswer: 0, explanation: 'No pueden ocurrir simultáneamente.' },
      { id: 'q10', text: 'Probabilidad de la Unión de dos sucesos cualesquiera P(A ∪ B) =', options: ['P(A) + P(B) - P(A ∩ B)', 'P(A) + P(B)', 'P(A) · P(B)', 'P(A) - P(B)'], correctAnswer: 0, explanation: 'Fórmula general de la probabilidad de la unión.' },
      { id: 'q11', text: 'Fórmula de la Probabilidad Condicionada P(A|B) =', options: ['P(A ∩ B) / P(B)', 'P(A ∩ B) / P(A)', 'P(A) / P(B)', 'P(A ∪ B) / P(B)'], correctAnswer: 0, explanation: 'Probabilidad de que ocurra A sabiendo que ha ocurrido B.' },
      { id: 'q12', text: 'Leyes de De Morgan: El contrario de la unión (A ∪ B)ᶜ es igual a:', options: ['Aᶜ ∩ Bᶜ', 'Aᶜ ∪ Bᶜ', 'A ∩ B', '1 - P(A)'], correctAnswer: 0, explanation: 'Primera Ley de De Morgan.' },
      { id: 'q13', text: 'Si P(A) = 0,3, la probabilidad del suceso contrario P(Aᶜ) es:', options: ['0,7', '0,3', '-0,3', '1,3'], correctAnswer: 0, explanation: 'P(Aᶜ) = 1 - P(A) = 1 - 0,3 = 0,7.' },
      { id: 'q14', text: 'Lanzamos dos dados. ¿Cuál es la probabilidad de que la suma sea 12?', options: ['1/36', '2/36', '1/12', '1/6'], correctAnswer: 0, explanation: 'Único caso favorable (6,6) de 36 casos posibles.' },
      { id: 'q15', text: 'Extraemos una carta de una baraja de 40. Probabilidad de que sea Rey o Copa:', options: ['13/40', '14/40', '4/40', '10/40'], correctAnswer: 0, explanation: 'P(Rey) + P(Copa) - P(Rey de Copas) = 4/40 + 10/40 - 1/40 = 13/40.' },
      { id: 'q16', text: 'En un árbol de probabilidad, la suma de las probabilidades de las ramas que salen de un mismo nudo es:', options: ['1', '0,5', '100', 'Depende del experimento'], correctAnswer: 0, explanation: 'Representan un espacio muestral completo.' },
      { id: 'q17', text: '¿Cuántas palabras de 4 letras (con o sin sentido) se pueden formar con la palabra BOLA?', options: ['24', '16', '256', '12'], correctAnswer: 0, explanation: 'P₄ = 4! = 24.' },
      { id: 'q18', text: '¿Cuántas apuestas de Quiniela (1, X, 2) de 14 partidos se pueden rellenar? (VR₃,₁₄)', options: ['3¹⁴', '14³', '14 · 3', '3! · 14!'], correctAnswer: 0, explanation: 'Variaciones con repetición de 3 elementos tomados de 14 en 14: 3¹⁴.' },
      { id: 'q19', text: 'Si P(A) = 0,4, P(B) = 0,5 y A y B son independientes, calcula P(A ∩ B):', options: ['0,2', '0,9', '0,1', '0,8'], correctAnswer: 0, explanation: 'P(A ∩ B) = 0,4 · 0,5 = 0,20.' },
      { id: 'q20', text: 'Se lanzan 3 monedas equilibradas. Probabilidad de obtener exactamente 3 caras:', options: ['1/8', '3/8', '1/2', '1/4'], correctAnswer: 0, explanation: 'Casos posibles 2³ = 8. Caso favorable (C,C,C): 1/8.' }
    ]
  }
];