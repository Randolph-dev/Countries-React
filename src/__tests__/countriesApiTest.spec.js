import { getAllCountries } from "../services/countriesServices";

describe('Countries API should return data', () => {
    //Check that the data is an array (since the API returns an array of countries)
    let data;
    beforeAll(async () => {
        data = await getAllCountries();
    });

    it('API should return an array of countries', async () => {
        const data = await getAllCountries();
        expect(Array.isArray(data)).toBe(true)
    });

    it('Each item should contain the following properties', async () => {
        const data = await getAllCountries();
        data.forEach((country) => {
            expect(country).toHaveProperty('name');
            expect(country).toHaveProperty('area');
            expect(country).toHaveProperty('population');
        });
    });

});