export class ArrayHelper {
  public static shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  public static double<T>(array: T[]): T[] {
    return array.concat(array);
  }
}
