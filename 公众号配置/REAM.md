# 配置公众号

[公众号配置文档](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Getting_Started_Guide.html)

```bash
cd /usr/local/nginx/sbin
./nginx //启动nginx

重新加载一下配置文件

./nginx -s reload

1、根据端口号得到其占用的进程的详细信息

netstat -tlnp|grep 80
tcp        0      0 192.168.33.10:80            0.0.0.0:*                   LISTEN      5014/httpd
tcp        0      0 0.0.0.0:48054               0.0.0.0:*                   LISTEN      5386/java

2、一次性的清除占用80端口的程序

lsof -i :80|grep -v "PID"|awk '{print "kill -9",$2}'|sh

3、手工终止进程的运行

kill 5014
如果终止不了，可以强制终止
kill -9 5014

4，查看已经开放的端口：

firewall-cmd --list-ports

5，开启端口

firewall-cmd --zone=public --add-port=80/tcp --permanent


命令含义：

–zone #作用域

–add-port=80/tcp #添加端口，格式为：端口/通讯协议

–permanent #永久生效，没有此参数重启后失效

6，防火墙设置
firewall-cmd --reload #重启firewall

systemctl stop firewalld.service #停止firewall

systemctl disable firewalld.service #禁止firewall开机启动


# 后台运行
cd /usr/local/etc
nohup python3 main.py 80 > /tmp/80.log 2>&1 &
# 查看
netstat -lntup|grep python3
# 杀死
kill -9  `netstat -lntup|grep python3|awk '{print$NF}'|awk -F[/] '{print $1}'`
```