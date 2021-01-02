const mongoose = require('mongoose');

const dbConneccion = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CNN,
            {useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        console.log('Db Online');
    }catch (e) {
        console.log(`Error in connection ${e}`)
        throw  new Error("Error in connection DB");
    }



}

module.exports = {
    dbConneccion
}
