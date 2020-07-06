const User = require('../../service/Users');
var util = require('../../helpers/Util')
var forgotPasswordEvent = require('../../events/forgotPasswordEvent')


module.exports = {
    showLinkRequestForm(req, res, next) {
        res.send('exibir formulario de COLOCAR O EMAIL PARA RECUPERACAO');
    },
    sendResetLinkEmail(req, res, next) {
        email = req.body.email
        User.getByEmail(email).then((user) => {
            /* user.activation_token = util.gerarActivationToken() */
            /* User.setNewToken(user.id, user.token).then(() => {}) */
            forgotPasswordEvent(user)
        })
    },
    sendResetLinkResponse(req, res, next) {
        let id = req.params.id
        let activationToken = req.params.activationtoken
        console.log('chegou aqui')
        res.writeHead(301, { Location: `http://localhost:3001/login?id=${id}&token=${activationToken}`});
        res.end();
    },
    resetPassword(req, res) {
        let id = req.body.id
        let activationToken = req.body.activationtoken
        User.getByToken(id, activationToken).then((user) => {
            if (user) {
                console.log('usuario e token encontrados')
                let newPassword = util.gerarHash(req.body.newPassword)
                User.updatePassword(user.id, newPassword).then(() => {
                    console.log('senha atualizada')
                })
            } else {
                console.log('usuario ou token não localizados')
            }
        })
    }
}