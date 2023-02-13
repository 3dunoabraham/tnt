import { API_ORGS, API_ORG_TYPES, API_PEOPLE_BASE, API_UNIT_BASE, API_UNIT_OPTS_BASE } from '@/scripts/constants/api';
import { rejects } from 'assert';
import { DEFAULT_MODEL_STYLE_OBJARRAY, DEFAULT_UNIT_OPTS } from '@/scripts/constants/unit';
import { dd } from '@/scripts/helpers/devHelper';
import { isStrInteger, jstr2FullName } from '@/scripts/helpers/type/stringHelper';

export const DEFAULT_UNIT_FOREIGNS:any = { sales_statuses: [], customersArray: [], orgsArray: [] }
export async function fetchUnitForeigns() {
    // console.log("fetchPageData 1", )
    try {
        let customersArray = await fetchJsonArray(API_PEOPLE_BASE+"customers", "Data")
        // console.log("customersArray 1", customersArray)
        let orgsArray = await fetchJsonArray(API_ORGS, "Orgs")
        let { dealers } = await fetchAndParseOrgTypes(orgsArray)
            
        let sales_statuses = await fetchJsonArray(API_UNIT_OPTS_BASE+"sales_statuses")
        // console.log("fetchPageData sales_statuses 1", sales_statuses)
        return { customersArray, orgsArray, sales_statuses, dealers, }
    } catch (err) {
        return DEFAULT_UNIT_FOREIGNS
    }
}
export async function fetchUnitOptsObj() {
    try {
        let model_styles = await fetchJsonArray(API_UNIT_OPTS_BASE+"model_styles", "Model Styles")
        let {inventory_statuses, sales_statuses, title_statuses, conditions} = (
            await fetchUnitStatuses()
        )
        let orgsList = await fetchJsonArray(API_ORGS,"Orgs")
        let {manufacturers, distributors, dealers, owners } = (
            await fetchAndParseOrgTypes(orgsList)
        )

        return {
            model_styles,
            inventory_statuses, sales_statuses, title_statuses, conditions,
            orgsList, distributors, manufacturers, dealers, owners,
        }
    } catch (err) {
        return DEFAULT_UNIT_OPTS
    }
}
export const fetchDelete = async (url,body)=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'DELETE',body:JSON.stringify(body)
        })
        return fetchRes
    } catch (err) {
        dd(err)
        return err
    }
}
export async function PostData(url = '', data = {}, method = "POST") {
    try {
        const response = await fetch(url, {
            headers: {"Content-Type": "application/json"},
            method,
            body: JSON.stringify(data),
        });
        const ress = await response;
        return ress
    } catch (err) {
        dd(err)
        return err
    }
}
export const fetchPut = async (url,body)=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'PUT',body:JSON.stringify(body)
        })
        return await fetchRes
    } catch (err) {
        dd(err)
        return err
    }
}
export const fetchPost = async (url,body)=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'POST',body:JSON.stringify(body)
        })
        return fetchRes
    } catch (err) {
        dd(err)
        return err
    }
}
export const fetchPostImage = async (url,file,config:any)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const payload = new FormData();
            payload.append(config.fieldName || "img", file, file.name);

            const options = { method: 'POST', body: payload,
                headers: {
                    'Accept': (
                        'text/html,application/xhtml+xml,application/xml;q=0.9,'
                        +'image/avif,image/webp,*/*;q=0.8'
                    )
                },
            };
            
            // let fetchRes = await fetch(url, {
            //     headers:{"Content-Type":"application/json"},
            //     method: 'POST',body:JSON.stringify(body)
            // })
            const req = new XMLHttpRequest();
            req.open('POST', url);
            
            req.onreadystatechange = config.onReady
            req.upload.addEventListener('progress', config.onProgress)
            resolve({req,payload})

            
            // return fetchRes
            // resolve()
        } catch (err) {
            dd(err)
            reject(err)
        }
    })
}
export function returnError(_a,err,theUrl) {
    console.log("error fetching: "+theUrl,err)
    return _a
}
export async function fetchJsonArray(theUrl, propName = "") {
    try {
        let theRequest = await fetch(theUrl);
        let headerCType = theRequest.headers.get("content-type");
        if (!headerCType) return returnError([],{err:"contentType"},theUrl)
        let succesfullJsonResponse = headerCType.includes("application/json")
        if (!succesfullJsonResponse) return returnError([],{err:"json"},theUrl)
        let theJsonResult = await theRequest.json()
        // let invalidArrayObjOrArrayMsg = (
        //     "Ops..! there is no such thing called <model_style> please refer to </api/v1/units/opts/> for the list of available options related to Units"
        // )
        // if ("message" in theJsonResult && theJsonResult.message == invalidArrayObjOrArrayMsg ) return returnError([],{},theUrl)
        let theParsedResult = propName == "" ? theJsonResult : theJsonResult[propName]
        if (propName != "" && !(propName in theJsonResult)) { return returnError([],{},theUrl) }
        return theParsedResult
    } catch (err) {
        return returnError([],err,theUrl)
    }
}
export async function fetchMultipleJsonArray(requestsObj) {
    let reqKeys =  Object.keys(requestsObj)
    let requests =  Object.keys(requestsObj).map((reqKey)=>{
        return fetch(requestsObj[reqKey][0])
    })
    return Promise.all(requests).then((responsesArray)=>{
        return Promise.all(reqKeys.map((r,index) =>
            responsesArray[index].json()
        ))
    })
}



