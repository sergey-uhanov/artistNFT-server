// src/api/todo/controllers/todo.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::todo.todo', ({ strapi }) => ({

    // GET /api/todos
    async find(ctx) {
        const { query } = ctx;
        const userId = ctx.state.user?.id;

        const { results, pagination } = await strapi
            .service('api::todo.todo')
            .find({
                ...query,
                filters: {

                    user: userId,
                },
            });


        return {
            data: results,
            meta: { pagination }
        };
    },

    // GET /api/todos/:id
    async findOne(ctx) {
        const { id } = ctx.params;

        const entity = await strapi
            .service('api::todo.todo')
            .findOne(id, ctx.query);

        if (!entity) {
            return ctx.notFound(`Todo with id ${id} not found`);
        }

        return { data: entity };
    },

    // POST /api/todos
    async create(ctx) {
        const { body } = ctx.request;

        // Собираем данные для записи
        const data = {
            ...body,                         // все поля, что пришли с клиента
            user: ctx.state.user?.id || null // текущий юзер из токена
        };

        if (!data.user) {
            return ctx.unauthorized('User must be authenticated to create a todo');
        }

        const entity = await strapi
            .service('api::todo.todo')
            .create({
                data: {
                    ...body,
                    user: ctx.state.user.id,
                },
            });

        return { data: entity };
    },


    // PUT /api/todos/:id
    async update(ctx) {
        const { id } = ctx.params;
        const { body } = ctx.request;

        const entity = await strapi
            .service('api::todo.todo')
            .update(id, { data: body });

        if (!entity) {
            return ctx.notFound(`Todo with id ${id} not found`);
        }

        return { data: entity };
    },



    // DELETE /api/todos/:id
    async delete(ctx) {
        const { id } = ctx.params;

        const entity = await strapi
            .service('api::todo.todo')
            .delete(id);

        if (!entity) {
            return ctx.notFound(`Todo with id ${id} not found`);
        }

        return { data: entity };
    },

}));
