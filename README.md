# Timer app

### Examinationsuppgift i kursen Fördjupad UX-UI vid Frontendutbildning YH. Denna kurs innehåller animation av FE.

Denna webapp för mobiler är en enkel tidtagare som räknar ner. Kodad i React-vite. För kontroll av tid i appen har biblioteket Ex. EasyTimer.js av Albert Gonzalez använts.¨

## Animering
Framer Motion har installerats för att skapa semantiska animationer för majoriteten av appens komponenter. Css-animering har även använts till den analoga visningsvyn.
* Translanterande animering i x-led har utnyttjats för att ge en rumslig semantisk effekt för vyer (loading-page/timer-set-page,  Alarm-page/ timer-set-page,  Paus-page /timer-set-page).
* Knappar har en subtil skalnings-animering när de trycks för att ge en visuell feedback.
* 3D animering har använts för att ge en effekt för inställning av timer-tid.
* Menyn för de olika visningsalternativen har animering som ska efterlikna en rullgardin som dras ner och upp med menyn.
* När timern avbryts med "Abort-timer" -knapp på de olika visnings-vyerna finns en animering vid övergången tillbaka till Timer-set vyn som skapar en fadning i kombination med skalning.
* Alarmvyn har en animering på "alarm"-ikonen som roterar den några grader fram och tillbaka för att efterlikna en ilsket ringande klocka.
* Visningsvyn för text-timer har använt Staging principen för att fokusera de dynamiska delarna av tidsangivelsen. Numerären för minuter och sekunder har dels givits större font-storlek men också en animering varje gång värdet ändras.
* Visningsvyn för analog timer har animation för urtavlans cirkel-segment som representerar kvarvarande minuter respektive sekunder och vars vinklar minskas genom animering med rotations-paramteter.
 
 
### Funktionalitet: 
* Ställa in timer tid i hela minuter
* Meny för att växla mellan olika visningar av tiden.
* Visa nedräkning i digital vy
* Visa nedräkning i analog vy
* Visa nedräkning i textbaserad vy
* I samtliga vyer kan timer stoppas
* När tiden är slut kommer en larmvy. Härifrån kan timer startas om.
* Finns möjlighet att sätta en paus efter 30 s på timer.
Logiken fungerar inte riktigt här än. Återstår att återstarta timer.
