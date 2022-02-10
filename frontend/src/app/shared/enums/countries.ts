export class ECountries {

    static readonly GERMANY: Country = {
        altSpellings: [],
        demonym: 'German',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
        iso2: 'DE',
        iso3: 'DEU',
        name: 'Germany',
    };

    static readonly FRANCE = {
        altSpellings: [],
        demonym: 'French',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
        iso2: 'FR',
        iso3: 'FRA',
        name: 'France'
    };

    static readonly ITALY: Country = {
        altSpellings: [],
        demonym: 'Italian',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
        iso2: 'IT',
        iso3: 'ITA',
        name: 'Italy'
    };

    static readonly SPAIN: Country = {
        altSpellings: [],
        demonym: 'German',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
        iso2: 'DE',
        iso3: 'DEU',
        name: 'Germany'
    };

    static readonly PORTUGAL: Country = {
        altSpellings: [],
        demonym: 'Spanish',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Portugal.svg',
        iso2: 'ES',
        iso3: 'ESP',
        name: 'Portugal'
    };

    static readonly ENGLAND: Country = {
        altSpellings: ['UK'],
        demonym: 'British',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
        iso2: 'GB',
        iso3: 'GBR',
        name: 'United Kingdom'
    };
}

export class Country {
    altSpellings: string[];
    demonym: string;
    flag: string;
    iso2: string;
    iso3: string;
    name: string;
}

