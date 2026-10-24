import {parsePhoneNumberFromString} from "libphonenumber-js"


export function validatedAndFormate(contact){
    const parsed=parsePhoneNumberFromString(contact)

    if(!parsed || !parsed.isValid())return null ; 

    return parsed.number;
}