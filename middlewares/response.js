/**
 * Fonction pour homogénéiser le format des réponses json
 * @param {string} message Message de la réponse
 * @param {Object|null} data Ressources
 * @param {string[]|null} errors Tableau contenant les erreurs générés
 * @param {number} status Code HTTP à utiliser (200 par défaut)
 */
function jsonResponse(message, data = null, errors = null, status = 200) {
    const response = {
        message: message,
        data: data,
    }

    if (errors != null)
        response.errors = errors

    /**
     * Ici comme on va implémenter cette fonction dans l'objet "res"
     * this fera référence à "res"
     */
    this
        .status(status)
        .json(response)
}

module.exports = { jsonResponse }