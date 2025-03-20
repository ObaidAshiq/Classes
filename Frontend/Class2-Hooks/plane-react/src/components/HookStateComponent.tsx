
const HookStateComponent = () => {
    let index = 0;
    const handleNextClick = ()=>{
        index= index + 1;
    }
  return (
    <div>   
        <button onClickCapture={handleNextClick}>Next</button>
        <p>{index}</p>
    </div>
    
  )
}

export default HookStateComponent