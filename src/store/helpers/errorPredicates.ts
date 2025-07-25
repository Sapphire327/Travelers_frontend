import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
    error: unknown,
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is {data:{message: string} } {
    return (
        typeof error === 'object' &&
        error != null &&
        'data' in error &&
        typeof error.data === 'object'&&
        (error as any).data != null&&
        'message' in  (error as any).data &&
        (typeof ((error as any).data as any).message === 'string')
    )
}

export function isErrorWithZodErrors(errors: any):errors is {data:{errors: string[]}} {
    return Boolean(
        typeof errors === "object" &&
        errors !== null &&
        "data" in errors &&
        Array.isArray(errors["data"]?.errors)
    );
}

export function isErrorWithStatusCode(error: unknown): error is {status:number} {
    return (
        typeof error === 'object' &&
        error != null &&
        'status' in error &&
        typeof error.status === 'number'
    )
}
export function getMessageFromError(error: unknown):string{
   if(isErrorWithMessage(error)){
       if(typeof (error.data.message)==='object')
           return error.data.message[0];
       else
           return error.data.message;
   }else if (isErrorWithZodErrors(error)){
       return error.data.errors[0]
   }
   return 'Произошла ошибка'
}
export function getStatusCodeFromError(error: unknown):number|null{
    if(isErrorWithStatusCode(error)){return error.status}
    return null;
}