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

export const QUIZZES_2ESO: Quiz[] = [
  // 1. NÚMEROS ENTEROS Y DIVISIBILIDAD
  {
    id: 'quiz-2eso-numeros-enteros-y-divisibilidad',
    topicId: 'numeros-enteros-y-divisibilidad',
    title: 'Autoevaluación: Números Enteros y Divisibilidad',
    description: '20 preguntas de operaciones combinadas, MCD, MCM y divisibilidad.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Calcula: (-8) + (+5) - (-3)', options: ['-6', '0', '-10', '6'], correctAnswer: 1, explanation: '(-8) + 5 + 3 = 0.' },
      { id: 'q2', text: '¿Cuál es el valor absoluto de |-15|?', options: ['-15', '15', '0', '1'], correctAnswer: 1, explanation: 'Es la distancia al cero: 15.' },
      { id: 'q3', text: 'Calcula: (-4) · (-3) · (-2)', options: ['24', '-24', '12', '-12'], correctAnswer: 1, explanation: 'Signo negativo por número impar de factores negativos: -24.' },
      { id: 'q4', text: 'Resuelve: 12 - 3 · (4 - 7)', options: ['27', '21', '-27', '3'], correctAnswer: 1, explanation: '12 - 3 · (-3) = 12 + 9 = 21.' },
      { id: 'q5', text: '¿Cuál es el opuesto del opuesto de -9?', options: ['9', '-9', '0', '18'], correctAnswer: 1, explanation: 'Opuesto(-9) = 9; Opuesto(9) = -9.' },
      { id: 'q6', text: 'Calcula el MCD(24, 36).', options: ['6', '12', '72', '48'], correctAnswer: 1, explanation: '24=2³·3, 36=2²·3². MCD = 2²·3 = 12.' },
      { id: 'q7', text: 'Calcula el MCM(15, 20).', options: ['60', '30', '5', '300'], correctAnswer: 0, explanation: '15=3·5, 20=2²·5. MCM = 2²·3·5 = 60.' },
      { id: 'q8', text: '¿Cuál de estos números es primo?', options: ['91', '51', '47', '57'], correctAnswer: 2, explanation: '47 solo es divisible por 1 y 47.' },
      { id: 'q9', text: 'Un número es divisible por 3 si:', options: ['Termina en 3', 'Es par', 'La suma de sus cifras es múltiplo de 3', 'Termina en 0'], correctAnswer: 2, explanation: 'Criterio oficial del 3.' },
      { id: 'q10', text: 'Resuelve: (-20) : (-4) + (-2) · (-5)', options: ['-5', '15', '5', '-15'], correctAnswer: 1, explanation: '5 + 10 = 15.' },
      { id: 'q11', text: 'Calcula: (-3)³', options: ['9', '-9', '27', '-27'], correctAnswer: 3, explanation: 'Base negativa con exponente impar da negativo: -27.' },
      { id: 'q12', text: 'Calcula: √64 - √100', options: ['2', '-2', '-36', '18'], correctAnswer: 1, explanation: '8 - 10 = -2.' },
      { id: 'q13', text: 'Coincidencia de luces de 12 s y 18 s. ¿Cuándo coinciden?', options: ['36 s', '6 s', '72 s', '108 s'], correctAnswer: 0, explanation: 'MCM(12, 18) = 36.' },
      { id: 'q14', text: 'Cortar cuerdas de 20 m y 30 m en trozos iguales máximos:', options: ['5 m', '10 m', '60 m', '2 m'], correctAnswer: 1, explanation: 'MCD(20, 30) = 10 m.' },
      { id: 'q15', text: 'Si a = -2 y b = -3, calcula a² - b.', options: ['1', '7', '-1', '-7'], correctAnswer: 1, explanation: '(-2)² - (-3) = 4 + 3 = 7.' },
      { id: 'q16', text: 'Criterio de divisibilidad del 11:', options: ['Suma de cifras es 11', 'Termina en 11', 'Resta alternada de cifras par e impar es 0 o múltiplo de 11', 'Es impar'], correctAnswer: 2, explanation: 'Regla alternada de posiciones.' },
      { id: 'q17', text: 'Resuelve: -5 - [-3 + (-2 - 4)]', options: ['4', '-14', '-4', '14'], correctAnswer: 0, explanation: '-5 - [-3 - 6] = -5 - (-9) = 4.' },
      { id: 'q18', text: 'Menor múltiplo común positivo de 8 y 12:', options: ['96', '4', '24', '48'], correctAnswer: 2, explanation: 'MCM(8, 12) = 24.' },
      { id: 'q19', text: '¿Qué cifra falta en 4_2 para ser divisible por 9?', options: ['0', '3', '8', '5'], correctAnswer: 1, explanation: '4 + 3 + 2 = 9.' },
      { id: 'q20', text: 'Calcula: (-1)^50 + (-1)^51', options: ['0', '2', '-2', '1'], correctAnswer: 0, explanation: '1 + (-1) = 0.' }
    ]
  },

  // 2. FRACCIONES Y DECIMALES
  {
    id: 'quiz-2eso-fracciones-y-decimales',
    topicId: 'fracciones-y-decimales',
    title: 'Autoevaluación: Fracciones y Decimales',
    description: '20 preguntas sobre operaciones con fracciones, simplificación y números decimales.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Simplifica la fracción 24/36 a irreducible:', options: ['12/18', '2/3', '4/6', '3/2'], correctAnswer: 1, explanation: 'Dividiendo por MCD(24,36)=12 da 2/3.' },
      { id: 'q2', text: 'Calcula: 2/3 + 1/4', options: ['3/7', '11/12', '8/12', '5/12'], correctAnswer: 1, explanation: '8/12 + 3/12 = 11/12.' },
      { id: 'q3', text: 'Calcula: 3/5 · 10/9', options: ['30/45', '2/3', '1/3', '6/5'], correctAnswer: 1, explanation: '30/45 simplificado entre 15 es 2/3.' },
      { id: 'q4', text: 'Calcula: (3/4) : (5/2)', options: ['15/8', '3/10', '6/20', '8/15'], correctAnswer: 1, explanation: '(3·2)/(4·5) = 6/20 = 3/10.' },
      { id: 'q5', text: '¿Qué tipo de decimal es 2.333...?', options: ['Decimal exacto', 'Periódico puro', 'Periódico mixto', 'No decimal'], correctAnswer: 1, explanation: 'El período (3) empieza justo tras la coma.' },
      { id: 'q6', text: 'Convierte 0.75 a fracción irreducible:', options: ['75/100', '3/4', '15/20', '4/3'], correctAnswer: 1, explanation: '75/100 dividido por 25 = 3/4.' },
      { id: 'q7', text: 'Ordena de menor a mayor: 2/3, 3/4, 1/2.', options: ['1/2 < 2/3 < 3/4', '3/4 < 2/3 < 1/2', '2/3 < 1/2 < 3/4', '1/2 < 3/4 < 2/3'], correctAnswer: 0, explanation: '0.5 < 0.666... < 0.75.' },
      { id: 'q8', text: 'Los 2/5 de una clase de 30 alumnos son chicos. ¿Cuántos chicos hay?', options: ['12', '15', '18', '6'], correctAnswer: 0, explanation: '(30 : 5) · 2 = 12.' },
      { id: 'q9', text: 'Calcula: 1 - 2/3 · 3/4', options: ['1/4', '1/2', '1/3', '0'], correctAnswer: 1, explanation: '1 - 6/12 = 1 - 1/2 = 1/2.' },
      { id: 'q10', text: 'Fracción inversa de -4/7:', options: ['4/7', '-7/4', '7/4', '-1'], correctAnswer: 1, explanation: 'Se invierte manteniendo el signo.' },
      { id: 'q11', text: 'Calcula: 0.12 + 0.3', options: ['0.15', '0.42', '0.32', '0.45'], correctAnswer: 1, explanation: '0.12 + 0.30 = 0.42.' },
      { id: 'q12', text: '¿Qué decimal es 5/2?', options: ['2.5', '2.25', '0.4', '2.1'], correctAnswer: 0, explanation: '5 dividido entre 2 = 2.5.' },
      { id: 'q13', text: 'Si gasto 3/4 de mi dinero y me quedan 5€, ¿cuánto tenía?', options: ['15€', '20€', '25€', '10€'], correctAnswer: 1, explanation: '1/4 equivale a 5€, luego el total (4/4) es 20€.' },
      { id: 'q14', text: 'Calcula: (1/2 + 1/3) : 5/6', options: ['1', '25/36', '5/6', '1/2'], correctAnswer: 0, explanation: '(5/6) : (5/6) = 1.' },
      { id: 'q15', text: 'Indica el período del decimal 1.2535353...:', options: ['2', '253', '53', '35'], correctAnswer: 2, explanation: 'Las cifras que se repiten indefinidamente son 53.' },
      { id: 'q16', text: 'Calcula: 3.5 · 0.2', options: ['0.7', '7.0', '0.07', '0.35'], correctAnswer: 0, explanation: '35 · 2 / 100 = 0.7.' },
      { id: 'q17', text: 'Fracción equivalente a 4/5 con denominador 20:', options: ['16/20', '8/20', '12/20', '20/25'], correctAnswer: 0, explanation: '(4·4)/(5·4) = 16/20.' },
      { id: 'q18', text: 'Calcula: 1/2 - 1/3 + 1/6', options: ['1/3', '0', '1/6', '2/6'], correctAnswer: 0, explanation: '3/6 - 2/6 + 1/6 = 2/6 = 1/3.' },
      { id: 'q19', text: 'Calcula 0.8 : 0.04:', options: ['20', '2', '200', '0.2'], correctAnswer: 0, explanation: '80 : 4 = 20.' },
      { id: 'q20', text: '¿Cuál es el opuesto de 3/5?', options: ['-3/5', '5/3', '-5/3', '0'], correctAnswer: 0, explanation: 'Mismo valor absoluto con signo cambiado.' }
    ]
  },

  // 3. POTENCIAS Y RAÍCES
  {
    id: 'quiz-2eso-potencias-y-raices',
    topicId: 'potencias-y-raices',
    title: 'Autoevaluación: Potencias y Raíces',
    description: '20 preguntas sobre propiedades de las potencias y cálculo de raíces cuadradas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Calcula: 2³ · 2⁴', options: ['2¹²', '2⁷', '4⁷', '2¹'], correctAnswer: 1, explanation: 'Se suman exponentes: 3+4=7.' },
      { id: 'q2', text: 'Calcula: (3²)³', options: ['3⁵', '3⁶', '9³', '3⁸'], correctAnswer: 1, explanation: 'Se multiplican exponentes: 2·3=6.' },
      { id: 'q3', text: 'Calcula: 5⁶ : 5²', options: ['5³', '5⁴', '5⁸', '1⁴'], correctAnswer: 1, explanation: 'Se restan exponentes: 6-2=4.' },
      { id: 'q4', text: '¿A qué es igual 10⁻³?', options: ['0.001', '-1000', '0.01', '-0.001'], correctAnswer: 0, explanation: '1/1000 = 0.001.' },
      { id: 'q5', text: 'Cualquier número distinto de cero elevado a 0 es:', options: ['0', '1', 'El mismo número', 'Infinito'], correctAnswer: 1, explanation: 'a⁰ = 1.' },
      { id: 'q6', text: 'Calcula: (-2)⁴', options: ['-16', '16', '-8', '8'], correctAnswer: 1, explanation: 'Exponente par resulta en valor positivo: 16.' },
      { id: 'q7', text: 'Calcula: -2⁴', options: ['16', '-16', '8', '-8'], correctAnswer: 1, explanation: 'El menos no está en la base: -(2⁴) = -16.' },
      { id: 'q8', text: 'Expresa en notación científica: 450000', options: ['45 · 10⁴', '4.5 · 10⁵', '0.45 · 10⁶', '4.5 · 10⁻⁵'], correctAnswer: 1, explanation: 'Un solo dígito entero no nulo: 4.5 · 10⁵.' },
      { id: 'q9', text: 'Calcula: √(144 / 9)', options: ['4', '12/3', '16', '2'], correctAnswer: 0, explanation: '12 / 3 = 4.' },
      { id: 'q10', text: 'Calcula: √81 + √16', options: ['√97', '13', '97', '5'], correctAnswer: 1, explanation: '9 + 4 = 13.' },
      { id: 'q11', text: 'Resuelve: (2/3)⁻²', options: ['-4/9', '9/4', '4/9', '-9/4'], correctAnswer: 1, explanation: '(3/2)² = 9/4.' },
      { id: 'q12', text: 'Expresa en notación científica: 0.00032', options: ['3.2 · 10⁻⁴', '32 · 10⁻⁵', '3.2 · 10⁴', '0.32 · 10⁻³'], correctAnswer: 0, explanation: '3.2 · 10⁻⁴.' },
      { id: 'q13', text: 'Entre qué enteros está √50:', options: ['5 y 6', '6 y 7', '7 y 8', '8 y 9'], correctAnswer: 2, explanation: '√49=7 y √64=8.' },
      { id: 'q14', text: 'Calcula: 10⁵ · 10⁻²', options: ['10⁻¹⁰', '10³', '10⁻⁷', '10⁷'], correctAnswer: 1, explanation: '5 + (-2) = 3.' },
      { id: 'q15', text: 'Simplifica: (a · b)³', options: ['a³ · b', 'a³ · b³', 'a · b³', 'a³ + b³'], correctAnswer: 1, explanation: 'Potencia de un producto.' },
      { id: 'q16', text: 'Calcula: √(-25) en los números reales:', options: ['-5', '5', 'No existe en R', '0'], correctAnswer: 2, explanation: 'Raíz par de número negativo no existe en reales.' },
      { id: 'q17', text: 'Calcula: 2³ + 2²', options: ['2⁵', '12', '10', '16'], correctAnswer: 1, explanation: '8 + 4 = 12.' },
      { id: 'q18', text: 'Calcula: (10³)⁻¹', options: ['0.001', '1000', '-30', '10⁻²'], correctAnswer: 0, explanation: '10⁻³ = 0.001.' },
      { id: 'q19', text: 'Calcula: √0.09', options: ['0.03', '0.3', '0.003', '3'], correctAnswer: 1, explanation: '0.3 · 0.3 = 0.09.' },
      { id: 'q20', text: '¿Cuál es la raíz cúbica de -27?', options: ['3', '-3', 'No existe', '-9'], correctAnswer: 1, explanation: '(-3)³ = -27.' }
    ]
  },

  // 4. PROPORCIONALIDAD Y PORCENTAJES
  {
    id: 'quiz-2eso-proporcionalidad-y-porcentajes',
    topicId: 'proporcionalidad-y-porcentajes',
    title: 'Autoevaluación: Proporcionalidad y Porcentajes',
    description: '20 preguntas sobre regla de tres simple y compuesta, porcentajes e interés.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Si 3 kg de manzanas valen 6€, ¿cuánto valen 5 kg?', options: ['8€', '10€', '12€', '15€'], correctAnswer: 1, explanation: '1 kg vale 2€. 5 kg valen 10€.' },
      { id: 'q2', text: '4 obreros tardan 6 horas. ¿Cuánto tardan 3 obreros?', options: ['4.5 h', '8 h', '9 h', '5 h'], correctAnswer: 1, explanation: 'Proporcionalidad inversa: 4·6 = 3·x => x = 8h.' },
      { id: 'q3', text: 'Calcula el 15% de 200€:', options: ['15€', '30€', '25€', '35€'], correctAnswer: 1, explanation: '200 · 0.15 = 30€.' },
      { id: 'q4', text: 'Un abrigo cuesta 80€ y tiene un 20% de descuento. Precio final:', options: ['60€', '64€', '70€', '16€'], correctAnswer: 1, explanation: '80 · 0.80 = 64€.' },
      { id: 'q5', text: 'Si una camisa costaba 50€ y ahora vale 60€, ¿qué % aumentó?', options: ['10%', '20%', '15%', '25%'], correctAnswer: 1, explanation: 'Aumento de 10€ sobre 50€ = 10/50 = 20%.' },
      { id: 'q6', text: 'Expresa 0.35 como porcentaje:', options: ['3.5%', '35%', '0.35%', '350%'], correctAnswer: 1, explanation: '0.35 · 100 = 35%.' },
      { id: 'q7', text: 'Dos magnitudes son inversamente proporcionales si:', options: ['Al duplicar una, la otra se duplica', 'Al duplicar una, la otra se reduce a la mitad', 'Su resta es constante', 'Su suma es constante'], correctAnswer: 1, explanation: 'Definición de proporcionalidad inversa.' },
      { id: 'q8', text: 'En una clase de 25 alumnos aprueban 20. % de aprobados:', options: ['75%', '80%', '85%', '90%'], correctAnswer: 1, explanation: '(20/25) · 100 = 80%.' },
      { id: 'q9', text: 'Si el 40% de un número es 80, ¿cuál es el número?', options: ['160', '200', '320', '120'], correctAnswer: 1, explanation: '80 / 0.40 = 200.' },
      { id: 'q10', text: 'Un coche tarda 2h a 90 km/h. ¿A qué velocidad tardará 3h?', options: ['60 km/h', '135 km/h', '70 km/h', '80 km/h'], correctAnswer: 0, explanation: '2 · 90 = 3 · v => v = 60 km/h.' },
      { id: 'q11', text: 'Pagar 121€ con un 21% de IVA incluido. Precio sin IVA:', options: ['100€', '95.59€', '101€', '110€'], correctAnswer: 0, explanation: '121 / 1.21 = 100€.' },
      { id: 'q12', text: 'Reparto proporcional de 100€ a las edades de 2 y 3 años. El de 3 recibe:', options: ['40€', '60€', '50€', '70€'], correctAnswer: 1, explanation: 'Constante = 100/5 = 20. El de 3 recibe 20·3 = 60€.' },
      { id: 'q13', text: 'Un depósito se llena en 6h con 2 grifos. Con 3 grifos tardará:', options: ['9h', '4h', '3h', '5h'], correctAnswer: 1, explanation: '2 · 6 = 3 · t => t = 4h.' },
      { id: 'q14', text: '¿Qué porcentaje es 15 de 60?', options: ['20%', '25%', '30%', '15%'], correctAnswer: 1, explanation: '15 / 60 = 0.25 = 25%.' },
      { id: 'q15', text: 'Factor de incremento correspondiente a un aumento del 12%:', options: ['0.12', '1.12', '12', '1.2'], correctAnswer: 1, explanation: '1 + 0.12 = 1.12.' },
      { id: 'q16', text: 'Factor de decrecimiento correspondiente a un descuento del 15%:', options: ['0.15', '0.85', '1.15', '-0.15'], correctAnswer: 1, explanation: '1 - 0.15 = 0.85.' },
      { id: 'q17', text: 'Un producto de 100€ sube un 10% y luego baja un 10%. Precio final:', options: ['100€', '99€', '101€', '90€'], correctAnswer: 1, explanation: '100 · 1.10 · 0.90 = 99€.' },
      { id: 'q18', text: 'Escala 1:200. Si en el plano mide 3 cm, en la realidad mide:', options: ['6 m', '60 m', '600 cm', 'Opciones A y C son correctas'], correctAnswer: 3, explanation: '3 · 200 = 600 cm = 6 m.' },
      { id: 'q19', text: 'Interés simple de 1000€ al 5% durante 2 años:', options: ['100€', '50€', '1050€', '200€'], correctAnswer: 0, explanation: 'I = C·r·t = 1000·0.05·2 = 100€.' },
      { id: 'q20', text: '5 impresoras imprimen 100 hojas en 2 min. 10 impresoras tardarán:', options: ['1 min', '4 min', '2 min', '0.5 min'], correctAnswer: 0, explanation: 'Doble de impresoras implica mitad de tiempo = 1 min.' }
    ]
  },

  // 5. EXPRESIONES ALGEBRAICAS Y POLINOMIOS
  {
    id: 'quiz-2eso-expresiones-algebraicas-y-polinomios',
    topicId: 'expresiones-algebraicas-y-polinomios',
    title: 'Autoevaluación: Expresiones Algebraicas y Polinomios',
    description: '20 preguntas sobre monomios, polinomios e identidades notables.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Grado del monomio -5x²y³:', options: ['2', '3', '5', '-5'], correctAnswer: 2, explanation: 'Suma de exponentes: 2 + 3 = 5.' },
      { id: 'q2', text: 'Suma los monomios semejantes: 3x² + 5x²', options: ['8x⁴', '8x²', '15x²', '8x'], correctAnswer: 1, explanation: '(3+5)x² = 8x².' },
      { id: 'q3', text: 'Multiplica: (2x³) · (-4x²)', options: ['-8x⁶', '-8x⁵', '6x⁵', '-2x⁵'], correctAnswer: 1, explanation: '2·(-4) = -8; x³·x² = x⁵.' },
      { id: 'q4', text: 'Valor numérico de P(x) = 2x² - 3x + 1 para x = 2:', options: ['3', '5', '1', '7'], correctAnswer: 0, explanation: '2(4) - 3(2) + 1 = 8 - 6 + 1 = 3.' },
      { id: 'q5', text: 'Desarrolla el cuadrado de una suma: (x + 3)²', options: ['x² + 9', 'x² + 6x + 9', 'x² + 3x + 9', '2x + 6'], correctAnswer: 1, explanation: 'x² + 2(3)x + 3².' },
      { id: 'q6', text: 'Desarrolla: (2x - 5)²', options: ['4x² - 25', '4x² - 20x + 25', '2x² - 10x + 25', '4x² + 20x + 25'], correctAnswer: 1, explanation: '(2x)² - 2(2x)(5) + 5² = 4x² - 20x + 25.' },
      { id: 'q7', text: 'Calcula: (x + 4) · (x - 4)', options: ['x² - 8', 'x² - 16', 'x² + 16', 'x² - 8x - 16'], correctAnswer: 1, explanation: 'Suma por diferencia: x² - 16.' },
      { id: 'q8', text: 'Extrae factor común en: 6x³ - 9x²', options: ['3x(2x² - 3x)', '3x²(2x - 3)', 'x²(6x - 9)', '3(2x³ - 3x²)'], correctAnswer: 1, explanation: 'MCD de coeficientes 3 y menor exponente x².' },
      { id: 'q9', text: 'Dos monomios son semejantes si tienen:', options: ['Mismo coeficiente', 'Misma parte literal', 'Mismo grado sin importar variables', 'Signos opuestos'], correctAnswer: 1, explanation: 'Mismas letras con mismos exponentes.' },
      { id: 'q10', text: 'Grado del polinomio P(x) = 4x³ - 2x⁵ + 7:', options: ['3', '5', '8', '0'], correctAnswer: 1, explanation: 'El mayor exponente de x es 5.' },
      { id: 'q11', text: 'Resta: (5x² - 3x) - (2x² + 4x)', options: ['3x² + x', '3x² - 7x', '7x² + x', '3x² + 7x'], correctAnswer: 1, explanation: '5x² - 2x² - 3x - 4x = 3x² - 7x.' },
      { id: 'q12', text: 'Multiplica: 3x · (2x² - 4)', options: ['6x³ - 12x', '6x² - 12x', '5x³ - 7x', '6x³ - 4'], correctAnswer: 0, explanation: '3x·2x² - 3x·4 = 6x³ - 12x.' },
      { id: 'q13', text: 'Expresa en lenguaje algebraico: "El doble de un número más su triple":', options: ['x² + x³', '2x + 3x', '2(x + 3)', '2x · 3x'], correctAnswer: 1, explanation: '2x + 3x = 5x.' },
      { id: 'q14', text: 'Coeficiente principal del polinomio -x⁴ + 3x² - 8:', options: ['1', '-1', '3', '-8'], correctAnswer: 1, explanation: 'Coeficiente del término de mayor grado (-x⁴ es -1).' },
      { id: 'q15', text: 'Término independiente de P(x) = 3x² - 5x + 6:', options: ['3', '-5', '6', '0'], correctAnswer: 2, explanation: 'Término sin x: 6.' },
      { id: 'q16', text: 'Factoriza usando identidad notable: x² - 25', options: ['(x-5)²', '(x+5)(x-5)', '(x+25)(x-1)', '(x+5)²'], correctAnswer: 1, explanation: 'Suma por diferencia.' },
      { id: 'q17', text: 'Factoriza: x² - 6x + 9', options: ['(x-3)²', '(x+3)²', '(x-9)(x+1)', '(x-3)(x+3)'], correctAnswer: 0, explanation: 'Cuadrado de una diferencia: (x-3)².' },
      { id: 'q18', text: 'Divide: 12x⁴ : 3x', options: ['4x⁴', '4x³', '9x³', '4x²'], correctAnswer: 1, explanation: '12/3 = 4; x⁴/x = x³.' },
      { id: 'q19', text: 'Valor numérico de -x² para x = -3:', options: ['9', '-9', '6', '-6'], correctAnswer: 1, explanation: '-((-3)²) = -(9) = -9.' },
      { id: 'q20', text: 'Simplifica: (2x)² / 4x', options: ['x', '2x', '4x', '1'], correctAnswer: 0, explanation: '4x² / 4x = x.' }
    ]
  },

  // 6. ECUACIONES DE 1º Y 2º GRADO
  {
    id: 'quiz-2eso-ecuaciones-de-1-y-2-grado',
    topicId: 'ecuaciones-de-1-y-2-grado',
    title: 'Autoevaluación: Ecuaciones de 1º y 2º Grado',
    description: '20 preguntas sobre resolución de ecuaciones lineales y cuadráticas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Resuelve: 2x + 5 = 15', options: ['x = 10', 'x = 5', 'x = 2.5', 'x = 20'], correctAnswer: 1, explanation: '2x = 10 => x = 5.' },
      { id: 'q2', text: 'Resuelve: 3(x - 2) = 12', options: ['x = 6', 'x = 4', 'x = 14/3', 'x = 2'], correctAnswer: 0, explanation: '3x - 6 = 12 => 3x = 18 => x = 6.' },
      { id: 'q3', text: 'Resuelve: 5x - 3 = 2x + 9', options: ['x = 2', 'x = 4', 'x = 12/7', 'x = -4'], correctAnswer: 1, explanation: '3x = 12 => x = 4.' },
      { id: 'q4', text: 'Resuelve la ecuación de 2º grado incompleta: x² - 9 = 0', options: ['x = 3', 'x = ±3', 'x = 81', 'x = 9'], correctAnswer: 1, explanation: 'x² = 9 => x = ±√9 = ±3.' },
      { id: 'q5', text: 'Resuelve: x² - 5x = 0', options: ['x = 5', 'x = 0 y x = 5', 'x = 0 y x = -5', 'x = 25'], correctAnswer: 1, explanation: 'x(x - 5) = 0 => x=0 o x=5.' },
      { id: 'q6', text: 'Discriminante (b² - 4ac) de x² - 4x + 4 = 0:', options: ['16', '0', '-16', '8'], correctAnswer: 1, explanation: '(-4)² - 4(1)(4) = 16 - 16 = 0.' },
      { id: 'q7', text: 'Si el discriminante de una ecuación cuadrática es negativo:', options: ['Tiene 2 soluciones reales', 'Tiene 1 solución real', 'No tiene solución real', 'Tiene infinitas soluciones'], correctAnswer: 2, explanation: 'No se puede calcular √negativa en R.' },
      { id: 'q8', text: 'Soluciones de x² - 5x + 6 = 0:', options: ['x=2, x=3', 'x=-2, x=-3', 'x=1, x=6', 'x=-1, x=-6'], correctAnswer: 0, explanation: 'Fórmula general da 2 y 3.' },
      { id: 'q9', text: 'Resuelve con denominador: x/2 + x/3 = 5', options: ['x = 5', 'x = 6', 'x = 10', 'x = 12'], correctAnswer: 1, explanation: '3x + 2x = 30 => 5x = 30 => x = 6.' },
      { id: 'q10', text: 'Un número más su triple suman 40. ¿Cuál es el número?', options: ['10', '20', '8', '12'], correctAnswer: 0, explanation: 'x + 3x = 40 => 4x = 40 => x = 10.' },
      { id: 'q11', text: 'Resuelve: 2(x + 1) - 3 = x + 5', options: ['x = 6', 'x = 4', 'x = 2', 'x = -6'], correctAnswer: 0, explanation: '2x + 2 - 3 = x + 5 => 2x - 1 = x + 5 => x = 6.' },
      { id: 'q12', text: 'Ecuación equivalente a 2x = 8:', options: ['x + 1 = 5', '3x = 10', 'x - 2 = 4', 'x/2 = 4'], correctAnswer: 0, explanation: 'Ambas tienen solución x = 4.' },
      { id: 'q13', text: 'Soluciones de 2x² = 32:', options: ['x = 16', 'x = ±4', 'x = ±8', 'x = 4'], correctAnswer: 1, explanation: 'x² = 16 => x = ±4.' },
      { id: 'q14', text: 'El producto de dos números consecutivos es 20. Ecuación:', options: ['x + (x+1) = 20', 'x(x+1) = 20', '2x + 1 = 20', 'x² = 20'], correctAnswer: 1, explanation: 'Traducción directa.' },
      { id: 'q15', text: 'Resuelve: 0x = 5', options: ['x = 0', 'x = 5', 'Sin solución', 'Infinitas soluciones'], correctAnswer: 2, explanation: 'Ningún número multiplicado por 0 da 5.' },
      { id: 'q16', text: 'Resuelve: 0x = 0', options: ['x = 0', 'Sin solución', 'Infinitas soluciones', 'x = 1'], correctAnswer: 2, explanation: 'Cualquier número real es solución (identidad).' },
      { id: 'q17', text: 'Solución de 3x + 9 = 0:', options: ['x = 3', 'x = -3', 'x = 1/3', 'x = -1/3'], correctAnswer: 1, explanation: '3x = -9 => x = -3.' },
      { id: 'q18', text: 'Soluciones de x² + 1 = 0:', options: ['x = ±1', 'x = 1', 'No tiene solución real', 'x = 0'], correctAnswer: 2, explanation: 'x² = -1 no tiene raíz real.' },
      { id: 'q19', text: 'Si el área de un cuadrado es 49 cm², su lado x cumple:', options: ['4x = 49', 'x² = 49', '2x = 49', 'x + 4 = 49'], correctAnswer: 1, explanation: 'Área = lado² => x² = 49 (x = 7 cm).' },
      { id: 'q20', text: 'Resuelve: (x - 3)(x + 2) = 0', options: ['x = 3 y x = -2', 'x = -3 y x = 2', 'x = 6', 'x = 1'], correctAnswer: 0, explanation: 'Un factor debe ser cero.' }
    ]
  },

  // 7. SISTEMAS DE ECUACIONES
  {
    id: 'quiz-2eso-sistemas-de-ecuaciones',
    topicId: 'sistemas-de-ecuaciones',
    title: 'Autoevaluación: Sistemas de Ecuaciones',
    description: '20 preguntas sobre sistemas lineales de dos ecuaciones con dos incógnitas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: '¿Cuál es la solución del sistema x+y=5; x-y=1?', options: ['x=3, y=2', 'x=2, y=3', 'x=4, y=1', 'x=5, y=0'], correctAnswer: 0, explanation: 'Sumando ambas: 2x = 6 => x = 3; y = 2.' },
      { id: 'q2', text: 'El método de sustitución consiste en:', options: ['Sumar las dos ecuaciones', 'Despejar una incógnita en una ecuación y sustituir en la otra', 'Igualar las dos incógnitas despejadas', 'Graficar dos rectas'], correctAnswer: 1, explanation: 'Definición del método de sustitución.' },
      { id: 'q3', text: 'El método de igualación consiste en:', options: ['Despejar la misma incógnita en ambas ecuaciones e igualar', 'Multiplicar por un número', 'Restar las ecuaciones', 'Sustituir x por 0'], correctAnswer: 0, explanation: 'Definición del método de igualación.' },
      { id: 'q4', text: 'Un sistema compatible determinado tiene:', options: ['Infinitas soluciones', 'Una única solución', 'Sin solución', 'Dos soluciones'], correctAnswer: 1, explanation: 'Las dos rectas se cortan en un único punto.' },
      { id: 'q5', text: 'Geométricamente, un sistema incompatible representa:', options: ['Dos rectas secantes', 'Dos rectas paralelas', 'La misma recta coincidente', 'Una circunferencia'], correctAnswer: 1, explanation: 'Al no tener puntos en común, son paralelas.' },
      { id: 'q6', text: 'Resuelve por reducción: 2x + y = 7; 2x - y = 1', options: ['x=2, y=3', 'x=3, y=1', 'x=1, y=5', 'x=4, y=-1'], correctAnswer: 0, explanation: 'Sumando: 4x = 8 => x = 2; 2(2)+y=7 => y = 3.' },
      { id: 'q7', text: 'Si 2x + 3y = 12 y x = 3, calcula y:', options: ['y = 2', 'y = 3', 'y = 1', 'y = 0'], correctAnswer: 0, explanation: '2(3) + 3y = 12 => 6 + 3y = 12 => 3y = 6 => y = 2.' },
      { id: 'q8', text: 'Dos números suman 20 y se diferencian en 4. Planteamiento:', options: ['x+y=20, x-y=4', 'x·y=20, x/y=4', '2x+y=20, x-y=4', 'x+y=24, x-y=20'], correctAnswer: 0, explanation: 'Traducción directa.' },
      { id: 'q9', text: 'Solución del sistema anterior (x+y=20, x-y=4):', options: ['x=12, y=8', 'x=10, y=10', 'x=14, y=6', 'x=16, y=4'], correctAnswer: 0, explanation: '2x = 24 => x = 12; y = 8.' },
      { id: 'q10', text: 'Si al resolver llegamos a 0x = 0, el sistema es:', options: ['Incompatible', 'Compatible Determinado', 'Compatible Indeterminado', 'Sin sentido'], correctAnswer: 2, explanation: 'Tiene infinitas soluciones.' },
      { id: 'q11', text: 'Si al resolver llegamos a 0x = 7, el sistema es:', options: ['Incompatible', 'Compatible Determinado', 'Compatible Indeterminado', 'Absurdo con solución 7'], correctAnswer: 0, explanation: 'Imposible, no tiene solución.' },
      { id: 'q12', text: 'Resuelve: x = 2y; x + y = 9', options: ['x=6, y=3', 'x=3, y=6', 'x=4, y=2', 'x=8, y=1'], correctAnswer: 0, explanation: '2y + y = 9 => 3y = 9 => y = 3; x = 6.' },
      { id: 'q13', text: 'Un sistema compatible indeterminado representa:', options: ['Dos rectas coincidentes', 'Dos rectas secantes', 'Dos rectas paralelas', 'Un punto'], correctAnswer: 0, explanation: 'Todos los puntos de la recta son soluciones.' },
      { id: 'q14', text: 'En un taller hay coches (4 ruedas) y motos (2 ruedas). Hay 10 vehículos y 32 ruedas. Nº de coches:', options: ['6', '4', '8', '5'], correctAnswer: 0, explanation: 'c + m = 10, 4c + 2m = 32 => c = 6, m = 4.' },
      { id: 'q15', text: 'Resuelve: 3x - y = 5; y = 1', options: ['x=2', 'x=3', 'x=1', 'x=0'], correctAnswer: 0, explanation: '3x - 1 = 5 => 3x = 6 => x = 2.' },
      { id: 'q16', text: 'Punto de corte de las rectas y = x y y = 2 - x:', options: ['(1, 1)', '(0, 2)', '(2, 0)', '(2, 2)'], correctAnswer: 0, explanation: 'x = 2 - x => 2x = 2 => x = 1, y = 1.' },
      { id: 'q17', text: 'Sustituye y=3x en x + 2y = 14:', options: ['x + 6x = 14', 'x + 5x = 14', '3x + 2x = 14', 'x + 6 = 14'], correctAnswer: 0, explanation: 'x + 2(3x) = 14 => 7x = 14.' },
      { id: 'q18', text: 'Comprueba si (2, -1) es solución de x + y = 1; 2x - y = 5:', options: ['Sí, de ambas', 'Solo de la primera', 'Solo de la segunda', 'De ninguna'], correctAnswer: 0, explanation: '2+(-1)=1 (Sí); 2(2)-(-1)=5 (Sí).' },
      { id: 'q19', text: 'Multiplica x - 2y = 3 por -2 para aplicar reducción:', options: ['-2x + 4y = -6', '-2x - 4y = 6', '-2x + 4y = 3', '2x - 4y = -6'], correctAnswer: 0, explanation: 'Afecta a todos los términos de la ecuación.' },
      { id: 'q20', text: 'Padre tiene el triple de edad que su hijo y suman 48 años. Edad del hijo:', options: ['12 años', '16 años', '10 años', '14 años'], correctAnswer: 0, explanation: '3h + h = 48 => 4h = 48 => h = 12.' }
    ]
  },

  // 8. FUNCIONES Y GRÁFICAS
  {
    id: 'quiz-2eso-funciones-y-graficas',
    topicId: 'funciones-y-graficas',
    title: 'Autoevaluación: Funciones y Gráficas',
    description: '20 preguntas sobre coordenadas, dominio, pendiente y representación gráfica.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'El punto A(-3, 4) se encuentra en el cuadrante:', options: ['I', 'II', 'III', 'IV'], correctAnswer: 1, explanation: 'x negativa, y positiva es Cuadrante II.' },
      { id: 'q2', text: 'El eje horizontal en los ejes cartesianos se llama:', options: ['Eje de ordenadas', 'Eje de abscisas', 'Eje Z', 'Eje principal'], correctAnswer: 1, explanation: 'Eje X o de abscisas.' },
      { id: 'q3', text: 'Forma general de una función lineal (que pasa por el origen):', options: ['y = mx + n', 'y = mx', 'y = ax²', 'x = c'], correctAnswer: 1, explanation: 'y = mx no tiene ordenada en el origen (n=0).' },
      { id: 'q4', text: 'En la función y = 3x - 2, la pendiente m vale:', options: ['-2', '3', '1', '3x'], correctAnswer: 1, explanation: 'Coeficiente de x: m = 3.' },
      { id: 'q5', text: 'En la función y = -2x + 5, la ordenada en el origen n es:', options: ['-2', '5', '2', '-5'], correctAnswer: 1, explanation: 'Término independiente: n = 5.' },
      { id: 'q6', text: 'Si la pendiente de una función es m < 0, la recta es:', options: ['Creciente', 'Decreciente', 'Horizontal', 'Vertical'], correctAnswer: 1, explanation: 'Pendiente negativa implica decreciente.' },
      { id: 'q7', text: 'Punto de corte de y = 2x - 6 con el eje Y:', options: ['(3, 0)', '(0, -6)', '(-6, 0)', '(0, 3)'], correctAnswer: 1, explanation: 'Para x = 0, y = -6 => (0, -6).' },
      { id: 'q8', text: 'Punto de corte de y = 2x - 6 con el eje X:', options: ['(3, 0)', '(0, -6)', '(-3, 0)', '(6, 0)'], correctAnswer: 0, explanation: 'Para y = 0, 2x = 6 => x = 3 => (3, 0).' },
      { id: 'q9', text: 'La gráfica de la función constante y = 4 es:', options: ['Recta vertical', 'Recta horizontal que pasa por (0,4)', 'Recta que pasa por el origen', 'Parábola'], correctAnswer: 1, explanation: 'Todos los puntos tienen coordenada y = 4.' },
      { id: 'q10', text: 'Si f(x) = x² - 1, calcula f(-2):', options: ['3', '-5', '5', '-3'], correctAnswer: 0, explanation: '(-2)² - 1 = 4 - 1 = 3.' },
      { id: 'q11', text: 'Una función es continua si:', options: ['Su gráfica no tiene saltos ni interrupciones', 'Es siempre creciente', 'Pasa por el origen', 'Tiene fórmula cuadrática'], correctAnswer: 0, explanation: 'Se puede dibujar de un solo trazo.' },
      { id: 'q12', text: 'Dos rectas son paralelas si tienen:', options: ['Misma ordenada en el origen', 'Misma pendiente', 'Pendientes opuestas', 'Misma tabla de valores'], correctAnswer: 1, explanation: 'm1 = m2 implica rectas paralelas.' },
      { id: 'q13', text: 'Pendiente de la recta que pasa por (0,0) y (2,6):', options: ['m = 3', 'm = 2', 'm = 6', 'm = 1/3'], correctAnswer: 0, explanation: 'm = (6-0)/(2-0) = 3.' },
      { id: 'q14', text: 'Dominio de una función es:', options: ['El conjunto de valores que toma la variable independiente X', 'El conjunto de valores de Y', 'El punto donde corta al eje Y', 'El máximo valor de la función'], correctAnswer: 0, explanation: 'Definición de Dominio.' },
      { id: 'q15', text: 'Variable independiente habitualmente se representa por:', options: ['y', 'x', 'm', 'n'], correctAnswer: 1, explanation: 'Variable x en el eje horizontal.' },
      { id: 'q16', text: '¿Pertenece el punto (2, 5) a la recta y = 3x - 1?', options: ['Sí', 'No', 'Solo si x=0', 'Depende del cuadrante'], correctAnswer: 0, explanation: '3(2) - 1 = 5. Cumple la ecuación.' },
      { id: 'q17', text: 'Gráfica de una función cuadrática y = ax² + bx + c:', options: ['Recta', 'Parábola', 'Hipérbola', 'Circunferencia'], correctAnswer: 1, explanation: 'Curva en forma de U o U invertida.' },
      { id: 'q18', text: 'Si la gráfica sube de izquierda a derecha, la función es:', options: ['Creciente', 'Decreciente', 'Constante', 'Incontinua'], correctAnswer: 0, explanation: 'Definición de crecimiento.' },
      { id: 'q19', text: 'Coordenadas del origen de coordenadas:', options: ['(1, 1)', '(0, 0)', '(1, 0)', '(0, 1)'], correctAnswer: 1, explanation: 'Punto donde se cruzan los dos ejes.' },
      { id: 'q20', text: 'Ecuación de la recta con m = -1 y n = 3:', options: ['y = -x + 3', 'y = x - 3', 'y = 3x - 1', 'y = -3x + 1'], correctAnswer: 0, explanation: 'y = mx + n => y = -1x + 3.' }
    ]
  },

  // 9. GEOMETRÍA PLANA Y TEOREMA DE PITÁGORAS
  {
    id: 'quiz-2eso-geometria-plana-y-pitagoras',
    topicId: 'geometria-plana-y-pitagoras',
    title: 'Autoevaluación: Geometría Plana y Pitágoras',
    description: '20 preguntas sobre polígonos, Teorema de Pitágoras y cálculo de áreas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Teorema de Pitágoras para catetos a, b e hipotenusa c:', options: ['a² + b² = c²', 'a + b = c', 'a² - b² = c²', 'c² + a² = b²'], correctAnswer: 0, explanation: 'Relación fundamental en triángulos rectángulos.' },
      { id: 'q2', text: 'Calcula la hipotenusa de un triángulo rectángulo de catetos 3 cm y 4 cm:', options: ['5 cm', '7 cm', '25 cm', '6 cm'], correctAnswer: 0, explanation: '√(3² + 4²) = √(9 + 16) = √25 = 5 cm.' },
      { id: 'q3', text: 'Si la hipotenusa mide 10 cm y un cateto 6 cm, el otro cateto mide:', options: ['4 cm', '8 cm', '64 cm', '12 cm'], correctAnswer: 1, explanation: '√(10² - 6²) = √(100 - 36) = √64 = 8 cm.' },
      { id: 'q4', text: 'Suma de los ángulos interiores de cualquier triángulo:', options: ['90°', '180°', '360°', '270°'], correctAnswer: 1, explanation: 'Propiedad universal en geometría euclídea.' },
      { id: 'q5', text: 'Área de un triángulo de base 8 cm y altura 5 cm:', options: ['40 cm²', '20 cm²', '13 cm²', '26 cm²'], correctAnswer: 1, explanation: '(base · altura) / 2 = (8 · 5) / 2 = 20 cm².' },
      { id: 'q6', text: 'Área de un círculo de radio r = 3 cm (considera π = 3.14):', options: ['18.84 cm²', '28.26 cm²', '9 cm²', '28.26 cm'], correctAnswer: 1, explanation: 'π · r² = 3.14 · 9 = 28.26 cm².' },
      { id: 'q7', text: 'Longitud de una circunferencia de radio r = 5 cm:', options: ['31.4 cm', '78.5 cm', '15.7 cm', '25 cm'], correctAnswer: 0, explanation: '2 · π · r = 2 · 3.14 · 5 = 31.4 cm.' },
      { id: 'q8', text: 'Área de un trapecio con bases B=10 cm, b=6 cm y altura h=4 cm:', options: ['32 cm²', '64 cm²', '24 cm²', '40 cm²'], correctAnswer: 0, explanation: '((B + b) · h) / 2 = ((16) · 4) / 2 = 32 cm².' },
      { id: 'q9', text: 'Área de un rombo con diagonales D=8 cm y d=6 cm:', options: ['48 cm²', '24 cm²', '14 cm²', '28 cm²'], correctAnswer: 1, explanation: '(D · d) / 2 = (8 · 6) / 2 = 24 cm².' },
      { id: 'q10', text: 'Un triángulo equilátero tiene:', options: ['3 lados y 3 ángulos iguales (60°)', '2 lados iguales', '3 lados desiguales', 'Un ángulo de 90°'], correctAnswer: 0, explanation: 'Definición de triángulo equilátero.' },
      { id: 'q11', text: 'Diagonal de un cuadrado de lado 1 cm:', options: ['2 cm', '√2 cm', '1.5 cm', '√3 cm'], correctAnswer: 1, explanation: '√(1² + 1²) = √2 cm.' },
      { id: 'q12', text: 'Suma de ángulos interiores de un pentágono regular:', options: ['360°', '540°', '720°', '180°'], correctAnswer: 1, explanation: '(n - 2) · 180° = (5 - 2) · 180° = 540°.' },
      { id: 'q13', text: 'Área de un polígono regular:', options: ['(Perímetro · Apotema) / 2', 'Perímetro · Lado', 'Base · Altura', 'Apotema²'], correctAnswer: 0, explanation: 'Fórmula general del área de polígonos regulares.' },
      { id: 'q14', text: 'El Teorema de Pitágoras solo se puede aplicar en triángulos:', options: ['Acutángulos', 'Obtusángulos', 'Rectángulos', 'Cualquiera'], correctAnswer: 2, explanation: 'Requiere obligatoriamente un ángulo recto (90°).' },
      { id: 'q15', text: 'En un triángulo rectángulo, los lados que forman el ángulo recto se llaman:', options: ['Hipotenusas', 'Catetos', 'Apotemas', 'Diagonales'], correctAnswer: 1, explanation: 'Definición de catetos.' },
      { id: 'q16', text: 'Área de un rectángulo de lados 6 cm y 4 cm:', options: ['24 cm²', '20 cm²', '10 cm²', '12 cm²'], correctAnswer: 0, explanation: 'Base · Altura = 6 · 4 = 24 cm².' },
      { id: 'q17', text: 'Área de un sector circular de 90° en un círculo de radio 2 cm:', options: ['π cm²', '2π cm²', '4π cm²', '0.5π cm²'], correctAnswer: 0, explanation: '(π · r² · 90) / 360 = (π · 4) / 4 = π cm².' },
      { id: 'q18', text: 'Triángulo inscatable con lados 2 cm, 3 cm y 6 cm porque:', options: ['Suma de los dos menores debe ser mayor que el tercero', 'Es rectángulo', 'Tiene lados pares', 'No tiene apotema'], correctAnswer: 0, explanation: 'Desigualdad triangular: 2 + 3 = 5 < 6.' },
      { id: 'q19', text: 'Ángulo central de un hexágono regular:', options: ['60°', '90°', '45°', '120°'], correctAnswer: 0, explanation: '360° / 6 = 60°.' },
      { id: 'q20', text: 'Perímetro de un hexágono regular de lado 5 cm:', options: ['25 cm', '30 cm', '35 cm', '20 cm'], correctAnswer: 1, explanation: '6 · 5 = 30 cm.' }
    ]
  },

  // 10. CUERPOS GEOMÉTRICOS: ÁREAS Y VOLÚMENES
  {
    id: 'quiz-2eso-cuerpos-geometricos-areas-y-volumenes',
    topicId: 'cuerpos-geometricos-areas-y-volumenes',
    title: 'Autoevaluación: Cuerpos Geométricos',
    description: '20 preguntas sobre prismas, pirámides, cilindros, conos y esferas.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'Volumen de un cubo de arista a = 3 cm:', options: ['9 cm³', '27 cm³', '18 cm³', '54 cm³'], correctAnswer: 1, explanation: 'a³ = 3³ = 27 cm³.' },
      { id: 'q2', text: 'Área total de un cubo de arista a = 2 cm:', options: ['24 cm²', '16 cm²', '8 cm²', '12 cm²'], correctAnswer: 0, explanation: '6 caras · a² = 6 · 4 = 24 cm².' },
      { id: 'q3', text: 'Volumen de un ortoedro de dimensiones 2 cm, 3 cm y 4 cm:', options: ['24 cm³', '9 cm³', '18 cm³', '48 cm³'], correctAnswer: 0, explanation: 'Largo · Ancho · Alto = 2 · 3 · 4 = 24 cm³.' },
      { id: 'q4', text: 'Volumen general de un prisma:', options: ['Área base · Altura', '(Área base · Altura) / 3', '2 · Área base · Altura', 'Perímetro base · Altura'], correctAnswer: 0, explanation: 'V = A_base · h.' },
      { id: 'q5', text: 'Volumen de una pirámide:', options: ['Área base · Altura', '(Área base · Altura) / 3', '(Área base · Altura) / 2', '2 · Área base · Altura'], correctAnswer: 1, explanation: 'Un tercio del volumen del prisma equivalente.' },
      { id: 'q6', text: 'Volumen de un cilindro de radio r = 2 cm y altura h = 5 cm (π = 3.14):', options: ['62.8 cm³', '31.4 cm³', '20 cm³', '125.6 cm³'], correctAnswer: 0, explanation: 'π · r² · h = 3.14 · 4 · 5 = 62.8 cm³.' },
      { id: 'q7', text: 'Volumen de un cono respecto al de un cilindro con misma base y altura:', options: ['El doble', 'La tercera parte', 'La mitad', 'El triple'], correctAnswer: 1, explanation: 'V_cono = (π · r² · h) / 3.' },
      { id: 'q8', text: 'Volumen de una esfera de radio r:', options: ['4/3 · π · r³', '4 · π · r²', '2/3 · π · r³', 'π · r³'], correctAnswer: 0, explanation: 'Fórmula clásica del volumen esférico.' },
      { id: 'q9', text: 'Área de la superficie de una esfera de radio r = 3 cm (π = 3.14):', options: ['113.04 cm²', '37.68 cm²', '28.26 cm²', '56.52 cm²'], correctAnswer: 0, explanation: '4 · π · r² = 4 · 3.14 · 9 = 113.04 cm².' },
      { id: 'q10', text: 'Fórmula de Euler para poliedros simples (Caras + Vértices = ...):', options: ['Aristas + 2', 'Aristas - 2', '2 · Aristas', 'Aristas'], correctAnswer: 0, explanation: 'C + V = A + 2.' },
      { id: 'q11', text: 'Un tetraedro regular tiene:', options: ['4 caras triangulares equiláteras', '6 caras cuadradas', '8 caras triangulares', '12 caras'], correctAnswer: 0, explanation: 'Poliedro regular de 4 caras.' },
      { id: 'q12', text: 'Generatriz g, altura h y radio r de un cono cumplen:', options: ['g² = h² + r²', 'g = h + r', 'h² = g² + r²', 'r² = g² + h²'], correctAnswer: 0, explanation: 'Forman un triángulo rectángulo internamente.' },
      { id: 'q13', text: '¿Cuántas aristas tiene un prisma hexagonal?', options: ['12', '18', '6', '24'], correctAnswer: 1, explanation: '6 en la base superior, 6 en la inferior y 6 laterales = 18.' },
      { id: 'q14', text: '¿Cuántos vértices tiene una pirámide pentagonal?', options: ['5', '6', '10', '12'], correctAnswer: 1, explanation: '5 en la base + 1 cúspide = 6.' },
      { id: 'q15', text: '1 litro equivale exactamente a:', options: ['1 cm³', '1 dm³', '1 m³', '100 cm³'], correctAnswer: 1, explanation: 'Equivalencia oficial volumen-capacidad.' },
      { id: 'q16', text: '¿Cuántos litros caben en un depósito de 2 m³?', options: ['200 L', '2000 L', '20 L', '20000 L'], correctAnswer: 1, explanation: '2 m³ = 2000 dm³ = 2000 L.' },
      { id: 'q17', text: 'Cuerpo de revolución generado al girar un rectángulo sobre un lado:', options: ['Cono', 'Cilindro', 'Esfera', 'Prisma'], correctAnswer: 1, explanation: 'Definición de cilindro de revolución.' },
      { id: 'q18', text: 'Cuerpo de revolución generado al girar un semicírculo sobre su diámetro:', options: ['Esfera', 'Cilindro', 'Cono', 'Toro'], correctAnswer: 0, explanation: 'Generación de la esfera.' },
      { id: 'q19', text: 'Área lateral de un cilindro de radio r y altura h:', options: ['2 · π · r · h', 'π · r² · h', '2 · π · r', 'π · r · h'], correctAnswer: 0, explanation: 'Desarrollo plano es un rectángulo de base 2πr y altura h.' },
      { id: 'q20', text: 'Un octaedro regular tiene:', options: ['8 caras triangulares', '8 caras cuadradas', '6 caras', '10 caras'], correctAnswer: 0, explanation: 'Poliedro regular de 8 triángulos equiláteros.' }
    ]
  },

  // 11. ESTADÍSTICA Y PROBABILIDAD
  {
    id: 'quiz-2eso-estadistica-y-probabilidad',
    topicId: 'estadistica-y-probabilidad',
    title: 'Autoevaluación: Estadística y Probabilidad',
    description: '20 preguntas sobre variables, tablas, media, moda, mediana y regla de Laplace.',
    estimatedMinutes: 20,
    questions: [
      { id: 'q1', text: 'La variable "Color de ojos" es de tipo:', options: ['Cualitativa', 'Cuantitativa discreta', 'Cuantitativa continua', 'Aleatoria fija'], correctAnswer: 0, explanation: 'Expresa una cualidad o atributo no numérico.' },
      { id: 'q2', text: 'La variable "Número de hermanos" es de tipo:', options: ['Cualitativa', 'Cuantitativa discreta', 'Cuantitativa continua', 'Nominal'], correctAnswer: 1, explanation: 'Toma valores numéricos enteros aislados.' },
      { id: 'q3', text: 'La variable "Estatura en metros" es de tipo:', options: ['Cualitativa', 'Cuantitativa discreta', 'Cuantitativa continua', 'Ordinal'], correctAnswer: 2, explanation: 'Puede tomar cualquier valor dentro de un intervalo.' },
      { id: 'q4', text: 'Media aritmética del conjunto {2, 4, 6, 8}:', options: ['4', '5', '6', '20'], correctAnswer: 1, explanation: 'Suma (20) / Total (4) = 5.' },
      { id: 'q5', text: 'Moda del conjunto {1, 2, 2, 3, 4, 2, 5}:', options: ['2', '3', '2.7', '5'], correctAnswer: 0, explanation: 'El dato que más veces se repite es el 2 (3 veces).' },
      { id: 'q6', text: 'Mediana del conjunto ordenado {3, 5, 7, 9, 11}:', options: ['7', '5', '9', '35'], correctAnswer: 0, explanation: 'Dato que ocupa la posición central: 7.' },
      { id: 'q7', text: 'Mediana del conjunto {2, 4, 6, 8}:', options: ['4', '6', '5', '4.5'], correctAnswer: 2, explanation: 'Promedio de los dos centrales: (4 + 6) / 2 = 5.' },
      { id: 'q8', text: 'La frecuencia absoluta fi representa:', options: ['El número de veces que se repite un dato', 'El porcentaje del dato', 'La suma acumulada', 'El cociente fi/N'], correctAnswer: 0, explanation: 'Definición de frecuencia absoluta.' },
      { id: 'q9', text: 'Suma de todas las frecuencias relativas hi de una muestra:', options: ['100', '1', 'N', '0'], correctAnswer: 1, explanation: 'La suma de las proporciones siempre da 1.' },
      { id: 'q10', text: 'Regla de Laplace para calcular probabilidad P(A):', options: ['Casos favorables / Casos posibles', 'Casos posibles / Casos favorables', 'Casos favorables · Casos posibles', 'Frecuencia absoluta / 100'], correctAnswer: 0, explanation: 'Regla fundamental en sucesos equiprobables.' },
      { id: 'q11', text: 'Probabilidad de obtener un 5 al lanzar un dado de 6 caras:', options: ['1/5', '1/6', '5/6', '1/2'], correctAnswer: 1, explanation: '1 caso favorable entre 6 posibles.' },
      { id: 'q12', text: 'Probabilidad de obtener un número par al lanzar un dado común:', options: ['1/2', '1/6', '1/3', '3/4'], correctAnswer: 0, explanation: '3 favorables (2,4,6) de 6 posibles: 3/6 = 1/2.' },
      { id: 'q13', text: 'La probabilidad de un suceso seguro es:', options: ['0', '0.5', '1', '100'], correctAnswer: 2, explanation: 'P(Suceso seguro) = 1.' },
      { id: 'q14', text: 'La probabilidad de un suceso imposible es:', options: ['-1', '0', '0.1', '1'], correctAnswer: 1, explanation: 'P(Suceso imposible) = 0.' },
      { id: 'q15', text: 'Probabilidad de sacar un rey de una baraja española de 40 cartas:', options: ['4/40 = 1/10', '1/40', '4/10', '1/4'], correctAnswer: 0, explanation: '4 reyes de 40 cartas: 4/40 = 1/10.' },
      { id: 'q16', text: 'El rango o recorrido estadístico es:', options: ['Diferencia entre el valor máximo y el mínimo', 'Suma de los datos entre el total', 'Valor central', 'Dato más frecuente'], correctAnswer: 0, explanation: 'Medida de dispersión básica: Máx - Mín.' },
      { id: 'q17', text: 'Rango del conjunto {3, 12, 5, 20, 2}:', options: ['18', '20', '17', '10'], correctAnswer: 0, explanation: '20 - 2 = 18.' },
      { id: 'q18', text: 'Si lanzas dos monedas, la probabilidad de obtener dos caras es:', options: ['1/2', '1/4', '3/4', '1/3'], correctAnswer: 1, explanation: 'Casos posibles: {CC, CX, XC, XX}. Favorables {CC}: 1/4.' },
      { id: 'q19', text: 'Gráfico circular es adecuado para representar:', options: ['Porcentajes y sectores proporcionales', 'Evolución temporal continua', 'Solo variables cuantitativas continuas', 'Sistemas de ecuaciones'], correctAnswer: 0, explanation: 'Muestra la proporción de cada parte respecto al todo.' },
      { id: 'q20', text: 'Si la probabilidad de lluvia es 0.3, la probabilidad de que NO llueva es:', options: ['0.7', '0.3', '-0.3', '1.3'], correctAnswer: 0, explanation: 'P(No A) = 1 - P(A) = 1 - 0.3 = 0.7.' }
    ]
  }
];