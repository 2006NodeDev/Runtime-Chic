import { configure, getLogger } from 'log4js'

configure({
    appenders:{
        console:{type:'stdout', layout: { type: 'coloured'} },
        errorFile:{type:'file', filename:'logs/error.log'}
    },
    categories:{
        default:{appenders:['console'], level:'All'},
        error:{appenders:['errorFile'], level:'WARN'}
    }
}) 

export const logger = getLogger()
export const errorLogger = getLogger('error')