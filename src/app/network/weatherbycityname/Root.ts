import { Clouds } from "./Clouds"
import { Coord } from "./Coord"
import { Main } from "./Main"
import { Sys } from "./Sys"
import { Weather } from "./Weather"
import { Wind } from "./Wind"

export class Root {
    coord: Coord
    weather: Weather[]
    base: string
    main: Main
    visibility: number
    wind: Wind
    clouds: Clouds
    dt: number
    sys: Sys
    timezone: number
    id: number
    name: string
    cod: number
    fevourite: boolean

    constructor(coord: Coord, weather: Weather[], base: string,
        main: Main, visibility: number, wind: Wind,
        clouds: Clouds, dt: number, sys: Sys, timezone: number,
        id: number, name: string, cod: number, favourite: boolean) {
        this.coord = coord
        this.weather = weather
        this.base = base
        this.main = main
        this.visibility = visibility
        this.wind = wind
        this.clouds = clouds
        this.dt = dt
        this.sys = sys
        this.timezone = timezone
        this.id = id
        this.name = name
        this.cod = cod
        this.fevourite = favourite
    }
}