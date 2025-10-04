import {test, expect, request} from '@playwright/test';

test ('obtener token de administrador', async ({request}) => {
    const response = await request.post('/api/v1/admin/authentication-token', {
        data: {
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log(responseBody.token);
    expect(responseBody.token).toBeDefined();
});
