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