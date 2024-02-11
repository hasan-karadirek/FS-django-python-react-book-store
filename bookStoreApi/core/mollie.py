from mollie.api.client import Client
import os

def createMolliePayment(amount,orderId,redirectUrl):
    mollie_client = Client()
    mollie_client.set_api_key(os.getenv("MOLLIE_API_KEY"))
    payment = mollie_client.payments.create({
        "amount": {
            "currency": "EUR",
            "value": amount,
        },
        "description": "Order {}".format(orderId),
        "redirectUrl": redirectUrl,
        "webhookUrl": "http://bookstore.us-east-1.elasticbeanstalk.com/api/payment/mollie-hook/{}/".format(orderId),
        "metadata": {
            "order_id": orderId,
        }
    })
    return payment
def getPayment(paymentId):
    mollie_client = Client()
    mollie_client.set_api_key(os.getenv("MOLLIE_API_KEY"))
    payment = mollie_client.payments.get(paymentId)
    return payment