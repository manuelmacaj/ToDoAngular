export interface User {
    id?: number,
    name: string,
    surname: string,
    email: string
}
export interface LoginForm {
    email: string
    password: string
}
export interface RegisterForm {
    name: string,
    surname: string,
    email: string
    password: string
}