export class Sys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number

    constructor(type: number, id: number, country: string,
        sunrise: number, sunset: number) {

        this.type = type
        this.id = id
        this.country = country
        this.sunrise = sunrise
        this.sunset = sunset
    }
}