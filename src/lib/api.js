import axios from "axios";

export const addData = async (bookingData, entity) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/${entity}`, {
            method: 'POST',
            bookingData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.data;

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data.message || 'Could not add booking data');
        }
    } catch (error) {
        return { error: error.message };
    }
};

export const deleteData = async (entity, id) => {
    return axios.delete(`http://localhost:5000/api/${entity}(${id})`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.data;
    }).catch(error => {
        console.log(error.message);
        return null;
    });
};

export const getToken = async () => {
    try {
        const response = await axios.get('http://localhost:5000');
        const data = await response.data;

        return data;
    } catch (error) {
        console.error(error.message);
        throw new Error('Failed to fetch token');
    }
};

export const getData = async (data, token) => {
    try {
        const response = await axios.get(`https://netwaysuaedemo.crm4.dynamics.com/api/data/v9.2/${data}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        return response.data.value;
    } catch (error) {
        console.log(error.message);
        throw new Error('Failed to fetch data');
    }
};

export const getDataId = async (data, token, id) => {
    try {
        const response = await axios.get(`https://netwaysuaedemo.crm4.dynamics.com/api/data/v9.2/${data}(${id})`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        return response.data;
    } catch (error) {
        console.log(error.message);
        throw new Error('Failed to fetch details data');
    }
};