import   React from 'react'
import hoistStatics from 'hoist-non-react-statics'
function withStyle(Comp,styles){
    console.log(23333334444444444)
    function NewComp (props){
        console.log('props.staticContextprops.staticContext')
        console.log(props.staticContext)
        if(props.staticContext){
            props.staticContext.css.push(styles._getCss())
        }
        return <Comp {...props}/>
    }
    //拷贝静态方法 
  //  hoistStatics(NewComp,Comp)
    return NewComp
}
export default withStyle

 