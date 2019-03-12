const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const BlogModel = require('./models/blog');
const TagModel = require('./models/tag');

const sequelize = new Sequelize('codementor', 'root', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
// Instantiate models by passing a sequelize instance and library itself to required model files
const User = UserModel(sequelize, Sequelize);
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// BlogTag holds connections between blogs and tags. Many to many relation. Table with only fields blogID and tagID
// BlogTag is an empty model that will be used as a throught property
const BlogTag = sequelize.define('blog_tag', {});
const Blog = BlogModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);

// After models are created, their relationships are defined
Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { though: BlogTag, unique: false })
// Blog.belongsTo(User) will create a foreign key on the Blog model - userID
Blog.belongsTo(User);

// sequelize.sync() will create all of the tables in the specified database
sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created!')
    })

module.exports = {
    User,
    Blog,
    Tag
}