export async function fetchAndParseOrgTypes(orgsArray) {
    let orgTypesList = await fetchJsonArray(API_ORG_TYPES)
    
    let manufacturers = parseOrgTypeList("manufacturer", orgsArray,orgTypesList)
    let distributors = parseOrgTypeList("distributor", orgsArray,orgTypesList);
    let dealers = parseOrgTypeList("dealer", orgsArray,orgTypesList)
    let owners = parseOrgTypeList("owner", orgsArray,orgTypesList)
    // console.log(API_ORG_TYPES, orgTypesList, {manufacturers, distributors, dealers })
    return {manufacturers, distributors, dealers, owners }
}
export const parseArray = (_obj)=>{
    return _obj && Array.isArray(_obj) ? _obj : []
}
export async function fetchUnitStatuses() {
    try {
        let model_styles = (
            await fetchJsonArray(API_UNIT_OPTS_BASE+"model_styles", "Model Styles")
        )
        let reqObj = {
            "inventoryStatuses": [API_UNIT_OPTS_BASE+"inventory_statuses",""],
            "saleStatuses": [API_UNIT_OPTS_BASE+"sales_statuses",""],
            "titleStatuses": [API_UNIT_OPTS_BASE+"title_statuses",""],
            "conditions": [API_UNIT_OPTS_BASE+"conditions",""],
        }
        let reqObjKeys = Object.keys(reqObj)
        let optsArray = await fetchMultipleJsonArray(reqObj)
        let inventory_statuses = parseArray(optsArray[reqObjKeys.indexOf("inventoryStatuses")])
        let sales_statuses = parseArray(optsArray[reqObjKeys.indexOf("saleStatuses")])
        let title_statuses = parseArray(optsArray[reqObjKeys.indexOf("titleStatuses")])
        let conditions = parseArray(optsArray[reqObjKeys.indexOf("conditions")])

        return {
            inventory_statuses, sales_statuses, title_statuses, conditions,
        }
    } catch (err) {
        dd("fetchUnitStatuses", err)
        return {
            inventory_statuses:[],
            sales_statuses:[],
            title_statuses:[],
            conditions:[],
        }
    }
}
export function parseNoteObj(aNoteString,id) {
    let splittedString = aNoteString.split(" ")
    let [date,time,created_by,...rest] = splittedString
    return {
        created_at: date,
        created_by: created_by.split(":")[0],
        id: id,
        is_active: 'false',
        is_verified: 'false',
        text: rest.join(" "),
        units: '',
        updated_at: 'null',
        updated_by: 'null',
    }
}
export function parsedFetchedUnit(aUnit, orgsArray, customersArray) {
    let aParsedUnit = {...aUnit, ...{location: `-`}}
    if (aUnit.location_related == 0) return aParsedUnit 
    if (aUnit.location_related == 1)
    {
        let theFoundOrg = orgsArray.filter((aOrg, index)=>{
            return aOrg.id == aUnit.location
        })
        if (theFoundOrg.length == 0) return aParsedUnit
        aParsedUnit = {...aUnit, ...{location: theFoundOrg[0].name}}
    }
    if (aUnit.location_related == 2)
    {
        let theFoundCustomer = customersArray.filter((aOrg, index)=>{
            return aOrg.id == aUnit.location
        })
        if (theFoundCustomer.length == 0) return aParsedUnit
        aParsedUnit = {...aUnit, ...{location: theFoundCustomer[0]._name}}
    }
    return aParsedUnit 
}

