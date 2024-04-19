

/** @type{import('fastify').FastifyPluginAsync<>} */

import createError from '@fastify/error';

export default async function categories(app, options){
    const categories = app.mongo.db.collection('categories')
    const products = app.mongo.db.collection('products')
    const InvalidCategoriesError = createError('InvalidCategoriesError', 'Categoria Inválida.', 400);
   
    
    app.get('/categories',{
    },
    async(request, reply) => {
        request.log.info(categories)
        return await categories.find().toArray();
    }

    )


    app.post('/categories',{
        schema: {
            body:{
                type: 'object',
                    properties:{
                      id: {type:'integer'},
                      name: {type:'string'},
                      productsName: {type:'string'}
                    
                },
                required: ['name', 'productsName']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async(request, reply) => {
        let categorie = request.body;
        await categories.insertOne(categorie)
        return reply.code(201).send

})

app.put('/categories/:id', {
    config: {
        requireAuthentication: true
    }
}, async (request, reply) => {
    let id =  request.params.id;
    let categories = request.body;
    
    await products.updateOne({_id: new app.mongo.ObjectId(id)}, {
        $set: {
            id: categories.id,
            name: categories.name,
            products: categories.productsName
        }
    })});
    

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

/*app.get('/categories/:id/products', async (request, reply) => {
    try {
        let id = request.params.id

        let schema = {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    productsName: { type: 'string' }
                },
                required: ['id', 'name', 'productsName']
            }
        };

        await request.validate({ params: schema });

        return categories.id.find().toArray();
        
    } catch (error) {
        console.error(error);
        reply.status(400).send({ error: error.message });
    }
});*/
app.get('/categories/:id/products', async (request, reply) => {
    try {
        let id = request.params.id;

        let schema = {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                },
                required: ['id']
            }
        };

        

        let category = await categories.findOne({ _id: id });
        if (!category) {
            throw new Error('Categoria não encontrada');
        }
        let categoryName = category.name;

        let productsCategory = await products.find({ category: categoryName }).toArray();
        if(!productsCategory.params){
            throw new error(204);
        }
        return productsCategory
        
    } catch (error) {
        console.error(error);
        reply.status(400).send({ error: error.message });
    }
});


}