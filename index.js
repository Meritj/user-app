let userData = [];

const fetchUser = async () => {
    await fetch('https://randomuser.me/api/?results=24') // d'abord on récupère l'API
        .then((res) => res.json())
        .then((data) => (userData = data.results)); // on appelle data le résultat du res.json
    console.log(userData)
};

const userDisplay = async () => {
    await fetchUser();

    const dateParser = (date) => { // on va utliser dateParser dans le map :
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        return newDate;
    }

    const dayCalc = (date) => {
        let today = new Date();
        let todayTimeStamp = Date.parse(today);
        let timestamp = Date.parse(date);

        return Math.ceil((todayTimeStamp - timestamp) / 8.64e7); //ceil : on arrondit
    };

    document.body.innerHTML = userData.map( // on met en forme les données grace a inner HTML et MAP
        (user) =>
            `
    <div class="card">
    <img src=${user.picture.large} alt="photo de ${user.name.last}"
    <h3>${user.name.first}</h3>
    <p>${user.location.city}, ${dateParser(user.dob.date)}</p> 
    <em> Membre depuis : ${dayCalc(user.registered.date)} jours</em>
    
    </div>
    `
    )
        .join("");
}

userDisplay()

