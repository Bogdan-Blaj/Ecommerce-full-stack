import axios from 'axios';
import {SITE_SERVER} from '../../components/Utils/misc';

import {
    GET_SITE_DATA,
    UPDATE_SITE_DATA
} from '../actions/types';

export function getSiteData(){

    const request = axios.get(`${SITE_SERVER}/site_data`)
                    .then(response => response.data);

    return {
        type: GET_SITE_DATA,
        payload: request
    }

}

export function updateSiteData(dataToSubmit){

    const request = axios.post(`${SITE_SERVER}/site_data`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_SITE_DATA,
        payload: request
    }

}