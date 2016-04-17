import os.path
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import pymongo
from bson.json_util import loads
from bson.json_util import dumps
import pyimgur
import argparse
from PIL import Image
from PIL.ExifTags import TAGS
from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

js=list()
injs=dict() 

class LoginHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('upp1.html')
class authHandler(tornado.web.RequestHandler):	
	def post(self):
		coll=self.application.db.profiles
		username=self.get_argument("username")
		password=self.get_argument("password")
		doc1=coll.find_one({'username':username})
		if not doc1:
			self.write("wrong username")
			self.redirect("/login")
		elif doc1['password']!=password:
			self.write("wrong password")
			self.redirect("/login")
		injs["username"]=username	
		self.redirect('/upload')
class dashHandler(tornado.web.RequestHandler):
	def get(self):
		coll=self.application.db.profiles
		doc=coll.find_one({'username':injs['username']})
		self.render('dash_upload.html',fname=doc['username'],lname='qwerty',badges='10',email='idk123@gmail.com',reports='15',cleaned='4',location='tamil nadu')		
class  uploadHandler(tornado.web.RequestHandler):
	def post(self):
		coll=self.application.db.locations
		CLIENT_ID ="28fd49c1df77939"
		files=self.request.files['file'][0]
		PATH = "/home/shubham0704/Desktop/data.jpg"
		PATH=files.filename
		location=self.get_argument('location')
		im = pyimgur.Imgur(CLIENT_ID)
		uploaded_image = im.upload_image(PATH, title="Uploaded with PyImgur")
		link=(uploaded_image.link)
		imageType=(uploaded_image.type)
		title=uploaded_image.title
		injs["link"]=link
		injs['title']=title
		injs['location']=location
		js.append(injs)
		js=dumps(js)
		fo=open('/home/shubham0704/Desktop/'+injs['username']+'.json','')
		fo.write(js)
		print js
		
class Application(tornado.web.Application):
    def __init__(self):
        template_path=os.path.join(os.path.dirname(__file__), "templates")
        handlers = [(r"/login", LoginHandler),(r"/auth", authHandler),(r"/upload", dashHandler),(r"/dash", uploadHandler)]
        conn = pymongo.Connection("localhost", 27017)
        self.db = conn["clean"]
        tornado.web.Application.__init__(self, handlers,template_path,debug=True)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    server = tornado.httpserver.HTTPServer(Application())
    server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
