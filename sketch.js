let table;
let romani = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]; 
// lasciamo l'indice 0 vuoto così i numeri romani partono da 1
let R1_img;
let R2_img;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
  R1_img = loadImage("Lancette/R1.png");
  R2_img = loadImage("Lancette/R2.png");
}

function setup() {
  console.log(table); //stampa sulla console cosa c'è nella variabile
  angleMode(DEGREES); //impostiamo la tipologia di angolo che vogliamo usare, gradi o radianti (utile per le lancette)

  //larghezza dello sketch uguale a quella della finestra
  // decido un ingombro (larghezza, gap, quanti in una riga...)
  // quando so il numero di righe posso sapere l'altezza dello sketch 

   //CREAZIONE DELLA GRIGLIA -> impostazione del canvas
  let outerPadding = 20; // padding esterno -> Spazio vuoto tra i bordi della canva e la griglia degli elementi
  let padding = 35; // padding tra gli elementi -> praticamente gutter della griglia
  let itemSize = 30; // dimensione degli elementi (forse più della cella)-> lato di ogni oggetto da disegnare

  // CALCOLO IL NUMERO DELLE COLONNE DELLA GRIGLIA
  // colonne = larghezza - 2 * padding esterno [LARGHEZZA TOTALE DELLA FINESTRA DI CUI TOGLIAMO IL PADDING ESTERNO]
  // item + padding interno [SPAZIO TOTALE OCCUPATO DA OGNI ELEMENTO]
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));
  // FLOOR -> arrotondo per difetto --> meglio una colonna in meno che una che sborda
  cols = max(cols, 1); //indichiamo che vogliamo sempre almeno una colonna disegnata
 
  //Ci definisce il numero di righe, di dati, che abbiamo all'interno del csv
  let rows = ceil(table.getRowCount() / cols);
  //numero di righe / il numero di colonne
  // CEIL -> Arrotonda per eccesso (Se anche l'ultima riga dev'essere incompleta non ce la va a togliere)

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;
  // Ci calcola l'altezza totale della canvas in modo che dipenda dal numero di righe e che riempia l'altezza totale dello schermo

  //creo il CANVAS
  createCanvas(windowWidth, totalHeight); //larghezza della finestra e altezza totale degli elementi nello spazio
  //background(120); // colore dello sfondo che tanto poi modifico nel draw e quindi mi chiedo se qui abbia senso lasciarlo
  console.log("cols:", cols, "rows:", rows);
  //Verifico che il numero totale delle colonne e delle righe siano corrette nel pannello di controllo
}

//HAI ELIMINATO IL COSO SOPRA PERCHé RENDEVA TUTTO COMPLESSO!
//QUADRANTE
function disegnaQuadrante(strokeColor) {
  push();
  fill("#fefaea");
  stroke(strokeColor); //Inserisci la variabile di colore che dipenderà da column1
  strokeWeight(2.25);
  circle(15, 22.5, 45);
  pop();
}

//GRAFICA
function disegnaGrafica() {
  push();
  noFill(); 
  stroke("black");
  strokeWeight(0.15);
  circle(15, 22.5, 27); //cerchio 1
  circle(15, 22.5, 24); //cerchio 2
  circle(15, 22.5, 13.5); //cerchio 3
  pop();
}

//NUMERI
function disegnaNumeri() {
  push();
  let cx = 15; //diamo prima le variabili della posizione del centro del cerchio che corrisponde al pirulino 
  let cy = 23.5;
  let r = 17.25; //definiamo il raggio di posizionamento dei numeri rispetto al centro

  for (let angle = 300, num = 1; angle < 660; angle += 30, num++) {
   //a quanto pare possiamo determinare più variabili nell'inizializzazione del for
    let xPos = cx + r * cos(angle); //cx ci da il nostro centro a cui poi aggiungiamo le coordinate x della circonferenza su cui si posizionano i numeri la circonferenza ha Rcos(a) nella x ->
    // inserendo l'angolo in cos gli diciamo l'intervallo di posizionamento dei numeri sulla curva
    let yPos = cy + r * sin(angle); // uguale, ma con coordinate y

    textAlign (CENTER);
    textSize (3); 
    text(num, xPos, yPos); 
  }
  pop();
}

