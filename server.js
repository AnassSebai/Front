const express =require('express');
const app = express();//initialiation
const port = 3000;

function main(){

    app.get("/", (req,res) => {
        //const dt= new Data();
        res.send("Hello Toto !");
        //console.log(dt);
    });

    app.listen(port,function() {
        console.log('Serveur lancÃ© sur port ${port}');
    });
   
   
}
main();
