
export const createJsonBody = (jsonBody: any) => ({ 
    author: { 
        name: process.env.AUTHOR_NAME ,
        lastname: process.env.AUTHOR_LASTNAME 
    },
    ...jsonBody
})