def addTextRecord(text, name, value, color = 'regular'):
    colors = {
        'warning': '\033[93m',
        'regular': '\033[0m'
    }
    text +=  f"""{name.capitalize()}: {colors[color]}{value}{colors['regular']}
    """
    
    return text

def addHtmlRecord(html, name, value, color = 'regular'):
    colors = {
        'warning': '#ff0000',
        'regular': '#000000'
    }
    html += f"""<tr>
                    <td>{name.capitalize()}:</td>
                    <td style="color:{colors[color]}">{value}</td>
                </tr>
            """
    return html

def constructMailBody(sender, email_addresses, address=None, latitude=None, longitude=None, **kwargs):
    print(kwargs)
    metric = 'humidity' if kwargs['humidity'] is not None else 'temperature'
    text = f"""From: {sender}
    To: {email_addresses}
    Subject: Alert message!
    Warning Message!
    You are receiving this message because there has been detected high {metric} in an IOT device near you!
    """
    text = addTextRecord(text, metric, kwargs[metric], 'warning')
    if address is not None:
        text = addTextRecord(text, 'address', address)
        
    else:
        text = addTextRecord(text, 'latitude', latitude)
        text = addTextRecord(text, 'longitude', longitude)
    
    text = addTextRecord(text, 'address name', kwargs['address_name'])

    
    html = f"""\
    <html>
        <body>
            <p>
                <b>Warning Message!</b>
            </p>
            <p>
                You are receiving this message because there has been detected high {metric} in an IOT device near you!
            </p>
            <table>
            
    """
    html = addHtmlRecord(html, metric, kwargs[metric], 'warning')
    if address is not None:
        html = addHtmlRecord(html, 'address', address)
                    
    
    else:
        html = addHtmlRecord(html, 'latitude', latitude)
        html = addHtmlRecord(html, 'longitude', longitude)
    
    html = addHtmlRecord(html, 'address name', kwargs['address_name'])
    html = addHtmlRecord(html, 'Date', kwargs['datetime'])
    html += """
            </table>
        </body>
    </html>
    """
    return text, html