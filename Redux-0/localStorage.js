export const loadState = () => {
    try{
        const serializedStated = localStorage.getItem("state");
        if (serializedStated === null){
            return undefined;
        }
        else
        {
            return JSON.parse(serializedStated);
        }
    }
    catch(err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(err){
        console.log("Save Failed");
    }
};