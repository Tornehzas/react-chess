

export function Modal({active,setActive, message}){
    return(
        <div className={active?'modal active':'modal'} onClick={()=>setActive(false)}>
            <div className="modal__content"onClick={e=>e.stopPropagation()}>
              {message}
            </div>
        </div>
    )
}