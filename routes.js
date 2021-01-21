const routes = require('express').Router();
const dbQueries = require('./database');
const bcrypt = require('./bcrypt');
const saltRounds = 10;



const products = [
    { name: 'prod1', id: '1' },
    { name: 'prod2', id: '2' }
];
routes.get('/products', async (Request, Response) => {
    try {
        const prod = await dbQueries.getProd();
        Response.json(prod);
    }
    catch(error){
        Response.send(error);
    }
});      


//GET

routes.get('/productid/:id', async (Request, Response) => {
    try {
        const prod = await dbQueries.getPro(Request.params.id);
        Response.json(prod);
    }
    catch (error) {
        Response.send(error);
    }
});
//Post

routes.post('/productss/', (req, res) => {
    const data = req.body;

    const found = products.find((p) => {
        return p.id === data.id;
    });
    if (!found) {
        products.push(data);
        res.json({ status: 'ok' });
    }
    else {
        res.status(400)
            .send(`Dublicate id for products whit id: ${data.id}`);

    }
});


routes.get('/users', async (Request, Response) =>{
    try {
        const users = await dbQueries.getUsers();
        Response.json(users);
    }
    catch(error){
        Response.send(error);
    }
});      
// TA BORT PRODUKT
routes.delete('/products/:id', async (Request, Response) =>{
    try {
        const delprod = await dbQueries.deleteProd(Request.params.id);
        Response.json(delprod);
    }
    catch(error){
        Response.send(error);
    }
});   

//UPDATERA PRODUKT
routes.patch('/productz/:id', async (Request, Response) =>{
    try {
        const data = Request.body;
        if (data.name &&
            data.price &&
            data.info &&
            data.made &&
            data.pic &&
            data.id &&
            data.price.match(/^[0-9]+$/) &&
            data.name.match(/^\w+$/) &&
            data.name.length < 50 &&
            data.id.match(/^[0-9]+$/) &&
            isNaN(data.name)
        ) {
           await dbQueries.updateProd(data.name, data.price, data.info,data.made,data.pic,  data.id);
            Response.json("Ändring har hänt i produkten");
        } else {
            Response.send('Ange rätt värden');
        }
    }
    catch{
        res.send(error);
        console.log("Något gick snett");

    }

}); 
   
//LÄGG TILL Produkt
routes.post('/db/products/post', async (Request, Response) => {
   
    try {
        const data = Request.body;
        const found = await dbQueries.getProdd(Request.body.name);
//valideringen 
        if (found.length === 0) {
            if (data.name &&
                data.price &&
                data.info &&
                data.made &&
                data.pic &&
                !isNaN(parseFloat(data.price, 10))&&
            data.name.match(/^\w+$/) && 
            data.name.length < 50 &&   
            data.price.match(/^[0-9]+$/) &&


            isNaN(data.name)
            ) {
                await dbQueries.addProduct(data.name, data.price, data.info, data.made, data.pic);
                Response.json("Produkten finns i tabellen");
            }
            else {
                Response.json("Ange rätt värden");
            }
        } else {
            Response.json('Produkten finns redan i tabellen');
        }
    }
    catch (error) {
        Response.send(error);
    }
});
//LÄGG TILL USER
  routes.post('/db/user/post', async (Request, Response) => {
  
    try {
        const found = await dbQueries.getUser(Request.body.firstname);
        if (found.length === 0) {
            const data = Request.body;
            crypPass = await bcrypt.genPass(Request.body.password);
            if (data.email.match(/\.com$/) &&
            data.firstname.match(/^\w+$/))  {
              // console.log(data.email,data.firstname,data.lastname, crypPass);
                await dbQueries.addUser(data.email,data.firstname,data.lastname, crypPass);
                Response.json("Användare har lagts till");
               
            }
            else {
                Response.json("Ange rätt värden");

            }
        } else {
            Response.json("Användaren finns redan i tabellen");
        }
    }
    catch (error) {
        Response.json("FEL!");
    }
});

  


// Hämtar en user baserat på förnamn
routes.get('/database/user/:firstname', async (Request, Response) => {
    try {
      const users = await dbQueries.getUser(Request.params.firstname);
      Response.json(users);
  }
  catch(error){
      Response.send(error);
  }
  });

  routes.get('/database/products/:name', async (Request, Response) => {
    try {
      const prod = await dbQueries.getPro(Request.params.name);
      Response.json(prod);
  }
  catch(error){
      Response.send(error);
  }
  });

  routes.post('/users/login', async (Request, Response) => {
    try {
        const data = Request.body;
        const users = await dbQueries.getPassword(data.email);

        if (users.length == 0) {
           throw 'Fel mail';
        }
        const result = await bcrypt.compPass(data.password, users[0].password);

        if (result == true) {
            Response.send('Succes du är in loggad!');
           
            
        } else {
            Response.send('Fel lösenord');
        }
    } catch (error) {
        Response.send(error);
    }
});
  

module.exports = routes