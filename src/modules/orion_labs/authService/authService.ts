export async function logout(): Promise<any> {
    const response = await fetch('/api/v1/auth/logout');
    return await response.json();
}

export async function fetchAuthUser(): Promise<any> {
    const response = await fetch('/api/v1/auth/user');
    return await response.json();
}
