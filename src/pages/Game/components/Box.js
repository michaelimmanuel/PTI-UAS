

const Box = (props)=>{
    return (
        <div className="box" {...props}> 
        {props.x ? 'x' : (props.o ? 'o' : '')}
        </div>
    )
}

export default Box;