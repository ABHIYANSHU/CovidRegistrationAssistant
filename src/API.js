import axios from 'axios'

const api = 
{
    getData: () => 
    {    
    return axios({
            'method':'GET',
            'url':'https://cdn-api.co-vin.in/api/v2/admin/location/states',
            'headers': {
                'accept':'application/json',
                'Accept-Language':'en_US'
            }
        })
    }
}

export { api }