export default function removeDuplicates(originalArray:any, prop:string) {
    let newArray = [];
    let lookupObject:any  = {};

    for(let i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}