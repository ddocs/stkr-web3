import { fixedNumber } from '../fixedNumber';

describe('src/common/utils/fixedNumber', () => {
  describe('fixedNumber', () => {
    it('should return toFixed number', () => {
      expect(fixedNumber(567.764268426324, 4)).toBe(567.7643);
    });

    it('should return toFixed number', () => {
      expect(fixedNumber(567.760068426324, 4)).toBe(567.7601);
    });

    it('should return toFixed number', () => {
      expect(fixedNumber(567.760048426324, 4)).toBe(567.76);
    });

    it('should return toFixed number', () => {
      expect(fixedNumber(0, 4)).toBe(0);
    });

    it('should return toFixed number', () => {
      expect(fixedNumber(567.764268426324, 2)).toBe(567.76);
    });
  });
});
