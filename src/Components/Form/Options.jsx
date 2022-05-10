export const Options = ({data}) => {
  return (
    data.map((elem,key)=><option value={elem} key={key}>{elem}</option>)
  )
}
