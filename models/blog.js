// 2 things need to be passed to model
// The instance of Sequelize and Sequelize itself
module.exports = (sequelize, type) => {
    return sequelize.define('blog', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: type.STRING
    })
}