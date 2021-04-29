export class ECountryCompetition {

    static readonly L1_UBER_EATS: CountryCompetition = {
        competition: 'L1 Uber Eats',
        countryName: 'France'
    };

    static readonly L2_BKT: CountryCompetition = {
        competition: 'Ligue 2 BKT',
        countryName: 'France'
    };

    static readonly PREMIER_LEAGUE: CountryCompetition = {
        competition: 'Premier League',
        countryName: 'United Kingdom'
    };

    static readonly LIGA_PRIMERA: CountryCompetition = {
        competition: 'Liga Primera',
        countryName: 'Spain'
    };

    static readonly SERIA_A: CountryCompetition = {
        competition: 'Serie A',
        countryName: 'Italy'
    };

    static readonly LIGA_NOS: CountryCompetition = {
        competition: 'Liga NOS',
        countryName: 'Portugal'
    };

    static readonly BUNDESLIGA_1: CountryCompetition = {
        competition: 'Bundesliga 1',
        countryName: 'Germany'
    };

}

export class CountryCompetition {
    competition: string;
    countryName: string;
}
