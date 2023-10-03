

// liste des collections du projet


const serie = {
    _id,
    title: "titre",
    voTitle: "titre2",
    type: "Shonen",
    genres: ["action", "sport"],
    authors: ["nom1", "nom2"],
    illustrators: ["nom1", "nom2"],
    synopsis: "c'est un super manga qui parle de plein de trucs",
    vfEditors: ["editeur1", "editeur2"],
    pegi: null,
    //followNumber: 0,
    nbVolumes: 47,
    ended: false,
    images: ["refImg", "refImg", "refImg"],
}


const manga = {
    _id,
    number: 4,
    title: "gne",
    voTitle: "gnehe",
    authors: ["nom1", "nom2"],
    illustrators: ["nom1", "nom2"],
    synopsis: "dans ce tome il se passe plein de truc c fou",
    editors: ["editeur1", "editeur2"],
    voEditors: ["editeur1", "editeur2"],
    price: 6.99,
    rate: 9.12,
    rateNumber: 37,
    quantity: 359,
    isAvailable: true,
    images: ["refImg", "refImg", "refImg"]
}


const user = {
    _id,
    email: "",
    password: "",
    pseudo: "",
    adress: "",
    bio: "",
    isAdmin: false,
    newsletter: false,
    followMail: false,
    follows: [],
    cart: [],
    orders: [],
    pastOrders: [],
    reviews: []
}


const order = {
    _id,
    customerId: "",
    adress: "",
    items: [],
    totalPrice: 0,
    orderDate: "",
    status: ""
}


const review = {
    _id,
    productId: "",
    rate: 0,
}


const frontPage = {
    _id,
    image: [],
    series: [],
    mangas: []
}


const selectors = {
    type: ["shonen", "shojo", "seinen"],
    genres: ["action", "aventure", "sport", "tranche de vie"],
}
