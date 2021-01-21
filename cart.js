//creates the checkout inventory with all the products that u added to the array with the getItems() funktion
function shoppingcartCard() {
    let shoppingcartDeck = $("#shoppingCartDiv")
    shoppingcartDeck.empty();

    let products = getItems();

    for (let i = 0; i < products.length; i++) {
        let cardRow = document.createElement("div");
        cardRow.setAttribute("class", "row no-gutters");
        cardRow.setAttribute("style", "border: 1px; border-style:solid; border-color:#000000; padding:10px");

        let cardCol = document.createElement("div");
        cardCol.setAttribute("class", "col s-4");

        let cardImg = document.createElement("img");
        cardImg.setAttribute("class", "card-img");
        cardImg.setAttribute("src", "bild/mustang.jpg");

        let cardCol2 = document.createElement("div");
        cardCol2.setAttribute("class", "col s-8");

        let cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.innerHTML += products[i].name;

        let cardPrice = document.createElement("h6");
        cardPrice.innerHTML += "Price: " + products[i].price + " $";

        let cardQtyDiv = document.createElement("div");
        cardQtyDiv.setAttribute("class", "quantitydiv");

        let btnMinus = document.createElement("button");
        btnMinus.setAttribute("type", "btn btn-sm btn-outline-secondary");
        btnMinus.setAttribute("class", "btn btn-sm btn-outline-secondary");
        btnMinus.addEventListener("click", function () { decreaseqty(products[i]) });
        btnMinus.innerHTML += "-";

        let qtyText = document.createElement("span");
        qtyText.innerHTML += products[i].qty;

        let btnPlus = document.createElement("button");
        btnPlus.setAttribute("type", "btn btn-sm btn-outline-secondary");
        btnPlus.setAttribute("class", "btn btn-sm btn-outline-secondary");
        btnPlus.addEventListener("click", function () { increaseqty(products[i]) });
        btnPlus.innerHTML += "+";

        let btnDelete = document.createElement("button");
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("class", "btn btn-sm btn-danger");
        btnDelete.addEventListener("click", function () { checkremoveitemc(products[i]) });
        btnDelete.innerHTML += "Delete";

        shoppingcartDeck.append(cardRow);
        cardRow.append(cardCol);
        cardCol.append(cardImg);
        cardRow.append(cardCol2);
        cardCol2.append(cardTitle);
        cardCol2.append(cardPrice);
        cardCol2.append(cardQtyDiv);
        cardQtyDiv.append(btnMinus);
        cardQtyDiv.append(qtyText);
        cardQtyDiv.append(btnPlus);
        cardCol2.append(btnDelete);
    }
}

//creates the Total price div that shows the total sum to pay for all items
function totalPrice() {
    let ordDiv = $("#ordDiv")
    ordDiv.empty();

    let products = getItems();
    let totalprice = 0;
    for (i = 0; i < products.length; i++) {
        totalprice += products[i].price * products[i].qty;
    }

    let totalPrice = document.createElement("span")
    totalPrice.setAttribute("class", "orderprice");
    totalPrice.innerHTML += "Total: " + totalprice + " $";

    let ordbtn = document.createElement("button");
    ordbtn.setAttribute("class", "btn btn-success");
    ordbtn.setAttribute("type", "button");
    ordbtn.innerHTML += "Pre-Order";

    
    ordDiv.append(totalPrice);
    ordDiv.append(ordbtn);
    ordDiv.append(continuebtn);
}

function increaseqty(products) {
    let productsList = getItems();
    for (i = 0; i < productsList.length; i++) {
        if (products.name === productsList[i].name) {
            productsList[i].qty++;
            console.log(productsList[i].name + " has been incresed")
        }
    }
    localStorage.removeItem("productInCart");
    for (i = 0; i < productsList.length; i++) {
        changeItem(productsList[i]);
    }
    shoppingcartCard();
    totalPrice()
};

function decreaseqty(products) {
    let productsList = getItems();
    for (i = 0; i < productsList.length; i++) {
        if (products.id === productsList[i].id) {
            if (productsList[i].qty > 0) {
                productsList[i].qty--;
                console.log(productsList[i].name + " has been incresed")
            }
        }
    }
    localStorage.removeItem("productInCart");
    for (i = 0; i < productsList.length; i++) {
        changeItem(productsList[i]);
    }
    shoppingcartCard();
    totalPrice()
};

function checkremoveitemc(products) {
    console.log("inside remove " + products.name)
    let productsList = getItems();
    for (i = 0; i < productsList.length; i++) {
        if (products.id === productsList[i].id) {
            console.log(productsList[i].name + " has been has been removed")
            productsList.splice(i, 1);

        }
    }
    localStorage.removeItem("productInCart");
    for (i = 0; i < productsList.length; i++) {
        changeItem(productsList[i]);
    }
    shoppingcartCard();
    totalPrice();
};

function addItem(products) {
    setItem(products);
    totalcost(products);
}

function setItem(products) {
    //gets item from storage and parse them
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    console.log("my cart items are ", products);

    if (cartItems != null) {
        if (cartItems[products.name] == undefined) {
            products.qty = 0;
            cartItems = {
                //grabs whatever is on the cartitems before using ... and puts in []
                ...cartItems, [products.name]: products
            }
        }
        cartItems[products.name].qty++;
    } else {
        //create a list with products
        products.qty = 1;
        cartItems = { [products.name]: products }
    }
    // puts item in storage and stringfy convert them to json
    localStorage.setItem("productInCart", JSON.stringify(cartItems));
};

function totalcost(products) {
    let cartcost = localStorage.getItem('totalCost')

    if (cartcost != null) {
        cartcost = parseInt(cartcost);
        let prodprice = parseInt(products.price);
        localStorage.setItem("totalCost", cartcost + prodprice);
    } else {
        let prodprice = parseInt(products.price);
        cartcost = parseInt(cartcost);
        localStorage.setItem("totalCost", prodprice);
    }
}

function getItems() {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);

    const products = Object.values(cartItems).map(item => item)
    return products;
}

function changeItem(products) {
    //gets item from storage and parse them
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    cartItems = {
        //grabs whatever is on the cartItems before using ... and puts in []
        ...cartItems, [products.name]: products
    }
    // puts item in storage and stringfy convert them to json
    localStorage.setItem("productInCart", JSON.stringify(cartItems));
};