let string = ' functionUp '

const doTrim = ()=>{
    //It removes all the type of spaces from front and end of the string.
    console.log(`after trim():${string.trim()}`)
}

const changetoLowerCase = ()=>{
    console.log("changed to lowercase:", "Rahul".toLowerCase())
}

const changetoUpperCase = ()=>{
    console.log("changed to uppercase:", "Rahul".toUpperCase())
}

module.exports.Trim = doTrim
module.exports.lowerCase = changetoLowerCase
module.exports.upperCase = changetoUpperCase