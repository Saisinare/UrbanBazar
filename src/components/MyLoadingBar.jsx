import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

const MyLoadingBar = (props) => {
    const progressState = useSelector(state=>state.progressBar);
    const [progress, setprogress] = useState(0)
    useEffect(() => {
        if(progressState.isCompleted){
            setprogress(100);
        }else if(progressState.isWaiting){
            setprogress(30);
        }else{
            setprogress(0);
        }
        console.log("hello");
    }, [progressState.isWaiting])
  return (
    <div>
      <LoadingBar
        color="#008000"
        height={3}
        progress={parseInt(progress)}
      />
    </div>
  );
};

export default MyLoadingBar;
