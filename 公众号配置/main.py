# -*- coding: utf-8 -*-
# filename: main.py
import web
from handle import Handle
from signature import WxjdkParmas

render = web.template.render("templates")

urls = (
    '/wx', 'Handle',
    '/scan', 'scan',
    '/detail', 'detail',
)

app = web.application(urls, globals())

class scan:
    def GET(self):
        url = web.input().url
        print("get-url：%s"%url)
        oparam = WxjdkParmas(url)
        param = oparam.signutareEncryption()
        print("get-param%s"%param)
        return param

class detail:
    def GET(self):
        return render.detail()

class static:
    def GET(self, media, file):
        try:
            url = media + '/' + file
            f = open(url, 'r')
            return f.read()
        except:
            return '' # you can send an 404 error here if you want

if __name__ == '__main__':
    app.run()