class APIUtils {

    constructor(request,loginPayload) {
        this.request = request
        this.loginPayload=loginPayload
    }


    async loginAPI() {
        const loginResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/auth/login/", {
            data: this.loginPayload
        })
        
        const loginResponseJson = await loginResponse.json()
        const token = loginResponseJson.token
        return token
        
    }



    async orderAPI(orderPayload) {
        let response ={}
        response.token =await this.loginAPI()
        const orderResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data:orderPayload,
            headers:{
                "Authorization":response.token,
                'Content-Type'  : 'application/json'

            }
        })
        
        const orderResponseJson = await orderResponse.json()
        response.orderId = orderResponseJson.orders[0]
        return response
        
    }













}

module.exports = { APIUtils }
