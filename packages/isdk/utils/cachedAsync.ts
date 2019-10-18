/**
 * a cached async/await error-first function wrapper
 * 
 * @example
 * const [err, res] = catchedAsync(isdk.someApiCall())
 */
export async function catchedAsync <T> (promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const res = await promise;
    return [null, res];
  }
  catch (err) {
    return [err, null];
  }
}