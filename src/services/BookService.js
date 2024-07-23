import API from './api';

export default class BookService {

    static bookAppointment = (payload) =>
    {
       return API.post('/api/blood/book/bookappointment', payload);
    }

    static getNewReference = () =>
    {
        return API.get('/api/book/getnewreference');
    }

    static getBookingById = (id) =>
    {
        return API.get(`/api/blood/book/getbookingbyid?id=${id}`);
    }

    static getAllCodes = () =>
    {
        return API.get(`/api/medex/invoice/getallbloodcodes`)
    }

    static getBloodReport = (id) =>
    {
       return API.get(`/api/blood/book/getbloodreportbyid?id=${id}`);
    }



}