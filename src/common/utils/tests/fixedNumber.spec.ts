import { fixedNumber } from '../fixedNumber';

describe('src/common/utils/fixedNumber', () => {
  describe('fixedNumber', () => {
    it('should return toFixed 4 number', () => {
      expect(fixedNumber(567.764268426324, 4)).toBe(567.7643);
      expect(fixedNumber(567.760068426324, 4)).toBe(567.7601);
      expect(fixedNumber(567.760048426324, 4)).toBe(567.76);
    });

    it('should return toFixed 2 number', () => {
      expect(fixedNumber(567.764268426324, 2)).toBe(567.76);
    });

    it('should return toFixed 0 number', () => {
      expect(fixedNumber(567.764268426324, 0)).toBe(568);
    });

    describe('edge cases', () => {
      it('should return 0 for 0', () => {
        expect(fixedNumber(0, 4)).toBe(0);
      });

      it('should return -1 for -1 when asked for 0', () => {
        expect(fixedNumber(-1, 0)).toBe(-1);
      });

      it('should throw on wrong arguments', () => {
        expect(() => fixedNumber(567.764268426324, -1)).toThrow();
      });
    });
  });
});
