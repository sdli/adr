const countryList = function(obj){
    console.log(typeof obj);
    if(typeof obj !== "object"){
        return false;
    }else{
        switch (obj.orgLevel){
            case "3": return changeIntoLevel3(obj);
            default : return changeIntoLevel3(obj);
        }
    }
}

const changeIntoLevel3 = function(obj){
    let tempProObj = {
        value: "henan",
        label: "河南省",
        children:[
            {
                value: obj.parentOrgan.parentOrgan.orgId,
                label: obj.parentOrgan.parentOrgan.orgName,
                children:[
                    {
                        value: obj.parentOrgan.orgId,
                        label: obj.parentOrgan.orgName,
                        children:[
                            {
                                value: obj.orgId,
                                label: obj.orgName
                            }
                        ]
                    }

                ] 
            }
        ]
    };

    return {
        options: [tempProObj],
        defaultValues: ["henan",obj.parentOrgan.parentOrgan.orgId,obj.parentOrgan.orgId,obj.orgId],
        defaultInput: "河南省"+"/"+obj.parentOrgan.parentOrgan.orgName+"/"+obj.parentOrgan.orgName+"/"+obj.orgName
    };
};

export default countryList;