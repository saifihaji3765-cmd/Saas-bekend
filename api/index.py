from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

        response = {
            "status": "Python backend working ✅",
            "openai_key_present": bool(os.getenv("OPENAI_API_KEY")),
            "supabase_url_present": bool(os.getenv("SUPABASE_URL"))
        }

        self.wfile.write(json.dumps(response).encode())
