export class PrimeNumbersHelper {
  public static isPrime(number: number): boolean {
    for ( let i = 2; i < number; i++ ) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  }

  public static generatePrimeNumbersTo(max: number): number[] {
    const primeNumbers = [2];
    for (let i = 3; i < max; i += 2) {
      if (PrimeNumbersHelper.isPrime(i)) {
        primeNumbers.push(i);
      }
    }
    return primeNumbers;
  }
}
