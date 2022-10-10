const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function(req, res) {

    const params = url.parse(req.url, true).query;
    console.log(params);
    const archivo = params.archivo;
    const contenido = params.contenido;
    const nombre = params.nombre;
    const nuevoNombre = params.nuevoNombre;



    let dia = new Date().getDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();
  
    if (dia < 10) {
        dia = `0${dia}`
    };
    if (mes < 10) {
        mes = `0${mes}`
    };

    let fechaActual = (`${dia}/${mes}/${anio}`);
    


  
    if(req.url.includes("/crear")){
        fs.writeFile('archivos/' + archivo, `${fechaActual}.\n${contenido}`, 'utf8', (error) => {
            if (error) {
                res.write(`<p> Ha ocurrido un error al crear el archivo: ${archivo} </p>`)
            } else {
                res.write(`<p> El archivo se ha creado correctamente. </p>`)
            }
            res.end();
        })
    }


    if(req.url.includes("/leer")){
        fs.readFile('archivos/' + archivo, 'utf8', (error, data) => {
            if (error) {
                res.write(`<p> Ha ocurrido un error al intentar leer el archivo: ${archivo} </p>`)
            } else {
                res.write(data)
            }
            res.end();
        })
    }

 
    if(req.url.includes("/renombrar")){
        fs.rename('archivos/' + nombre, 'archivos/' + nuevoNombre, (error) => {
            if (error) {
                res.write(`<p> Error al renombrar el archivo: ${nombre} </p>`)
            } else {

                

                res.write(`<p> El archivo <strong>${nombre}</strong> ha sido renombrado por <strong>${nuevoNombre}</strong> </p>`)
            }
            res.end();
        })
    }

    
    if(req.url.includes("/eliminar")){
        fs.unlink('archivos/' + archivo, (error) => {
            if (error) {
                res.write(`<p> Error al eliminar el archivo: ${archivo} </p>`)
            } else {
                res.write(`<p> Tu solicitud para eliminar el archivo <strong>${archivo}</strong> se está procesando. </p>`);

               

                function esperarTresSegundos (){
                    res.write(`<p> El archivo <strong>${archivo}</strong> ha sido eliminado correctamente. </p>`);

                    
                    res.end();
                }
                setTimeout(esperarTresSegundos, 3000);
            }
            //res.end();
        })
    }


}).listen(8080, () => {
    console.log('Servidor funcionando por el puerto 8080.');
})