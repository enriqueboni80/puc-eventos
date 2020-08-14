/** 
 * Modulo importantissimo no processo de Logout
 * Depois do logout o token é inserido Nessa lista de bloqueados
 * e usado pelo middleware ensureAuthenticated() para bloqueio
*/
module.exports = {
    list: [],
    add: function (jwtToken) {
        this.list.push(jwtToken)
    }
}