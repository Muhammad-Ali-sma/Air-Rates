
import axios from "axios";


const GoolgePlaceSearch = (input) => {
    let payload = {
        input: input
    }
    return axios.post(`https://www.searates.com/search/google-autocomplete`, payload)
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
}

const ShipmentQuote = (type, data) => {
    return axios.post(`https://vonto-link-backend-dev.azurewebsites.net/api/shipping/quotes/${type}`, data, { headers: { Namespace: 'dev.localhost' } })
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
}

const getHSCodes = (code = null, level = 0, setIsLoaded, setData) => {
    setIsLoaded(true);
    if (!code) {
        axios({
            url: 'https://www.searates.com/graphql_products',
            method: 'post',
            data: {
                query: `
         { hs_codes_list(code:${code},level:${level}) {
            code,
                category,
                level,
                description,
                parents
        }}
            `
            }
        }).then((result) => {
            let res = addIcon(result);
            let temp = [...[{ code: "", category: "", description: "Freight all kinds", level: 0, class: "_1" }, { code: "", category: "", description: "Personal", level: 0, class: "_2" }], ...res]
            setIsLoaded(false);
            setData(temp);
        });
    } else {
        axios({
            url: 'https://www.searates.com/graphql_products',
            method: 'post',
            data: {
                query: `
         { hs_codes_list(code:"${code}",level:${level}) {
            code,
                category,
                level,
                description,
                parents
        }}
            `
            }
        }).then((result) => {
            setIsLoaded(false);
            let res = addIcon(result);
            setData(res)
        });
    }
}

const addIcon = (result) => {
    if (result.data) {
        return result.data.data?.hs_codes_list.filter(x => {
            if (x.category === "01-05") {
                x.class = "_3"
            }
            if (x.category === "06-14") {
                x.class = "_4"
            }
            if (x.category === "15-15") {
                x.class = "_5"
            }
            if (x.category === "16-24") {
                x.class = "_6"
            }
            if (x.category === "25-27") {
                x.class = "_7"
            }
            if (x.category === "28-38") {
                x.class = "_8"
            }
            if (x.category === "39-40") {
                x.class = "_9"
            }
            if (x.category === "41-43") {
                x.class = "_10"
            }
            if (x.category === "44-46") {
                x.class = "_11"
            }
            if (x.category === "47-49") {
                x.class = "_12"
            }
            if (x.category === "50-63") {
                x.class = "_13"
            }
            if (x.category === "64-67") {
                x.class = "_14"
            }
            if (x.category === "68-70") {
                x.class = "_15"
            }
            if (x.category === "71-71") {
                x.class = "_16"
            }
            if (x.category === "72-83") {
                x.class = "_17"
            }
            if (x.category === "84-85") {
                x.class = "_18"
            }
            if (x.category === "86-89") {
                x.class = "_19"
            }
            if (x.category === "90-92") {
                x.class = "_20"
            }
            if (x.category === "93-93") {
                x.class = "_21"
            }
            if (x.category === "94-96") {
                x.class = "_22"
            }
            if (x.category === "97-97") {
                x.class = "_23"
            }
            if (x.category === "98-99") {
                x.class = "_24"
            }
            return x
        })
    }
}



export { GoolgePlaceSearch, getHSCodes, ShipmentQuote }