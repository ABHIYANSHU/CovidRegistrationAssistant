import axios from 'axios'
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"

const api = 
{
    getStates: () => 
    {    
        return axios({
            'method':'GET',
            'url':'https://cdn-api.co-vin.in/api/v2/admin/location/states',
            'headers': {
                'accept':'application/json'
            }
        })
    },

    getDistrict: (stateid) =>
    {
        return axios({
            'method':'GET',
            'url':'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + stateid,
            'headers': {
                'accept':'application/json'
            }
        })
    },

    storeData: async(contact, pincode, districtid) =>
    {
        initializeApp({
            apiKey: 'xxxxxxxxxxx',
            authDomain: 'xxxxxxxxxxx.firebaseapp.com',
            projectId: 'xxxxxxxxxxxxxxxxx'
          });
        
        const db = getFirestore();

        try {
            const docRef = await addDoc(collection(db, "xxxxxxxxx"), {
              contactno: contact,
              pincode: pincode,
              district: districtid,
              sended: 0
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
}

export { api }