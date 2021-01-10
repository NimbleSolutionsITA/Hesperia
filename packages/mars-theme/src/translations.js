const translations = (lang, key) => {
    const dictionary = {
        novita: ['Novità', "What's new"],
        aperto24: ['Aperto 24/24', "Open 24/24"],
        scopriDiPiu: ['Scopri di più', 'Read more'],
        inPrimoPiano: ['In primo piano', 'Featured'],
        comeArrivare: ['come arrivare', 'ho to get there'],
        prenotaOra: ['Prenota ora', 'Book now'],
        prenotareUnaVisita: ['Prenotare una visita', 'Book a visit'],
        tutteLeNotizie: ['Tutte le notizie', 'All the news'],
        cercaUnaPrestazione: ['Cerca una prestazione', 'Find a service'],
        oppureClicca: ["Oppure clicca sull'iniziale", 'Or click on the intial letter'],
        vaiAiMedici: ['Vai i medici', "Go to Doctor's page"],
        daSapere: ['Da sapere', 'To know'],
        infoPraticheRicovero: ['Info pratiche sul ricovero', 'Practical info on hospitalization'],
        soloResponsabili: ['Solo i responsabili', 'Only head doctors'],
        cercaUnDottore: ['Cerca un dottore', 'Find a doctor'],
        visualizzaCV: ['Visualizza il CV', 'View CV'],
        prendiAppuntamento: ['Prendi appuntameno con il dottore', 'Arrange a visit with the doctor'],
        pubblicatoIl: ['Pubblicato il', 'Published on'],
        descrizione: [
            'Ospedale polispecialistico accreditato con il Servizio Sanitario Nazionale per le attività ambulatoriali e di ricovero.',
            'Multi-specialized hospital accredited by the National Health Service for outpatient activity and hospitalization.'
        ]
    }
    switch (lang) {
        case 'en':
            return dictionary[key][1]
        default:
            return dictionary[key][0]
    }
}

export default translations