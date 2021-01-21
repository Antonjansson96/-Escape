const Promises = require('bluebird');
const sqlite = require ('sqlite');
const dbCon = sqlite.open('app.db', {Promises});

const getProd = async()=> {
    try {
        const db = await dbCon;
        const prod = await db.all('SELECT name, price, info, made, pic, id FROM tavla');
        
        return prod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  



const getUsers = async()=> {
    try {
        const db = await dbCon;
        const users = await db.all('SELECT email, id FROM users ORDER BY email ASC');
        return users;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  
//TA BORT PODUKT
const deleteProd = async(id)=> {
    try {
        const db = await dbCon;
        const delprod = await db.all('DELETE FROM tavla WHERE id = ?', [id]);
        
        return delprod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  
//VISA EN USER
const getUser = async (firstname) => {
    const db = await dbCon;
    const users = await db.all('SELECT email, firstname, lastname, password, id FROM users WHERE firstname = ?', [firstname]);
    return users;

};
//VISA EN PRODUKT
const getPro = async (id) => {
    const db = await dbCon;
    const prod = await db.get('SELECT * FROM tavla WHERE id =  (?)', [id]);
    return prod;

};

//nr 2
const getProdd = async (id) => {
    const db = await dbCon;
    const produ = await db.all('SELECT * FROM tavla WHERE id =  (?)', [id]);
    return produ;

};

//UPPDATERA PRODUKT
const updateProd = async(name, price, info,made,pic, id)=> {
    try {
        const db = await dbCon;
        const upprod = await db.all('UPDATE tavla SET name=?, price=?, info=?, made=?, pic=? WHERE id = ?', [name, price, info,made,pic, id]);
        
        return upprod;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  
//LÄGG TILL EN PRODUKT
const addProduct = async (name, price, info,made,pic) => {
    try { const db = await dbCon;
     const produkt = await db.all('INSERT INTO tavla (name, price, info,made,pic) VALUES (?, ?, ?,?,?)', [name, price, info,made,pic]);
     return produkt;
     } catch(error) {
         throw error;
     }
 
 };
//LÄGG TILL EN USER
 const addUser = async (email, firstname, lastname, password) => {
    try { const db = await dbCon;
     const addU = await db.all('INSERT INTO users (email, firstname, lastname, password) VALUES (?, ?, ?,?)', [email, firstname, lastname, password]);
     return addU;
     } catch(error) {
         throw error;
     }
 
 };
const getPassword = async (email) => {
    const db = await dbCon;
    const users = await db.all('SELECT email, password FROM users WHERE email = ?', [email]);
    return users;

}

module.exports = {getProd: getProd, getUsers: getUsers, deleteProd: deleteProd, getUser: getUser, getPro, getProd, updateProd: updateProd, addProduct: addProduct, addUser: addUser, getPassword: getPassword, getProdd: getProdd }; 