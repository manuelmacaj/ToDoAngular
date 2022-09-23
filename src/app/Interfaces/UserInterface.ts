export interface User {
    uid?: string,
    name: string,
    surname: string,
    email: string
    password: string
}
export interface LoginForm {
    email: string
    password: string
}