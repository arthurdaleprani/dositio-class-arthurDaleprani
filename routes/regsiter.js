//import auth from "./auth"
/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function newUser(app, options){
    const categories = app.mongo.db.collection('newUser')
app.post('/register', {
    schema:{
        body:{
            type:'object',
                properties:{
                    username: {type: 'string'},
                    password: {type: 'string'}
                
            },
            required:['username', 'products']
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



/*
export default async function newUser(app, options) {
    const usersCollection = app.mongo.db.collection('users');

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['username', 'password'] 
            }
        },
        config: {
            requireAuthentication: false 
        }
    }, async (request, reply) => {
        try {
            let newUser = request.body;
            
           
            let result = await usersCollection.insertOne(newUser);

            
            return result.ops[0];
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
}
*/