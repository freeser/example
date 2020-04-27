import time
from django.core.cache import cache
import requests
import hashlib
import random
import string

import os
import django

# 1、 永久添加环境变量(影响当前用户)
# #vim ~/.bashrc
# export PATH=/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH

# 2、永久添加环境变量(影响所有用户)
# #vim /etc/profile
# 在文档最后，添加:
# export DJANGO_SETTINGS_MODULE=settings
# 保存，退出，然后运行：
# #source /etc/profile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

class WxjdkParmas(object):

    ''' 1, 此处官方文档明确提到用户需要缓存jsapi_ticket因为其api调用次数非常有限,根据文档说明我把获取基础支持的acess_token和ticket写到了一起
        2, 此类是给前端js_JDK构造参数，并得到 nonceStr，signature，timestamp 的类，调用signutareEncryption()即可Redis缓存，需要自己配置，网上一大堆，此就不说了
        3, signature生成需要一下几个参数noncestr（随机字符串）,有效的jsapi_ticket, timestamp（时间戳），url（当前网页的URL，不包含#及其后面部分)
    '''
    def __init__(self, url):
        print("url：%s"%url)
        # app_id
        self.app_id = "wxccf28f2a1f2ad4a0"
        # nonceStr
        self.app_secret = "35fe664850a29246ecc902de1fdee41f"
        # 获取access_token链接
        # https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        self.base_get_access_token = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s'%(self.app_id,self.app_secret)
        # 获取ticket链接
        # https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
        self.get_ticket_url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={}&type=jsapi'
        # 生成signature的参数
        self.ret = {
            'nonceStr': self.__create_nonce_str(),
            'timestamp': self.__create_timestamp(),
            'jsapi_ticket': self.__get_ticket(),
            'url': url
        }
        # return self.signutareEncryption()

    def get_access_token(self):
        '''从微信端获取access_token''' 

        print("C")
        try:
            key = 'access_token'
            access_token = requests.get(self.base_get_access_token).json()['access_token']
            # access_token = "23_oZS_nQaKMC5UjbfzDJ48Jsaz6hPhLjWg3pVDCd2tva1hM19nQTdimLH-Dn-Hy0da2NDFdgM0AvKkkR48WKBUwTQkjRJLl2PAD0ZcKgpvIw9Qn3vWBI6B6YDYnm4T-UnOfn7Hj-x_B_ZCHNnVKLUeACAYZI"
            # 缓存并设置过期时间
            cache.set(key,access_token,110*60)
            print("数据库保存token正常:%s"%cache.get('access_token'))
            return access_token
        except:
            return "获取access_token异常"


    def __get_ticket(self):
        '''获取tickey'''

        try:
            key = 'ticket'
            if cache.has_key(key):
                ticket = cache.get(key)
                print('Redis中保存ticketB正常:%s'%ticket)
            
            else:
                print("A")
                if cache.has_key('access_token'):
                    access_token = cache.get('access_token')
                    print('Redis里面的access_token:%s'%access_token)
                else:
                    # None从微信端获取access_token 
                    print("B")
                    access_token = self.get_access_token()
                    print("微信端得到的access_token:%s"%access_token)
                
                # 获取ticket
                atoken = self.get_ticket_url.format(access_token)
                print("获取ticket的链接:%s"%atoken)
                ticket = requests.get(atoken).json()['ticket']

                # 缓存ticket ，设置过期时间
                cache.set(key,ticket,110*60)
                
                # print("Redis中保存ticketA正常%s"%cache.get('ticket'))

            return ticket
        except:
            print("获取tickey异常")
            return "获取tickey异常"

    def __create_nonce_str(self):
        '''从a-zA-Z0-9生成指定数量的随机字符'''

        print("随机字符")
        return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(15))

    def __create_timestamp(self):
        '''生成时间戳'''

        print("时间戳")
        return int(time.time())

    def signutareEncryption(self):
        '''生成签名signature'''

        string = '&'.join(['%s=%s' % (key.lower(), self.ret[key]) for key in sorted(self.ret)]).encode('utf-8')
        signature = hashlib.sha1(string).hexdigest()
        print("生成的签名:%s"%signature)
        
        # 返回js_jdk参数
        response = dict()
        response['nonceStr'] = self.ret.get('nonceStr')
        response['signature'] = signature
        response['timestamp'] = self.ret.get('timestamp')
        print("生成jdk的参数字典：%s"%response)
        return response