function disegnaNumeriRomani() {
  push(); 

  let cx = 15; //diamo prima le variabili della posizione del centro del cerchio che corrisponde al pirulino 
  let cy = 23.5;
  let r = 17.25; //definiamo il raggio di posizionamento dei numeri rispetto al centro

  for (let angle = 300, num = 1; angle < 660; angle += 30, num++) {
    //a quanto pare possiamo determinare più variabili nell'inizializzazione del for
    let xPos = cx + r * cos(angle); //cx ci da il nostro centro a cui poi aggiungiamo le coordinate x della circonferenza su cui si posizionano i numeri la circonferenza ha Rcos(a) nella x ->
    // inserendo l'angolo in cos gli diciamo l'intervallo di posizionamento dei numeri sulla curva
    let yPos = cy + r * sin(angle); // uguale, ma con coordinate y

    textAlign (CENTER);
    textSize (3);
    textFont("serif"); 
    text(romani[num], xPos, yPos);
    //allora questo ci servirà per la variabile -> con romani [num] andiamo a prelevare l'elemento dell'array dichiarato globalmente ->
    //-> prelevando indichiamo l'indice, ma in questo caso l'indice è determinato dalla variabile num di incremento num++
  }

  pop(); //RICORDATI DI INSERIRE PUSH E POP CHE TI SEMPLIFICA LA VITA!!!
}

// Funzione per il disegno delle LANCETTE con image R2 e R1
function disegnaLancetteImg() {
  push();
  imageMode(CENTER); //inserisco il modo di produzione/posizionamento dell'immagine in modo che sia al centro
  translate(15, 22.5); // creiamo il nostro centro di rotazione spostando le coordinate del canvas -> ROTATE gira solo attorno all'origine!
  
  //FRAMECOUNT -> Una Numbervariabile che tiene traccia del numero di fotogrammi disegnati dall'inizio dello schizzo.
  //Il valore di è 0 all'interno di setup() . Incrementa di 1 ogni volta che il codice in draw() termina l'esecuzione.

  // Calcolo degli angoli delle lancette
  let s = frameCount % 360; // R1 fa un giro completo ogni 360 frame
  let m = (frameCount / 360) * 30; // R2 si muove di 30 gradi ogni giro di R1
  //valore_ciclico = valore_crescente % dimensione_ciclo
  // -> il framecount aumenta di continuo ad ogni ridisegno del draw che è continuo
  // -> l'inserimento del MODULO stoppa il ciclo a 360 e lo resetta
  // Divisione semplice [NO MODULO] → per cose che accumulano (età, chilometri percorsi, progresso)

  fill("black"); //pirulino centrale
  circle(0, 0, 2.25);
  
  // Seconda lancetta (R2) 
  push();
  rotate(m); // Rotate -> Rotazione dell'angolo in gradi se fissa, oppure possibilità di fare un animazione con frameCount (ridisegno)
  image(R2_img, 0, -2.4, 3.45, 18); // immagine dall'origine (0,0 rispetto al translate)
  pop();
  
  // Prima lancetta (R1) 
  push();
  rotate(s);
  image(R1_img, 0, -5.4, 4.5, 27);
  pop();
  pop();
}

// Funzione per il disegno delle lancette RETTANGOLO
function disegnaLancetteRect() {
  push();
  translate(15, 22.5); //idem prima
  let s = frameCount % 360;
  let m = (frameCount / 360) * 30;

  fill("black");
  circle(0, 0, 2.25);
  
  push();
  rotate(m);
  rectMode(CENTER);
  rect(0, -3.75, 1.2, 12);
  pop();
  
  push();
  rotate(s);
  rectMode(CENTER);
  rect(0, -6.75, 0.75, 18);
  pop();
  pop();
}


