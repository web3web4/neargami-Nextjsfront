export interface Profile{
    firstname: string,
    lastname: string,
    email: string,
    country: string,
}

export interface EditProfile extends Profile{
    discord: string,
    facebook: string,
    twitter: string,
    linkedin: string,
    image: string,
}