import os
def order_confirmation_email(order):
    return f"""
            <html>
                <body>
                    <h2>Orderbevestiging</h2>
                    <div>
                    <h4>Beste mevrouw of meneer,</h4>
                    <p>
                        Hartelijk dank voor uw bestelling. Lezen of tweedehands kopen alleen redt de wereld niet, maar we geloven dat dit nog een bescheiden stap in de goede richting is. 
                    </p>
                    <p> 
                        Wij verzenden twee dagen per week; maandag en vrijdag. Als u haast heeft, neem dan contact met ons op.
                    </p>
                    <p>
                        Vraag eventueel om een factuur.
                    </p>
                    <p>
                        Met vriendlijke groeten,
                    </p>
                    </div>
                    <div>
                    <h4>Bestelgegevens</h4>
                    {
                        "".join(
                            f"<p>{detail.book.title}: €{detail.book.price}</p>"
                            for detail in order.order_details.all()
                        )   
                    }
                    </div>
                    <div>
                    <h2>Le Flaneur Amsterdam</h2>
                    Prinsengracht 260 o
                    1016 HG Amsterdam
                    www.leflaneuramsterdam.com
                    </div>
                </body>
            </html>
            """

def payment_failed_email(order):
    return f"""
            <html>
                <body>
                    <h2>Betaling mislukt</h2>
                    <p>Uw betaling mislukt - Order id: {order.id}</p>
                    <div>
                    <h4>Mislukte Bestelgegevens</h4>
                    {
                        "".join(
                            f"<p>{detail.book.title}: €{detail.book.price}</p>"
                            for detail in order.order_details.all()
                        )   
                    }
                    </div>
                    <div>
                    <h2>Le Flaneur Amsterdam</h2>
                    Prinsengracht 260 o
                    1016 HG Amsterdam
                    www.leflaneuramsterdam.com
                    </div>
                </body>
            </html>
            """
def order_recieved_email(order):
    return f"""
            <html>
                <body>
                    <h2>Order recieved with payment status: {order.status}</h2>
                    <p>You recieved an order with order id: {order.id}</p>
                    <div>
                    <h4>Order Details</h4>
                    {
                        "".join(
                            f"<p>{detail.book.title}: €{detail.book.price}</p>"
                            for detail in order.order_details.all()
                        )   
                    }
                    </div>
                    <div>
                    <h2>Le Flaneur Amsterdam</h2>
                    Prinsengracht 260 o
                    1016 HG Amsterdam
                    www.leflaneuramsterdam.com
                    </div>
                </body>
            </html>
            """
def reset_password_email(key):
    return f"""
            <html>
                <body>
                    <h1>Password Reset Request< - Le Flaneur Amsterdam/h1>
                    <p>You can reset your password by following link: {os.getenv('BASE_SERVER_URL')}/customer/resetpassword?token={key}</p>
                    <p>If you do not have such a request, please contact us by replying to this e-mail.</p>
                </body>
            </html>
            """