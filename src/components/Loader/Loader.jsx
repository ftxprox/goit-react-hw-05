import { LineWave } from 'react-loader-spinner'
import s from './Loader.module.css'

const Loader =()=>{
return <div className={s.loader}>
    <LineWave
    visible={true}
    height="333"
    width="333"
    color="#0aad5e"
    ariaLabel="line-wave-loading"
    wrapperStyle={{}}
    wrapperClass=""
    firstLineColor=""
    middleLineColor=""
    lastLineColor=""/>
    </div>
}
export default Loader;