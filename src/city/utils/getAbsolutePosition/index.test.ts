import {getAbsolutePosition} from './';

describe('getAbsolutePosition', () => {
    it('Возвращает корректное значение', () => {
        const coords = {x: 5, y: 0, z: 25};

        expect(getAbsolutePosition(coords)).toEqual({x: -5, y: 0, z: 15});
    });

    it('Возвращает корректное значение при 0', () => {
        const coords = {x: 0, y: 0, z: 0};

        expect(getAbsolutePosition(coords)).toEqual({x: -10, y: 0, z: -10});
    });
});
