var User = require("../store/Users")
var gruposUsuarios = require("../store/gruposUsuarios")
const passport = require("passport");
var Util = require("../helpers/Util")
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {
        User.getByEmail(email).then((user) => {
            console.log()
            if (!user) {
                return done(null, false, { message: "usuario nao encontrado" });
            } else {
                var passwordsSaoIguais = Util.compararPasswordsBycrypt(password, user.password)
                if (passwordsSaoIguais) {
                    if (!user.active) {
                        return done(null, false, { message: "usuario ainda não ativado" });
                    } else {
                        //ele checar aqui em quais grupos o usuario pertence - Necessário refatorar
                        var _gruposQuePertence = []
                        gruposUsuarios.getGroupsById(user.id).then((result) => {
                            result.map((group) => {
                                _gruposQuePertence.push(group.grupo_id)
                            })
                            user.grupos = _gruposQuePertence
                            return done(null, user, { message: "Autenticou" });     
                        }) 
                    }
                }
                else {
                    return done(null, false, { message: "usuario ainda não ativado" });
                }
            }
        })
    }
));

const teste = () => {
    console.log('chegou aqui')
}

passport.serializeUser(function (user, done) {
    done(undefined, user);
});

passport.deserializeUser(function (user, done) {
    done(undefined, user);
});