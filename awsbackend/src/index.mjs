import requestHandler from './requestHandler.mjs';

export const handler = async (event) => {
    const handler = new requestHandler({});
    return handler.handler(event);
};
