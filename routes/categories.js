

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
    //ok

app.post('/categories',{
        schema: {
            body:{
                type: 'object',
                    properties:{
                      id: {type:'integer'},
                      name: {type:'string'},
                      productsName: {type:'string'},
                      img_url: {type:'string'}
                    
                },
                required: ['name', 'productsName', 'img_url']
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
//ok

app.put('/categories/:name', async (request, reply) => {
    try {
        const nameCategory = request.params.name;
        const { name, products, img_url } = request.body; 
        
       
        const schema = {
            params: {
                type: 'object',
                properties: {
                    nameCategory: { type: 'string' }
                },
                required: ['nameCategory']
            }
            
        };
         
       
       
        const category = await categories.findOne({ nameCategory: nameCategory });
        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        await categories.updateOne(
            { nameCategory: nameCategory }, 
            { $set: { name, products, img_url } } 
        );

        
        return { message: 'Categoria atualizada com sucesso' };
        
    } catch (error) {
        console.error(error);
        reply.status(400).send({ error: error.message });
    }
});
//ok


app.delete('/categories/:name', async (request, reply) => {
    try {
        const name = request.params.name;
       

       
        const schema = {
            params: {
                type: 'object',
                properties: {
                    name: { type: 'string' }
                },
                required: ['name']
            }
        };

       
       
        const category = await categories.findOne({ name: name });
        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        await categories.deleteOne(
            { name: name }, 
        );

        
        return { message: 'Categoria Deletada' };
        
    } catch (error) {
        console.error(error);
        reply.status(400).send({ error: error.message });
    }
});
//ok

app.get('/categories/:id/products', async (request, reply) => {
    try {
        const id = request.params.id;

        const category = await categories.findOne({ name: id });

        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        const productsCategory = await products.find({ category: category.name }).toArray();

        if (productsCategory.length === 0) {
            return reply.status(204).send();
        }

        return productsCategory;
        
    } catch (error) {
        console.error(error);
        reply.status(400).send({ error: error.message });
    }
});
}




