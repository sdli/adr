const countryList = function(obj){
    console.log(typeof obj);
    if(typeof obj !== "object"){
        return false;
    }else{
        console.log(obj.orgLevel);
        switch (parseInt(obj.orgLevel)){
            case 1: return changeIntoLevel1(obj);
            case 2: return changeIntoLevel2(obj);
            case 3: return changeIntoLevel3(obj);
            case 4: return changeIntoLevel4(obj);
            default : return changeIntoLevel3(obj);
        }
    }
}

const changeIntoLevel1 = function(obj){
        let tempProObj = {
            value: "henan",
            label: "河南省",
            children:[
                {
                    value: obj.orgId,
                    label: obj.orgName 
                }
            ]
        };

        return {
            options: [tempProObj],
            defaultValues: [
                "henan",
                obj.orgId,
            ],
            defaultInput: "河南省"+"/"+obj.orgName
        };
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

const changeIntoLevel2= function(obj){
    let tempProObj = {
        value: "henan",
        label: "河南省",
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
    };

    return {
        options: [tempProObj],
        defaultValues: [
            "henan",
            obj.parentOrgan.orgId,
            obj.orgId,
        ],
        defaultInput: "河南省"+"/"+obj.parentOrgan.orgName+"/"+ obj.orgName
    };
}
const changeIntoLevel4 = function(obj){
    let tempProObj = {
        value: "henan",
        label: "河南省",
        children:[
            {
                value: obj.parentOrgan.parentOrgan.parentOrgan.orgId,
                label: obj.parentOrgan.parentOrgan.parentOrgan.orgName,
                children:[
                    {
                        value: obj.parentOrgan.parentOrgan.orgId,
                        label: obj.parentOrgan.parentOrgan.orgName,
                        children:[
                            {
                                value: obj.parentOrgan.orgId,
                                label: obj.parentOrgan.orgName,
                                children: [
                                    {
                                        value: obj.orgId,
                                        label: obj.orgName
                                    }
                                ]
                            }
                        ]
                    }

                ] 
            }
        ]
    };

    return {
        options: [tempProObj],
        defaultValues: [
            "henan",
            obj.parentOrgan.parentOrgan.parentOrgan.orgId,
            obj.parentOrgan.parentOrgan.orgId,
            obj.parentOrgan.orgId,
            obj.orgId
        ],
        defaultInput: "河南省"+"/"+obj.parentOrgan.parentOrgan.parentOrgan.orgName+"/"+obj.parentOrgan.parentOrgan.orgName+"/"+obj.parentOrgan.orgName+"/"+obj.orgName
    };
}

export default countryList;

