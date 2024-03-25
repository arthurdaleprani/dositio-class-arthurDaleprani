import auth from "./auth"
/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function newUser(app, options){
    const categories = app.mongo.db.collection('newUser')
app.post('/register', {
    schema:{
        body:{
            type:{
                properties:{
                    username: {type: 'string'},
                    password: {type: 'string'}
                }
            },
            require:['username', 'products']
        }
    }, config:{
        requireAuthentication:true
    }


}, async(request, reply) => {
    let newUser = request.body
    await newUser.insertOne(newUser)
    return newUser;
}

)
}