import { Colors } from "../Colors";

export function ClockComponent({color,value}){
    if(value%60>=10){
        return(
            <div className={['clock', color===Colors.white?'w':'b'].join(' ')}>{`${Math.floor(value/60)}:${value%60}`}</div>
        )
    }
    if(value%60<10){
        return(
        <div className={['clock', color===Colors.white?'w':'b'].join(' ')}>{`${Math.floor(value/60)}:0${value%60}`}</div>
    )
}
}