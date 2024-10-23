import os
def order_confirmation_email(order):
    return f"""
            <html>
                <body>
                    <h1>Order Confirmation</h1>
                    <p>We have received your order at Le Flaneur Amsterdam.</p>
                    {
                        "".join(
                            f"<p>{detail.book.title}: €{detail.book.price}</p>"
                            for detail in order.order_details.all()
                        )   
                    }
                </body>
            </html>
            """

def payment_failed_email(order):
    return f"""
            <html>
                <body>
                    <h1>Payment Failed - Le Flaneur Amsterdam</h1>
                    <p>Your payment is failed. Order id: {order.id}</p>
                    {
                        "".join(
                            f"<p>{detail.book.title}: €{detail.book.price}</p>"
                            for detail in order.order_details.all()
                        )   
                    }
                </body>
            </html>
            """
def reset_password_email(key):
    return f"""
            <html>
                <body>
                    <h1>Password Reset Request< - Le Flaneur Amsterdam/h1>
                    <p>You can reset your password by following link: {os.getenv("BASE_SERVER_URL")}/customer/resetpassword?token={key}</p>
                    <p>If you do not have such a request, please contact us by replying to this e-mail.</p>
                </body>
            </html>
            """