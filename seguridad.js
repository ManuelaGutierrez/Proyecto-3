const jsonWebToken = require('jsonwebtoken');
/*const { noExtendLeft } = require('sequelize/types/lib/operators');*/
const myJWTSecretKey = 'ClaveSecreta';
 module.exports ={

Descodificar: (Token) => {
    const TokenDecodeData = jsonWebToken.verify(Token,myJWTSecretKey,function(error,dato){
        if (dato){
            return dato;
        }
        else{
            return error.message;
        }
       

    });
 return TokenDecodeData;

},

codificar:( user, pasword, rol, id) =>{
    const payload = {
        "usuario": user,
        "pass": pasword,
        "rol": rol,
        "id" : id
    }
    const Token = jsonWebToken.sign(payload, myJWTSecretKey);
    return Token;
},
}