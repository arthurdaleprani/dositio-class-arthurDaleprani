import products from "./products";
/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function categories(app, options){
    const categories = app.mongo.db.collection('categories')

    app.get('/categories',{

        config:{
                logMe:true
        }
    },
    async(request, reply) => {
        return await products.find().toArray();
    }

    )


    app.post('/categories',{
        schema: {
            body:{
                type:{
                    properties:{
                      id: {type:'integer'},
                      name: {type:'string'},
                      productsName: {type:'string'},      
                    }
                },
                required: ['name', 'products']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async(request, reply) => {
        let categories = request.body;
        await categories.insertOne(categories)
        return reply.code(201).send

})


app.delete('/categories/:id', {
    config: {
        requireAuthentication: true
    }
}, async(request, reply)=>{
    let id = request.params.id
    await categories.deleteOne({_id: new app.mongo.ObjectId(id)});
    return reply.code(204).send
}
)

app.get('/categories/:id/products', async(request, reply)=> {
let id = request.params.id.products
let categories = await categories.findOne({_id: new app.mongo.ObjectId(id.products)})
return id.products


})

}