export function parseChangedDataObj(changedData) {
    let the_data = Object.fromEntries(changedData) 
    if (changedData.has("year"))
    {
        if (!the_data.year) the_data.year = null
    }
    if (changedData.has("locations"))
    {
        Object.keys(the_data.locations).map((key,index)=>{
            if (key in the_data.locations && the_data.locations[key] == "None") return
            the_data[key] = the_data.locations[key] || null
        })
        delete the_data["locations"]
    }

    if (changedData.has("investors"))
    {
        Object.keys(the_data.investors).map((key,index)=>{
            if (
                    key in the_data.investors &&
                    (
                        the_data.investors[key] == "None" ||
                        (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                    )
                ) return
            the_data[key] = the_data.investors[key] || null
        })
        delete the_data["investors"]
    }
    return the_data
}


export function parseChangedDataToAddObj(changedData) {
    let the_data = Object.fromEntries(changedData) 
    if (changedData.has("year"))
    {
        if (!the_data.year) the_data.year = null
    }
    if (changedData.has("locations"))
    {
        Object.keys(the_data.locations).map((key,index)=>{
            if (key in the_data.locations && the_data.locations[key] == "None") return
            the_data[key] = the_data.locations[key] || null
        })
        delete the_data["locations"]
    }

    if (changedData.has("investors"))
    {
        Object.keys(the_data.investors).map((key,index)=>{
            if (
                    key in the_data.investors &&
                    (
                        !the_data.investors[key] ||
                        the_data.investors[key] == "None" ||
                        (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                    )
                ) {
                return
            }
            the_data[key] = the_data.investors[key]
        })
        delete the_data["investors"]
    }
    return the_data
}
export async function fetchUnitUIDAvailability(uid) {
    let theRequest = await fetch(API_UNIT_BASE + uid)
    let headerCType = theRequest.headers.get("content-type");
    let isUIDTaken = headerCType.includes("application/json")
    return !isUIDTaken
}
export async function fetchParsedUnit(uid) {
    let theRequest = await fetch(API_UNIT_BASE + uid);
    let headerCType = theRequest.headers.get("content-type");
    if (!headerCType || (headerCType && !headerCType.includes("application/json"))) return null
    let theUnitResult = await theRequest.json()
    if (!theUnitResult) return null
    let theParsedResult = theUnitResult.Data[0]
    let theExportResult = {...theParsedResult, ...{
        investors: {
            current_investor: jstr2FullName(theParsedResult.current_investor),
            previous_investor: jstr2FullName(theParsedResult.previous_investor),
        },
        locations: {
            location: theParsedResult.location,
            physical_as_of: theParsedResult.physical_as_of,
            location_related: theParsedResult.location_related,
        },
    }}
    return theExportResult
}
export function parseOrgTypeList(type, _orgsList, DEFAULT_ORG_TYPE_LIST) {
    if (type == "owner")
    {
        return _orgsList.filter((item,index)=> {return parseInt(item.type) <= 6 })
    }
    let orgTypeId  = DEFAULT_ORG_TYPE_LIST.filter(orgOptType=>orgOptType.label == type)
    if (!orgTypeId.length) return []
    let returnList = _orgsList.filter((item,index)=> {
        return item.type == orgTypeId[0].id
    })
    return returnList
}



export async function fetchDownload(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    });
}