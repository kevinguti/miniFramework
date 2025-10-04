import {test, expect, request} from '@playwright/test';

test ('obtener token de administrador', async ({request}) => {
    const response = await request.post('/api/v2/admin/administrators/token', {
        data: {
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);
});
