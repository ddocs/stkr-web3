import { walletConversion } from '../convertWallet';

describe('src/common/utils/convertWallet', () => {
  describe('convertWallet', () => {
    it('should return converted wallet', () => {
      expect(
        walletConversion('0x603366e08380EceB2E334621A27eeD36F34A9D50'),
      ).toBe('0x603...D50');
    });

    it('should return converted wallet', () => {
      expect(
        walletConversion('0x5646466e08380EceB2E334621A27eeD36F346765'),
      ).toBe('0x564...765');
    });

    it('should return converted wallet', () => {
      expect(walletConversion('123')).toBe('123');
    });
  });
});
