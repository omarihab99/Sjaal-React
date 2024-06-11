export default interface Order {
    id: string;
    email: string;
    notifyMe: boolean;
    country: string;
    fName: string;
    lName: string;
    address: string;
    apartment: string;
    city: string;
    governorate: string;
    pCode: string;
    phone: string;
    nextTime: boolean;
    shippingCity: string;
    sameAddress: boolean;
    totalPrice:number;
}
