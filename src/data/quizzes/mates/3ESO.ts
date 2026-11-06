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

export const QUIZZES_3ESO: Quiz[] = [
  // 1. NÚMEROS RACIONALES E IRRACIONALES
  {
    id: 'quiz-3eso-numeros-racionales-e-irracionales',
    topicId: 'numeros-racionales-e-irracionales',
    title: 'Autoevaluación: Números Racionales e Irracionales',
    description: '20 preguntas de fracciones, decimales, clasificación e intervalos.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Calcula: 3/4 + 1/2', options: ['4/6', '5/4', '1', '7/4'], correctAnswer: 1, explanation: '3/4 + 2/4 = 5/4.' },
      { id: 'q2', text: 'Fracción irreducible de 12/18:', options: ['6/9', '4/6', '2/3', '3/2'], correctAnswer: 2, explanation: 'Dividiendo numerador y denominador entre 6 da 2/3.' },
      { id: 'q3', text: 'Expresa 0,75 en forma de fracción irreducible:', options: ['75/100', '3/4', '7/5', '1/4'], correctAnswer: 1, explanation: '75/100 simplificado por 25 es 3/4.' },
      { id: 'q4', text: 'El decimal periódico puro 0,333... equivale a:', options: ['1/3', '3/10', '3/99', '33/100'], correctAnswer: 0, explanation: '3/9 simplificado es 1/3.' },
      { id: 'q5', text: 'El decimal periódico mixto 0,1666... equivale a:', options: ['16/99', '1/6', '16/90', '1/5'], correctAnswer: 1, explanation: '(16 - 1) / 90 = 15/90 = 1/6.' },
      { id: 'q6', text: '¿Cuál de los siguientes números es irracional?', options: ['√4', '3/5', '√2', '0,25'], correctAnswer: 2, explanation: '√2 es una raíz no exacta con infinitas cifras decimales no periódicas.' },
      { id: 'q7', text: 'Ordena de menor a mayor: 1/3 y 1/2.', options: ['1/3 < 1/2', '1/2 < 1/3', 'Son iguales', '1/3 > 1/2'], correctAnswer: 0, explanation: '1/3 ≈ 0.33 y 1/2 = 0.50.' },
      { id: 'q8', text: '¿Cuál es el opuesto de -4/5?', options: ['-5/4', '4/5', '5/4', '-4/5'], correctAnswer: 1, explanation: 'El opuesto cambia el signo del número.' },
      { id: 'q9', text: '¿Cuál es el inverso de -2/3?', options: ['2/3', '3/2', '-3/2', '-2/3'], correctAnswer: 2, explanation: 'El inverso invierte numerador y denominador conservando el signo.' },
      { id: 'q10', text: 'Calcula: (2/3) · (3/5)', options: ['6/15', '2/5', '5/8', '10/9'], correctAnswer: 1, explanation: 'Se multiplican numeradores y denominadores: 6/15 = 2/5.' },
      { id: 'q11', text: 'Calcula: (3/4) : (1/2)', options: ['3/8', '3/2', '6/8', '1/2'], correctAnswer: 1, explanation: '(3·2)/(4·1) = 6/4 = 3/2.' },
      { id: 'q12', text: 'Truncamiento a las centésimas de 2,456:', options: ['2,45', '2,46', '2,4', '2,5'], correctAnswer: 0, explanation: 'Se eliminan los dígitos tras la centésima: 2,45.' },
      { id: 'q13', text: 'Redondeo a las décimas de 3,78:', options: ['3,7', '3,8', '3,70', '4,0'], correctAnswer: 1, explanation: 'La siguiente cifra es 8 (≥5), sube a 3,8.' },
      { id: 'q14', text: 'Error absoluto al aproximar 2,9 por 3:', options: ['0,1', '-0,1', '0,01', '1'], correctAnswer: 0, explanation: '|2,9 - 3| = |-0,1| = 0,1.' },
      { id: 'q15', text: '¿El conjunto de los números naturales (N) está contenido en los enteros (Z)?', options: ['Verdadero', 'Falso', 'Solo los pares', 'Solo los primos'], correctAnswer: 0, explanation: 'Todos los naturales son enteros positivos.' },
      { id: 'q16', text: '¿El número trascendente "e" es un número irracional?', options: ['Sí', 'No', 'Es entero', 'Es racional'], correctAnswer: 0, explanation: 'Tiene infinitos decimales no periódicos.' },
      { id: 'q17', text: 'Para representar √2 exactamente en la recta real se utiliza el teorema de:', options: ['Tales', 'Pitágoras', 'Ruffini', 'Gauss'], correctAnswer: 1, explanation: 'Construyendo un triángulo rectángulo de catetos 1 y 1 (hipotenusa √2).' },
      { id: 'q18', text: 'El intervalo (-1, 3] representa:', options: ['-1 < x ≤ 3', '-1 ≤ x ≤ 3', '-1 < x < 3', '-1 ≤ x < 3'], correctAnswer: 0, explanation: 'Paréntesis indica abierto (<) y corchete cerrado (≤).' },
      { id: 'q19', text: '¿Cuál de los siguientes no es un número racional?', options: ['-7', '2/5', 'π', '0'], correctAnswer: 2, explanation: 'π es irracional.' },
      { id: 'q20', text: 'Resuelve: 1 - 2/5', options: ['1/5', '3/5', '-1/5', '2/5'], correctAnswer: 1, explanation: '5/5 - 2/5 = 3/5.' }
    ]
  },

  // 2. POTENCIAS Y RADICALES
  {
    id: 'quiz-3eso-potencias-y-radicales',
    topicId: 'potencias-y-radicales',
    title: 'Autoevaluación: Potencias y Radicales',
    description: '20 preguntas de propiedades de potencias, raíces, radicales y notación científica.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Simplifica: 2³ · 2⁴', options: ['2¹²', '2⁷', '4⁷', '2¹'], correctAnswer: 1, explanation: 'Misma base, se suman los exponentes: 3 + 4 = 7.' },
      { id: 'q2', text: 'Calcula: (3²)³', options: ['3⁵', '3⁶', '9³', '3⁸'], correctAnswer: 1, explanation: 'Potencia de potencia, se multiplican exponentes: 2 · 3 = 6.' },
      { id: 'q3', text: 'Calcula: 5⁻²', options: ['-10', '-25', '1/25', '1/10'], correctAnswer: 2, explanation: 'Exponente negativo: 1 / 5² = 1/25.' },
      { id: 'q4', text: 'Calcula: (2/3)⁻¹', options: ['-2/3', '3/2', '-3/2', '1/3'], correctAnswer: 1, explanation: 'Se invierte la fracción al tener exponente -1.' },
      { id: 'q5', text: 'Expresa 100.000 en notación científica:', options: ['1 · 10⁵', '10 · 10⁴', '1 · 10⁻⁵', '0,1 · 10⁶'], correctAnswer: 0, explanation: '1,0 multiplicado por 10 elevado a 5 ceros.' },
      { id: 'q6', text: 'Expresa 0,0003 en notación científica:', options: ['3 · 10⁻⁴', '3 · 10⁻³', '0,3 · 10⁻³', '3 · 10⁴'], correctAnswer: 0, explanation: 'Desplazamos la coma 4 posiciones a la derecha: 3 · 10⁻⁴.' },
      { id: 'q7', text: 'Calcula: √64', options: ['6', '8', '32', '16'], correctAnswer: 1, explanation: '8² = 64.' },
      { id: 'q8', text: 'Calcula: ∛(-8)', options: ['-2', '2', 'No existe en R', '-4'], correctAnswer: 0, explanation: '(-2)³ = -8.' },
      { id: 'q9', text: 'Extrae factores del radical √18:', options: ['2√3', '3√2', '9√2', '2√9'], correctAnswer: 1, explanation: '√18 = √(9·2) = 3√2.' },
      { id: 'q10', text: 'Simplifica: √8 + √18', options: ['√26', '5√2', '6√2', '2√13'], correctAnswer: 1, explanation: '2√2 + 3√2 = 5√2.' },
      { id: 'q11', text: 'Multiplica: (2 · 10³) · (4 · 10²)', options: ['8 · 10⁵', '8 · 10⁶', '6 · 10⁵', '8 · 10¹'], correctAnswer: 0, explanation: '2·4 = 8 y 10³⁺² = 10⁵.' },
      { id: 'q12', text: 'Racionaliza: 2 / √2', options: ['√2', '2√2', '1', '2'], correctAnswer: 0, explanation: '(2√2)/2 = √2.' },
      { id: 'q13', text: 'Calcula la potencia con exponente fraccionario: 9^(1/2)', options: ['4,5', '3', '18', '81'], correctAnswer: 1, explanation: '9^(1/2) = √9 = 3.' },
      { id: 'q14', text: 'Calcula: 8^(2/3)', options: ['4', '2', '16', '64'], correctAnswer: 0, explanation: '(∛8)² = 2² = 4.' },
      { id: 'q15', text: '¿Cuánto vale 5⁰?', options: ['0', '5', '1', '10'], correctAnswer: 2, explanation: 'Cualquier número no nulo elevado a 0 vale 1.' },
      { id: 'q16', text: 'Calcula: (-2)⁴', options: ['-16', '16', '-8', '8'], correctAnswer: 1, explanation: 'Base negativa con exponente par da resultado positivo.' },
      { id: 'q17', text: 'Calcula: (-2)³', options: ['-8', '8', '-6', '6'], correctAnswer: 0, explanation: 'Base negativa con exponente impar da resultado negativo.' },
      { id: 'q18', text: 'La propiedad a⁻ⁿ equivale a:', options: ['-aⁿ', '1 / aⁿ', 'n / a', '-n · a'], correctAnswer: 1, explanation: 'Definición de exponente negativo.' },
      { id: 'q19', text: 'Simplifica: (a · b)³', options: ['a³ · b³', 'a³ + b³', '3ab', 'a · b³'], correctAnswer: 0, explanation: 'El exponente se aplica a cada factor.' },
      { id: 'q20', text: 'Simplifica la raíz √(x⁴) para x > 0:', options: ['x', 'x²', 'x³', '2x'], correctAnswer: 1, explanation: 'x^(4/2) = x².' }
    ]
  },

  // 3. POLINOMIOS
  {
    id: 'quiz-3eso-polinomios',
    topicId: 'polinomios',
    title: 'Autoevaluación: Polinomios',
    description: '20 preguntas de operaciones, identidades notables, grado, Ruffini y factorización.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: '¿Cuál es el grado del polinomio P(x) = 3x⁴ - 2x² + 5?', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: 'El mayor exponente de la variable es 4.' },
      { id: 'q2', text: 'Halla el valor numérico de P(x) = x² - 3x + 1 para x = 2:', options: ['-1', '1', '3', '-3'], correctAnswer: 0, explanation: '2² - 3(2) + 1 = 4 - 6 + 1 = -1.' },
      { id: 'q3', text: 'Suma los monomios: 2x + 3x', options: ['5x²', '5x', '6x', '6x²'], correctAnswer: 1, explanation: 'Se suman los coeficientes: (2+3)x = 5x.' },
      { id: 'q4', text: 'Resta los polinomios: (4x² + 1) - (2x² + 3)', options: ['2x² + 4', '2x² - 2', '6x² - 2', '2x² - 4'], correctAnswer: 1, explanation: '4x² + 1 - 2x² - 3 = 2x² - 2.' },
      { id: 'q5', text: 'Multiplica: 2x · (3x² - 1)', options: ['6x³ - 2x', '6x² - 2x', '5x³ - 2x', '6x³ - 1'], correctAnswer: 0, explanation: '2x·3x² - 2x·1 = 6x³ - 2x.' },
      { id: 'q6', text: 'Desarrolla la identidad notable (x + 3)²:', options: ['x² + 9', 'x² + 6x + 9', 'x² + 3x + 9', 'x² + 6'], correctAnswer: 1, explanation: 'x² + 2(x)(3) + 3² = x² + 6x + 9.' },
      { id: 'q7', text: 'Desarrolla (x - 5)²:', options: ['x² - 25', 'x² - 10x + 25', 'x² + 10x - 25', 'x² - 5x + 25'], correctAnswer: 1, explanation: 'x² - 2(x)(5) + 5² = x² - 10x + 25.' },
      { id: 'q8', text: 'Desarrolla (x + 2)(x - 2):', options: ['x² - 4', 'x² + 4', 'x² - 4x + 4', 'x² - 2'], correctAnswer: 0, explanation: 'Suma por diferencia = diferencia de cuadrados: x² - 4.' },
      { id: 'q9', text: 'Saca factor común en: 4x³ - 8x²', options: ['4x(x² - 2)', '4x²(x - 2)', 'x²(4x - 8)', '8x²(x - 1)'], correctAnswer: 1, explanation: 'MCD de coeficientes es 4 y menor potencia x².' },
      { id: 'q10', text: 'Factoriza la expresión: x² - 9', options: ['(x - 3)²', '(x + 3)(x - 3)', '(x + 9)(x - 9)', '3(x - 3)'], correctAnswer: 1, explanation: 'Diferencia de cuadrados.' },
      { id: 'q11', text: '¿Cuál es el coeficiente principal de P(x) = -5x³ + 2x - 1?', options: ['-5', '3', '2', '-1'], correctAnswer: 0, explanation: 'El coeficiente del término de mayor grado (-5x³).' },
      { id: 'q12', text: '¿Cuál es el término independiente de P(x) = 2x² - 3x + 7?', options: ['2', '-3', '7', '0'], correctAnswer: 2, explanation: 'El término sin variable x.' },
      { id: 'q13', text: 'Desarrolla (2x + 1)²:', options: ['4x² + 1', '4x² + 4x + 1', '2x² + 4x + 1', '4x² + 2x + 1'], correctAnswer: 1, explanation: '(2x)² + 2(2x)(1) + 1² = 4x² + 4x + 1.' },
      { id: 'q14', text: 'El grado del producto de un polinomio de grado 2 por uno de grado 3 es:', options: ['5', '6', '3', '2'], correctAnswer: 0, explanation: 'Se suman los grados: 2 + 3 = 5.' },
      { id: 'q15', text: 'La regla de Ruffini se utiliza para dividir polinomios entre divisores de forma:', options: ['x - a', 'ax² + b', 'x² - a²', 'ax + b'], correctAnswer: 0, explanation: 'Binomios de primer grado de la forma x - a.' },
      { id: 'q16', text: 'Según el Teorema del Resto, el resto de dividir P(x) entre (x - a) es:', options: ['P(a)', 'P(-a)', '0', 'a'], correctAnswer: 0, explanation: 'El valor numérico del polinomio para x = a.' },
      { id: 'q17', text: '¿Es x = 1 una raíz del polinomio P(x) = x² - 1?', options: ['Sí', 'No', 'Solo en números negativos', 'Depende de a'], correctAnswer: 0, explanation: 'P(1) = 1² - 1 = 0.' },
      { id: 'q18', text: 'Calcula (3x - 2)(3x + 2):', options: ['9x² - 4', '9x² + 4', '6x² - 4', '9x² - 12x + 4'], correctAnswer: 0, explanation: '(3x)² - 2² = 9x² - 4.' },
      { id: 'q19', text: 'Expresa en lenguaje algebraico: "El doble de x más el triple de y":', options: ['2x + 3y', 'x² + y³', '2(x + 3y)', '3x + 2y'], correctAnswer: 0, explanation: '2·x + 3·y.' },
      { id: 'q20', text: 'Multiplica (x + 1)(x + 2):', options: ['x² + 3x + 2', 'x² + 2x + 2', 'x² + 3', 'x² + 2'], correctAnswer: 0, explanation: 'x² + 2x + x + 2 = x² + 3x + 2.' }
    ]
  },

  // 4. ECUACIONES Y SISTEMAS
  {
    id: 'quiz-3eso-ecuaciones-y-sistemas',
    topicId: 'ecuaciones-y-sistemas',
    title: 'Autoevaluación: Ecuaciones y Sistemas',
    description: '20 preguntas de ecuaciones de 1º y 2º grado, sistemas lineales y resolución de problemas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Resuelve: 2x + 4 = 10', options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'], correctAnswer: 1, explanation: '2x = 6 → x = 3.' },
      { id: 'q2', text: 'Resuelve la ecuación incompleta: x² - 16 = 0', options: ['x = 4', 'x = -4', 'x = ±4', 'x = 8'], correctAnswer: 2, explanation: 'x² = 16 → x = ±4.' },
      { id: 'q3', text: 'Resuelve la ecuación incompleta: x² - 5x = 0', options: ['x = 5', 'x = 0 y x = 5', 'x = 0 y x = -5', 'x = ±5'], correctAnswer: 1, explanation: 'x(x - 5) = 0 → x = 0 o x = 5.' },
      { id: 'q4', text: 'Si el discriminante b² - 4ac > 0, la ecuación de 2º grado tiene:', options: ['2 soluciones distintas', '1 solución doble', 'Sin solución real', 'Infinitas soluciones'], correctAnswer: 0, explanation: 'Al ser positivo da dos raíces reales diferentes.' },
      { id: 'q5', text: 'Soluciones de x² - 5x + 6 = 0:', options: ['x = 2 y x = 3', 'x = -2 y x = -3', 'x = 1 y x = 6', 'x = -1 y x = 5'], correctAnswer: 0, explanation: '(5 ± √(25 - 24))/2 = (5 ± 1)/2 → 3 y 2.' },
      { id: 'q6', text: 'Resuelve el sistema: x + y = 5 ; x - y = 1', options: ['x = 3, y = 2', 'x = 4, y = 1', 'x = 2, y = 3', 'x = 5, y = 0'], correctAnswer: 0, explanation: '2x = 6 → x = 3; 3 + y = 5 → y = 2.' },
      { id: 'q7', text: 'El método de sustitución consiste en:', options: ['Despejar una variable en una ecuación y colocarla en la otra', 'Sumar las ecuaciones', 'Graficar las rectas', 'Multiplicar por un escalar'], correctAnswer: 0, explanation: 'Definición del método de sustitución.' },
      { id: 'q8', text: 'Resuelve: 3x - 2 = x + 6', options: ['x = 2', 'x = 4', 'x = 8', 'x = -4'], correctAnswer: 1, explanation: '2x = 8 → x = 4.' },
      { id: 'q9', text: 'Resuelve: 2(x - 1) = 8', options: ['x = 3', 'x = 5', 'x = 4', 'x = 6'], correctAnswer: 1, explanation: '2x - 2 = 8 → 2x = 10 → x = 5.' },
      { id: 'q10', text: '¿Cuál de las siguientes ecuaciones NO tiene solución real?', options: ['x² - 4 = 0', 'x² + 4 = 0', 'x² = 0', 'x² - x = 0'], correctAnswer: 1, explanation: 'x² = -4 no tiene solución en los números reales.' },
      { id: 'q11', text: 'Resuelve: x² - 6x + 9 = 0', options: ['x = 3 (doble)', 'x = -3 (doble)', 'x = ±3', 'x = 0 y x = 6'], correctAnswer: 0, explanation: '(x - 3)² = 0 → x = 3.' },
      { id: 'q12', text: 'Un sistema lineal es INCOMPATIBLE cuando:', options: ['Tiene solución única', 'No tiene ninguna solución', 'Tiene infinitas soluciones', 'Sus rectas son secantes'], correctAnswer: 1, explanation: 'Las rectas son paralelas y no se cortan.' },
      { id: 'q13', text: 'Un sistema es COMPATIBLE DETERMINADO cuando:', options: ['Tiene una única solución', 'Tiene infinitas soluciones', 'No tiene solución', 'Tiene dos soluciones'], correctAnswer: 0, explanation: 'Las rectas se cortan en un único punto.' },
      { id: 'q14', text: 'Dada la ecuación 2x + 3y = 12, si x = 3, ¿cuánto vale y?', options: ['2', '3', '0', '4'], correctAnswer: 0, explanation: '6 + 3y = 12 → 3y = 6 → y = 2.' },
      { id: 'q15', text: 'Traduce a ecuación: "El triple de un número menos 5 equivale a 10":', options: ['3x - 5 = 10', 'x³ - 5 = 10', '3(x - 5) = 10', '3x + 5 = 10'], correctAnswer: 0, explanation: '3·x - 5 = 10.' },
      { id: 'q16', text: 'Halla las soluciones de 2x² = 18:', options: ['x = ±3', 'x = 9', 'x = ±9', 'x = 3'], correctAnswer: 0, explanation: 'x² = 9 → x = ±3.' },
      { id: 'q17', text: 'Resuelve la ecuación factorizada (x - 1)(x + 2) = 0:', options: ['x = 1 y x = -2', 'x = -1 y x = 2', 'x = 1 y x = 2', 'x = 0'], correctAnswer: 0, explanation: 'x - 1 = 0 → x = 1; x + 2 = 0 → x = -2.' },
      { id: 'q18', text: 'Resuelve: x/2 + 3 = 5', options: ['x = 4', 'x = 1', 'x = 16', 'x = 2'], correctAnswer: 0, explanation: 'x/2 = 2 → x = 4.' },
      { id: 'q19', text: 'En un sistema, si sumamos 2x + y = 8 y 2x - y = 0 obtenemos:', options: ['4x = 8', '2y = 8', '4x + 2y = 8', 'x = 4'], correctAnswer: 0, explanation: 'Se eliminan las "y": 4x = 8.' },
      { id: 'q20', text: 'Si en una ecuación ax² + bx + c = 0 el discriminante es 0, hay:', options: ['1 solución doble', '2 soluciones distintas', '0 soluciones', 'Infinitas soluciones'], correctAnswer: 0, explanation: '(-b ± 0)/2a da una única solución.' }
    ]
  },

  // 5. SUCESIONES Y PROGRESIONES
  {
    id: 'quiz-3eso-sucesiones-y-progresiones',
    topicId: 'sucesiones-y-progresiones',
    title: 'Autoevaluación: Sucesiones y Progresiones',
    description: '20 preguntas de sucesiones, progresiones aritméticas y geométricas, términos generales y sumas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Dada la sucesión a_n = 2n + 1, calcula a_3:', options: ['5', '7', '6', '8'], correctAnswer: 1, explanation: 'a_3 = 2(3) + 1 = 7.' },
      { id: 'q2', text: 'En una progresión aritmética con d = 3 y a_1 = 2, ¿cuál es a_2?', options: ['5', '6', '1', '4'], correctAnswer: 0, explanation: 'a_2 = 2 + 3 = 5.' },
      { id: 'q3', text: 'Fórmula del término general de una Progresión Aritmética:', options: ['a_n = a_1 + (n-1)d', 'a_n = a_1 · rⁿ⁻¹', 'a_n = a_1 + n·d', 'a_n = n·d'], correctAnswer: 0, explanation: 'Fórmula estándar de la PA.' },
      { id: 'q4', text: 'En una progresión geométrica con r = 2 y a_1 = 3, ¿cuál es a_2?', options: ['5', '6', '8', '9'], correctAnswer: 1, explanation: 'a_2 = 3 · 2 = 6.' },
      { id: 'q5', text: 'La sucesión 2, 4, 6, 8, 10... es una:', options: ['Progresión Aritmética (d=2)', 'Progresión Geométrica (r=2)', 'Sucesión de Fibonacci', 'Sucesión oscilante'], correctAnswer: 0, explanation: 'Se suma 2 a cada término.' },
      { id: 'q6', text: 'La sucesión 3, 9, 27, 81... es una:', options: ['Progresión Aritmética (d=6)', 'Progresión Geométrica (r=3)', 'Progresión Aritmética (d=3)', 'Sucesión constante'], correctAnswer: 1, explanation: 'Se multiplica por 3 en cada paso.' },
      { id: 'q7', text: 'Calcula la diferencia (d) en la PA: 10, 7, 4, 1...', options: ['3', '-3', '7', '-4'], correctAnswer: 1, explanation: '7 - 10 = -3.' },
      { id: 'q8', text: 'Calcula la razón (r) en la PG: 5, 10, 20, 40...', options: ['2', '5', '10', '1/2'], correctAnswer: 0, explanation: '10 / 5 = 2.' },
      { id: 'q9', text: 'Suma de los n primeros términos de una PA:', options: ['S_n = (a_1 + a_n)·n / 2', 'S_n = a_1 · n', 'S_n = (a_1 - a_n) / 2', 'S_n = a_n · d'], correctAnswer: 0, explanation: 'Fórmula clásica descubierta por Gauss.' },
      { id: 'q10', text: 'Calcula el 5º término de la PA: 1, 4, 7, 10...', options: ['12', '13', '14', '15'], correctAnswer: 1, explanation: 'a_5 = 10 + 3 = 13.' },
      { id: 'q11', text: 'En la sucesión de Fibonacci 1, 1, 2, 3, 5, 8... el siguiente término es:', options: ['11', '13', '10', '12'], correctAnswer: 1, explanation: '5 + 8 = 13.' },
      { id: 'q12', text: 'Fórmula del término general de una Progresión Geométrica:', options: ['a_n = a_1 · rⁿ⁻¹', 'a_n = a_1 + (n-1)r', 'a_n = a_1 · rⁿ', 'a_n = rⁿ'], correctAnswer: 0, explanation: 'Fórmula estándar de la PG.' },
      { id: 'q13', text: 'Suma de una PG ilimitada con |r| < 1:', options: ['S = a_1 / (1 - r)', 'S = a_1 / (r - 1)', 'S = a_1 · r', 'S = ∞'], correctAnswer: 0, explanation: 'Fórmula de la suma infinita convergerte.' },
      { id: 'q14', text: 'En una PA con a_1 = 5 y d = 4, halla a_10:', options: ['41', '45', '36', '40'], correctAnswer: 0, explanation: 'a_10 = 5 + (9 · 4) = 5 + 36 = 41.' },
      { id: 'q15', text: 'En una PG con a_1 = 16 y r = 1/2, halla a_3:', options: ['8', '4', '2', '1'], correctAnswer: 1, explanation: 'a_3 = 16 · (1/2)² = 16 / 4 = 4.' },
      { id: 'q16', text: 'Una sucesión dada por recurrencia se caracteriza por:', options: ['Calcular cada término usando los anteriores', 'Tener infinitos términos iguales', 'Ser siempre creciente', 'No tener fórmula'], correctAnswer: 0, explanation: 'Definición de sucesión recurrente.' },
      { id: 'q17', text: 'Si la diferencia d > 0 en una PA, la sucesión es:', options: ['Creciente', 'Decreciente', 'Constante', 'Alternada'], correctAnswer: 0, explanation: 'Los términos van aumentando su valor.' },
      { id: 'q18', text: 'Si la razón 0 < r < 1 en una PG de términos positivos, la sucesión es:', options: ['Decreciente', 'Creciente', 'Constante', 'Negativa'], correctAnswer: 0, explanation: 'Los términos se hacen cada vez más pequeños.' },
      { id: 'q19', text: 'Calcula a_4 para la sucesión a_n = n²:', options: ['8', '16', '12', '4'], correctAnswer: 1, explanation: 'a_4 = 4² = 16.' },
      { id: 'q20', text: 'Calcula la suma de los 5 primeros términos de la PA: 1, 2, 3, 4, 5', options: ['15', '10', '20', '12'], correctAnswer: 0, explanation: '(1 + 5)·5 / 2 = 30 / 2 = 15.' }
    ]
  },

  // 6. FUNCIONES Y GRÁFICAS
  {
    id: 'quiz-3eso-funciones-y-graficas',
    topicId: 'funciones-y-graficas',
    title: 'Autoevaluación: Funciones y Gráficas',
    description: '20 preguntas sobre dominio, recorrido, continuidad, recta, pendiente y parábola.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Una relación es función si a cada elemento del dominio le corresponde:', options: ['Un único elemento del conjunto final', 'Dos elementos', 'Infinitos elementos', 'Ningún elemento'], correctAnswer: 0, explanation: 'Definición fundamental de función.' },
      { id: 'q2', text: 'Dominio de la función polinómica f(x) = 2x + 1:', options: ['Todos los reales (R)', 'Solo positivos', 'R excepto el 0', 'Solo enteros'], correctAnswer: 0, explanation: 'Los polinomios están definidos para todo número real.' },
      { id: 'q3', text: 'El punto de corte con el eje Y de la recta y = 3x - 2 es:', options: ['(0, -2)', '(0, 3)', '(-2, 0)', '(3, 0)'], correctAnswer: 0, explanation: 'Para x = 0, y = -2.' },
      { id: 'q4', text: 'En la recta y = m x + n, la letra "m" representa:', options: ['La pendiente', 'La ordenada en el origen', 'El dominio', 'La raíz'], correctAnswer: 0, explanation: 'm indica la inclinación de la recta.' },
      { id: 'q5', text: 'Una función lineal que pasa por el origen (0,0) tiene la forma:', options: ['y = m x', 'y = m x + n', 'y = x²', 'y = n'], correctAnswer: 0, explanation: 'No tiene término independiente n.' },
      { id: 'q6', text: 'Una función afín tiene la forma general:', options: ['y = m x + n', 'y = m x', 'y = a x²', 'y = k/x'], correctAnswer: 0, explanation: 'Incluye pendiente m y ordenada en el origen n.' },
      { id: 'q7', text: 'Si la pendiente m > 0, la recta es:', options: ['Creciente', 'Decreciente', 'Horizontal', 'Vertical'], correctAnswer: 0, explanation: 'Aumenta "y" al aumentar "x".' },
      { id: 'q8', text: 'Si m = 0, la recta y = n es:', options: ['Horizontal', 'Vertical', 'Creciente', 'Decreciente'], correctAnswer: 0, explanation: 'Es una función constante.' },
      { id: 'q9', text: 'Dos rectas son paralelas si tienen:', options: ['La misma pendiente', 'La misma ordenada en el origen', 'Pendientes opuestas', 'Suma de pendientes igual a 0'], correctAnswer: 0, explanation: 'Tienen la misma inclinación.' },
      { id: 'q10', text: 'El vértice de la parábola y = x² es:', options: ['(0,0)', '(1,1)', '(0,1)', '(1,0)'], correctAnswer: 0, explanation: 'Punto mínimo en el origen.' },
      { id: 'q11', text: 'La parábola y = -x² + 4 se abre hacia:', options: ['Abajo', 'Arriba', 'La derecha', 'La izquierda'], correctAnswer: 0, explanation: 'Coeficiente a = -1 < 0 (cóncava hacia abajo).' },
      { id: 'q12', text: 'Puntos de corte con el eje X de y = x² - 9:', options: ['(-3,0) y (3,0)', '(0,9)', '(9,0)', 'No tiene'], correctAnswer: 0, explanation: 'x² - 9 = 0 → x = ±3.' },
      { id: 'q13', text: 'Una función es continua si:', options: ['Su gráfica se puede dibujar de un solo trazo', 'Tiene saltos', 'Tiene infinitas ramas', 'Es siempre creciente'], correctAnswer: 0, explanation: 'No presenta interrupciones ni discontinuidades.' },
      { id: 'q14', text: 'El eje horizontal en los ejes cartesianos se llama:', options: ['Eje de abscisas (X)', 'Eje de ordenadas (Y)', 'Eje polar', 'Eje de alturas'], correctAnswer: 0, explanation: 'Definición del eje X.' },
      { id: 'q15', text: 'El eje vertical se conoce como:', options: ['Eje de ordenadas (Y)', 'Eje de abscisas (X)', 'Origen de coordenadas', 'Bisectriz'], correctAnswer: 0, explanation: 'Definición del eje Y.' },
      { id: 'q16', text: 'Calcula la imagen de x = 3 en f(x) = x² + 1:', options: ['10', '7', '9', '4'], correctAnswer: 0, explanation: 'f(3) = 3² + 1 = 10.' },
      { id: 'q17', text: 'Dominio de f(x) = 1 / x:', options: ['R - {0}', 'R', 'Solo x > 0', 'R - {1}'], correctAnswer: 0, explanation: 'No se puede dividir por cero.' },
      { id: 'q18', text: 'Una recta decreciente tiene pendiente:', options: ['Negativa (m < 0)', 'Positiva (m > 0)', 'Cero (m = 0)', 'Infinita'], correctAnswer: 0, explanation: 'Disminuye "y" al aumentar "x".' },
      { id: 'q19', text: 'El punto P(-2, 4) se ubica en el cuadrante:', options: ['Segundo (II)', 'Primero (I)', 'Tercero (III)', 'Cuarto (IV)'], correctAnswer: 0, explanation: 'x negativo, y positivo → Cuadrante II.' },
      { id: 'q20', text: 'Un máximo relativo es un punto donde la función pasa de:', options: ['Creciente a decreciente', 'Decreciente a creciente', 'Constante a creciente', 'Decreciente a constante'], correctAnswer: 0, explanation: 'Definición de máximo local.' }
    ]
  },

  // 7. GEOMETRÍA PLANA Y SEMEJANZA
  {
    id: 'quiz-3eso-geometria-plana-y-semejanza',
    topicId: 'geometria-plana-y-semejanza',
    title: 'Autoevaluación: Geometría Plana y Semejanza',
    description: '20 preguntas de Tales, Pitágoras, criterios de semejanza, escalas y áreas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'El Teorema de Tales establece que rectos paralelas cortadas por secantes determinan segmentos:', options: ['Proporcionales', 'Iguales', 'Perpendiculares', 'Inversos'], correctAnswer: 0, explanation: 'Base de la semejanza geométrica.' },
      { id: 'q2', text: 'Dos triángulos son semejantes si tienen sus ángulos:', options: ['Iguales y lados proporcionales', 'Diferentes', 'Sumados 360°', 'Todos de 90°'], correctAnswer: 0, explanation: 'Condición principal de semejanza.' },
      { id: 'q3', text: 'Si la razón de semejanza de longitud es k = 2, la razón entre sus áreas es:', options: ['2', '4', '8', '6'], correctAnswer: 1, explanation: 'La razón de áreas es k² = 2² = 4.' },
      { id: 'q4', text: 'Fórmula del Teorema de Pitágoras:', options: ['a² + b² = c²', 'a + b = c', 'a² - b² = c²', 'a·b = c²'], correctAnswer: 0, explanation: 'En un triángulo rectángulo: c1² + c2² = h².' },
      { id: 'q5', text: 'Calcula la hipotenusa de un triángulo rectángulo de catetos 3 cm y 4 cm:', options: ['5 cm', '7 cm', '6 cm', '25 cm'], correctAnswer: 0, explanation: '√(3² + 4²) = √(9 + 16) = √25 = 5 cm.' },
      { id: 'q6', text: 'Área de un triángulo de base 6 cm y altura 4 cm:', options: ['12 cm²', '24 cm²', '10 cm²', '18 cm²'], correctAnswer: 0, explanation: '(6 · 4) / 2 = 12 cm².' },
      { id: 'q7', text: 'Una escala 1:100 significa que 1 cm en el plano equivale en la realidad a:', options: ['100 cm (1 m)', '10 m', '100 m', '10 cm'], correctAnswer: 0, explanation: '100 cm = 1 metro.' },
      { id: 'q8', text: 'Área de un círculo de radio r:', options: ['π · r²', '2 · π · r', 'π · d', '4/3 · π · r³'], correctAnswer: 0, explanation: 'Fórmula clásica de área circular.' },
      { id: 'q9', text: 'Perímetro (longitud) de una circunferencia de radio r:', options: ['2 · π · r', 'π · r²', '4 · π · r', 'π · r'], correctAnswer: 0, explanation: 'Longitud = 2πr.' },
      { id: 'q10', text: 'La suma de los ángulos interiores de cualquier triángulo es:', options: ['180°', '360°', '90°', '270°'], correctAnswer: 0, explanation: 'Propiedad fundamental de los triángulos planos.' },
      { id: 'q11', text: 'La suma de los ángulos interiores de un cuadrilátero es:', options: ['360°', '180°', '540°', '720°'], correctAnswer: 0, explanation: '(4 - 2)·180° = 360°.' },
      { id: 'q12', text: 'Si la razón de semejanza es k = 3, la razón entre sus volúmenes es:', options: ['27', '9', '3', '81'], correctAnswer: 0, explanation: 'La razón de volúmenes es k³ = 3³ = 27.' },
      { id: 'q13', text: 'Un triángulo rectángulo tiene un ángulo obligatoriamente de:', options: ['90°', '60°', '180°', '45°'], correctAnswer: 0, explanation: 'Definición de triángulo rectángulo.' },
      { id: 'q14', text: 'Halla el cateto faltante si hipotenusa = 10 cm y un cateto = 6 cm:', options: ['8 cm', '4 cm', '64 cm', '12 cm'], correctAnswer: 0, explanation: '√(10² - 6²) = √(100 - 36) = √64 = 8 cm.' },
      { id: 'q15', text: 'La apotema de un polígono regular une el centro con:', options: ['El punto medio de un lado', 'Un vértice', 'Cualquier punto interior', 'El centro de la circunferencia exterior'], correctAnswer: 0, explanation: 'Definición de apotema.' },
      { id: 'q16', text: 'Área de un trapecio con bases B y b, y altura h:', options: ['(B + b)·h / 2', 'B · h', '(B - b)·h / 2', 'B · b · h'], correctAnswer: 0, explanation: 'Fórmula del área del trapecio.' },
      { id: 'q17', text: 'En un mapa a escala 1:50.000, 2 cm representan:', options: ['1 km', '10 km', '500 m', '5 km'], correctAnswer: 0, explanation: '2 · 50.000 = 100.000 cm = 1.000 m = 1 km.' },
      { id: 'q18', text: 'Ángulos opuestos por el vértice son siempre:', options: ['Iguales', 'Suplementarios (suman 180°)', 'Complementarios (suman 90°)', 'Diferentes'], correctAnswer: 0, explanation: 'Propiedad geométrica básica de rectas secantes.' },
      { id: 'q19', text: 'La diagonal de un cuadrado de lado L mide:', options: ['L √2', 'L / 2', '2L', 'L²'], correctAnswer: 0, explanation: 'Aplicando Pitágoras: √(L² + L²) = √(2L²) = L√2.' },
      { id: 'q20', text: 'Área de un rombo con diagonales D y d:', options: ['(D · d) / 2', 'D · d', 'D + d', '2(D + d)'], correctAnswer: 0, explanation: 'Fórmula del área del rombo.' }
    ]
  },

  // 8. ESTADÍSTICA Y PROBABILIDAD
  {
    id: 'quiz-3eso-estadistica-y-probabilidad',
    topicId: 'estadistica-y-probabilidad',
    title: 'Autoevaluación: Estadística y Probabilidad',
    description: '20 preguntas de medidas de centralización, dispersión, Laplace y eventos probables.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Calcula la media aritmética de 2, 4, 6 y 8:', options: ['5', '4', '6', '20'], correctAnswer: 0, explanation: '(2 + 4 + 6 + 8) / 4 = 20 / 4 = 5.' },
      { id: 'q2', text: 'La Moda en un conjunto de datos es:', options: ['El valor que más se repite', 'El valor central', 'El promedio de todos', 'La diferencia entre el mayor y menor'], correctAnswer: 0, explanation: 'Definición de moda.' },
      { id: 'q3', text: 'La Mediana del conjunto ordenado 1, 3, 5, 7, 9 es:', options: ['5', '3', '7', '25'], correctAnswer: 0, explanation: 'El dato central que divide la muestra en dos partes iguales.' },
      { id: 'q4', text: '¿Cuál de las siguientes es una variable cualitativa?', options: ['Color de ojos', 'Edad', 'Estatura', 'Número de hermanos'], correctAnswer: 0, explanation: 'Expresa una cualidad o atributo no numérico.' },
      { id: 'q5', text: '¿Cuál de las siguientes es una variable cuantitativa discreta?', options: ['Número de hermanos', 'Peso en kg', 'Temperatura', 'Estatura'], correctAnswer: 0, explanation: 'Toma valores enteros aislados.' },
      { id: 'q6', text: 'Regla de Laplace para calcular la probabilidad de un suceso:', options: ['Casos favorables / Casos posibles', 'Casos posibles / Casos favorables', 'Casos favorables · 100', 'Casos impares / Casos pares'], correctAnswer: 0, explanation: 'Fórmula clásica de probabilidad en sucesos equiprobables.' },
      { id: 'q7', text: 'Probabilidad de obtener un número par al lanzar un dado común de 6 caras:', options: ['1/2', '1/6', '1/3', '2/3'], correctAnswer: 0, explanation: '3 favorables (2, 4, 6) / 6 posibles = 1/2.' },
      { id: 'q8', text: 'La probabilidad del suceso seguro es:', options: ['1', '0', '0,5', '100'], correctAnswer: 0, explanation: 'Ocurre siempre (100% de probabilidad = 1).' },
      { id: 'q9', text: 'La probabilidad del suceso imposible es:', options: ['0', '1', '-1', '0,1'], correctAnswer: 0, explanation: 'Nunca puede ocurrir.' },
      { id: 'q10', text: 'El Rango o Recorrido en estadística es:', options: ['Diferencia entre el valor máximo y el valor mínimo', 'El valor medio', 'La suma de datos', 'El cuadrado de la varianza'], correctAnswer: 0, explanation: 'Medida de dispersión básica.' },
      { id: 'q11', text: 'La Desviación Típica es:', options: ['La raíz cuadrada de la Varianza', 'El cuadrado de la media', 'La diferencia entre media y moda', 'El rango dividido por n'], correctAnswer: 0, explanation: 'σ = √Varianza.' },
      { id: 'q12', text: 'El Espacio Muestral al lanzar una moneda al aire es:', options: ['{Cara, Cruz}', '{Cara}', '{Cruz}', '{1, 2}'], correctAnswer: 0, explanation: 'Conjunto de todos los resultados posibles.' },
      { id: 'q13', text: 'Si P(A) es la probabilidad de un suceso, la probabilidad del suceso contrario P(no A) es:', options: ['1 - P(A)', 'P(A) / 2', '1 / P(A)', '-P(A)'], correctAnswer: 0, explanation: 'P(A) + P(no A) = 1.' },
      { id: 'q14', text: 'Un Histograma se utiliza para representar preferentemente:', options: ['Variables cuantitativas continuas agrupadas en intervalos', 'Variables cualitativas', 'Variables discretas aisladas', 'Sucesos imposibles'], correctAnswer: 0, explanation: 'Representación gráfica de intervalos de clase.' },
      { id: 'q15', text: 'Probabilidad de sacar un As en una baraja española de 40 cartas:', options: ['4/40 (1/10)', '1/40', '4/10', '1/4'], correctAnswer: 0, explanation: 'Hay 4 ases de 40 cartas posibles = 1/10.' },
      { id: 'q16', text: 'El suceso contrario a "sacar número par" al tirar un dado es:', options: ['Sacar número impar', 'Sacar un 6', 'Sacar un 0', 'Sacar múltiplo de 2'], correctAnswer: 0, explanation: 'El complemento exacto.' },
      { id: 'q17', text: 'La suma de las frecuencias relativas de todos los valores siempre es igual a:', options: ['1', '100', '0', 'El número total de datos'], correctAnswer: 0, explanation: 'Representa el total de la proporción (100% = 1).' },
      { id: 'q18', text: 'Si lanzas dos monedas, la probabilidad de obtener dos caras es:', options: ['1/4', '1/2', '3/4', '1/3'], correctAnswer: 0, explanation: 'Casos posibles: {CC, CX, XC, XX}. 1 de 4 es CC.' },
      { id: 'q19', text: 'En un gráfico de sectores, la suma de los ángulos de todas las porciones es:', options: ['360°', '180°', '100°', '90°'], correctAnswer: 0, explanation: 'Círculo completo.' },
      { id: 'q20', text: 'Si la varianza de una distribución es 16, su desviación típica es:', options: ['4', '256', '8', '2'], correctAnswer: 0, explanation: '√16 = 4.' }
    ]
  }
];