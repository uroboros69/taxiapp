import { Circle } from "better-react-spinkit";
function Loading(){
    return (
       <div style={{display:"grid", placeItems:"center", height:"80vh"}}>
           <img
            src="https://us.123rf.com/450wm/katflare/katflare1610/katflare161000116/66591687-vector-flat-taxi-logo-isolated-on-white-background-car-face-icon-silhouette-auto-logo-template-taxi-.jpg?ver=6"
            alt=""
            style={{marginBotton: 10}}
            height={200}
           />
           <Circle color="#3CBC28" size={60}/>
       </div> 
    );
};
export default Loading