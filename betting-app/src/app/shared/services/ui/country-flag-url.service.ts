import { Injectable } from '@angular/core';
import { Country, ECountries } from '../../enums/countries';
import { countries, CountryData } from 'country-flags-svg';
import { ECountryCompetition } from '../../enums/country-competition';

@Injectable({
    providedIn: 'root'
})
export class CountryFlagUrlService {

    ECountries: typeof ECountries = ECountries;
    ECountryCompetition: typeof ECountryCompetition = ECountryCompetition;

    constructor() {
    }

    public getFlagUrlByCompetitionName(competition: string): CountryData {
        switch (competition) {

            case ECountryCompetition.L1_UBER_EATS.competition:
                return this._getFlag(ECountryCompetition.L1_UBER_EATS.countryName);

            case ECountryCompetition.L2_BKT.competition:
                return this._getFlag(ECountryCompetition.L2_BKT.countryName);

            case ECountryCompetition.PREMIER_LEAGUE.competition:
                return this._getFlag(ECountryCompetition.PREMIER_LEAGUE.countryName);

            case ECountryCompetition.SERIA_A.competition:
                return this._getFlag(ECountryCompetition.SERIA_A.countryName);

            case ECountryCompetition.LIGA_NOS.competition:
                return this._getFlag(ECountryCompetition.LIGA_NOS.countryName);

            case ECountryCompetition.BUNDESLIGA_1.competition:
                return this._getFlag(ECountryCompetition.BUNDESLIGA_1.countryName);

            default:
                return '';
        }
    }

    private _getFlag(countryName: string): CountryData {
        return countries.find((country: Country) => country.name === countryName);
    }

}
