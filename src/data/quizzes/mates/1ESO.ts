export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface QuizData {
  id: string;
  topicId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  questions: Question[];
}

export const QUIZZES_1ESO: QuizData[] = [
  // 1. CONJUNTOS NUMÉRICOS
  {
    id: 'quiz-1eso-conjuntos-numericos',
    topicId: 'mat-1eso-conjuntos-numericos',
    title: 'Autoevaluación: Conjuntos Numéricos',
    description: 'Test de 20 preguntas teóricas y prácticas sobre ℕ, ℤ, ℚ y la recta numérica.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: '¿A qué conjunto pertenece el número -5?', options: ['Números Naturales (ℕ)', 'Números Enteros (ℤ)', 'Solo a los irracionales', 'A ninguno'], correctOptionIndex: 1, explanation: 'Los enteros ℤ incluyen los números negativos sin decimales.' },
      { id: 2, text: 'El conjunto de los números naturales se representa con la letra:', options: ['ℤ', 'ℕ', 'ℚ', 'ℝ'], correctOptionIndex: 1, explanation: 'La letra ℕ representa a los números naturales (0, 1, 2, 3...).' },
      { id: 3, text: '¿Cuál de los siguientes números NO es un número entero?', options: ['-12', '0', '3.5', '8'], correctOptionIndex: 2, explanation: '3.5 tiene parte decimal, por lo que no es un número entero.' },
      { id: 4, text: 'Todo número natural (ℕ) es también un número:', options: ['Entero (ℤ)', 'Negativo', 'Decimal periódico', 'Impar'], correctOptionIndex: 0, explanation: 'El conjunto ℕ está totalmente contenido en el conjunto ℤ.' },
      { id: 5, text: '¿A qué conjunto pertenece la fracción 3/4?', options: ['Naturales (ℕ)', 'Racionales (ℚ)', 'Solo a los enteros', 'A ninguno'], correctOptionIndex: 1, explanation: 'Las fracciones forman parte del conjunto de los números racionales ℚ.' },
      { id: 6, text: 'El opuesto del número entero +8 es:', options: ['8', '-8', '1/8', '0'], correctOptionIndex: 1, explanation: 'El opuesto de un número tiene el mismo valor absoluto pero signo contrario.' },
      { id: 7, text: 'En la recta numérica, los números negativos se sitúan:', options: ['A la derecha del cero', 'A la izquierda del cero', 'Encima del cero', 'En cualquier lugar'], correctOptionIndex: 1, explanation: 'Los valores negativos disminuyen hacia la izquierda del origen (0).' },
      { id: 8, text: '¿El conjunto de los números naturales ℕ es finito o infinito?', options: ['Finito', 'Infinito', 'Tiene 100 elementos', 'Depende del curso'], correctOptionIndex: 1, explanation: 'No existe un último número natural, por lo que es infinito.' },
      { id: 9, text: 'Ordena de menor a mayor: -4, 0, 2', options: ['0 < -4 < 2', '-4 < 0 < 2', '2 < 0 < -4', '-4 < 2 < 0'], correctOptionIndex: 1, explanation: 'Los números negativos siempre son menores que el cero y que los positivos.' },
      { id: 10, text: '¿Cuál de estos números está más a la izquierda en la recta numérica?', options: ['-2', '-7', '0', '-1'], correctOptionIndex: 1, explanation: '-7 es el número menor, por lo que está más a la izquierda.' },
      { id: 11, text: 'El valor absoluto |-9| es igual a:', options: ['-9', '9', '0', '-1/9'], correctOptionIndex: 1, explanation: 'El valor absoluto representa una distancia y siempre es positivo o cero.' },
      { id: 12, text: '¿Qué conjunto contiene al cero, a los positivos y a los negativos enteros?', options: ['Naturales (ℕ)', 'Enteros (ℤ)', 'Primos', 'Impares'], correctOptionIndex: 1, explanation: 'Es la definición del conjunto ℤ.' },
      { id: 13, text: '¿Existe un primer número natural?', options: ['Sí, el 0 (o el 1 según convenio)', 'No, es infinito a la izquierda', 'El -1', 'El 100'], correctOptionIndex: 0, explanation: 'En el convenio escolar habitual, ℕ comienza en 0 o 1.' },
      { id: 14, text: 'Entre el -2 y el 3, ¿cuántos números ENTEROS existen?', options: ['Infinitos', '4 números (-1, 0, 1, 2)', '2 números', 'Ninguno'], correctOptionIndex: 1, explanation: 'Entre dos enteros hay una cantidad finita de enteros.' },
      { id: 15, text: '¿El número +15 pertenece a ℕ y a ℤ al mismo tiempo?', options: ['Sí, a ambos', 'Solo a ℕ', 'Solo a ℤ', 'A ninguno'], correctOptionIndex: 0, explanation: 'Al ser entero positivo, pertenece tanto a ℕ como a ℤ.' },
      { id: 16, text: '¿El número -0.25 es un número entero?', options: ['Sí', 'No', 'A veces', 'Solo en geometría'], correctOptionIndex: 1, explanation: 'No es entero porque posee parte decimal.' },
      { id: 17, text: '¿Qué representa la cardinalidad de un conjunto?', options: ['El número de elementos que posee', 'El signo de sus elementos', 'Su posición en la recta', 'Su valor absoluto'], correctOptionIndex: 0, explanation: 'La cardinalidad indica la cantidad total de elementos de un conjunto.' },
      { id: 18, text: 'Si a = -3, ¿cuánto vale -a?', options: ['-3', '3', '0', '-1/3'], correctOptionIndex: 1, explanation: '-(-3) = +3.' },
      { id: 19, text: '¿Cuál es el elemento neutro de la suma en ℤ?', options: ['1', '0', '-1', '10'], correctOptionIndex: 1, explanation: 'Sumar 0 a cualquier número no altera su valor.' },
      { id: 20, text: 'El conjunto ℤ⁻ representa a:', options: ['Los enteros positivos', 'Los enteros negativos', 'Los números con coma', 'Los ceros'], correctOptionIndex: 1, explanation: 'ℤ⁻ es la notación para el subconjunto de enteros negativos.' }
    ]
  },

  // 2. NÚMEROS NATURALES Y DIVISIBILIDAD
  {
    id: 'quiz-1eso-numeros-naturales-y-divisibilidad',
    topicId: 'mat-1eso-numeros-naturales-y-divisibilidad',
    title: 'Autoevaluación: Números Naturales y Divisibilidad',
    description: 'Jerarquía de operaciones, MCD, MCM, potencias y criterios de divisibilidad.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'Calcula: 4 + 2 · 5 - 3', options: ['27', '11', '15', '9'], correctOptionIndex: 1, explanation: 'Prioridad: 2·5=10 => 4+10-3=11.' },
      { id: 2, text: 'Un número es divisible por 3 si:', options: ['Termina en 3', 'La suma de sus cifras es múltiplo de 3', 'Es par', 'Termina en 0'], correctOptionIndex: 1, explanation: 'Criterio oficial de divisibilidad del 3.' },
      { id: 3, text: 'El m.c.m. de 12 y 18 es:', options: ['6', '36', '72', '108'], correctOptionIndex: 1, explanation: '12=2²·3, 18=2·3². m.c.m. = 2²·3² = 36.' },
      { id: 4, text: 'El m.c.d. de 20 y 30 es:', options: ['10', '5', '60', '2'], correctOptionIndex: 0, explanation: 'Factores comunes al menor exponente: 2·5 = 10.' },
      { id: 5, text: '¿Cuál de los siguientes números es primo?', options: ['9', '15', '17', '21'], correctOptionIndex: 2, explanation: '17 solo es divisible por 1 y por 17.' },
      { id: 6, text: 'Calcula: (10 + 2) : 3 + 1', options: ['5', '4', '3', '6'], correctOptionIndex: 0, explanation: '(12):3 + 1 = 4 + 1 = 5.' },
      { id: 7, text: 'Un número es divisible entre 5 si:', options: ['Termina en 0 o 5', 'Es impar', 'La suma de sus cifras es 5', 'Termina en par'], correctOptionIndex: 0, explanation: 'Regla de divisibilidad del 5.' },
      { id: 8, text: '¿Cuál es el resultado de 2⁴?', options: ['8', '16', '6', '12'], correctOptionIndex: 1, explanation: '2 · 2 · 2 · 2 = 16.' },
      { id: 9, text: 'La raíz cuadrada de 81 es:', options: ['8', '7', '9', '81'], correctOptionIndex: 2, explanation: '9 · 9 = 81.' },
      { id: 10, text: '¿Cuál de estos números es compuesto?', options: ['13', '19', '23', '27'], correctOptionIndex: 3, explanation: '27 es divisible por 1, 3, 9 y 27.' },
      { id: 11, text: 'Calcula: 3 · (5 - 2) + 4', options: ['13', '15', '11', '9'], correctOptionIndex: 0, explanation: '3 · 3 + 4 = 9 + 4 = 13.' },
      { id: 12, text: 'El m.c.m. de 5 y 7 es:', options: ['12', '35', '1', '70'], correctOptionIndex: 1, explanation: 'Al ser primos entre sí, su m.c.m. es 5 · 7 = 35.' },
      { id: 13, text: 'El m.c.d. de dos números primos distintos siempre es:', options: ['0', '1', '2', 'Su producto'], correctOptionIndex: 1, explanation: 'Solo comparten el 1 como divisor.' },
      { id: 14, text: 'Un número es divisible entre 2 si:', options: ['Es impar', 'Su última cifra es par o 0', 'La suma de sus cifras es par', 'Termina en 2'], correctOptionIndex: 1, explanation: 'Criterio de divisibilidad del 2.' },
      { id: 15, text: 'Calcula: 5 + 0 · 8', options: ['40', '0', '5', '13'], correctOptionIndex: 2, explanation: '0 · 8 = 0 => 5 + 0 = 5.' },
      { id: 16, text: 'Simplifica en una sola potencia: 3² · 3³', options: ['3⁶', '3⁵', '9⁵', '9⁶'], correctOptionIndex: 1, explanation: 'Misma base multiplicando: se suman exponentes (2+3=5).' },
      { id: 17, text: 'Simplifica en una sola potencia: 5⁶ : 5²', options: ['5³', '5⁴', '1⁴', '5⁸'], correctOptionIndex: 1, explanation: 'Misma base dividiendo: se restan exponentes (6-2=4).' },
      { id: 18, text: '¿Cuál es el valor de 7⁰?', options: ['0', '7', '1', '70'], correctOptionIndex: 2, explanation: 'Cualquier número distinto de cero elevado a 0 es 1.' },
      { id: 19, text: 'En la potencia 4³, el número 3 es:', options: ['La base', 'El exponente', 'El factor', 'El radicando'], correctOptionIndex: 1, explanation: 'El número superior es el exponente.' },
      { id: 20, text: 'La raíz cuadrada de 144 es:', options: ['11', '12', '14', '16'], correctOptionIndex: 1, explanation: '12 · 12 = 144.' }
    ]
  },

  // 3. NÚMEROS ENTEROS
  {
    id: 'quiz-1eso-numeros-enteros',
    topicId: 'mat-1eso-numeros-enteros',
    title: 'Autoevaluación: Números Enteros',
    description: 'Operaciones combinadas con signo, paréntesis y regla de los signos.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'Calcula: (-5) + (-3)', options: ['-8', '8', '-2', '2'], correctOptionIndex: 0, explanation: 'Mismo signo: se suman valores absolutos y se mantiene el signo.' },
      { id: 2, text: 'Calcula: (-4) · (-6)', options: ['-24', '24', '-10', '10'], correctOptionIndex: 1, explanation: 'Menos por menos es más: (-4)·(-6) = +24.' },
      { id: 3, text: 'Calcula: 10 - (-4)', options: ['6', '-6', '14', '-14'], correctOptionIndex: 2, explanation: 'Restar un negativo es sumar su opuesto: 10 + 4 = 14.' },
      { id: 4, text: 'Calcula: (-12) : 3', options: ['-4', '4', '-9', '9'], correctOptionIndex: 0, explanation: 'Menos entre más es menos: (-12):3 = -4.' },
      { id: 5, text: 'Calcula: (-3)²', options: ['-9', '9', '-6', '6'], correctOptionIndex: 1, explanation: 'Base negativa elevada a exponente par da positivo: (-3)·(-3) = 9.' },
      { id: 6, text: 'Calcula: (-2)³', options: ['-8', '8', '-6', '6'], correctOptionIndex: 0, explanation: 'Base negativa elevada a exponente impar da negativo: (-2)·(-2)·(-2) = -8.' },
      { id: 7, text: 'Resuelve: 5 - 8', options: ['3', '-3', '13', '-13'], correctOptionIndex: 1, explanation: 'Distinto signo: se restan valores absolutos y se pone el signo del mayor (-3).' },
      { id: 8, text: 'Calcula: (-20) : (-5)', options: ['-4', '4', '-15', '15'], correctOptionIndex: 1, explanation: 'Menos entre menos es más.' },
      { id: 9, text: 'Calcula: (-3) + 7', options: ['-4', '4', '-10', '10'], correctOptionIndex: 1, explanation: '7 - 3 = 4.' },
      { id: 10, text: 'Resuelve: [(-2) + 5] · (-3)', options: ['-9', '9', '-21', '21'], correctOptionIndex: 0, explanation: '(3) · (-3) = -9.' },
      { id: 11, text: 'Si la temperatura pasa de -4°C a 3°C, ¿cuántos grados ha subido?', options: ['1°C', '7°C', '-1°C', '12°C'], correctOptionIndex: 1, explanation: '3 - (-4) = 3 + 4 = 7°C.' },
      { id: 12, text: 'Calcula: (-1)¹⁰⁰', options: ['-100', '100', '-1', '1'], correctOptionIndex: 3, explanation: '-1 elevado a exponente par resulta +1.' },
      { id: 13, text: 'Calcula: (-1)¹⁰¹', options: ['-101', '101', '-1', '1'], correctOptionIndex: 2, explanation: '-1 elevado a exponente impar resulta -1.' },
      { id: 14, text: 'Resuelve: (-3) - (-7)', options: ['-10', '10', '4', '-4'], correctOptionIndex: 2, explanation: '-3 + 7 = 4.' },
      { id: 15, text: 'Calcula: 6 · (-2) + 5', options: ['-7', '7', '-42', '42'], correctOptionIndex: 0, explanation: '-12 + 5 = -7.' },
      { id: 16, text: 'Un buzo está a -15 metros y asciende 6 metros. ¿A qué profundidad está?', options: ['-21 m', '-9 m', '9 m', '-11 m'], correctOptionIndex: 1, explanation: '-15 + 6 = -9 metros.' },
      { id: 17, text: 'Resuelve: (-8) : 2 · (-3)', options: ['12', '-12', '1.33', '-1.33'], correctOptionIndex: 0, explanation: 'De izquierda a derecha: (-8):2 = -4; luego (-4)·(-3) = 12.' },
      { id: 18, text: '¿Cuál es el valor absoluto de |-15|?', options: ['-15', '15', '0', '1'], correctOptionIndex: 1, explanation: 'El valor absoluto quita el signo negativo.' },
      { id: 19, text: 'El resultado de (-5) · 0 · (-4) es:', options: ['20', '-20', '0', '1'], correctOptionIndex: 2, explanation: 'Todo producto multiplicado por 0 es 0.' },
      { id: 20, text: 'Calcula: -4 - 6', options: ['-10', '10', '-2', '2'], correctOptionIndex: 0, explanation: 'Se suman los valores absolutos con signo negativo: -10.' }
    ]
  },

  // 4. DECIMALES Y FRACCIONES
  {
    id: 'quiz-1eso-decimales-y-fracciones',
    topicId: 'mat-1eso-decimales-y-fracciones',
    title: 'Autoevaluación: Decimales y Fracciones',
    description: 'Conversión, tipos de decimales, redondeo y aproximaciones.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'Convierte el decimal 0.75 a fracción irreducible:', options: ['75/10', '3/4', '1/2', '7/5'], correctOptionIndex: 1, explanation: '0.75 = 75/100 = 3/4.' },
      { id: 2, text: '¿Qué tipo de decimal es 1.333...?', options: ['Exacto', 'Periódico puro', 'Periódico mixto', 'No periódico'], correctOptionIndex: 1, explanation: 'El período arranca justo después de la coma.' },
      { id: 3, text: '¿Qué tipo de decimal es 2.1555...?', options: ['Exacto', 'Periódico puro', 'Periódico mixto', 'No periódico'], correctOptionIndex: 2, explanation: 'Tiene un anteperíodo (1) antes de la parte periódica (5).' },
      { id: 4, text: '¿Qué tipo de decimal es 4.25?', options: ['Exacto', 'Periódico puro', 'Periódico mixto', 'Irracional'], correctOptionIndex: 0, explanation: 'Tiene un número finito de cifras decimales.' },
      { id: 5, text: 'Redondea 3.467 a las décimas:', options: ['3.4', '3.5', '3.47', '3.46'], correctOptionIndex: 1, explanation: 'La cifra siguiente (6) es ≥ 5, sube a 3.5.' },
      { id: 6, text: 'Expresa 1/2 como número decimal:', options: ['0.2', '0.5', '0.12', '1.2'], correctOptionIndex: 1, explanation: '1 : 2 = 0.5.' },
      { id: 7, text: 'Expresa 3/5 como número decimal:', options: ['0.35', '0.6', '0.53', '0.3'], correctOptionIndex: 1, explanation: '3 : 5 = 0.6.' },
      { id: 8, text: 'Calcula: 1.25 + 2.3', options: ['3.55', '3.28', '3.35', '3.5'], correctOptionIndex: 0, explanation: '1.25 + 2.30 = 3.55.' },
      { id: 9, text: 'Calcula: 5 - 1.4', options: ['3.6', '4.4', '3.4', '4.6'], correctOptionIndex: 0, explanation: '5.0 - 1.4 = 3.6.' },
      { id: 10, text: 'Calcula: 0.2 · 0.3', options: ['0.6', '0.06', '0.006', '6'], correctOptionIndex: 1, explanation: '2·3=6 con 2 cifras decimales = 0.06.' },
      { id: 11, text: 'Calcula: 4.8 : 2', options: ['2.4', '2.2', '9.6', '1.2'], correctOptionIndex: 0, explanation: '4.8 entre 2 = 2.4.' },
      { id: 12, text: 'Truncamiento de 5.678 a las centésimas:', options: ['5.67', '5.68', '5.6', '5.7'], correctOptionIndex: 0, explanation: 'El truncamiento elimina los dígitos restantes sin modificar: 5.67.' },
      { id: 13, text: 'Expresa 0.07 como fracción decimal:', options: ['7/10', '7/100', '7/1000', '7/1'], correctOptionIndex: 1, explanation: 'Dos cifras decimales equivalen a denominador 100.' },
      { id: 14, text: '¿Cuál es la parte entera de 14.82?', options: ['82', '14', '0.82', '1482'], correctOptionIndex: 1, explanation: 'La parte entera se encuentra a la izquierda de la coma.' },
      { id: 15, text: '¿Cuál es la parte decimal de 9.45?', options: ['9', '45', '0.45', '9.4'], correctOptionIndex: 2, explanation: 'La parte decimal es 0.45.' },
      { id: 16, text: 'Compara: 0.4 frente a 0.39', options: ['0.4 < 0.39', '0.4 > 0.39', 'Son iguales', 'No se pueden comparar'], correctOptionIndex: 1, explanation: '0.40 es mayor que 0.39.' },
      { id: 17, text: 'Convierte 7/10 a decimal:', options: ['0.07', '0.7', '7.0', '0.77'], correctOptionIndex: 1, explanation: '7 : 10 = 0.7.' },
      { id: 18, text: 'Calcula: 0.5 + 1/4', options: ['0.75', '0.6', '0.54', '1.25'], correctOptionIndex: 0, explanation: '0.5 + 0.25 = 0.75.' },
      { id: 19, text: 'En el decimal 5.121212..., el período es:', options: ['5', '1', '12', '5.12'], correctOptionIndex: 2, explanation: '12 es el bloque de cifras que se repite.' },
      { id: 20, text: 'En el decimal 8.3444..., el anteperíodo es:', options: ['8', '3', '4', '34'], correctOptionIndex: 1, explanation: '3 es la cifra decimal no periódica previa al 4.' }
    ]
  },

  // 5. PROPORCIONALIDAD
  {
    id: 'quiz-1eso-proporcionalidad',
    topicId: 'mat-1eso-proporcionalidad',
    title: 'Autoevaluación: Proporcionalidad',
    description: 'Regla de tres directa e inversa, razones y constantes.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'Dos magnitudes son directamente proporcionales si:', options: ['Al multiplicar una por 2, la otra se divide entre 2', 'Al multiplicar una por 2, la otra se multiplica por 2', 'Al sumar 2 a una, se le suma 2 a la otra', 'No cambian'], correctOptionIndex: 1, explanation: 'Aumentan o disminuyen en la misma proporción.' },
      { id: 2, text: 'Dos magnitudes son inversamente proporcionales si:', options: ['Al multiplicar una por 3, la otra se multiplica por 3', 'Al multiplicar una por 3, la otra se divide entre 3', 'Ambas se anulan', 'Su diferencia es constante'], correctOptionIndex: 1, explanation: 'Al aumentar una magnitud, la otra disminuye proporcionalmente.' },
      { id: 3, text: 'Si 3 kg de manzanas valen 6€, ¿cuánto valen 5 kg?', options: ['8€', '10€', '12€', '15€'], correctOptionIndex: 1, explanation: '1 kg vale 2€. 5 kg valen 5 · 2 = 10€.' },
      { id: 4, text: 'Si 2 obreros tardan 6 horas en pintar una pared, ¿cuánto tardarán 4 obreros?', options: ['12 horas', '3 horas', '4 horas', '8 horas'], correctOptionIndex: 1, explanation: 'Inversa: 2·6 = 4·x => 12/4 = 3 horas.' },
      { id: 5, text: 'La regla de tres directa se resuelve multiplicando:', options: ['En cruz y dividiendo', 'En paralelo', 'Solo los datos de arriba', 'Sumando los términos'], correctOptionIndex: 0, explanation: 'x = (b · c) / a.' },
      { id: 6, text: 'Si 4 cuadernos valen 12€, ¿cuánto vale 1 cuaderno?', options: ['2€', '3€', '4€', '6€'], correctOptionIndex: 1, explanation: 'Reducción a la unidad: 12 : 4 = 3€.' },
      { id: 7, text: 'Un coche recorre 100 km en 1 hora a velocidad constante. En 3 horas recorrerá:', options: ['200 km', '300 km', '400 km', '150 km'], correctOptionIndex: 1, explanation: 'Proporcionalidad directa: 100 · 3 = 300 km.' },
      { id: 8, text: 'Un grifo llena un depósito en 10 horas. Dos grifos iguales tardarán:', options: ['20 horas', '5 horas', '8 horas', '2.5 horas'], correctOptionIndex: 1, explanation: 'Proporcionalidad inversa: el doble de grifos tarda la mitad de tiempo (5 horas).' },
      { id: 9, text: 'La velocidad de un vehículo y el tiempo empleado en recorrer un trayecto son:', options: ['Directamente proporcionales', 'Inversamente proporcionales', 'No guardan relación', 'Iguales'], correctOptionIndex: 1, explanation: 'A mayor velocidad, menor tiempo empleado.' },
      { id: 10, text: 'El número de sobres de cromo comprados y su importe total son:', options: ['Directamente proporcionales', 'Inversamente proporcionales', 'Invariables', 'Negativos'], correctOptionIndex: 0, explanation: 'A más sobres comprados, mayor coste.' },
      { id: 11, text: 'Si a/b = c/d, la propiedad fundamental de las proporciones establece que:', options: ['a + d = b + c', 'a · d = b · c', 'a · b = c · d', 'a - d = b - c'], correctOptionIndex: 1, explanation: 'El producto de extremos es igual al producto de medios.' },
      { id: 12, text: 'Si 5 bolsas de patatas pesan 10 kg, ¿cuánto pesarán 8 bolsas?', options: ['12 kg', '16 kg', '20 kg', '18 kg'], correctOptionIndex: 1, explanation: '1 bolsa = 2 kg => 8 bolsas = 16 kg.' },
      { id: 13, text: '3 pintores tardan 12 días en pintar una casa. ¿Cuántos días tardarán 6 pintores?', options: ['24 días', '6 días', '4 días', '9 días'], correctOptionIndex: 1, explanation: 'Inversa: el doble de pintores tarda la mitad de días (6 días).' },
      { id: 14, text: 'Una escala en un mapa de 1:100 significa que 1 cm en el plano equivale a:', options: ['100 cm reales (1 m)', '100 m reales', '10 cm reales', '100 km reales'], correctOptionIndex: 0, explanation: '1 cm del dibujo son 100 cm reales.' },
      { id: 15, text: 'Si la razón de dos números es 2/4, su razón simplificada es:', options: ['1/2', '4/2', '2/1', '1/4'], correctOptionIndex: 0, explanation: '2/4 simplificado entre 2 es 1/2.' },
      { id: 16, text: 'Si 10 paquetes pesan 20 kg, 1 paquete pesa:', options: ['1 kg', '2 kg', '0.5 kg', '5 kg'], correctOptionIndex: 1, explanation: '20 / 10 = 2 kg.' },
      { id: 17, text: '¿Qué método halla el valor de 1 unidad para resolver un problema de proporción?', options: ['Reducción a la unidad', 'Regla de tres compuesta', 'Factorización', 'Ecuación cuadrática'], correctOptionIndex: 0, explanation: 'Es la técnica de reducción a la unidad.' },
      { id: 18, text: 'Si 4 bolígrafos valen 8€, ¿cuánto valen 10 bolígrafos?', options: ['16€', '20€', '24€', '18€'], correctOptionIndex: 1, explanation: '1 bolígrafo = 2€ => 10 · 2 = 20€.' },
      { id: 19, text: 'El número de trabajadores y los días para terminar una obra son magnitudes:', options: ['Directas', 'Inversas', 'Cuadráticas', 'Nulas'], correctOptionIndex: 1, explanation: 'Más trabajadores realizan la obra en menos días.' },
      { id: 20, text: 'Si 2 paquetes traen 12 galletas, ¿cuántas traen 5 paquetes?', options: ['24', '30', '36', '25'], correctOptionIndex: 1, explanation: '1 paquete = 6 galletas => 5 · 6 = 30 galletas.' }
    ]
  },

  // 6. FRACCIONES
  {
    id: 'quiz-1eso-fracciones',
    topicId: 'mat-1eso-fracciones',
    title: 'Autoevaluación: Fracciones',
    description: 'Suma, resta, producto, división y simplificación de fracciones.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'Calcula: 2/5 + 1/5', options: ['3/10', '3/5', '2/25', '1/5'], correctOptionIndex: 1, explanation: 'Mismo denominador: 2+1 = 3/5.' },
      { id: 2, text: 'Calcula: 3/4 - 1/4', options: ['2/4 (o 1/2)', '2/0', '4/4', '1/4'], correctOptionIndex: 0, explanation: '3-1 = 2/4 = 1/2.' },
      { id: 3, text: 'Calcula el producto: (2/3) · (4/5)', options: ['6/8', '8/15', '10/12', '8/8'], correctOptionIndex: 1, explanation: 'Producto en línea: (2·4)/(3·5) = 8/15.' },
      { id: 4, text: 'Calcula la división: (3/4) : (2/5)', options: ['6/20', '15/8', '5/9', '6/9'], correctOptionIndex: 1, explanation: 'Producto cruzado: (3·5)/(4·2) = 15/8.' },
      { id: 5, text: 'La fracción irreducible de 10/15 es:', options: ['2/3', '5/3', '1/2', '4/6'], correctOptionIndex: 0, explanation: 'Dividiendo numerador y denominador entre 5 se obtiene 2/3.' },
      { id: 6, text: 'Dos fracciones a/b y c/d son equivalentes si:', options: ['a + d = b + c', 'a · d = b · c', 'a · b = c · d', 'a - c = b - d'], correctOptionIndex: 1, explanation: 'Sus productos cruzados coinciden.' },
      { id: 7, text: 'Amplificar una fracción consiste en:', options: ['Multiplicar numerador y denominador por el mismo número', 'Sumar 2 al numerador', 'Restar el denominador', 'Dividir entre 2'], correctOptionIndex: 0, explanation: 'Multiplicar ambos términos por el mismo número entero positivo.' },
      { id: 8, text: 'Simplificar una fracción consiste en:', options: ['Dividir numerador y denominador por un divisor común', 'Multiplicar por 10', 'Invertirla', 'Quitar el denominador'], correctOptionIndex: 0, explanation: 'Dividir ambos términos entre un divisor común.' },
      { id: 9, text: 'En la fracción 3/8, el denominador indica:', options: ['Las partes tomadas', 'El total de partes iguales en que se divide la unidad', 'La suma total', 'El resto'], correctOptionIndex: 1, explanation: 'El denominador divide la unidad en partes iguales.' },
      { id: 10, text: 'Una fracción es PROPIA cuando:', options: ['El numerador es mayor que el denominador', 'El numerador es menor que el denominador', 'Es igual a 1', 'Su denominador es 0'], correctOptionIndex: 1, explanation: 'Fracción propia < 1 (ej: 3/5).' },
      { id: 11, text: 'Una fracción es IMPROPIA cuando:', options: ['El numerador es mayor o igual que el denominador', 'El numerador es menor que el denominador', 'Es igual a 0', 'Es negativa'], correctOptionIndex: 0, explanation: 'Fracción impropia ≥ 1 (ej: 7/4).' },
      { id: 12, text: 'Calcula: 1/2 + 1/4', options: ['2/6', '3/4', '2/4', '1/6'], correctOptionIndex: 1, explanation: '2/4 + 1/4 = 3/4.' },
      { id: 13, text: 'Calcula los 2/3 de 30:', options: ['10', '20', '15', '25'], correctOptionIndex: 1, explanation: '(30 : 3) · 2 = 10 · 2 = 20.' },
      { id: 14, text: 'La fracción inversa de 3/7 es:', options: ['-3/7', '7/3', '1/3', '-7/3'], correctOptionIndex: 1, explanation: 'Se intercambian numerador y denominador.' },
      { id: 15, text: 'Calcula: (1/2)²', options: ['1/2', '1/4', '2/4', '1/8'], correctOptionIndex: 1, explanation: '1²/2² = 1/4.' },
      { id: 16, text: '¿Cuál de las siguientes fracciones es equivalente a 1/3?', options: ['2/3', '2/6', '3/6', '1/6'], correctOptionIndex: 1, explanation: '1/3 amplificado por 2 es 2/6.' },
      { id: 17, text: 'Compara: ¿Cuál es mayor, 3/5 o 4/5?', options: ['3/5', '4/5', 'Son iguales', 'No se pueden comparar'], correctOptionIndex: 1, explanation: 'A igual denominador, es mayor la de mayor numerador.' },
      { id: 18, text: 'El mínimo común denominador de 1/3 y 1/4 es:', options: ['7', '12', '4', '3'], correctOptionIndex: 1, explanation: 'm.c.m.(3, 4) = 12.' },
      { id: 19, text: 'Resuelve: 1 - 1/3', options: ['2/3', '1/3', '0', '3/3'], correctOptionIndex: 0, explanation: '3/3 - 1/3 = 2/3.' },
      { id: 20, text: 'Calcula: (3/5) : 3', options: ['9/5', '1/5', '3/15', '9/15'], correctOptionIndex: 1, explanation: '(3/5) : (3/1) = 3/15 = 1/5.' }
    ]
  },

  // 7. PORCENTAJES
  {
    id: 'quiz-1eso-porcentajes',
    topicId: 'mat-1eso-porcentajes',
    title: 'Autoevaluación: Porcentajes',
    description: 'Cálculo de porcentajes, aumentos, descuentos e IVA.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'Calcula el 20% de 100:', options: ['10', '20', '40', '50'], correctOptionIndex: 1, explanation: '(100 · 20) / 100 = 20.' },
      { id: 2, text: 'El 50% de una cantidad equivale a la fracción:', options: ['1/4', '1/2', '1/5', '3/4'], correctOptionIndex: 1, explanation: '50/100 simplificado es 1/2 (la mitad).' },
      { id: 3, text: 'El 25% de una cantidad equivale a:', options: ['La mitad', 'La cuarta parte', 'La quinta parte', 'El triple'], correctOptionIndex: 1, explanation: '25/100 simplificado es 1/4.' },
      { id: 4, text: 'El 100% de una cantidad representa:', options: ['La mitad', 'El total', 'El doble', 'La cifra cero'], correctOptionIndex: 1, explanation: 'El 100% abarca la totalidad del conjunto.' },
      { id: 5, text: 'Calcula el 10% de 250:', options: ['25', '2.5', '50', '250'], correctOptionIndex: 0, explanation: '250 / 10 = 25.' },
      { id: 6, text: 'Una camisa de 40€ tiene un 10% de descuento. ¿Cuánto se descuenta?', options: ['4€', '10€', '36€', '40€'], correctOptionIndex: 0, explanation: 'El 10% de 40€ son 4€.' },
      { id: 7, text: 'En la camisa anterior de 40€ con 10% de descuento, ¿cuál es el precio final?', options: ['4€', '36€', '30€', '34€'], correctOptionIndex: 1, explanation: 'Precio final: 40 - 4 = 36€.' },
      { id: 8, text: 'Un producto de 100€ sube un 20%. Su nuevo precio es:', options: ['100€', '120€', '80€', '200€'], correctOptionIndex: 1, explanation: '100 + 20 = 120€.' },
      { id: 9, text: 'Expresa el 75% en forma decimal:', options: ['7.5', '0.75', '0.075', '75.0'], correctOptionIndex: 1, explanation: '75 / 100 = 0.75.' },
      { id: 10, text: 'Expresa el 5% en forma decimal:', options: ['0.5', '0.05', '5.0', '0.005'], correctOptionIndex: 1, explanation: '5 / 100 = 0.05.' },
      { id: 11, text: 'Si aprueban 18 de 20 alumnos de una clase, ¿qué porcentaje ha aprobado?', options: ['80%', '90%', '85%', '95%'], correctOptionIndex: 1, explanation: '(18 / 20) · 100 = 0.90 · 100 = 90%.' },
      { id: 12, text: 'El 200% de 50 es igual a:', options: ['50', '100', '150', '200'], correctOptionIndex: 1, explanation: '200% es el doble de la cantidad: 50 · 2 = 100.' },
      { id: 13, text: 'Calcula el IVA (21%) aplicado a una compra de 100€:', options: ['21€', '121€', '79€', '2.1€'], correctOptionIndex: 0, explanation: 'El 21% de 100 es 21€.' },
      { id: 14, text: 'Calcula el 30% de 300:', options: ['90', '30', '60', '100'], correctOptionIndex: 0, explanation: '(300 · 30) / 100 = 90.' },
      { id: 15, text: '¿Qué porcentaje representa 5 respecto a 10?', options: ['25%', '50%', '10%', '5%'], correctOptionIndex: 1, explanation: '5 es exactamente la mitad de 10 (50%).' },
      { id: 16, text: 'Calcula el 15% de 200:', options: ['15', '30', '45', '20'], correctOptionIndex: 1, explanation: '(200 · 15) / 100 = 30.' },
      { id: 17, text: 'El factor de multiplicación para aplicar un aumento del 10% es:', options: ['1.10', '0.10', '10', '0.90'], correctOptionIndex: 0, explanation: '1 + 0.10 = 1.10.' },
      { id: 18, text: 'El factor de multiplicación para un descuento del 20% es:', options: ['0.80', '1.20', '0.20', '8.0'], correctOptionIndex: 0, explanation: '1 - 0.20 = 0.80.' },
      { id: 19, text: 'Calcula el 75% de 40:', options: ['20', '30', '35', '25'], correctOptionIndex: 1, explanation: '(40 · 3) / 4 = 30.' },
      { id: 20, text: 'Si un artículo de 80€ se rebaja a 60€, el descuento en euros ha sido de:', options: ['10€', '20€', '30€', '15€'], correctOptionIndex: 1, explanation: '80 - 60 = 20€.' }
    ]
  },

  // 8. INICIACIÓN AL ÁLGEBRA
  {
    id: 'quiz-1eso-iniciacion-al-algebra',
    topicId: 'mat-1eso-iniciacion-al-algebra',
    title: 'Autoevaluación: Iniciación al Álgebra',
    description: 'Lenguaje algebraico, monomios, grado y valor numérico.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'Traduce a lenguaje algebraico: "El doble de un número x".', options: ['x + 2', '2x', 'x²', 'x / 2'], correctOptionIndex: 1, explanation: 'El doble de una cantidad se expresa multiplicando por 2: 2x.' },
      { id: 2, text: 'Traduce: "El triple de un número menos cuatro".', options: ['3x - 4', 'x³ - 4', '3(x - 4)', 'x/3 - 4'], correctOptionIndex: 0, explanation: 'Triple de x (3x) restándole 4: 3x - 4.' },
      { id: 3, text: 'Traduce: "La mitad de un número x".', options: ['2x', 'x - 2', 'x / 2', 'x²'], correctOptionIndex: 2, explanation: 'La mitad equivale a dividir entre 2: x / 2.' },
      { id: 4, text: 'Dos monomios son semejantes si tienen:', options: ['El mismo coeficiente', 'La misma parte literal', 'El mismo signo', 'El mismo número'], correctOptionIndex: 1, explanation: 'Misma parte literal con exactamente los mismos exponentes.' },
      { id: 5, text: '¿Cuál es el coeficiente del monomio 5x²?', options: ['x', '2', '5', 'x²'], correctOptionIndex: 2, explanation: 'El coeficiente es el número que multiplica a la variable (5).' },
      { id: 6, text: '¿Cuál es la parte literal del monomio -3x²y?', options: ['-3', 'x²y', 'xy', '3'], correctOptionIndex: 1, explanation: 'La parte literal comprende las letras con sus exponentes: x²y.' },
      { id: 7, text: '¿Cuál es el grado del monomio 4x³?', options: ['4', '3', '12', '1'], correctOptionIndex: 1, explanation: 'El grado viene dado por el exponente de su variable (3).' },
      { id: 8, text: 'Calcula el valor numérico de 2x + 1 para x = 3:', options: ['6', '7', '8', '5'], correctOptionIndex: 1, explanation: 'Sustituyendo x: 2(3) + 1 = 6 + 1 = 7.' },
      { id: 9, text: 'Suma los monomios semejantes: 3x + 2x', options: ['5x²', '5x', '6x', '6x²'], correctOptionIndex: 1, explanation: 'Se suman coeficientes y se conserva la parte literal: 5x.' },
      { id: 10, text: 'Resta los monomios: 7x - 4x', options: ['3', '3x', '3x²', '11x'], correctOptionIndex: 1, explanation: '(7 - 4)x = 3x.' },
      { id: 11, text: 'Multiplica los monomios: (2x) · (3x)', options: ['5x', '6x', '6x²', '5x²'], correctOptionIndex: 2, explanation: '2·3 = 6 y x·x = x² => 6x².' },
      { id: 12, text: 'Traduce: "Un número más su consecutivo".', options: ['x + 2x', 'x + (x + 1)', 'x · (x + 1)', '2x + 1'], correctOptionIndex: 1, explanation: 'El consecutivo de x es (x + 1).' },
      { id: 13, text: 'Calcula el valor numérico de x² - 2 para x = 4:', options: ['6', '14', '16', '10'], correctOptionIndex: 1, explanation: '4² - 2 = 16 - 2 = 14.' },
      { id: 14, text: '¿Cuál es el grado del monomio 7x²y³?', options: ['2', '3', '5', '7'], correctOptionIndex: 2, explanation: 'Suma de exponentes de las letras: 2 + 3 = 5.' },
      { id: 15, text: 'Traduce: "El cuadrado de un número x".', options: ['2x', 'x²', 'x + 2', '√x'], correctOptionIndex: 1, explanation: 'Elevar a la potencia 2: x².' },
      { id: 16, text: 'Suma: 5x - 5x', options: ['x', '0', '5', '0x²'], correctOptionIndex: 1, explanation: '(5 - 5)x = 0.' },
      { id: 17, text: 'El coeficiente del monomio -x es:', options: ['0', '1', '-1', 'x'], correctOptionIndex: 2, explanation: '-x equivale a -1 · x.' },
      { id: 18, text: 'Reduce la expresión: 4x + 2 - x + 5', options: ['3x + 7', '5x + 7', '3x - 3', '4x + 7'], correctOptionIndex: 0, explanation: '(4x - x) + (2 + 5) = 3x + 7.' },
      { id: 19, text: 'Multiplica: 3 · (2x)', options: ['6x', '5x', '6x²', '32x'], correctOptionIndex: 0, explanation: '3 · 2 · x = 6x.' },
      { id: 20, text: 'Divide los monomios: (12x²) : (3x)', options: ['4', '4x', '4x²', '9x'], correctOptionIndex: 1, explanation: '(12:3) y (x²:x) = 4x.' }
    ]
  },

  // 9. ECUACIONES
  {
    id: 'quiz-1eso-ecuaciones',
    topicId: 'mat-1eso-ecuaciones',
    title: 'Autoevaluación: Ecuaciones',
    description: 'Resolución de ecuaciones lineales de primer grado y problemas asociados.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'Resuelve: 2x = 10', options: ['x = 20', 'x = 5', 'x = 8', 'x = 12'], correctOptionIndex: 1, explanation: 'x = 10 / 2 = 5.' },
      { id: 2, text: 'Resuelve: x + 5 = 12', options: ['x = 17', 'x = 7', 'x = 60', 'x = -7'], correctOptionIndex: 1, explanation: 'x = 12 - 5 = 7.' },
      { id: 3, text: 'Resuelve: x - 4 = 6', options: ['x = 2', 'x = 10', 'x = -2', 'x = 24'], correctOptionIndex: 1, explanation: 'x = 6 + 4 = 10.' },
      { id: 4, text: 'Resuelve: 3x + 1 = 10', options: ['x = 3', 'x = 4', 'x = 9', 'x = 2'], correctOptionIndex: 0, explanation: '3x = 9 => x = 3.' },
      { id: 5, text: 'Resuelve: 5x - 5 = 0', options: ['x = 0', 'x = 1', 'x = -1', 'x = 5'], correctOptionIndex: 1, explanation: '5x = 5 => x = 1.' },
      { id: 6, text: 'El grado de la ecuación 3x + 2 = 8 es:', options: ['Grado 1 (lineal)', 'Grado 2', 'Grado 3', 'Grado 0'], correctOptionIndex: 0, explanation: 'El mayor exponente de la incógnita x es 1.' },
      { id: 7, text: 'Resuelve: x / 2 = 4', options: ['x = 2', 'x = 8', 'x = 6', 'x = 16'], correctOptionIndex: 1, explanation: 'x = 4 · 2 = 8.' },
      { id: 8, text: 'Resuelve: 2x + 3 = x + 7', options: ['x = 4', 'x = 10', 'x = 2', 'x = -4'], correctOptionIndex: 0, explanation: '2x - x = 7 - 3 => x = 4.' },
      { id: 9, text: 'Al pasar un término que SUMA de un miembro a otro, pasa:', options: ['Sumando', 'Restando', 'Multiplicando', 'Dividiendo'], correctOptionIndex: 1, explanation: 'Regla de transposición: cambia a la operación opuesta (resta).' },
      { id: 10, text: 'Resuelve: 2(x - 1) = 6', options: ['x = 3', 'x = 4', 'x = 2', 'x = 5'], correctOptionIndex: 1, explanation: '2x - 2 = 6 => 2x = 8 => x = 4.' },
      { id: 11, text: 'Resuelve: x + 8 = 3', options: ['x = 5', 'x = -5', 'x = 11', 'x = -11'], correctOptionIndex: 1, explanation: 'x = 3 - 8 = -5.' },
      { id: 12, text: 'Resuelve: 4x = -16', options: ['x = 4', 'x = -4', 'x = -20', 'x = -12'], correctOptionIndex: 1, explanation: 'x = -16 / 4 = -4.' },
      { id: 13, text: 'Resuelve: 3x - 2 = x + 6', options: ['x = 4', 'x = 2', 'x = 8', 'x = 3'], correctOptionIndex: 0, explanation: '2x = 8 => x = 4.' },
      { id: 14, text: 'Una IDENTIDAD es una igualdad algebraica que se cumple:', options: ['Solo para x = 0', 'Para cualquier valor de la variable', 'Solo para valores positivos', 'Para ningún valor'], correctOptionIndex: 1, explanation: 'Definición de identidad (ej: x + x = 2x).' },
      { id: 15, text: 'Una ECUACIÓN es una igualdad que se cumple:', options: ['Para cualquier número', 'Solo para determinados valores de la incógnita', 'Para ningún número', 'Solo en geometría'], correctOptionIndex: 1, explanation: 'Se verifica únicamente para las soluciones de la incógnita.' },
      { id: 16, text: 'Resuelve: 10 - x = 7', options: ['x = 3', 'x = -3', 'x = 17', 'x = -17'], correctOptionIndex: 0, explanation: '10 - 7 = x => x = 3.' },
      { id: 17, text: 'Resuelve: 2x / 3 = 4', options: ['x = 6', 'x = 12', 'x = 3', 'x = 8'], correctOptionIndex: 0, explanation: '2x = 12 => x = 6.' },
      { id: 18, text: 'Resuelve: -x = 5', options: ['x = 5', 'x = -5', 'x = 0', 'x = 1/5'], correctOptionIndex: 1, explanation: 'Multiplicando por -1 en ambos miembros: x = -5.' },
      { id: 19, text: 'Resuelve: 3(x + 2) = 15', options: ['x = 3', 'x = 5', 'x = 1', 'x = 4'], correctOptionIndex: 0, explanation: '3x + 6 = 15 => 3x = 9 => x = 3.' },
      { id: 20, text: 'Resuelve: x + x + x = 18', options: ['x = 3', 'x = 6', 'x = 9', 'x = 18'], correctOptionIndex: 1, explanation: '3x = 18 => x = 6.' }
    ]
  },

  // 10. GEOMETRÍA
  {
    id: 'quiz-1eso-geometria',
    topicId: 'mat-1eso-geometria',
    title: 'Autoevaluación: Geometría',
    description: 'Polígonos, ángulos, perímetros, áreas y Teorema de Pitágoras.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'La suma de los ángulos interiores de cualquier triángulo es:', options: ['90°', '180°', '360°', '270°'], correctOptionIndex: 1, explanation: 'Propiedad fundamental: la suma interna siempre es 180°.' },
      { id: 2, text: 'La suma de los ángulos interiores de un cuadrilátero es:', options: ['180°', '360°', '540°', '90°'], correctOptionIndex: 1, explanation: 'Cualquier cuadrilátero suma 360° internamente.' },
      { id: 3, text: 'Área de un rectángulo de base 6 cm y altura 4 cm:', options: ['10 cm²', '24 cm²', '12 cm²', '20 cm²'], correctOptionIndex: 1, explanation: 'Área = base · altura = 6 · 4 = 24 cm².' },
      { id: 4, text: 'Área de un triángulo de base 6 cm y altura 4 cm:', options: ['24 cm²', '12 cm²', '10 cm²', '18 cm²'], correctOptionIndex: 1, explanation: 'Área = (base · altura) / 2 = 24 / 2 = 12 cm².' },
      { id: 5, text: 'Perímetro de un cuadrado de lado 5 cm:', options: ['25 cm', '20 cm', '10 cm', '15 cm'], correctOptionIndex: 1, explanation: 'Perímetro = 4 · 5 = 20 cm.' },
      { id: 6, text: 'El Teorema de Pitágoras se aplica exclusivamente en triángulos:', options: ['Equiláteros', 'Rectángulos', 'Isósceles', 'Obtusángulos'], correctOptionIndex: 1, explanation: 'Aplica solo si el triángulo posee un ángulo recto de 90°.' },
      { id: 7, text: 'Un triángulo equilátero se caracteriza por tener:', options: ['3 lados iguales', '2 lados iguales', '3 lados desiguales', 'Un ángulo de 90°'], correctOptionIndex: 0, explanation: 'Sus tres lados y ángulos son idénticos.' },
      { id: 8, text: 'Un triángulo isósceles tiene:', options: ['3 lados iguales', '2 lados iguales', '0 lados iguales', 'Un ángulo obtuso'], correctOptionIndex: 1, explanation: 'Tiene exactamente dos lados de igual longitud.' },
      { id: 9, text: 'Un triángulo escaleno posee:', options: ['3 lados iguales', '2 lados iguales', '3 lados de diferente longitud', 'Ángulos iguales'], correctOptionIndex: 2, explanation: 'Sus tres lados tienen longitudes distintas.' },
      { id: 10, text: 'La longitud (perímetro) de una circunferencia de radio r es:', options: ['π · r²', '2 · π · r', 'π · d²', '4 · π · r'], correctOptionIndex: 1, explanation: 'Fórmula de la longitud de la circunferencia: L = 2πr.' },
      { id: 11, text: 'El área de un círculo de radio r es:', options: ['2 · π · r', 'π · r²', 'π · d', '2 · π · r²'], correctOptionIndex: 1, explanation: 'Fórmula del área del círculo: A = πr².' },
      { id: 12, text: 'Un ángulo RECTO mide exactamente:', options: ['45°', '90°', '180°', '360°'], correctOptionIndex: 1, explanation: 'Definición de ángulo recto.' },
      { id: 13, text: 'Un ángulo AGUDO mide:', options: ['Menos de 90°', 'Exactamente 90°', 'Más de 90°', '180°'], correctOptionIndex: 0, explanation: 'Ángulo menor a 90°.' },
      { id: 14, text: 'Un ángulo OBTUSO mide:', options: ['Menos de 90°', 'Entre 90° y 180°', '360°', 'Exactamente 90°'], correctOptionIndex: 1, explanation: 'Ángulo comprendido entre 90° y 180°.' },
      { id: 15, text: 'Un ángulo LLANO mide:', options: ['90°', '180°', '360°', '0°'], correctOptionIndex: 1, explanation: 'Equivale a media vuelta (180°).' },
      { id: 16, text: 'Calcula la hipotenusa h de un triángulo rectángulo de catetos 3 cm y 4 cm:', options: ['7 cm', '5 cm', '6 cm', '25 cm'], correctOptionIndex: 1, explanation: 'h² = 3² + 4² = 9 + 16 = 25 => h = √25 = 5 cm.' },
      { id: 17, text: 'Área de un cuadrado de lado 6 cm:', options: ['12 cm²', '24 cm²', '36 cm²', '18 cm²'], correctOptionIndex: 2, explanation: 'Área = lado² = 6² = 36 cm².' },
      { id: 18, text: 'El área de un rombo de diagonales D = 8 cm y d = 5 cm es:', options: ['40 cm²', '20 cm²', '13 cm²', '26 cm²'], correctOptionIndex: 1, explanation: 'Área = (D · d) / 2 = (8 · 5) / 2 = 20 cm².' },
      { id: 19, text: 'Dos rectas en un plano que nunca se cortan se llaman:', options: ['Secantes', 'Paralelas', 'Perpendiculares', 'Coincidentes'], correctOptionIndex: 1, explanation: 'Definición de rectas paralelas.' },
      { id: 20, text: 'Dos rectas secantes que se cortan formando ángulos de 90° son:', options: ['Paralelas', 'Perpendiculares', 'Oblicuas', 'Planas'], correctOptionIndex: 1, explanation: 'Definición de rectas perpendiculares.' }
    ]
  },

  // 11. ESTADÍSTICA
  {
    id: 'quiz-1eso-estadistica',
    topicId: 'mat-1eso-estadistica',
    title: 'Autoevaluación: Estadística',
    description: 'Variables, tablas de frecuencias, media, moda, mediana y gráficos.',
    estimatedMinutes: 20,
    questions: [
      { id: 1, text: 'La MODA de un conjunto de datos es:', options: ['El promedio numérico', 'El dato con mayor frecuencia (el que más se repite)', 'El valor central ordenado', 'La diferencia entre extremos'], correctOptionIndex: 1, explanation: 'Definición de moda estadística.' },
      { id: 2, text: 'Calcula la MEDIA aritmética de las notas: 4, 6 y 8:', options: ['5', '6', '7', '18'], correctOptionIndex: 1, explanation: 'Suma = 18. Media = 18 / 3 = 6.' },
      { id: 3, text: 'Halla la MEDIANA del conjunto ordenado: 2, 4, 7:', options: ['2', '4', '7', '4.33'], correctOptionIndex: 1, explanation: 'La mediana es el elemento posicionado justamente en el centro (4).' },
      { id: 4, text: 'En estadística, la POBLACIÓN es:', options: ['Un grupo reducido seleccionado', 'El conjunto total de todos los elementos objeto de estudio', 'La suma de las medias', 'El número de encuestadores'], correctOptionIndex: 1, explanation: 'Conjunto completo sobre el que se realiza la investigación.' },
      { id: 5, text: 'Una MUESTRA estadística es:', options: ['El total de la población', 'Un subconjunto representativo de la población', 'Un gráfico de barras', 'La moda'], correctOptionIndex: 1, explanation: 'Parte representativa elegida para estudiar la población.' },
      { id: 6, text: 'La variable "Color de ojos" es una variable:', options: ['Cuantitativa discreta', 'Cualitativa', 'Cuantitativa continua', 'Numérica'], correctOptionIndex: 1, explanation: 'Expresa una cualidad o atributo no numérico.' },
      { id: 7, text: 'La variable "Número de hermanos" es:', options: ['Cualitativa', 'Cuantitativa discreta', 'Cuantitativa continua', 'Ordinal'], correctOptionIndex: 1, explanation: 'Es numérica y toma valores enteros aislados.' },
      { id: 8, text: 'La FRECUENCIA ABSOLUTA es:', options: ['El porcentaje del dato', 'El número de veces que se repite un dato', 'El promedio', 'La resta de datos'], correctOptionIndex: 1, explanation: 'Conteo total de apariciones de una variable.' },
      { id: 9, text: 'La FRECUENCIA RELATIVA se obtiene:', options: ['Dividiendo la frecuencia absoluta entre el número total de datos', 'Multiplicando por 100', 'Restando la media', 'Sumando los datos'], correctOptionIndex: 0, explanation: 'Proporción fi / N.' },
      { id: 10, text: 'La suma de todas las frecuencias relativas debe ser igual a:', options: ['100', '1', '0', 'El número total de datos'], correctOptionIndex: 1, explanation: 'La suma de las proporciones relativas es siempre 1.' },
      { id: 11, text: 'El RANGO o recorrido de una variable es:', options: ['La suma de todos los valores', 'La diferencia entre el valor máximo y el valor mínimo', 'El valor que más se repite', 'La media dividida entre dos'], correctOptionIndex: 1, explanation: 'Rango = Dato mayor - Dato menor.' },
      { id: 12, text: 'Calcula la media aritmética de: 10, 20, 30:', options: ['15', '20', '25', '60'], correctOptionIndex: 1, explanation: '(10 + 20 + 30) / 3 = 60 / 3 = 20.' },
      { id: 13, text: '¿Cuál es la MODA en la serie: 3, 5, 5, 7, 8?', options: ['3', '5', '7', '5.6'], correctOptionIndex: 1, explanation: 'El valor 5 se repite 2 veces.' },
      { id: 14, text: 'La variable "Estatura en metros" es de tipo:', options: ['Cualitativa', 'Cuantitativa continua', 'Cuantitativa discreta', 'Nominal'], correctOptionIndex: 1, explanation: 'Toma valores dentro de un intervalo con decimales.' },
      { id: 15, text: 'Calcula la mediana de la serie de datos: 1, 3, 5, 9:', options: ['3', '4', '5', '4.5'], correctOptionIndex: 1, explanation: 'Pares: promedio de los dos centrales (3 + 5) / 2 = 4.' },
      { id: 16, text: 'La suma de todas las frecuencias absolutas coincide con:', options: ['La media', 'El número total de datos (N)', '1', 'La moda'], correctOptionIndex: 1, explanation: 'Al sumar el conteo de todos los grupos da el total N.' },
      { id: 17, text: 'Un gráfico circular donde cada sector es proporcional a la frecuencia se denomina:', options: ['Histograma', 'Diagrama de sectores', 'Diagrama de barras', 'Pictograma'], correctOptionIndex: 1, explanation: 'Gráfico circular o de queso.' },
      { id: 18, text: 'En un diagrama de barras, la altura de cada barra representa:', options: ['La media', 'La frecuencia del dato', 'El rango', 'El valor mínimo'], correctOptionIndex: 1, explanation: 'La altura es proporcional a la frecuencia absoluta.' },
      { id: 19, text: '¿Cuál es el rango de la serie de datos: 2, 5, 8, 15?', options: ['13', '15', '8', '6.5'], correctOptionIndex: 0, explanation: 'Valor máximo (15) menos valor mínimo (2) = 13.' },
      { id: 20, text: 'Un tipo de gráfico estadístico que utiliza dibujos para representar las frecuencias es un:', options: ['Histograma', 'Pictograma', 'Polígono de frecuencias', 'Diagrama de caja'], correctOptionIndex: 1, explanation: 'Definición de pictograma.' }
    ]
  }
];