

type Props = {
    id:string
    className:string
    inputClassName:string
    placeholder:string
    onClick:() => void
    type:string
    ref:React.RefObject<HTMLInputElement>
    value:string
    onKeypress:(e: React.KeyboardEvent<HTMLInputElement>) => void
    onHandler:(e: any) => void
}

export const LoginInput = ({id,className,inputClassName,placeholder,onClick,type,ref,value,onKeypress,onHandler}:Props) => {
    return (
        <div className={className} onClick={onClick}>
            <input
<<<<<<< HEAD
                id={id} 
=======
                id={id}
>>>>>>> 76b35c21b27a4125ff75a7a115960fb4b36c3d5a
                className={inputClassName}
                type={type}
                ref={ref}
                placeholder={placeholder}
                value={value}                            
                onKeyPress={(e) =>onKeypress(e)}
                onChange={onHandler}
            />                            
        </div>
    )
}
