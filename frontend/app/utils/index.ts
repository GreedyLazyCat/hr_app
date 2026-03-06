/**
 * Ассинхронный дебаунс функции
 * @param func функция
 * @param wait насколько откладывать выполнения с последнего вызова
 * @returns
 */
export const debounceAsyncFunc = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function (
    this: any,
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    return new Promise((resolve, reject) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        try {
          const result = await func.apply(this, args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, wait);
    });
  };
};
