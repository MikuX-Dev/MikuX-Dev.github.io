from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import requests

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        request_body = self.rfile.read(content_length).decode('utf-8')
        parameters = parse_qs(request_body)

        username = parameters['username'][0]
        password = parameters['password'][0]
        email = parameters['email'][0]

        if self.create_mega_account(username, password, email):
            self.send_response(200)
            self.end_headers()
            self.wfile.write(bytes("MEGA account created successfully!", "utf-8"))
        else:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(bytes("Failed to create MEGA account", "utf-8"))

    def create_mega_account(self, username, password, email):
        api_url = "https://api.mega.co.nz/"
        request_url = api_url + "user/register"

        # Include the referral link in the request payload
        data = {
            "name": username,
            "email": email,
            "password": password,
            "ref": "YOUR_REFERRAL_LINK_HERE"
        }

        response = requests.post(request_url, data=data)

        if response.status_code == 200:
            return True
        else:
            return False

def run():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Starting server...')
    httpd.serve_forever()

run()