function draw() {

  //SFONDO SIMIL LEGNO
  background(200, 170, 130);
  
   for (let x = 0; x < width; x += 20) {
    push(); 
    stroke(180, 150, 120); 
    strokeWeight(2);
    line(x, 0, x, height); //creiamo delle linee che continuano per tutta l'altezza del canvas
    pop(); 
  }

  //PROBLEMA CHE SI ERA PRESENTATO 
  // A quanto pare devo ridefinire la griglia per l'inserimento degli elementi
  // avendo spostato il for nel draw (per il framecount) serve ridefinire la griglia. Se avessi lasciato tutto nel setup sarebbe andata bene perchè tanto il setup è calcolato solo una volta
  // ma se uso il draw che viene continuamente ricalcolato/riletto/ridisegnato, quel che vuoi, devo riposizionarlo
  let outerPadding = 20;
  let padding = 35;
  let itemSize = 30;
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));
  cols = max(cols, 1); // anche questo fa parte della griglia quindi la devo dichiarare di nuovo


  let colCount = 0;
  let rowCount = 0;
  //Queste due variabili servono per tenere traccia della posizione della griglia ->
  //Ogni volta che il glifo viene disegnato il colcount aumenterà -> 
  //quando finisce la riga il colcount divverrà di nuovo 0 mentre il rowCount divverrà 1

  for (let i = 0; i < table.getRowCount(); i++) {
    let data = table.getRow(i).obj;

    let myValue = data["column0"]; // il mio valore di scala
     // Calcolo minimo e massimo della colonna -> partiamo dall'estrarre i dati dalle colonne 
    let col0 = table.getColumn("column0"); // da ciò che ho capito potrebbe anche essere messa fuori dal for perchè così non dobbiamo rileggere e ricalcolare ogni volta ad ogni ciclo
     // credo che messa fuori ottimizzi di più le tempistiche e faciliti il lavoro del calcolatore -> MA NON LO SO QUINDI LASCIAMO COSì
    let min0 = min(col0);
    let max0 = max(col0);
    let scaleFactor = map(myValue, min0, max0, 0.7, 1.3);
    //valore che vogliamo scalare, valore minimo della scala di partenza, valore max, dim. + piccola, dim. + grande

    let value1 = data["column1"];
    let col1 = table.getColumn("column1");
    let min1 = min(col1);
    let max1 = max(col1);
    let t = map(value1, min1, max1, 0, 1);
    //trasformiamo il valore min/max da 0 a 1
    let c1 = color("black"); //scelgo il colore/esadecimale, solo funzione p5
    let c2 = color("brown");

    let strokeColor = lerpColor(c1, c2, t); //valore variabile del colore

    // Gli altri valori dalle altre colonne -> non abbiamo bisogno di estrarre tutti i valori come nel calcolo del min e max
    // in questo caso estraiamo un valore alla volta come se fosse un array
    let numberType = data["column2"];
    let graphicsValue = data["column3"];
    let handsType = data["column4"];

    //Posizione dell'elemento nella griglia in modo che risulti centrato nella cella
    let centerX = outerPadding + colCount * (itemSize + padding) + itemSize / 2; 
    let centerY = outerPadding + rowCount * (itemSize + padding) + itemSize / 2;

    push();

    //ALTRO PROBLEMA RISCONTRATO! -> A CAUSA DEL FATTO CHE SONO PARTITA DAL DISEGNO SUL DRAW 
    //Il disegno dell’orologio è stato pensato con un suo sistema di coordinate e dimensioni fisse.
    //Se lo disegnassi direttamente nel canvas globale, apparirebbe tutto schiacciato in un angolo o disallineato rispetto alla cella.
    translate(centerX, centerY);   // mettiamo il traslate in modo che risulti al centro della cella, sposta il sistema di riferimento al centro della cella
    translate(-15, -22.5);         // allinea al sistema interno (dove il quadrante è disegnato)
    scale(scaleFactor);            // scala rispetto al disegno originale

    disegnaQuadrante(strokeColor);

    //ORA INSERISCO GLI IF PER LE VARIABILI USANDO LE MIE FUNZIONI ESTERNE-> LA MIA PARTE PREFERITA!!!!!!
    if (graphicsValue > 1) disegnaGrafica();
    if (numberType >= 0) disegnaNumeriRomani(); else disegnaNumeri();

    if (handsType % 2 === 1) {
      disegnaLancetteImg();
    } else {
      disegnaLancetteRect();
    }

    pop();

    // ad ogni ciclo aumento colcount
    colCount++;

    // controllo se siamo a fine riga
    if (colCount == cols) {
      colCount = 0;
      rowCount++;
    }
  }
}
